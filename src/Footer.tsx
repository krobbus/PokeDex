import React, {} from 'react';
import './css/footer-styles.css';

const Footer: React.FC = () => {
    return(
        <section id="footerContainer">
            <img src="./public/pokedex-logo.png" alt="pokedex logo" />

            <h4>
                It focuses exclusively on the core PokeDex structure (designed as data-reference tool for the list of Pokemon. 
                This to maintain a clean focus on Pokedex architecture) and interacts with the PokeAPI to provide real-time data 
                on over 1,300+ Pokemon, featuring dynamic filtering, searching, and a detailed modal view.
            </h4>

            <ul>
                <li><a href="https://github.com/krobbus/PokeDex/blob/main/README.md" />
                    <img src="./src/assets/github-logo.png" alt="github logo" />
                </li>

                <li><a href="https://www.pokemon.com/us/pokedex" />
                    <img src="./src/assets/pokeball-icon.png" alt="pokedex logo" />
                </li>
            </ul>

            <h6>
                &copy; 2026 by Alef Justin Loresca. Pokémon names, images, and related media are trademarks and copyrights of 
                Nintendo, Game Freak, and Creatures.. This project is intended under "Fair Use" for educational purposes. 
                No copyright infringement is intended
            </h6>
        </section>
    );
};

export default Footer