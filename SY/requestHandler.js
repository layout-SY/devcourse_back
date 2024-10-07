const mariadb = require('./database/connect/mariadb.js');

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('SY Main Page');
    response.end();
}

function login(response) {
    console.log('login');

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Login Page');
    response.end();
}

let handle = {};
handle['/'] = main;
handle['/login'] = login;
exports.handle = handle;