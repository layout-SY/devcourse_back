const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'Youtube',
	dateStrings: true,
});

// connection.query('SELECT * FROM `users`', (err, results, fields) => {
// 	var { id, email, name, create_at } = results[0];
// 	console.log(id);
// 	console.log(email);
// 	console.log(name);
// 	console.log(create_at);
// });

module.exports = connection;
