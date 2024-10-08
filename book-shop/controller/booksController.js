const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const bookDetail = (req, res) => {
	const { user_id } = req.body;
	const { liked_book_id } = req.params;
	let query = `SELECT *, 
		(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes, 
		(SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked 
		FROM books 
		LEFT JOIN category ON books.category_id = category.category_id 
		WHERE books.id=?`;
	let values = [user_id, liked_book_id, liked_book_id];
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
};

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
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
			return res.status(StatusCodes.OK).json(results);
		} else {
			return res.status(StatusCodes.NOT_FOUND).end();
		}
	});
};

module.exports = { allBooks, bookDetail };
