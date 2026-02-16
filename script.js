let pokemonId = 1;
let currentView = 'info';

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
}

async function fetchPokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        //info from the fetch

        //sprite
        const spriteUrl = data.sprites.front_default;
        const img = document.getElementById("pokemon-sprite");
        img.src = spriteUrl;
        img.alt = data.name;

        //name
        const name = document.getElementById("pokemon-name");
        name.textContent = data.name;

        //types
        const typesContainer = document.getElementById("pokemon-types");
        typesContainer.innerHTML = "";

        data.types.forEach(typeInfo => {
            const typeBox = document.createElement("p");
            const typeName = typeInfo.type.name;
            typeBox.textContent = typeName;
            typeBox.className = "type-box";

            //setting bg based on name match w/ color key -> then append after
            if (typeColors[typeName]) {
                typeBox.style.backgroundColor = typeColors[typeName]
            }

            typesContainer.appendChild(typeBox);
        })

        //info

        window.currentPokemonData = data;

        if (currentView === 'info') {
            displayInfo(data);
        } else {
            displayMoves(data);
        }

        //old info displaying
        // const height = document.getElementById("pokemon-height");
        // const weight = document.getElementById("pokemon-weight");
        // const hp = document.getElementById("pokemon-hp");
        // const attack = document.getElementById("pokemon-attack");
        // const defense = document.getElementById("pokemon-defense");
        // const spatk = document.getElementById("pokemon-spatk");
        // const spdf = document.getElementById("pokemon-spdf");
        // const speed = document.getElementById("pokemon-speed");

        // const heightInMeters = (data.height / 10).toFixed(2);
        // height.textContent = `height: ${heightInMeters}m`;
        
        // const weightInKg = (data.weight / 10).toFixed(2);
        // weight.textContent = `weight: ${weightInKg}kg`;

        // hp.textContent = `hp: ${data.stats[0].base_stat}`;
        // attack.textContent = `attack: ${data.stats[1].base_stat}`;
        // defense.textContent = `defense: ${data.stats[2].base_stat}`;
        // spatk.textContent = `special-attack: ${data.stats[3].base_stat}`;
        // spdf.textContent = `special-defense: ${data.stats[4].base_stat}`;
        // speed.textContent = `speed: ${data.stats[5].base_stat}`;

        //moves 

    } catch (error) {
        console.error(error);
    }
}


//handling displaying data
function displayInfo(data) {
    const infoTitle = document.getElementById('info-title');
    infoTitle.textContent = 'Info';

    const infoBox = document.querySelector('.info-box');
    infoBox.innerHTML = `
        <p id="pokemon-height">height: ${(data.height / 10).toFixed(2)}m</p>
        <p id="pokemon-weight">weight: ${(data.weight / 10).toFixed(2)}kg</p>
        <p id="pokemon-hp">hp: ${data.stats[0].base_stat}</p>
        <p id="pokemon-attack">attack: ${data.stats[1].base_stat}</p>
        <p id="pokemon-defense">defense: ${data.stats[2].base_stat}</p>
        <p id="pokemon-spatk">special-attack: ${data.stats[3].base_stat}</p>
        <p id="pokemon-spdf">special-defense: ${data.stats[4].base_stat}</p>
        <p id="pokemon-speed">speed: ${data.stats[5].base_stat}</p>
    `;
    currentView = 'info';
    updateButtonStatus();
}

function displayMoves(data) {
    const movesTitle = document.getElementById('info-title');
    movesTitle.textContent = 'Moves';

    const infoBox = document.querySelector('.info-box');
    const moves = data.moves.slice(0, 12);

    let movesHTML = '<p style="font-weight: bold;"></p>';
    moves.forEach(move => {
        movesHTML += `<p>${move.move.name}</p>`;
    });
    infoBox.innerHTML = movesHTML;
    currentView = 'moves';
    updateButtonStatus();
}

fetchPokemon();

//left and right arrow buttons 
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

leftButton.addEventListener("click", async (event) => {
    pokemonId--;
    fetchPokemon();
})

rightButton.addEventListener("click", async (event) => {
    pokemonId++;
    fetchPokemon();
})

//info and moves buttons
const infoButton = document.getElementById("info-button");
const movesButton = document.getElementById("moves-button");

infoButton.addEventListener("click", (event) => {
    if (window.currentPokemonData && currentView !== 'info') {
        displayInfo(window.currentPokemonData);
    }
});

movesButton.addEventListener("click", (event) => {
    if (window.currentPokemonData && currentView !== 'moves') {
        displayMoves(window.currentPokemonData);
    }
});

function updateButtonStatus() {
    if (currentView == 'info') {
        infoButton.classList.add('active');
        movesButton.classList.remove('active');
    } else if (currentView == 'moves') {
        movesButton.classList.add('active');
        infoButton.classList.remove('active');
    }
}

