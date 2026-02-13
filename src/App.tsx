import { useState } from 'react';
import PokemonIntro from './PokemonIntro';
import PokemonList from './PokemonList';

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