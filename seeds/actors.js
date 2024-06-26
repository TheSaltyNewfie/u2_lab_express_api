const db = require('../db')
const Actor = require('../models/actor')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const actors = [
        { name: "Robert Downey Jr.", age: 59, born: "1965-04-04", alive: true},
        { name: "Scarlett Johansson", age: 39, born: "1984-11-22", alive: true},
        { name: "Chris Hemsworth", age: 40, born: "1983-08-11", alive: true},
        { name: "Gal Gadot", age: 39, born: "1985-04-30", alive: true},
        { name: "Tom Hanks", age: 67, born: "1956-07-09", alive: true},
        { name: "Emma Stone", age: 35, born: "1988-11-06", alive: true},
        { name: "Leonardo DiCaprio", age: 49, born: "1974-11-11", alive: true},
        { name: "Jennifer Lawrence", age: 33, born: "1990-08-15", alive: true},
        { name: "Denzel Washington", age: 69, born: "1954-12-28", alive: true},
        { name: "Morgan Freeman", age: 86, born: "1937-06-01", alive: true},
      ]

    await Actor.insertMany(actors)
    console.log('Actors added!')
}

const run = async () => {
    await main()
    db.close()
}

run()