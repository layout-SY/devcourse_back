const obj1 = {};
const obj2 = { message: '안 빔' };
const str2 = '';
const str1 = 'afaf';

console.log(Object.keys(obj1).length === 0);
console.log(Object.keys(obj2).length);
console.log(Object.keys(str1).length === 0);
console.log(Object.keys(str2).length === 0);
