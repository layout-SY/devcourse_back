const conn = require('../mariadb');
const ensureAuthorization = require('../auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

const bookDetail = (req, res) => {
	let authorization = ensureAuthorization(req, res);

	if (authorization instanceof jwt.TokenExpiredError) {
		return res.status(StatusCodes.Unauthorized).json({
			message: 'Token expired. Please log in again.',
		});
	} else if (authorization instanceof jwt.JsonWebTokenError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Invalid token. Please log in again.',
		});
	} else if (authorization instanceof ReferenceError) {
		let book_id = req.params.id;
		let query = `SELECT *, 
				(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes, 
				FROM books 
				LEFT JOIN category ON books.category_id = category.category_id 
				WHERE books.id=?`;
		let values = [book_id];

		conn.query(query, values, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
			}

			if (results.length) {
				return res.status(StatusCodes.OK).json(results);
			} else {
				return res.status(StatusCodes.NOT_FOUND).end();
			}
		});
	} else {
		let query = `SELECT *, 
				(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes, 
				(SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked 
				FROM books 
				LEFT JOIN category ON books.category_id = category.category_id 
				WHERE books.id=?`;
		let values = [authorization.id, liked_book_id, liked_book_id];

		conn.query(query, values, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
			}

			if (results.length) {
				return res.status(StatusCodes.OK).json(results);
			} else {
				return res.status(StatusCodes.NOT_FOUND).end();
			}
		});
	}
};

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
	let allBooksRes = {};
	let { category_id, news, limit, currentPage } = req.query;

	// limit : page 당 도서 수			ex. 3
	// currentPage : 현재 페이지 번호	 ex. 1, 2 ,3
	// offset : 					   ex. 0, 3, 6, 9, ...
	// 						   		   limit * (currentPage-1) == offset
	let offset = limit * (currentPage - 1);

	let query = 'SELECT *, (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes FROM books';
	let values = [];
	if (category_id && news) {
		query += ' WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW()';
		values.push(category_id);
	} else if (category_id) {
		query += ' WHERE category_id=?';
		values.push(category_id);
	} else if (news) {
		query += ' WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW()';
	}

	query += ' LIMIT ? OFFSET ?';
	values.push(parseInt(limit), offset);

	conn.query(query, values, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}

		if (results.length) {
			results.map((result) => {
				result.pubDate = result.pub_date;
				delete result.pub_date;
			});
			allBooksRes.books = results;
		} else {
			return res.status(StatusCodes.NOT_FOUND).end();
		}
	});

	query += 'SELECT found_rows()';
	conn.query(query, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}

		let pagination = {};
		pagination.currentPage = parseInt(currentPage);
		pagination.totalCount = results[0]['found_rows()'];

		allBooksRes.pagination = pagination;

		return res.status(StatusCodes.OK).json(allBooksRes);
	});
};

module.exports = { allBooks, bookDetail };
