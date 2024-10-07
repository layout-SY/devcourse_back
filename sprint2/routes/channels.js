const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const conn = require('../mariadb');
router.use(express.json());

const validate = (req, res, next) => {
	const err = validationResult(req);

	if (err.isEmpty()) {
		return next(); //다음 할 일 찾기(미들 웨어, 함수) 안해주면 아래 get 메서드에서 validate에 묶이고 콜백 함수가 작동하지 않음
	} else {
		return res.status(400).end();
	}
};

// let db = new Map();
// let id = 1;

router
	.route('/')
	// 채널 전체 조회
	.get([body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'), validate], (req, res) => {
		var { userId } = req.body;
		const query = `SELECT * FROM channels`;
		conn.query(query, (err, results) => {
			if (results.length) {
				res.status.json(results);
			} else {
				res.status(404).json({
					message: '데이터가 없습니다.',
				});
			}
		});
		// var channels = [];

		// if (db.size && userId) {
		// 	db.forEach((channel) => {
		// 		if (channel.userId === userId) {
		// 			channels.push(channel);
		// 		}
		// 	});

		// 	if (channels.length) {
		// 		res.status(200).json(channels);
		// 	} else {
		// 		notFoundChannel();
		// 	}
		// } else {
		// 	notFoundChannel();
		// }
	})
	//채널 개별 생성
	.post(
		[
			//비어 있지 않아야 하며(not null), int 데이터 타입이어야 함을 의미
			body('userId').notEmpty().isInt().withMessage('userId는 숫자여야 합니다'),
			body('name').notEmpty().isString().withMessage('문자로 입력'),
			validate,
		],
		(req, res) => {
			const err = validationResult(req);

			if (!err.isEmpty()) {
				return res.status(400).json(err.array());
			}
			const { name, userId } = req.body;
			if (name) {
				const query = `INSERT INTO channels VALUES(?, ?)`;
				channel && //단축 평가
					conn.query(query, name, userId, (err, results) => {
						if (err) {
							return res.status(401).send(err);
						}
						res.status(201).json(results);
					});
			}
			// if (req.body.channelTitle) {
			// 	let channel = req.body;

			// 	db.set(id, req.body);
			// 	res.status(201).json({
			// 		message: `${db.get(id++).channelTitle}님, 채널을 응원합니다`,
			// 	});
			// } else {
			// 	res.status(400).json({
			// 		message: '채널명을 입력해주세요',
			// 	});
			// }
		}
	);

router
	.route('/:id')
	//채널 개별 조회
	.get([body('id').notEmpty().withMessage('채널id 필요'), validate], (req, res) => {
		const err = validationResult(req);
		let { id } = req.body;
		id = parseInt(id);
		const query = `SELECT * FROM channels WHERE id = ?`;
		id &&
			conn.query(query, id, (err, results) => {
				if (results.length) {
					res.status(200).json(results);
				} else {
					notFoundChannel(res);
				}
			});

		// var channel = db.get(id);
		// if (channel) {
		// 	res.status(200).json(channel);
		// } else {
		// 	notFoundChannel();
		// }
		// res.json(db);
	})
	//채널 개벌 수정
	.put(
		[
			body('id').notEmpty().withMessage('채널id 필요'),
			body('name').notEmpty().isString().withMessage('채널명 오류'),
			validate,
		],
		(req, res) => {
			const err = validationResult(req);

			if (!err.isEmpty()) {
				return res.status(400).end();
			}
			let { id } = req.body;
			id = parseInt(id);
			let { name } = req.body;

			let sql = `UPDATE channels SET name=? WHERE id=?`;
			let values = [name, id];
			conn.query(sql, values, (err, results) => {
				if (err) {
					console.log(err);
					return res.status(400).end();
				}

				if (results.affectedRows != 0) {
					res.status(200).json(results);
				} else res.status(400).end();
			});

			// var channel = db.get(id);
			// var oldTitle = channel.channelTitle;
			// if (channel) {
			// 	channel.channelTitle = req.body.channelTitle;
			// 	db.set(id, channel);
			// 	res.status(200).json({
			// 		message: `${oldTitle}님의 채널명을 ${channel.channelTitle}로 변경합니다`,
			// 	});
			// } else {
			// 	notFoundChannel();
			// }
		}
	)
	//채널 개별 삭제
	.delete([body('id').notEmpty().isInt().withMessage('채널id 필요'), validate], (req, res) => {
		const err = validationResult(req);

		if (!err.isEmpty()) {
			return res.status(400).end();
		}
		let { id } = req.body;
		id = parseInt(id);

		let sql = `DELETE FROM channels WHERE id = ?`;
		conn.query(sql, id, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(400).end();
			}

			if (results.affectedRows != 0) {
				res.status(200).json(results);
			} else res.status(400).end();
		});
		// var channel = db.get(id);
		// if (channel) {
		// 	res.status(200).json({
		// 		message: `${channel.channelTitle}님, 채널을 삭제합니다`,
		// 	});
		// 	db.delete(id);
		// } else {
		// }
		// res.json(db);
	});

// function notFoundChannel(res) {
// 	res.status(404).json({
// 		message: '존재하지 않는 채널명입니다.',
// 	});
// }
module.exports = router;
