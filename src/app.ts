import express from 'express'
import dotenv from 'dotenv'
import authRouter from './modules/auth/auth.router'

dotenv.config();

const app = express();


app.use(express.json());
app.use('/api/auth', authRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`listening on: ${PORT}`)});


export default app;

