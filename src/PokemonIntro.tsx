import React, { useEffect, useState } from "react";
import './css/pokemon-intro-styles.css';
import type { IntroProps } from './types';

const PokemonIntro: React.FC<IntroProps> = ({ onComplete }) => {
    const [isBooting, setIsBooting] = useState(false);
    const [isBlackout, setIsBlackout] = useState(false);
    
    useEffect(() => {
        const root = document.documentElement;
        const originalBg = root.style.backgroundImage;

        root.style.backgroundImage = "none";
        root.style.backgroundColor = "#767676";

        return () => {
            root.style.backgroundColor = "";
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
                        ? "translate(200%, -10%) scale(10) rotate(0deg)"
                        : "translate(-50%, -50%) scale(1) rotate(-30deg)"
                }}
            >
                <img src="./src/assets/pokedex.svg" id="pokedexImg" alt="pokedex component" />
            </section>

            <section id="pokedexLogoContainer">
                <img src="/pokedex-logo.png" id="pokedexLogo" alt="pokedex logo" />
            </section>

            {!isBooting && (
                <p 
                    style={{ 
                        color: "white", 
                        textAlign: "center",
                        fontFamily: "'Press Start 2P', cursive",
                        position: "absolute",
                        bottom: "15%",
                        width: "100%",
                    }}>
                    PRESS ANY KEY TO BOOT
                </p>
            )}
        </section>
    );
}

export default PokemonIntro