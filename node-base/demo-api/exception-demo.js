const express = require('express');
const app = express();

app.listen(8888);

const fruits = [
	{ id: 1, name: 'apple' },
	{ id: 2, name: 'orange' },
	{ id: 3, name: 'strawberry' },
	{ id: 4, name: 'blueberry' },
];

// 과일 전체 조회
app.get('/fruits', (req, res) => {
	res.json(fruits);
});

// 과일 개별 조회
app.get('/fruits/:id', (req, res) => {
	let { id } = req.params;
	let find = fruits.find((f) => f.id == id);
	// fruits.forEach((arr) => {
	// 	if (id == arr.id) {
	// 		find = arr;
	// 	}
	// });
	if (find) {
		res.json(find);
	} else {
		res.status(404).json({
			message: '입력하신 데이터가 없습니다.',
		});
	}
});
