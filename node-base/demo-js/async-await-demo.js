// Promise

let promise = new Promise(function (resolve, reject) {
	//executor : 이 친구가 할 일

	setTimeout(() => resolve('완료!'), 3000);

	// 일을 다 하면 무조건 콜백함수 resolve() or reject() 둘 중 하나 호출
	// 할 일 성공적으로 끝나면 resolve(결과)
	//      실패할 경우 reject(에러)
}); // 친구 소환, 매개변수로 함수를 받음

// promise의 기본 메서드 : promise가 일을 완료한 후 호출 해야 하는 함수
// then(작업할 작업이 성공할 경우, 작업할 작업이 실패할 경우)
promise.then(
	function (result) {
		console.log(result);
	}, // 즉, 여기서 result 매개 변수에 resolve로 처리했던 '완료!'가 인수로 담김
	function (err) {}
);
