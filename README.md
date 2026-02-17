# [Re-Designed] Pokedex

A retro-inspired Pokedex website built with React and TypeScript. This project was developed during 1st-year college and I redesigned for educational and portfolio purposes. It focuses exclusively on the core **PokeDex structure** (designed as *data-reference tool* for the list of Pokemon. This to maintain a clean focus on Pokedex architecture) and interacts with the **PokeAPI** to provide real-time data on over 1,300 Pokemon, featuring dynamic filtering, searching, and a detailed modal view.

## Old Features

Unlike previous version that were static and non-interactive, this redesigned Pokedex transforms the experience into a fully interactive platform. To streamline the user experience, I have intentionally removed old features such as the TV Series, Games, and Quiz pages—that were unnecessary for a dedicated data tool. This allowed me to focus my efforts on refining core features, such as the History Page for every pokemon, and ensuring the new Pokedex architecture is both clean and functional.

<img width="1196" height="580" alt="image" src="https://github.com/user-attachments/assets/9b51d155-633b-4c1a-99d0-494afe7907c5" />
The Login Page and account features have been intentionally removed. As a public data-reference tool, requiring account management is unnecessary. This ensures that users have immediate, unrestricted access to the Pokedex data without the hurdle of an authentication process.

<img width="1197" height="577" alt="image" src="https://github.com/user-attachments/assets/14e2a1b7-c7f4-4d1c-8f54-a9b96cfc1913" />
This Home Page is limited to a simple display list, this update ensures every piece of Pokemon data is presented through a dynamic and engaging interface.

## New Features

* **Dynamic Data Fetching:** Loads Pokémon in batches for optimal performance.
* **Smart Search:** Find any Pokémon instantly by Name or Pokemon ID with error handling for misspelled names.
* **Type Filtering & Sorting:** Filter the current view by elemental type and sort by ID (Highest/Lowest) or Alphabetical order.
* **Detailed Modal:** View specific Pokémon details, including descriptions and abilities, retrieved via secondary API calls.
* **Adaptive UI:** Custom icons that automatically update based on the selected Pokémon type.
* **Error Handling:** Robust fallbacks for missing sprites and empty filter results.

<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/adba9271-8235-465a-a466-c62a7a193052" />
Landpage with animation (transition to homepage) when interact/clicking any keys

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/36d301f6-cfe5-48cd-8b0e-4239f83f7983" />
<img width="1919" height="860" alt="image" src="https://github.com/user-attachments/assets/20a99e97-6198-463d-9b8c-061d89412b0f" />
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/cbc1d85b-4e00-4a0b-9d51-00b7f8559d65" />
Homepage with many features including search & filter, pagination, card gallery display, modal box (display the pokemon characteristics), evolution display, and "spot the shiny" feature

## Tech Stack

* **Framework & Language:** React + TypeScript
* **API:** [PokeAPI](https://pokeapi.co/)
* **Styles:** Custom CSS3 (Grid & Flexbox)

## Installation & Setup

1. **Project Structure Requirements:**
* **/src/assets/type-icons/** contains *.svg files; ex. fire.svg, bug.svg, ...*
* **/public/** contains *pokedex-logo.png*

2. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/pokedex-react.git](https://github.com/your-username/pokedex-react.git)
   npm install
   npm run dev

## About this Project

This is a non-commercial, fan-made project. All Pokémon data is provided by the [PokeAPI](https://pokeapi.co/). Pokémon names, images, and related media are trademarks and copyrights of **Nintendo, Game Freak, and Creatures.**. This project is intended under "Fair Use" for educational purposes. No copyright infringement is intended.
