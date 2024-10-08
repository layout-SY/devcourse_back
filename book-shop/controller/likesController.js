const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const addLike = (req, res) => {
	const { liked_book_id } = req.params;
	const { user_id } = req.body;

	let query = 'INSERT INTO likes(user_id, liked_book_id) VALUES(?, ?)';
	let values = [user_id, liked_book_id];

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

const deleteLike = (req, res) => {
	const { liked_book_id } = req.params;
	const { user_id } = req.body;

	let query = 'DELETE FROM likes WHERE user_id =? AND liked_book_id =?';
	let values = [user_id, liked_book_id];

	conn.query(query, values, (err, results) => {
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

module.exports = { addLike, deleteLike };
