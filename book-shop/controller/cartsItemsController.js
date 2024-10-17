const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ensureAuthorization = require('../auth');
const { StatusCodes } = require('http-status-codes');

dotenv.config();

const addToCart = (req, res) => {
	const { book_id, quantity } = req.body;
	const authorization = ensureAuthorization(req, res);

	let query = 'INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);';
	let values = [book_id, quantity, authorization.id];

	conn.query(query, values, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}

		if (results) {
			return res.status(StatusCodes.OK).json(results);
		}
	});
};

const getCartItems = (req, res) => {
	const { selected } = req.body;
	const authorization = ensureAuthorization(req);

	if (authorization instanceof jwt.TokenExpiredError) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token expired. Please log in again.' });
	} else if (authorization instanceof jwt.JsonWebTokenError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Invalid token. Please log in again.',
		});
	} else {
		let query = `SELECT cartItems.id, book_id, title, summary, quantity, price 
				FROM cartItems LEFT JOIN books 
				ON cartItems.book_id = books.id
				WHERE user_id =?`;

		let values = [authorization.id];

		if (selected) {
			query += ` AND cartItems.id IN (?)`;
			values.push(selected);
		}

		conn.query(query, values, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
			}
			return res.status(StatusCodes.OK).json(results);
		});
	}
};

const removeCartItem = (req, res) => {
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
		const { cartItemId } = req.params;

		let query = 'DELETE FROM cartItems WHERE id = ?';

		conn.query(query, id, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
			}

			if (results) {
				return conn.query('SELECT * FROM likes', (err, results1) => {
					if (err) {
						console.log(err);
						return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
					}
					return res.status(StatusCodes.OK).json(results1);
				});
			}
		});
	}
};

// function ensureAuthorization(req, res) {
// 	try {
// 		let receivedJWT = req.headers['authorization'];
// 		console.log(receivedJWT);

// 		let decodedUser = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
// 		console.log(decodedUser);

// 		return decodedUser;
// 	} catch (error) {
// 		return;
// 	}
// }

module.exports = { addToCart, getCartItems, removeCartItem };
