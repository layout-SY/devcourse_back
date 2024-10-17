const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const join = (req, res) => {
	const { email, password } = req.body;

	const salt = crypto.randomBytes(10).toString('base64');
	const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

	const query = 'INSERT INTO `users` (email, password, salt) VALUES (?, ?, ?)';
	const values = [email, hashPassword, salt];

	conn.query(query, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}

		return res.status(StatusCodes.CREATED).json(results);
	});
};

const login = (req, res) => {
	const { email, password } = req.body;
	const query = 'SELECT * FROM `users` WHERE email = ?';
	const values = [email, password];
	conn.query(query, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}

		const loginUser = results[0];
		console.log(loginUser);
		const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

		if (loginUser && loginUser.password === hashPassword) {
			const token = jwt.sign({ id: loginUser.id, email: loginUser.email }, process.env.PRIVATE_KEY, {
				expiresIn: '1h',
				issuer: 'seung Yeon',
			});
			res.cookie('token', token, {
				httpOnly: true,
			});

			return res.status(StatusCodes.OK).json(results);
		} else {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
		}
	});
};

const PasswordReset = (req, res) => {
	const { email, password } = req.body;

	const query = 'UPDATE `users` SET password =?, salt =? WHERE email =?';

	const salt = crypto.randomBytes(10).toString('base64');
	const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

	let values = [hashPassword, salt, email];
	conn.query(query, values, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).end();
		}

		if (results.affectedRows === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'Email not found' });
		} else {
			return res.status(StatusCodes.OK).json({ message: '비밀번호 변경 성공' });
		}
	});
};

module.exports = { join, login, PasswordReset };
