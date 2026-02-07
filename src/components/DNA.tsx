import React from 'react';
import styled, { keyframes } from 'styled-components';

const DNA: React.FC = () => {
    const totalBars = 20;
    const rotateHelix = keyframes
    `
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(360deg);
        }
    `;
    const BarAnim = styled.section` animation: ${rotateHelix} 5s linear infinite; `;

    return (
        <section 
            className="dna-wrapper"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                perspective: "800px"
            }}
        >
            <section 
                className="blueprint"
                style={{
                    position: 'relative',
                    width: "100px",
                    height: "400px",
                    transformStyle: "preserve-3d"
                }}
            >
                {[...Array(totalBars)].map((_, i) => (
                    <BarAnim
                        key={i} 
                        className="bar" 
                        style={{ 
                            '--index': i,
                            position: "absolute",
                            height: "4px",
                            width: "100%",
                            background: "rgba(34, 79, 35, 0.8)",
                            borderRadius: "50px",
                            left: "0",
                            top: "calc(var(--index) * 20px)",                           
                            transformStyle: "preserve-3d",
                            animationDelay: "calc(var(--index) * -0.2s)"
                        } as React.CSSProperties}
                    />
                ))}
            </section>
        </section>
    );
};

export default DNA;