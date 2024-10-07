const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

router.post('/join', (req, res) => {
	const { email, password, name, contact } = req.body;
	const query = 'INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)';
	const values = [email, password, name, contact];
	conn.query(query, values, (err, results) => {
		if (results) {
			res.status(200).send('join success');
		} else {
			res.status(400).send('join failed');
		}
	});
});

router.post('/login', (req, res) => {
	const { email, password } = req.body;
	const query = 'SELECT * FROM users WHERE email = ?';
	conn.query(query, email, (err, results) => {
		if (results) {
			const user = results[0];
			if (user.password === password) {
				const token = 'JWT-TOKEN';
				res.status(200).send('login success');
			}
		} else {
			res.status(400).send('login failed');
		}
	});
});

router.post('/reset', (req, res) => {
	const { email } = req.body;
	const query = 'SELECT * FROM users WHERE email = ?';
	conn.query(query, email, (err, results) => {
		if (results) {
			// /put 호출
		}
	});
});

router.put('/reset', (req, res) => {
    const {email, password} = req.body
    const query = 'UPDATE '
})

module.exports = router;
