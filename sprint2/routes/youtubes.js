const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();
router.use(express.json());

const validate = (req, res, next) => {
	const err = validationResult(req);

	if (err.isEmpty()) {
		return next();
	} else {
		return res.status(400).end();
	}
};

// let db = new Map();
// let id = 1;

// function isEmpty(obj) {
// 	if (Object.keys(obj).length) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

//로그인
router.post(
	'/login',
	[
		body('email').notEmpty().isEmail().withMessage('이메일 입력 오류'),
		body('password').notEmpty().isString().withMessage('비밀번호 입력 오류'),
		validate,
	],
	(req, res) => {
		const { email, password } = req.body;
		// var loginUser = {};
		const query = `SELECT * FROM users WHERE email = ?`;
		conn.query(query, email, (err, results) => {
			loginUser = results[0];
			if (loginUser && loginUser.password == password) {
				const token = jwt.sign(
					{
						email: loginUser.email,
						name: loginUser.name,
					},
					process.env.PRIVATE_KEY,
					{
						expiresIn: '0.1m',
						issuer: 'seungyeon',
					}
				);

				res.cookie('token', token, {
					httpOnly: true,
				});

				res.status(200).json({
					message: `${loginUser.name}님 환영합니다`,
					token: token,
				});
			} else {
				res.status(403).json({
					message: '데이터가 없습니다',
				});
			}
		});
		// db.forEach((element) => {
		// 	//forEach 매개 변수(a : 한 요소, b : key, c : Map 전체)
		// 	if (element.userId === userId) {
		// 		loginUser = user;
		// 	}
		// });
		// if (isEmpty(loginUser)) {
		// 	res.status(400).json({
		// 		message: '존재하지 않는 아이디입니다',
		// 	});
		// } else {
		// 	if (loginUser.pw === pw) {
		// 		res.status(200).json({
		// 			message: `${loginUser.userId}님 환영합니다`,
		// 		});
		// 	} else {
		// 		res.status(400).json({
		// 			message: '비밀번호가 틀렸습니다',
		// 		});
		// 	}
		// }
	}
);

//회원가입
router.post(
	'/join',
	[
		body('email').notEmpty().isEmail().withMessage('이메일 입력 오류'),
		body('name').notEmpty().isString().withMessage('이름 입력 오류'),
		body('password').notEmpty().isString().withMessage('비밀번호 입력 오류'),
		body('contact').notEmpty().isString().withMessage('연락처 입력 오류'),
		validate,
	],
	(req, res) => {
		if (req.body != {}) {
			const { email, name, password, contact } = req.body;

			conn.query(
				`INSERT INTO users (email, name, password, contact) VALUES(?, ?, ?, ?)`,
				[email, name, password, contact],
				(err, results) => {
					if (results) {
						res.status(201).json(results);
					} else {
						res.status(400).json({
							message: '데이터가 없습니다',
						});
					}
				}
			);
		} else {
			res.status(400).json({
				message: '입력값을 다시 입력해주세요',
			});
		}
	}
);

// app.route('/users/:id') //중복되는 url을 묶어서 실행
// 	.get((req, res) => {
// 		let { id } = req.params;
// 		id = parseInt(id);
// 		if (db.has(id)) {
// 			res.status(200).json({
// 				userId: db.get(id).id,
// 				userName: db.get(id).name,
// 				userPw: db.get(id).pw,
// 			});
// 		} else {
// 			res.status(400).json({
// 				message: '데이터가 없습니다',
// 			});
// 		}
// 	})
// 	.delete((req, res) => {
// 		let { id } = req.params;
// 		id = parseInt(id);
// 		if (db.has(id)) {
// 			res.json({
// 				message: `${db.get(id).id}님 다음에 또 뵙겠습니다`,
// 			});
// 			db.delete(id);
// 		} else {
// 			res.status(400).json({
// 				message: '데이터가 없습니다',
// 			});
// 		}
// 	});

//회원 개별 조회
router.get('/', [body('name').notEmpty().isString().withMessage('이름 입력 오류'), validate], (req, res) => {
	let { name } = req.body;
	const query = `SELECT * FROM users WHERE name = ?`;
	conn.query(query, name, (err, results) => {
		if (results.length) {
			res.status(200).json(results);
		} else {
			res.status(400).json({
				message: '데이터가 없습니다',
			});
		}
	});
});

//회원 탈퇴
router.delete('/', [body('userId').notEmpty().isString().withMessage('아이디 입력 오류'), validate], (req, res) => {
	let { userId } = req.body;

	conn.query(`DELETE FROM users WHERE userId = ?`, userId, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(400).end();
		}

		if (results.affectedRows != 0) {
			res.status(200).json(results);
		} else res.status(400).end();
	});
	// if (db.has(userId)) {
	// 	res.status(201).json({
	// 		message: `${db.get(userId).userId}님 다음에 또 뵙겠습니다`,
	// 	});
	// 	db.delete(userId);
	// } else {
	// 	res.status(400).json({
	// 		message: '데이터가 없습니다',
	// 	});
	// }
});

module.exports = router;
