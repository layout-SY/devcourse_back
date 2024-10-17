var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);

console.log(token);

var decoded = jwt.verify(token + '1', process.env.PRIVATE_KEY);
console.log(decoded);
