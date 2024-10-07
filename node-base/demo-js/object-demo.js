let book = {
    title : "Node.js를 공부해보자",
    price : 20000,
    description : "Node.js, 김송아 지음"
};

// console.log(book.title);
// console.log(book.price);
// console.log(book.description);

function print(ojt) {
    console.log(typeof(book.title));
    console.log(book.price);
    console.log(book.description);
}

print(book);
