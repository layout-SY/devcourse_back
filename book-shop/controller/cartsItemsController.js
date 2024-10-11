const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const addToCart = (req, res) => {
	const { book_id, quantity, user_id } = req.body;

	let query = 'INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);';
	let values = [book_id, quantity, user_id];

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
	const { user_id, selected } = req.body;
	let query = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id =? AND cartItems.id IN (?)`;
	conn.query(query, [user_id, selected], (err, results) => {
		if (err) {
			console.log(err);
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

const removeCartItem = (req, res) => {
	const { id } = req.params;

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
};

module.exports = { addToCart, getCartItems, removeCartItem };
