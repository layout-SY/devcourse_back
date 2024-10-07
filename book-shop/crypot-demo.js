const crypto = require('crypto');

const salt = crypto.randomBytes(64).toString('base64');
const hashPassword = crypto.pbkdf2Sync('1234', salt, 10000, 30, 'sha512').toString('base64');
//비밀번호 암호화. salt의 randomBytes 호출될 때마다 새로운 암호 코드가 반환
console.log(hashPassword);

// 회원가입 시 비밀번호를 암호화 해서 암호화된 비밀번호와, salt 값을 같이 저장
// 로그인 시, 이메일&비밀번호(날 것) => salt 꺼내서 비밀번호 암호화 해보고 => 디비 비밀번호랑 비교
