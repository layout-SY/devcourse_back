// js 배열의 비구조화
// 객체와 상관없이 index값이 있기 때문에 순서대로 들어감
const array = [1, 2, 3, 4, 5];
//순서대로 값을 받고 싶다면 불필요한 자리엔 빈공간으로 값을 받지 않게
const [ , num2, num3, , num5] = array

console.log(num2)
console.log(num3)
console.log(num5)

// const num1 = array[0];
// const num4 = array[3];

// console.log(num1);
// console.log(num4);

//js 문법