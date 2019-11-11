const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app.js')

describe('GET /pokemon endpoint', () => {

  const authHeader = {
    "Authorization": `Bearer ${process.env.API_TOKEN}`
  }

  it('returns an array of pokemon', () => {
    return supertest(app)
      .get('/pokemon')
      .set(authHeader)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array').with.length.greaterThan(0)
        res.body.forEach(pokemon => expect(pokemon).to.include.keys('name', 'type'))
      })
  })

  it('returns correct pokemon with name query', () => {
    return supertest(app)
      .get('/pokemon?name=pikachu')
      .set(authHeader)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        res.body.forEach(pokemon => expect(pokemon.name.toLowerCase()).to.include('pikachu'))
      })
  })

  //type query returns correct pokemon
  //type query with wrong type returns error message {error: `Type must be one of: ${validTypes.join(', ')}` }
})
