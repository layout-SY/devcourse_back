const mariadb = require('mysql2/promise');

//mysql2에 promise를 추가하면 mariadb.createConnection 메서드가 Promise 객체에 담기게 됨
// => 즉 리턴값이 Promise 객체가 된다는 뜻
const conn = mariadb.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'Bookshop',
	dataStrings: true,
});

module.exports = conn;
