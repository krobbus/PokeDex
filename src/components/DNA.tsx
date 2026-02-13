import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateHelix = keyframes
`
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(360deg);
    }
`;

const BarAnim = styled.section` animation: ${rotateHelix} 6s linear infinite; `;

const DNA: React.FC = () => {
    const totalBars = 50;

    return (
        <section 
            className="dna-wrapper"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                perspective: "1000px",
                overflow: "hidden"
            }}
        >
            <div
                className="blueprint"
                style={{
                    position: 'relative',
                    width: "300px",
                    height: "100%",
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
                            height: "6px",
                            width: "100%",
                            background: "linear-gradient( #ffffff, #6d6d6d )",
                            borderRadius: "50px",
                            left: "0",
                            top: `calc(${i} * 15px)`,                           
                            transformStyle: "preserve-3d",
                            animationDelay: `calc(${i} * -0.2s)`
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </section>
    );
};

export default DNA