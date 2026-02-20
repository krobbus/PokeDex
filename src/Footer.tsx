import React, {} from 'react';
import './css/footer-styles.css';

import githubLogo from './assets/github-logo.png';
import pokeballIcon from './assets/pokeball-icon.png';

const Footer: React.FC = () => {
    return(
        <section id="footerContainer">
            <div id="footerDescription">
                <img src="/pokedex-logo.png" alt="pokedex logo" />

                <h4>
                    It focuses exclusively on the core PokeDex structure (designed as data-reference tool for the list of Pokémon. 
                    This to maintain a clean focus on Pokedex architecture) and interacts with the PokeAPI to provide real-time data 
                    on over 1,300+ Pokémon, featuring dynamic filtering, searching, and a detailed modal view.
                </h4>
            </div>

            <ul>
                <li><a href="https://github.com/krobbus/PokeDex/blob/main/README.md">
                    <img src={githubLogo} alt="github logo" /></a>
                </li>

                <li><a href="https://www.pokemon.com/us/pokedex">
                    <img src={pokeballIcon} alt="pokedex logo" /></a>
                </li>
            </ul>

            <h6>
                &copy; 2026 by Alef Justin Loresca. Pokémon names, images, and related media are trademarks and copyrights of 
                Nintendo, Game Freak, and Creatures. This project is intended under "Fair Use" for educational purposes. 
                No copyright infringement is intended
            </h6>
        </section>
    );
};

export default Footer