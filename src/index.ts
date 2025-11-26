import express from 'express'
import type {Express, Request, Response} from 'express'
import cors from 'cors'

import {pets} from './data/pets'
import type {Pet} from'./data/pets'

const PORT = 8000
const app:Express = express()

app.use(cors())

app.get('/', (req:Request, res:Response<Pet[]>): void => {
  res.json(pets)
})

app.get('/:id', (req:Request<{id:string}>, res:Response):void =>{
  const {id} = req.params
  const pet = pets.find(pet=> pet.id.toString() === id)
  res.json(pet)
})

app.use((req: Request, res:Response<{message:string}>):void => {
  res.status(404).json({message:"No route found!"})
})

app.listen(PORT, ():void => console.log(`listening on port ${PORT}`))