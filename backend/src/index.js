require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/client', userRoutes);

app.listen(process.env.API_PORT, () => console.log(`Server is running on port ${process.env.API_PORT}`));