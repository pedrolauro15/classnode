import express from 'express'
import router from './routes/routes'
import { prismaClient } from './database/client'

const app = express()

app.use(express.json())

app.on('disconnect', () => {
  prismaClient.$disconnect()
})

app.use(router)
app.listen(3333, () => {
  console.log('APP is running on port: 3333 🚀')
})