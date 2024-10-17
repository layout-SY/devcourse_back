const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ensureAuthorization = require('../auth');
const { StatusCodes } = require('http-status-codes');

dotenv.config();

const addLike = (req, res) => {
	const { liked_book_id } = req.params;
	// const { user_id } = req.body;

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
		let query = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)';
		let values = [authorization.id, liked_book_id];
		conn.query(query, values, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
			}

			if (results) {
				return res.status(StatusCodes.OK).json(results);
			}
		});
	}
};

const deleteLike = (req, res) => {
	const { liked_book_id } = req.params;
	// const { user_id } = req.body;

	let decodedJWT = ensureAuthorization(req, res);

	let query = 'DELETE FROM likes WHERE user_id =? AND liked_book_id =?';
	let values = [decodedJWT.id, liked_book_id];

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

// function ensureAuthorization(req) {
// 	let receivedJWT = req.headers['authorization'];
// 	console.log(receivedJWT);

// 	let decodedUser = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
// 	console.log(decodedUser);

// 	return decodedUser;
// }

module.exports = { addLike, deleteLike };
