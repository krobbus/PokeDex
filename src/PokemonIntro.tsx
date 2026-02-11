import React, { useEffect, useState } from "react";
import './css/pokemon-intro-styles.css';
import type { IntroProps } from './types';

const PokemonIntro: React.FC<IntroProps> = ({ onComplete }) => {
    const [isBooting, setIsBooting] = useState(false);
    const [isBlackout, setIsBlackout] = useState(false);
    
    useEffect(() => {
        const root = document.documentElement;
        const originalBg = root.style.backgroundImage;

        root.style.backgroundImage = "url('./src/assets/intro-bg.png')";
        root.style.backgroundSize = "stretch";
        root.style.backgroundAttachment = "fixed";
        root.style.backgroundRepeat = "repeat";
        root.style.backgroundPosition = "center";
        
        return () => {
            root.style.backgroundImage = originalBg;
        };
    }, []);

    useEffect(() => {
        const startBootSequence = () => {
            if (!isBooting) setIsBooting(true);
            setTimeout(() => setIsBlackout(true), 1000);
        };

        window.addEventListener("keydown", startBootSequence);
        window.addEventListener("mousedown", startBootSequence);

        return () => {
            window.removeEventListener("keydown", startBootSequence);
            window.removeEventListener("mousedown", startBootSequence);
        };
    }, [isBooting]);

    const handleAnimationEnd = () => {
        if (isBlackout) {
            onComplete();
        }
    };

    return (
        <section id="introContainer">
            <section
                id="blackoutAnim"
                onTransitionEnd={handleAnimationEnd}
                style={{
                    opacity: isBlackout ? 1 : 0,
                    pointerEvents: isBlackout ? "all" : "none"
                }} 
            />

            <section 
                id="pokedexImgContainer"
                onTransitionEnd={handleAnimationEnd}
                style={{ 
                    transform: isBooting 
                        ? "translate(480%, -10%) scale(20) rotate(0deg)"
                        : "translate(-50%, -50%) scale(1) rotate(-30deg)"
                }}
            >
                <img src="./src/assets/pokedex.svg" id="pokedexImg" alt="pokedex component" />
            </section>

            <section id="pokeTableContainer">
                <img src="./src/assets/intro-table.png" id="pokeTable" alt="table that have full of pokeballs" />
            </section>

            <section id="pokedexLogoContainer">
                <img src="/pokedex-logo.png" id="pokedexLogo" alt="pokedex logo" />
            </section>

            {!isBooting && (
                <>
                    <p 
                        style={{ 
                            color: "white", 
                            textAlign: "center",
                            fontFamily: "'Press Start 2P', cursive",
                            position: "absolute",
                            bottom: "22%",
                            width: "100%",
                        }}>
                        PRESS ANY KEY TO BOOT
                    </p>

                    <small 
                        style={{ 
                            color: "white", 
                            textAlign: "center",
                            textShadow: "1px 1px black",
                            fontFamily: "'Press Start 2P', cursive",
                            position: "absolute",
                            left: "50%",
                            transform: "translate(-50%, 0)",
                            bottom: "2%",
                            width: "80%",
                        }}>
                        &copy; 2026 by Alef Justin Loresca. Pokémon names, images, and related media are trademarks and copyrights of 
                        Nintendo, Game Freak, and Creatures.. This project is intended under "Fair Use" for educational purposes. 
                        No copyright infringement is intended
                    </small>
                </>
            )}
        </section>
    );
}

export default PokemonIntro