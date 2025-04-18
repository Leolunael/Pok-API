const BASE_URL = "https://pokeapi.co/api/v2/"
const submit = document.getElementById("submit");
const form = document.getElementById("recherche");

function mapPokemon(data){
    return{
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map(TypeInfo=>TypeInfo.type.name),
        ability: data.abilities.map(abilityInfo=>abilityInfo.ability.name)
    };
}

class Pokemon{
    constructor(id, name, height, weight, types, abilities){
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.types = types;
        this.abilities = abilities;
    }
}   

async function getPokemon(identifier){
    const response = await fetch(BASE_URL + "pokemon/" + identifier);
    const data=await response.json()
    return mapPokemon(data);
}

function formatValue(value) {
    return Array.isArray(value) ? value.join(", ") : value;
}    

async function displayPokemon(identifier){
    const pokemon = await getPokemon(identifier);
    const tbody = document.querySelector("tbody");

        let tr = document.createElement("tr");
        for(let prop in pokemon){
            let td = document.createElement("td");
            td.textContent = formatValue(pokemon[prop]);
            tr.appendChild(td);
        }
    tbody.appendChild(tr);  
}

document.getElementById("recherche").addEventListener("submit", async function(event){
    event.preventDefault();
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;
    const recherche = id ? id : nom;
        if(/^[1-1025]+$/.exec(id)){
            errorMessage.push("ID inconnu");
            return;
        }
    await displayPokemon(recherche);
    form.reset()
});
    
