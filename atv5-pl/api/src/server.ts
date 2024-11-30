import express, { Request, Response } from 'express';
import cors from 'cors'; 
import { AppDataSource } from './config/data-source';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    preflightContinue: false,
    optionsSuccessStatus: 200,  
  })
);

app.use(express.json());
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Node.js + TypeScript API!');
});

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log('Database connection error:', error));
