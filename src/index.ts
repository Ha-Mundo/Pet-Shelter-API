import express from 'express'
import type {Express} from 'express'

const app:Express = express()
const PORT = 8000

type Pet = {
  name: string,
  species: string,
  adopted: boolean,
  age: number
}

const pets:Pet[] = [
  {
    name: "Rubik",
    species: "Cat",
    adopted: true,
    age: 3
  }, {
    name: "Pickle",
    species: "Dog",
    adopted: false,
    age: 5
  }
]

app.get('/', (req, res)=> {
  res.json(pets)
})

app.listen(PORT, ():void => console.log(`listening on port ${PORT}`))