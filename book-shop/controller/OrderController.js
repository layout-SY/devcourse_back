// const conn = require('../mariadb');
const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

const order = async (req, res) => {
	const conn = await mariadb.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'Bookshop',
		dataStrings: true,
	});

	const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

	let delivery_id;
	let order_id;

	let query = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
	let values = [delivery.address, delivery.receiver, delivery.contact];

	// 통째로 promise이기 때문에 await 사용 가능
	let [results] = await conn.query(query, values);

	console.log(results);

	// query = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
	//     VALUES (?, ?, ?, ?, ?)`;
	// values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
	// conn.query(query, values, (err, results) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
	// 	}

	// 	if (results) {
	// 		order_id = results.insertId;
	// 	}
	// });
	// query = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

	// values = [];
	// items.forEach((item) => {
	// 	values.push([order_id, item.book_id, item.quantity]);
	// });
	// conn.query(query, [values], (err, results) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
	// 	}

	// 	if (results) {
	// 		return res.status(StatusCodes.OK).json(results);
	// 	}
	// });
};

const getOrders = (req, res) => {
	res.json('주문 목록 조회');
};

const getOrderDetail = (req, res) => {
	res.json('주문 상세 상품 조회');
};

module.exports = { order, getOrders, getOrderDetail };
