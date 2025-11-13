require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const clientRoutes = require('./routes/clientRoutes');

app.use('/api/client', clientRoutes);

app.listen(process.env.API_PORT, () => console.log(`Server is running on port ${process.env.API_PORT}`));