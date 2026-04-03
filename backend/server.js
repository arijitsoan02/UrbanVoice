import express from 'express'
import cors from "cors"
import "dotenv/config"
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import problemRouter from './routes/problemRoute.js';
import donationRouter from './routes/donationRoute.js';

const app = express();

const PORT = 8080;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter)
app.use('/problems', problemRouter)
app.use('/donation', donationRouter)

app.use('/', (req, res) => {
    res.send("Server is Live...");
});

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})
