/**
 * 배열에 사용하려고 했던 목적
 */

const arr = [1, 2, 3, 4, 5];

//콜백함수가 하는 일
arr.forEach((element, b) => {
	//element는 값, b는 index
	// console.log(`${element}와 ${b}`);
});

const map = new Map();
map.set(1, '데이터1');
map.set(2, '데이터2');
map.set(3, '데이터3');

map.forEach((value, key, all) => {
	console.log(`${value}, ${key}, ${all}`);
});
