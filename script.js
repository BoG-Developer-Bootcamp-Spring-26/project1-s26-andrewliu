const pokemonId = 1;
const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
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

        const infoText = document.getElementById("info-text");
        infoText.innerText = JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

fetchPokemon();

// const button = document.createElement("button");
// button.textContent = "click to fetch";
// document.body.appendChild(button);

// button.addEventListener("click", async (event) => {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const infoText = document.getElementById("info-text");
//         infoText.innerText = JSON.stringify(data);
//     } catch (error) {
//         console.error(error);
//     }
// })
