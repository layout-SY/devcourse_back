// await : async 함수 안에서만 동작.
// await은 Promise 객체.then() 이 메서드를 좀 더 쉽게 사용할 수 있는 방법

// async도 await이 들어가면 기능이 하나 더 동작
// Promise 객체의 작업이 끝날 때까지 기다릴 수 있는 영역 제공
// 즉, 함수 내부에서 비동기 처리의 반환까지 깔끔하게 끝낼 수 있단 얘기

async function f() {
	// Promise 객체 하나 당 => query 하나
	let promise1 = new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve('첫 번째 쿼리');
		}, 1000);
	});

	let result1 = await promise1;
	console.log(result1);

	let promise2 = new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve('두 번째 쿼리 with ' + result1);
		}, 1000);
	});

	let result2 = await promise2;
	console.log(result2);

	let promise3 = new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve('세 번째 쿼리 with ' + result2);
		}, 1000);
	});

	let result3 = await promise3;
	console.log(result3);
}

f();
