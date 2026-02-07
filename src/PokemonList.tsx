import React, { useEffect, useState, useRef } from 'react';
import './css/pokemon-list-styles.css';

import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';
import PokemonEvolution from './PokemonEvolution';
import Footer from './Footer';

import type { PokemonProps } from './types';
import { ver } from './types';

import logo from '/pokedex-logo.png';
import filterIcon from './assets/filter-icon.png';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>([]);
  const hasFetched = useRef(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<PokemonProps | null>(null);
  const [pageInput, setPageInput] = useState<string>('1');
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState<string>('lowest');
  const [sortTypeBy, setTypeSortBy] = useState<string>('all');

  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const limit = 9;
  const totalPokemon = 1302;
  const maxPage = Math.ceil(totalPokemon / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const currentVersion = (() => {
    if (searchResult) return ver(searchResult.id);
    if (pokemonList.length > 0) return ver(pokemonList[0].id);
    return "LOADING...";
  })();

  const handleOpenModal = async (pokemon: any) => {
    setListLoading(true);
    setError('');

    try {
      const [speciesRes, detailRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)
      ]);
      if (!speciesRes.ok || !detailRes.ok) throw new Error("Data retrieval failed.");

      const speciesData = await speciesRes.json();
      const detailData = await detailRes.json();

      const description = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      )?.flavor_text.replace(/[\f\n\r]/gm, " ");

      setSelectedPokemon({
        ...pokemon,
        abilities: detailData.abilities.map((a: any) => a.ability.name),
        description: description,
        height: detailData.height, 
        weight: detailData.weight,
        stats: detailData.stats.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat
        })),
        evolutionUrl: speciesData.evolution_chain.url
  });
      
      setListLoading(false);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to load details", err);
    }
  };

  const fetchBatch = async (newOffset: number) => {
    setLoading(true);
    setPokemonList([]);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`);
      if (!response.ok) throw new Error('ERROR: NO POKEMON SPOTTED IN THIS AREA.');
      const data = await response.json();

      const detailPromises = data.results.map(async (p: { url: string }) => {
        const res = await fetch(p.url);
        const details = await res.json();
        const imageSource = details.sprites.front_default || logo;

        return {
          id: details.id,
          name: details.name,
          image: imageSource,
          types: details.types.map((t: any) => t.type.name),
          hp: details.stats[0].base_stat,
        };
      });

      const newPokemon = await Promise.all(detailPromises);
      setPokemonList(newPokemon);
      setOffset(newOffset);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newOffset = direction === 'next' ? offset + limit : Math.max(0, offset - limit);
    fetchBatch(newOffset);
  };

  const handlePageInputSubmit = () => {
    const pageNum = parseInt(pageInput);

    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPage) {
      const newOffset = (pageNum - 1) * limit;
      fetchBatch(newOffset);
    } else {
      setPageInput(currentPage.toString());
      alert(`Please enter a page between 1 and ${maxPage}`);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResult(null);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase().trim()}`);
      if (!res.ok) throw new Error('ERROR: POKEMON DATA NOT FOUND. CHECK YOUR SPELLING, TRAINER.');
      const details = await res.json();
      const imageSource = details.sprites.front_default || logo;

      setSearchResult({
        id: details.id,
        name: details.name,
        image: imageSource,
        types: details.types.map((t: any) => t.type.name),
        hp: details.stats[0].base_stat,
      });
    } catch (err: any) {
      setSearchResult(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredByType = pokemonList.filter((p) => {
    if (sortTypeBy === 'all') return true;
    return p.types.includes(sortTypeBy);
  });

  const sortPokemon = [...filteredByType].sort((a, b) => {
    if (sortBy === 'az'){
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'za'){
      return b.name.localeCompare(a.name);
    } else if (sortBy === 'highest'){
      return b.id - a.id;
    } else{
      return a.id - b.id;
    }
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!hasFetched.current) {
        await fetchBatch(0);
        hasFetched.current = true;
      } else {
        await fetchBatch(offset);
      }
    };

    fetchInitialData();
    setPageInput(currentPage.toString())
  }, [offset]);

  return (
    <>
      <section id="navContainer">
        <nav id="navStyle">
          <a href={'#navStyle'}><img id="navLogo" src={logo} /></a>
          
          <ul id="navUlStyle">
            <li><a href={'#flexStyle'}>Home</a></li>
            <li><a href={'#'}>Evolution</a></li>
            <li><a href={'#'}>Spot the Shiny</a></li>
            <li><a href={'#footerContainer'}>About</a></li>
          </ul>
        </nav>
      </section>
      
      <section id="flexStyle">
        <section id="header">
          <h1>POKEDEX</h1>
          <h5>Current Version Loaded: v{currentVersion}. Encounters logged: {totalPokemon}.</h5>
        </section>

        <section id="searchContainerStyle">
          <input 
            id="inputStyle"
            type="text" 
            placeholder="INITIALIZING SCAN... INPUT NAME OR ID" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button id="searchButtonStyle" onClick={handleSearch}>SEARCH</button>

          {searchResult && (
            <button 
              id="searchButtonStyle" style={{ backgroundColor: '#f44336', marginLeft: '10px' }} 
              onClick={() => {setSearchResult(null); setSearchQuery('');}}
            > 
              CLEAR 
            </button>
          )}
        </section>

        {error && <p style={{ color: 'red', fontFamily: "'Press Start 2P', cursive", marginBottom: '10px'}}>{error}</p>}

        {!loading && !searchResult && (
          <section id="searchFilterField">
            <section id="paginationContainer">
              <button 
                disabled={offset === 0} 
                onClick={() => handlePageChange('prev')}
                id="pageButtonStyle"
                style={{ opacity: offset === 0 ? 0.5 : 1}}
              >
                PREV
              </button>
              
              <section id="pageIndicatorStyle">
                PAGE 
                <input 
                  id="pageInputStyle"
                  type="number"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePageInputSubmit()}
                  onBlur={handlePageInputSubmit}
                />
                <span>/{maxPage}</span>
              </section>
              
              <button onClick={() => handlePageChange('next')} id="pageButtonStyle"> NEXT </button>
            </section>

            <section id="filterContainer">
              <img src={filterIcon} id="inner-filter-icon" alt="filter icon" />
              <select id="filterSelection" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="lowest">Lowest ID First</option>
                <option value="highest">Highest ID First</option>
                <option value="az">Sort A-Z</option>
                <option value="za">Sort Z-A</option>
              </select>

              <img 
                src={`./src/assets/type-icons/${sortTypeBy}.svg`} 
                id="inner-type-icon" 
                style={{display: sortTypeBy === 'all' ? 'none' : 'block'}}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                alt={`${sortTypeBy} icon`} 
              />
              <select 
                id="filterTypeSelection" 
                style={{ paddingLeft: sortTypeBy === 'all' ? '10px' : '50px' }}
                value={sortTypeBy} 
                onChange={(e) => setTypeSortBy(e.target.value)}
                >
                <option value="all">All Types</option>
                <option value="bug">Bug Type</option>
                <option value="dark">Dark Type</option>
                <option value="dragon">Dragon Type</option>
                <option value="electric">Electric Type</option>
                <option value="fairy">Fairy Type</option>
                <option value="fighting">Fighting Type</option>
                <option value="fire">Fire Type</option>
                <option value="flying">Flying Type</option>
                <option value="ghost">Ghost Type</option>
                <option value="grass">Grass Type</option>
                <option value="ice">Ice Type</option>
                <option value="normal">Normal Type</option>
                <option value="poison">Poison Type</option>
                <option value="psychic">Psychic Type</option>
                <option value="rock">Rock Type</option>
                <option value="steel">Steel Type</option>
                <option value="water">Water Type</option>
              </select>
            </section>
          </section>
        )}

        {listLoading && <p style={{ color: 'white', fontFamily: "'Press Start 2P', cursive", marginBottom: '10px'}}>SCANNING POKEMON DETAILS, TRAINER PLEASE WAIT...</p>}
        {loading && <p style={{ color: 'white', fontFamily: "'Press Start 2P', cursive", marginBottom: '10px' }}>SEARCHING TALL GRASS...</p>}

        <section id="gridStyle" style={{ opacity: loading ? 0.5 : 1 }}>
            {searchResult ? (
              <PokemonCard 
                id={searchResult.id} 
                name={searchResult.name} 
                image={searchResult.image} 
                types={searchResult.types} 
                hp={searchResult.hp}
                onClick={() => handleOpenModal(searchResult)}
              />
            ) : (
              sortPokemon.length > 0 ? (
                sortPokemon.map((p, index) => (
                  <PokemonCard 
                    key={`${p.name}-${index}`} 
                    {...p} 
                    onClick={() => handleOpenModal(p)}
                  />
                ))
              ) : (
                !loading && (
                  <section style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                    <p style={{ fontFamily: "'Press Start 2P', cursive", marginTop: "4rem" }}>
                      NO {sortTypeBy.toUpperCase()} TYPES SPOTTED ON THIS PAGE.
                    </p><br />
                    <p>TRY CHANGING THE PAGE OR FILTER, TRAINER.</p>
                  </section>
                )
              )
            )}
          </section>
      </section>
      
      {selectedPokemon && (
        <PokemonEvolution 
          evolutionUrl={selectedPokemon.evolutionUrl || ''} 
        />
      )}
      <Footer />

      <PokemonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pokemon={selectedPokemon} 
      />
    </>
  );
};

export default PokemonList;