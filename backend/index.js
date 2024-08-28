const express = require('express');
const connectToMongoDb = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongoDb();

// middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});