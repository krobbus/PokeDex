import React from 'react';
import { PokemonTypeColors } from './types.ts';
import type { ModalProps } from './types.ts';
import { calculateEffectiveness } from './types';
import './css/pokemon-modal-styles.css';
import logo from '/pokedex-logo.png';

const PokemonModal: React.FC<ModalProps> = ({ isOpen, onClose, pokemon }) => {
    if (!isOpen || !pokemon) return;

    const effectiveness = calculateEffectiveness(pokemon.types);
    const doubleWeak = Object.keys(effectiveness).filter(t => effectiveness[t] === 4);
    const weak = Object.keys(effectiveness).filter(t => effectiveness[t] === 2);
    const resist = Object.keys(effectiveness).filter(t => effectiveness[t] <= 0.5);

    const getBackground = () => {
        if (!pokemon || !pokemon.types || pokemon.types.length === 2) {
            const color1 = PokemonTypeColors[pokemon.types[0]] || '#A8A878';
            const color2 = PokemonTypeColors[pokemon.types[1]] || '#A8A878';
            return `linear-gradient(135deg, ${color1}, ${color2})`;
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
            <section 
                className="modalBox" 
                onClick={(e) => e.stopPropagation()} 
                style={{ background: getBackground() }}
            >
                <button className="close-btn" onClick={onClose}>X</button>

                <section className="modalContent">
                    <header>
                        <span>{pokemon.name.toUpperCase()}</span>
                        <span>SCAN ID: #{pokemon.id.toString().padStart(4, '0')}</span>
                    </header>

                    <section id="modalPokemonDescription">
                        <section id="modalImgContainer">
                            <img src={pokemon.image || logo} alt={pokemon.name} />
                        </section>

                        <section id="modalDescriptionContainer">
                            <h3>DESCRIPTION</h3>
                            <p>{pokemon.description || "NO DATA FOUND IN DATABASE."}</p>
                        </section>
                    </section>

                    <section id="modalGrid">
                        <section id="grid1" className="gridItem">
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
                        </section>
                        
                        <section id="grid2" className="gridItem">
                            <h3>MEASUREMENT</h3>
                            <ul>
                                <li><span>HEIGHT:</span> <span>{pokemon.height / 10} m</span></li>
                                <li><span>WEIGHT:</span> <span>{pokemon.weight / 10} kg</span></li>
                            </ul>
                        </section>

                        <section id="grid3" className="gridItem">
                            <h3>ABILITIES</h3>
                            <ul>
                                {pokemon.abilities?.filter(Boolean).map((a: string, index: number) => (
                                    <li key={a}>
                                        <span>[{index + 1}]</span>
                                        <span>{a.toUpperCase()}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="grid4" className="gridItem">
                            <h3>TYPE</h3>
                            <section className="type-list">
                                {pokemon.types?.filter(Boolean).map((t: string) => (
                                    <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                        {t.toUpperCase()}
                                    </span>
                                ))}
                            </section>
                        </section>

                        <section id="grid5" className="gridItem">
                            <h3>CRY</h3>
                            <button className="cry-btn" onClick={playCry}>
                                <img src="./src/assets/audio-icon.png" alt="audio icon" />
                            </button>
                        </section>

                        <section id="grid6" className="gridItem">
                            <h3>BATTLE ANALYSIS</h3>
                            
                            {doubleWeak.length > 0 && (
                                <section className="effect-group">
                                    <p className="multiplier-label x4">4x DAMAGE (CRITICAL)</p>
                                    
                                    <section className="type-list">
                                        {doubleWeak.map(t => (
                                            <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                                {t.toUpperCase()}
                                            </span>
                                        ))}
                                    </section>
                                </section>
                            )}

                            <section className="effect-group">
                                <p className="multiplier-label x2">2x DAMAGE (WEAK)</p>

                                <section className="type-list">
                                    {weak.map(t => (
                                        <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                            {t.toUpperCase()}
                                        </span>
                                    ))}
                                </section>
                            </section>

                            <section className="effect-group">
                                <p className="multiplier-label half">RESISTANT TO</p>

                                <section className="type-list">
                                    {resist.map(t => (
                                        <span key={t} className="mini-type-badge" style={{ backgroundColor: PokemonTypeColors[t] }}>
                                            {t.toUpperCase()}
                                        </span>
                                    ))}
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default PokemonModal