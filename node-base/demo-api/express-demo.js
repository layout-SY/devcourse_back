const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);
// GET + "/"
app.get('/', function (req, res) {
	res.send('Hello World');
});

app.get('/products/1', function (req, res) {
	//res.send('Node.js 책을 배워보자');
	//res.send(20000);
	res.json({
		// 이렇게 하면 한 번에 여러 데이터를 담아 전송할 수 있게됨
		title: 'Node.js 책을 배워보자',
		price: 20000,
	});
});

app.get('/products/2', function (req, res) {
	//res.send('Node.js 책을 배워보자');
	//res.send(20000);
	res.json(book);
});

let book = {
	title: 'Node.js를 공부해보자',
	price: 20000,
	description: 'Node.js, 김송아 지음',
};
