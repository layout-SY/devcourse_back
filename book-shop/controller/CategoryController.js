const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const allCategory = (req, res) => {
	let query = 'SELECT * FROM category';
	conn.query(query, (err, results) => {
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
		}
		return res.status(StatusCodes.OK).json(results);
	});
};

module.exports = allCategory;
