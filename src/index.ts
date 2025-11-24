import express from 'express'
import type {Express} from 'express'

const app:Express = express()
const PORT = 8000

app.listen(():void => console.log(`listening on port ${PORT}`))