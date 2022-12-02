const axios =  require("axios");
const validation = require('../helpers');

async function getPokemon(){
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return data;
  }

async function getPokemonByID(id){
        id = validation.checkId(id);
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return data; 
}

module.exports={
    getPokemon,
    getPokemonByID
}