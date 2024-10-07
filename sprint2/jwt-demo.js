var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
// 여기서 shhhhh는 verify signature 부분에 들어가는 나만의 암호키
console.log(token);

//검증
// 만약 검증에 성공했다면, 페이로드 값을 확인할 수 있음
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded); // bar

// verify a token symmetric
jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
	console.log(decoded.foo); // bar
});
