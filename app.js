require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const POKEDEX = require('./pokedex.json')

const app = express()
app.use(morgan('dev'))
app.use(validateBearerToken)
app.get('/types', handleGetTypes)
app.get('/pokemon', handleGetPokemon)


function validateBearerToken(req, res, next) {
  console.log('req is at validate bearer middleware station')
  const apiToken = process.env.API_TOKEN
  const authHeader = req.get('Authorization')
  const bearerToken = authHeader ? authHeader.split(' ')[1] : null;

  if (!bearerToken || bearerToken !== apiToken) {
    res.status(401).json({error: 'Unauthorized request'})
  }
  next()
}


const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

function handleGetTypes(req, res) {
  res.json(validTypes)
}

function handleGetPokemon(req, res) {
  const { name = '', type } = req.query

  let results = POKEDEX.pokemon.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()))

  if (type && !validTypes.includes(type[0].toUpperCase() + type.slice(1).toLowerCase()) ) {
    return res.status(400).json({error: `Type must be one of: ${validTypes.join(', ')}` })
  }

  if (type && validTypes.includes(type[0].toUpperCase() + type.slice(1).toLowerCase())) {
    results = results.filter(poke => poke.type.includes(type[0].toUpperCase() + type.slice(1).toLowerCase())  )
  }



  res.send(results)
}


module.exports = app;
