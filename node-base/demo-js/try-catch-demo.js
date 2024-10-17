let string = '{"num1":1';

try {
	let json = JSON.parse(string);
	// console.log(json.name); // => undefined로 오류가 발생하진 않지만, 개발자 입잔에선 에러
	if (!json.name) {
		throw new SyntaxError('입력 값이 존재하지 않습니다.');
		//이렇게 throw 안하면 해당 if문에서 걸리는 게 아닌 지금 if문 범위도 벗어나 이어서 실행됨
	} else {
		console.log(json.name);
	}
} catch (err) {
	console.log(err.name);
	console.log(err.message);
}
