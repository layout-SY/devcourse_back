const conn = require('../mariadb');
const ensureAuthorization = require('../auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
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

	let authorization = ensureAuthorization(req, res);

	if (authorization instanceof jwt.TokenExpiredError) {
		return res.status(StatusCodes.Unauthorized).json({
			message: 'Token expired. Please log in again.',
		});
	} else if (authorization instanceof jwt.JsonWebTokenError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Invalid token. Please log in again.',
		});
	} else {
		const { items, delivery, totalQuantity, totalPrice, firstBookTitle } = req.body;

		let delivery_id;
		let order_id;

		let query = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
		let values = [delivery.address, delivery.receiver, delivery.contact];

		// 통째로 promise이기 때문에 await 사용 가능
		let [results] = await conn.execute(query, values);
		delivery_id = results.insertId;

		query = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
	    VALUES (?, ?, ?, ?, ?)`;
		values = [firstBookTitle, totalQuantity, totalPrice, authorization.id, delivery_id];

		[results] = await conn.execute(query, values);
		order_id = results.insertId;

		// items를 가지고, 장바구니에서 book_id, quantity 조회
		sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
		let [orderItems, fields] = await conn.query(sql, [items]);

		query = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

		values = [];
		orderItems.forEach((item) => {
			// 강의 기준 시간대론 해당 문법이 적용이 안됨
			//최신 문법이므로 execute 메서드에 적용 안될 수 있음.
			values.push([order_id, item.book_id, item.quantity]);
		});
		[results] = await conn.query(query, [values]);

		results = await deleteCartItems_query(conn, items);

		return res.status(StatusCodes.OK).json(results);
	}
};

const getOrders = async (req, res) => {
	const conn = await mariadb.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'Bookshop',
		dataStrings: true,
	});
	let authorization = ensureAuthorization(req, res);

	if (authorization instanceof jwt.TokenExpiredError) {
		return res.status(StatusCodes.Unauthorized).json({
			message: 'Token expired. Please log in again.',
		});
	} else if (authorization instanceof jwt.JsonWebTokenError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Invalid token. Please log in again.',
		});
	} else {
		let query = `SELECT orders.id, book_title, total_quantity, total_price, create_at, 
		address, receiver, contact 
		FROM orders 
		LEFT JOIN delivery 
		ON orders.delivery_id = delivery.id`;
		let [rows, fields] = await conn.query(query);

		return res.status(StatusCodes.OK).json(rows);
	}
};

const getOrderDetail = async (req, res) => {
	let authorization = ensureAuthorization(req, res);

	if (authorization instanceof jwt.TokenExpiredError) {
		return res.status(StatusCodes.Unauthorized).json({
			message: 'Token expired. Please log in again.',
		});
	} else if (authorization instanceof jwt.JsonWebTokenError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Invalid token. Please log in again.',
		});
	} else {
		const orderId = req.params.id;

		const conn = await mariadb.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'Bookshop',
			dataStrings: true,
		});

		let query = `SELECT books.id, title, author, price, quantity FROM orderedBook 
				LEFT JOIN books 
				ON orderedBook.book_id = books.id 
				WHERE order_id = ?`;
		let [rows, fields] = await conn.query(query, orderId);

		return res.status(StatusCodes.OK).json(rows);
	}
};

const deleteCartItems_query = async (conn, items) => {
	query = `DELETE FROM cartItems WHERE id IN (?)`;

	let results = await conn.query(query, [items]);
	return results;
};

module.exports = { order, getOrders, getOrderDetail };
