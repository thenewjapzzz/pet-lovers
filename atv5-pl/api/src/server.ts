import express, { Request, Response } from 'express'
import { AppDataSource } from './config/data-source'
import { error } from 'console'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Node.js + TypeScript API!')
})

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => console.log('Database connection error:', error))