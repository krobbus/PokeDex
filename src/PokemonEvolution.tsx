import React, { useEffect, useState } from 'react';
import './css/pokemon-evolution-styles.css';
import DNA from './components/DNA';
import type { UrlProps } from './types';

const PokemonEvolution: React.FC<UrlProps> = ({ evolutionUrl }) => {
    const [evolutionChain, setEvolutionChain] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getEvolutionData = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        const chain = [];
        let currentStep = data.chain;

        while (currentStep) {
        const id = currentStep.species.url.split('/').filter(Boolean).pop();
        chain.push({
            name: currentStep.species.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        });
        currentStep = currentStep.evolves_to[0];
        }
        return chain;
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

    if (loading) return <section className="loader">SCANNING GENETIC DATA...</section>;

    return (
        <section id="evolutionContainer">
            <section id="evolutionDisplayWrapper">
                <section id="evolutionDisplay">
                    <section className="dna-column">
                        <DNA />
                    </section>

                    <section className="evolution-path-column">
                        {evolutionChain.map((evo, index) => (
                            <React.Fragment key={evo.name}>
                                <section className="evolution-step">
                                    <img src={evo.image} alt={evo.name} />
                                    <section className="evo-info">
                                        <p>{evo.name.toUpperCase()}</p>
                                        <span className="evo-label">STAGE {index + 1}</span>
                                    </section>
                                </section>

                                {index < evolutionChain.length - 1 && (
                                    <section className="vertical-arrow"></section>
                                )}
                            </React.Fragment>
                        ))}
                    </section>
                </section>
            </section>
        </section>
    );
};

export default PokemonEvolution