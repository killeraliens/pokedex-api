const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))

app.get('/pokedex', (req, res) => {
  res.send('on pokedex')
})



module.exports = app;
