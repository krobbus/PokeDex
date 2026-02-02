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
        <section className="modal-overlay" onClick={onClose}>
            <section 
                className="modal-box" 
                onClick={(e) => e.stopPropagation()} 
                style={{ background: getBackground() }}
            >
                <button className="close-btn" onClick={onClose}>X</button>

                <section className="modal-content">
                    <header>
                        <span>SCAN ID: #{pokemon.id.toString().padStart(4, '0')}</span>
                        <span>{pokemon.hp} HP</span>
                    </header>

                    <h2>{pokemon.name.toUpperCase()}</h2>

                    <section id="contentContainer">
                        <section id="imageContainer">
                            <img src={pokemon.image} alt={pokemon.name} />
                        </section>

                        <section id="fullDescriptionContainer">
                            <section id="statsContainer">
                                <section>
                                    <h3>ABILITIES</h3>
                                    <ul>
                                        <li>{pokemon.abilities[0]}</li>
                                        <li>{pokemon.abilities[1]}</li>
                                        <li>{pokemon.abilities[2]}</li>
                                        <li>{pokemon.abilities[3]}</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3>TYPE</h3>
                                    <ul>
                                        <li>{pokemon.types[0]}</li>
                                        <li>{pokemon.types[1]}</li>
                                        <li>{pokemon.types[2]}</li>
                                        <li>{pokemon.types[3]}</li>
                                    </ul>
                                </section>
                            </section>

                            <section style={{ background: 'rgba(0, 0, 0, 0.1)', padding: '15px', borderRadius: '10px' }}>
                                <h3>DESCRIPTION</h3>
                                <p style={{ fontSize: '1rem', lineHeight: '1.5', textAlign: 'justify' }}>
                                    {pokemon.description || "NO DATA FOUND IN DATABASE."}
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default PokemonModal