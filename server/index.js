import express from 'express';
import cors from 'cors';
import connectDatabase from './config/database.js';
import dotenv from 'dotenv';
import accounts from './routes/accountRoute.js';
import users from './routes/userRoute.js';
import events from './routes/eventRoute.js';
import tickets from './routes/ticketRoute.js';

const app = express();
const PORT = 8080;
const baseURL = '/api/v1';

dotenv.config();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(`${baseURL}/accounts`, accounts);
app.use(`${baseURL}/users`, users);
app.use(`${baseURL}/events`, events);
app.use(`${baseURL}/tickets`, tickets);

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
