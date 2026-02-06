import React from 'react';
import './dna-styles.css';

const DNA: React.FC = () => {
    const totalBars = 20;

    return (
        <section className="dna-wrapper">
            <section className="blueprint">
                {[...Array(totalBars)].map((_, i) => (
                    <section 
                        key={i} 
                        className="bar" 
                        style={{ '--index': i } as React.CSSProperties}
                    />
                ))}
            </section>
        </section>
    );
};

export default DNA;