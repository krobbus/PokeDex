import React, { useEffect, useState } from 'react';
import './css/pokemon-evolution-styles.css';
import DNA from './components/DNA';
import type { UrlProps } from './types';

const PokemonEvolution: React.FC<UrlProps> = ({ evolutionUrl, openModal }) => {
    const [evolutionChain, setEvolutionChain] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getEvolutionData = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();

        const steps = [];
        let currentStep = data.chain;
        while (currentStep) {
            const id = currentStep.species.url.split('/').filter(Boolean).pop();
            steps.push({ name: currentStep.species.name, id });
            currentStep = currentStep.evolves_to[0];
        }

        const chainData = await Promise.all(
            steps.map(async (step) => {
                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${step.id}/`);
                const speciesData = await speciesRes.json();

                const description = speciesData.flavor_text_entries.find(
                    (entry: any) => entry.language.name === 'en'
                )?.flavor_text.replace(/[\f\n\r]/gm, " ");

                return {
                    id: step.id,
                    name: step.name,
                    description: description || "No genetic description available.",
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png`
                };
            })
        );

        return chainData;
    };

    useEffect(() => {
        if (!evolutionUrl) return;

        const fetchChain = async () => {
            setLoading(true);
            const data = await getEvolutionData(evolutionUrl);
            setEvolutionChain(data);
            setLoading(false);
        };

        fetchChain();
    }, [evolutionUrl]);

    if (!evolutionUrl) {
        return (
            <section id="evolutionContainer">
                <p style={{textAlign: 'center', color: '#666'}}>
                    SELECT A POKEMON TO VIEW GENETIC EVOLUTION DATA
                </p>
            </section>
        );
    }

    if (loading) return <section style={{ color: 'white', fontFamily: "'Press Start 2P', cursive", margin: '10px'}}>SCANNING GENETIC DATA...</section>;

    return (
        <section id="evolutionContainer">
            <section id="evolutionDisplayWrapper">
                <section id="evolutionDisplayContainer">
                    <h2>EVOLUTION</h2>

                    <section id="evolutionDisplay">
                        <section className="dna-column">
                            <DNA />
                        </section>

                        <section className="evolution-path-column">
                            {evolutionChain.map((evo, index) => (
                                <section
                                    key={evo.name}
                                    className="evolution-step"
                                    onClick={() => openModal(evo)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <img src={evo.image} alt={evo.name} />
                                    <section className="evo-info">
                                        <p>{evo.name.toUpperCase()}</p>
                                        <span className="evo-label">STAGE {index + 1}</span>
                                        <span className="evo-description">{evo.description}</span>
                                    </section>
                                </section>
                            ))}
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default PokemonEvolution