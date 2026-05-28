import express from 'express'
import dotenv from 'dotenv'
import authRouter from './modules/auth/auth.router'
import clientsRouter from './modules/clients/clients.router'
import authMiddleware from './middlewares/auth.middleware';

dotenv.config();

const app = express();


app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/clients', authMiddleware, clientsRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`listening on: ${PORT}`)});

export default app;

