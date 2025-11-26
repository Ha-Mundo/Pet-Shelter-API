import express from 'express'
import type {Express, Request, Response} from 'express'
import cors from 'cors'

import {pets} from './data/pets'
import type {Pet} from'./data/pets'

const PORT = 8000
const app:Express = express()

app.use(cors())

type PetQueryParams = {
  species?:string,
  adopted?: 'true' | 'false'
}

app.get('/', (
  req:Request<{}, unknown, {}, PetQueryParams>, 
  res:Response<Pet[]>
  ):void=> {
  const {adopted, species} = req.query
  let filteredPets:Pet[] = pets
  
  if (species){
    filteredPets = filteredPets.filter((pet:Pet):boolean =>
      pet.species.toLowerCase() === species.toLowerCase()
    )
  }

  if (adopted){
    filteredPets = filteredPets.filter((pet:Pet):boolean =>
      pet.adopted === JSON.parse(adopted)
    )
  }

  res.json(filteredPets)
})

app.get('/:id', 
  (req:Request<{id:string}>, 
  res:Response<Pet|{message:string}>
  ):void =>{
  const {id} = req.params
  const pet:Pet|undefined = pets.find((pet:Pet):boolean => pet.id.toString() === id)

  if(pet) res.json(pet)
  else res.status(404).json({message:"No pet with that ID"})
})

app.use((req: Request, res:Response<{message:string}>):void => {
  res.status(404).json({message:"No route found!"})
})

app.listen(PORT, ():void => console.log(`listening on port ${PORT}`))