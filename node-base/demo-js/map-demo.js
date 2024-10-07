/**
 * 배열에 사용하려고 했던 목적
 */

// map 함수(메서드) vs foreach 차이
const arr = [1, 2, 3, 4, 5];

//콜백함수가 하는 일
const foreachArr = arr.forEach((element, b) => {
	//element는 값, b는 index
	console.log(`foreach : ${element}와 ${b}`);
	return element * b;
});

const mapArr = arr.map((element, b) => {
	//element는 값, b는 index
	console.log(`map : ${element}와 ${b}`);
	return element * b;
});

console.log(`foreach로 return하면 ${foreachArr},
            map으로 return하면 ${mapArr}`);
