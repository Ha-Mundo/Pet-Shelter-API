import express from 'express'
import type {Express, Request, Response} from 'express'
import {pets} from './data/pets'

const app:Express = express()
const PORT = 8000



app.get('/', (req:Request, res:Response): void => {
  res.json(pets)
})

app.listen(PORT, ():void => console.log(`listening on port ${PORT}`))