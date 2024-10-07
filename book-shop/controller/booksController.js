const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const allBooks = (req, res) => {
	const { category_id } = req.query;
	if (category_id) {
		booksByCategory;
	} else {
		let query = 'SELECT * FROM books';
		conn.query(query, (err, results) => {
			if (err) {
				return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
			}
			return res.status(StatusCodes.OK).json(results);
		});
	}
};

const bookDetail = (req, res) => {
	const { bookId } = req.params;
	let query = 'SELECT * FROM books WHERE id = ?';
	conn.query(query, bookId, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}

		if (results[0]) {
			return res.status(StatusCodes.OK).json(results[0]);
		}
	});
};

const booksByCategory = (req, res) => {
	const { category_id } = req.query;
	let query = 'SELECT * FROM books WHERE category_id = ?';
	conn.query(query, category_id, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}

		if (results.length) {
			return res.status(StatusCodes.OK).json(results);
		} else {
			return res.status(StatusCodes.NOT_FOUND).end();
		}
	});
};

module.exports = { allBooks, bookDetail, booksByCategory };
