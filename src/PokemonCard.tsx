import type { PokemonProps } from './types.ts';
import { PokemonTypeColors } from './types.ts';
import './css/pokemon-card-styles.css';

const PokemonCard: React.FC<PokemonProps & { onClick: () => void }> = ({ id, name, image, types, hp, onClick }) => {
    const formattedId = `#${id.toString().padStart(4, '0')}`;

    const getBackground = () => {
        if (types.length === 2) {
            const color1 = PokemonTypeColors[types[0]] || '#A8A878';
            const color2 = PokemonTypeColors[types[1]] || '#A8A878';
            return `linear-gradient(135deg, ${color1}, ${color2})`;
        }
        return PokemonTypeColors[types[0]] || '#A8A878';
    };
        
    return (
        <section className="dynamicCardStyle" 
            style={{ ...cardStyle, background: getBackground(), cursor: 'pointer' }} 
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <section id="headerStyle">
                <span id="idStyle">{formattedId}</span>
                <span id="hpStyle">{hp} HP</span>
            </section>

            <h3 id="nameStyle">{name}</h3>
        
            <section id="imageContainerStyle">
                <img style={{ width: '120px' }} src={image} alt={name} />
            </section>

            <section id="typeContainerStyle">
                {types.map((type) => (
                    <span key={type} id="typeBadgeStyle" style={{ background: PokemonTypeColors[type] }}>
                        {type}
                    </span>
                ))}
            </section>
        </section>
    );
};

const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '450px',
    boxSizing: 'border-box',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Press Start 2P", cursive'
};

export default PokemonCard