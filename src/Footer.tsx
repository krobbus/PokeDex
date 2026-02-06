import React, {} from 'react';
import './css/footer-styles.css';

const Footer: React.FC = () => {
    return(
        <section id="footerContainer">
            <section className="footerSiteDescription">
                <section id="fullDescription">
                    <h5>
                        It focuses exclusively on the core PokeDex structure (designed as data-reference tool for the list of Pokemon. 
                        This to maintain a clean focus on Pokedex architecture) and interacts with the PokeAPI to provide real-time data 
                        on over 1,300+ Pokemon, featuring dynamic filtering, searching, and a detailed modal view.
                    </h5>

                    <h5>
                        <small>
                            &copy; 2026 by Alef Justin Loresca. Pokémon names, images, and related media are trademarks and copyrights of 
                            Nintendo, Game Freak, and Creatures.. This project is intended under "Fair Use" for educational purposes. 
                            No copyright infringement is intended
                        </small>
                    </h5>
                </section>
            </section>

            <section className="footerSiteDescription">
                <section id="footerImgContainer">
                    <img src="./public/pokedex-logo.png" alt="pokedex logo" />
                </section>

                <section id="footerListContainer">
                    <h3>About PokeDex</h3>

                    <ul>
                        <li><a href="">Learn More [Github]</a></li>
                        <li><a href="">Official PokeDex Site</a></li>
                    </ul>
                </section>
            </section>
        </section>
    );
};

export default Footer