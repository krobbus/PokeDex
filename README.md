# [Re-designed] Pokedex

A retro-inspired Pokedex website built with React and TypeScript. This project was developed during 1st-year project and I re-designed for educational and portfolio puroses. It interacts with the PokeAPI to provide real-time data on over 1,300 Pokemon, featuring dynamic filtering, searching, and a detailed modal view.

## Features

* **Dynamic Data Fetching:** Loads Pokémon in batches for optimal performance.
* **Smart Search:** Find any Pokémon instantly by Name or Pokemon ID with error handling for misspelled names.
* **Type Filtering & Sorting:** Filter the current view by elemental type and sort by ID (Highest/Lowest) or Alphabetical order.
* **Detailed Modal:** View specific Pokémon details, including descriptions and abilities, retrieved via secondary API calls.
* **Adaptive UI:** Custom icons that automatically update based on the selected Pokémon type.
* **Error Handling:** Robust fallbacks for missing sprites and empty filter results.

## Tech Stack

* **Framework:** React 18
* **Language:** TypeScript
* **API:** [PokeAPI](https://pokeapi.co/)
* **Styles:** Custom CSS3 (Grid & Flexbox)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/pokedex-react.git](https://github.com/your-username/pokedex-react.git)
   npm install
   npm run dev

2. **Project Structure Requirements:**
* **/src/assets/type-icons/** contains *.svg files; ex. fire.svg, bug.svg, ...*
* **/public/** contains *pokedex-logo.png*

## About this Project

This is a non-commercial, fan-made project. All Pokémon data is provided by the [PokeAPI](https://pokeapi.co/). Pokémon names, images, and related media are trademarks and copyrights of **Nintendo, Game Freak, and Creatures.**. This project is intended under "Fair Use" for educational purposes. No copyright infringement is intended.