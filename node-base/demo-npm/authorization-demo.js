var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

dotenv.config();

app.listen(8888);

// GET + "/jwt" : 토큰 발행
app.get('/jwt', function (req, res) {
	console.log(process.env.PRIVATE_KEY);
	const token = jwt.sign({ username: 'kim songa' }, process.env.PRIVATE_KEY, {
		expiresIn: '1h',
		issuer: 'seung Yeon',
	});

	res.cookie('jwt', token, {
		httpOnly: true,
	});
	res.send('토큰 발행');
});

// GET + "/jwt/decoded" : 토큰을 검증
app.get('/jwt/decoded', function (req, res) {
	const token = req.headers['authorization'];

	var decoded = jwt.verify(token, 'shhhhhh');
});
