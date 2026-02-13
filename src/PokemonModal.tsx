import React from 'react';
import logo from '/pokedex-logo.png';
import { PokemonTypeColors } from './types.ts';
import type { ModalProps } from './types.ts';
import { calculateEffectiveness } from './types';
import './css/pokemon-modal-styles.css';
import PokemonEvolution from './PokemonEvolution';

const PokemonModal: React.FC<ModalProps> = ({ isOpen, onClose, pokemon, onSelectNewPokemon }) => {
    if (!isOpen || !pokemon) return null;

    if (!pokemon.types) {
        return (
            <div className="modalOverlay">
                <div className="modalBox">
                    <p>SCANNING GENETIC DATA...</p>
                </div>
            </div>
        );
    }

    const effectiveness = calculateEffectiveness(pokemon.types);
    const doubleWeak = Object.keys(effectiveness).filter(t => effectiveness[t] === 4);
    const weak = Object.keys(effectiveness).filter(t => effectiveness[t] === 2);
    const resist = Object.keys(effectiveness).filter(t => effectiveness[t] < 1 && effectiveness[t] > 0);

    const getBackground = () => {
        if (!pokemon || !pokemon.types || pokemon.types.length === 2) {
            const color1 = PokemonTypeColors[pokemon.types[0]] || '#A8A878';
            const color2 = PokemonTypeColors[pokemon.types[1]] || '#A8A878';
            const overlay = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))";
            const baseGradient = `linear-gradient(135deg, ${color1}, ${color2})`;

            return `${overlay}, ${baseGradient}`;
        }
        return PokemonTypeColors[pokemon.types[0]] || '#A8A878';
    };

    const playCry = () => {
        const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
        const audio = new Audio(cryUrl);
        audio.volume = 0.4;
        audio.play().catch(e => console.error("Audio failed", e));
    };

    return (
        <section className="modalOverlay" onClick={onClose}>
            <div
                className="modalBox" 
                onClick={(e) => e.stopPropagation()} 
                style={{ background: getBackground() }}
            >
                <button className="close-btn" onClick={onClose}>X</button>

                <div className="modalContent">
                    <header>
                        <span>{pokemon.name?.toUpperCase() || "LOADING..."}</span>
                        <span>SCAN ID: #{pokemon.id.toString().padStart(4, '0') || "????"}</span>
                    </header>

                    <div id="modalPokemonDescription">
                        <div id="modalImgContainer">
                            <img src={pokemon.image || logo} alt={pokemon.name} />
                        </div>

                        <div id="modalDescriptionContainer">
                            <h3>DESCRIPTION</h3>
                            <p>{pokemon.description || "NO DATA FOUND IN DATABASE."}</p>
                        </div>
                    </div>

                    <div id="modalGrid">
                        <div id="grid1" className="gridItem">
                            <h3>BASE STATS</h3>
                            <ul>
                                {pokemon.stats?.map((s: any) => {
                                    const percent = Math.min((s.value / 255) * 100, 100);
                                    const barColor = PokemonTypeColors[pokemon.types[0]] || '#A8A878';

                                    return (
                                        <li key={s.name}>
                                            <span className="stat-name">{s.name.toUpperCase()}:</span> 
                                            <section className="stat-bar-container">
                                                <section 
                                                    className="stat-bar-fill" 
                                                    style={{ 
                                                        width: `${percent}%`,
                                                        backgroundColor: barColor,
                                                    }}
                                                />
                                            </section>
                                            <span className="stat-value">{s.value}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        
                        <div id="grid2" className="gridItem">
                            <h3>MEASUREMENT</h3>
                            <ul>
                                <li><span>HEIGHT:</span> <span>{pokemon.height / 10} m</span></li>
                                <li><span>WEIGHT:</span> <span>{pokemon.weight / 10} kg</span></li>
                            </ul>
                        </div>

                        <div id="grid3" className="gridItem">
                            <h3>ABILITIES</h3>
                            <ul>
                                {pokemon.abilities?.filter(Boolean).map((a: string, index: number) => (
                                    <li key={a}>
                                        <span>[{index + 1}]</span>
                                        <span>{a.toUpperCase()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div id="grid4" className="gridItem">
                            <h3>TYPE</h3>
                            <div className="type-list">
                                {pokemon.types?.filter(Boolean).map((t: string) => (
                                    <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                        {t.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div id="grid5" className="gridItem">
                            <h3>CRY</h3>
                            <button className="cry-btn" onClick={playCry}>
                                <img src="./src/assets/audio-icon.png" alt="audio icon" />
                            </button>
                        </div>

                        <div id="grid6" className="gridItem">
                            <h3>BATTLE ANALYSIS</h3>
                            
                            {doubleWeak.length > 0 && (
                                <div className="effect-group">
                                    <p className="multiplier-label x4">4x DAMAGE (CRITICAL)</p>
                                    
                                    <div className="type-list">
                                        {doubleWeak.map(t => (
                                            <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                                {t.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="effect-group">
                                <p className="multiplier-label x2">2x DAMAGE (WEAK)</p>

                                <div className="type-list">
                                    {weak.map(t => (
                                        <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                            {t.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="effect-group">
                                <p className="multiplier-label half">RESISTANT TO</p>

                                <div className="type-list">
                                    {resist.map(t => (
                                        <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                            {t.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <PokemonEvolution
                        evolutionUrl={pokemon.evolutionUrl || ''}
                        typeBackground={getBackground()}
                        onSelectNewPokemon={onSelectNewPokemon}
                    />
                </div>
            </div>
        </section>
    );
};

export default PokemonModal