const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Node.js Express API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
