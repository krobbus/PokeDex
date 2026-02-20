import React, { useEffect, useState } from 'react';
import './css/pokemon-evolution-styles.css';
import DNA from './components/DNA';

interface EvolutionProps {
  evolutionUrl: string;
  typeBackground: string;
  onSelectNewPokemon: (name: string) => void;
}

const PokemonEvolution: React.FC<EvolutionProps> = ({ evolutionUrl, typeBackground, onSelectNewPokemon }) => {
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
                <p style={{textAlign: 'center', color: '#666666'}}>
                    SELECT A POKEMON TO VIEW GENETIC EVOLUTION DATA
                </p>
            </section>
        );
    }

    if (loading) return <section style={{ color: 'white', fontFamily: "'Press Start 2P', cursive", margin: '10px'}}>SCANNING GENETIC DATA...</section>;

    return (
        <section id="evolutionContainer">
            <div id="evolutionDisplayWrapper">
                <div id="evolutionDisplayContainer" 
                    style={{ 
                        background: typeBackground,
                        backgroundBlendMode: "multiply",
                        backgroundColor: "#00000051"
                    }}
                >
                    <div id="evolutionDisplay">
                        <div id="dnaColumn">
                            <DNA />
                        </div>

                        <div className="evolutionPathColumn">
                            {evolutionChain.map((evo, index) => (
                                <div
                                    key={evo.name}
                                    className="evolutionStep"
                                    style={{cursor: 'pointer'}}
                                    onClick={() => onSelectNewPokemon(evo.name)}
                                >
                                    <img src={evo.image} alt={evo.name} />
                                    <div className="evoInfo">
                                        <p>{evo.name.toUpperCase()}</p>
                                        <span className="evoLabel">STAGE {index + 1}</span>
                                        <span className="evoDescription">{evo.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PokemonEvolution