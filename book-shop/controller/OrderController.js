const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const order = (req, res) => {
	const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

	let delivery_id = 3;
	let order_id = 2;

	let query = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
	let values = [delivery.address, delivery.receiver, delivery.contact];

	// conn.query(query, values, (err, results) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
	// 	}

	// 	if (results) {
	// 		delivery_id = results.insertId;
	// 		return res.status(StatusCodes.OK).json(results);
	// 	}
	// });

	query = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
        VALUES (?, ?, ?, ?, ?)`;
	values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
	// conn.query(query, values, (err, results) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
	// 	}

	// 	if (results) {
	// 		order_id = results.insertId;
	// 		return res.status(StatusCodes.OK).json(results);
	// 	}
	// });
	query = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

	values = [];
	items.forEach((item) => {
		values.push([order_id, item.book_id, item.quantity]);
	});
	conn.query(query, [values], (err, results) => {
		if (err) {
			console.log(err);
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}

		if (results) {
			return res.status(StatusCodes.OK).json(results);
		}
	});
};

const getOrders = (req, res) => {
	res.json('주문 목록 조회');
};

const getOrderDetail = (req, res) => {
	res.json('주문 상세 상품 조회');
};

module.exports = { order, getOrders, getOrderDetail };
