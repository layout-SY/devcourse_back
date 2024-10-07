//express 모듈 셋팅
const express = require('express');
const app = express();

app.listen(8888);

// 데이터 셋팅
let youtuber1 = {
	channelTitle: '십오야',
	sub: '593만명',
	videoNum: '993개',
};

let youtuber2 = {
	channelTitle: '괴물쥐',
	sub: '115만명',
	videoNum: '1.7천개',
};

let youtuber3 = {
	channelTitle: '침착맨',
	sub: '227만명',
	videoNum: '6.6천개',
};

// REST API 설계
app.get('/youtubers/:id', function (req, res) {
	let { id } = req.params;
	id = parseInt(id);
	if (!db.has(id)) {
		res.json({
			message: '유튜버 없음',
		});
	} else {
		res.status(404).json({
			youtuber: db.get(id),
		});
	}
});
app.use(express.json()); // http 외 모듈인 '미들웨어'; json 설정
app.post('/youtubers', (req, res) => {
	if (req.body.channelTitle) {
		db.set(idx, req.body);
		res.status(201).json({
			message: `${db.get(idx++).channelTitle}님, 유튜버 생활을 응원합니다.`,
		});
	} else {
		res.status(400).json({
			message: '유튜버 이름을 작성해주세요',
		});
	}
});

app.get('/youtubers', (req, res) => {
	let youtubers = {};

	if (db.size !== 0) {
		db.forEach((value, key) => {
			youtubers[key] = value;
		});

		res.json(youtubers);
	} else {
		res.status(404).json({
			message: '데이터베이스가 비어 있습니다.',
		});
	}
});

app.delete('/youtubers/:id', (req, res) => {
	let { id } = req.params;
	id = parseInt(id);

	//실제 db였다면 이렇게 변수화 하지 않으면 성능 문제 발생
	var youtuber = db.get(id);
	if (youtuber) {
		res.json({
			message: `${youtuber.channelTitle}님, 안녕히 가세요`,
		});
	} else {
		res.status(404).json({
			message: `찾으시는 ${youtuber.channelTitle}님이 없습니다.`,
		});
	}
	db.delete(id);
});

app.delete('/youtubers', (req, res) => {
	var msg = '';
	if (db.size > 0) {
		db.clear();
		msg = '전체 유튜버 삭제';
	} else {
		msg = '유튜버가 없거나 오류입니다.';
	}

	res.status(404).json({
		message: msg,
	});
});

app.use(express.json());
app.put('/youtubers/:id', (req, res) => {
	let { id } = req.params;
	id = parseInt(id);
	var youtuber = db.get(id);
	if (db.has(id)) {
		let PreDb = db.get(id).channelTitle;
		youtuber.channelTitle = req.body.channelTitle;
		db.set(id, youtuber);
		res.json({
			message: `${PreDb}님 채널명이 ${db.get(id).channelTitle}으로 변경되었습니다.`,
		});
	} else {
		res.status(404).json({
			message: '요청하신 유튜버는 존재하지 않습니다.',
		});
	}
});

let db = new Map();
let idx = 1;
db.set(idx++, youtuber1);
db.set(idx++, youtuber2);
db.set(idx++, youtuber3);
