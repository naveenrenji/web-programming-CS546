const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;
const validation = require('../helpers');


router
  .route('/')
  .get(async (req,res) => {
    try {
      const pokemonList = await pokemonData.getPokemon();
      res.json(pokemonList);
    }
    catch(e){
      res.status(500).json({error: e});
    }
  });

router
  .route('/:id')
  .get(async (req,res) => {
    try {
      let intID = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const pokemon = await pokemonData.getPokemonByID(req.params.id);
      res.json(pokemon);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })

module.exports = router;