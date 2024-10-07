const express = require('express');
const dotenv = require('dotenv');

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const cartRouter = require('./routes/carts');
const orderRouter = require('./routes/orders');
const likeRouter = require('./routes/likes');
const categoryRouter = require('./routes/category');

dotenv.config();
const app = express();

app.use('/category', categoryRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
app.use('/likes', likeRouter);

const PORT = process.env.PORT || 8888;
app.listen(PORT);
