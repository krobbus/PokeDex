import { useState } from 'react';
import PokemonIntro from './PokemonIntro';
import PokemonList from './PokemonList'; // Ensure this path is correct

const App = () => {
    const [view, setView] = useState<'intro' | 'list'>('intro');

    return (
        <main>
            {view === 'intro' ? (
                <PokemonIntro onComplete={() => setView('list')} />
            ) : (
                <PokemonList />
            )}
        </main>
    );
};

export default App;