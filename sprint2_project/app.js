const express = require('express');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const likeRoutes = require('./routes/like');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 라우트 설정
app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/like', likeRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
