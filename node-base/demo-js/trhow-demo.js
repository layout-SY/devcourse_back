let error = new Error('에러 객체');
let syntaxError = new SyntaxError('구문 에러 발생');
let referenceError = new ReferenceError('참조 에러 발생');

console.log(error.name);
console.log(error.message);

console.log(syntaxError.name);
console.log(syntaxError.message);

console.log(referenceError.name);
console.log(referenceError.message);
