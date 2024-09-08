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
// Set request payload size limits
app.use(express.json({ limit: '100mb' })); // Apply the payload size limit here
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/ratings', require('./routes/ratingsRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
