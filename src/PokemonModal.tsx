import React from 'react';
import { PokemonTypeColors } from './types.ts';
import type { ModalProps } from './types.ts';
import './css/pokemon-modal-styles.css';

const PokemonModal: React.FC<ModalProps> = ({ isOpen, onClose, pokemon }) => {
    if (!isOpen || !pokemon) return null;

    const getBackground = () => {
        if (pokemon.types.length === 2) {
            const color1 = PokemonTypeColors[pokemon.types[0]] || '#A8A878';
            const color2 = PokemonTypeColors[pokemon.types[1]] || '#A8A878';
            return `linear-gradient(135deg, ${color1}, ${color2})`;
        }
        return PokemonTypeColors[pokemon.types[0]] || '#A8A878';
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
                            <img src={pokemon.image} alt={pokemon.name} />
                        </section>

                        <section id="modalDescriptionContainer">
                            <h3>DESCRIPTION</h3>
                            <p>{pokemon.description || "NO DATA FOUND IN DATABASE."}</p>
                        </section>
                    </section>

                    <section id="modalGrid">
                        <section className="gridItem">
                            <h3>MEASUREMENT</h3>
                            <ul>
                                <li><span>HEIGHT:</span> <span>{pokemon.height / 10} m</span></li>
                                <li><span>WEIGHT:</span> <span>{pokemon.weight / 10} kg</span></li>
                            </ul>
                        </section>

                        <section className="gridItem">
                            <h3>BASE STATS</h3>
                            <ul>
                                {pokemon.stats?.map((s: any) => (
                                    <li key={s.name}>
                                        <span className="stat-name">{s.name.toUpperCase()}:</span> 
                                        <span className="stat-value">{s.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="gridItem">
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

                        <section className="gridItem">
                            <h3>TYPE</h3>
                            <ul>
                                <ul>
                                    {pokemon.types?.filter(Boolean).map((t: string, index: number) => (
                                        <li key={t}>
                                            <span>[{index + 1}]</span>
                                            <span>{t.toUpperCase()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </ul>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default PokemonModal