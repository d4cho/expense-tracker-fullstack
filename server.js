const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// connect DB
connectDB();

// bring in routes file
const transactions = require('./routes/transactions');

// initialize express app
const app = express();

// middleware
app.use(express.json());

// morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// route
app.use('/api/v1/transactions', transactions);

// for production
// must be AFTER routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

// to run server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
