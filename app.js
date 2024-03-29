const express = require('express');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/users');
const orderRouter = require('./routes/order');
const reviewRouter = require('./routes/reviews');
const ErrorHandler = require('./utils/errorHandler');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT;

mongoose
  .connect(process.env.DB_NAME)
  .then(() => {
    console.log('database connect');
  })
  .catch((err) => {
    console.log(`database tidak connect ${err.message}`);
  });

app.get('/api', (req, res) => {
  res.send('hello world');
});

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productsRouter);
app.use('/products', reviewRouter);
app.use('/categories', categoryRouter);

app.all('*', (req, res, next) => {
  next(new ErrorHandler('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  // eslint-disable-next-line no-param-reassign
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).json({
    err,
  });
});

app.listen(port, () => {
  console.log(`server is running in port : ${port}`);
});
