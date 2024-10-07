const express = require('express')
const app = express()

app.listen(8888);

// /hello, /bye, /nicetomeetyou
app.get('/hello', function (req, res) {
    // res.send('안녕하세요');
    res.send({
        say : '안녕하세요'
    })//json의 형태로 출력
})
app.get('/bye', function (req, res) {
    res.send('안녕히 가세요');
    res.json({
        say : '안녕히 가세요'
    })//json으로 출력할 것이기 때문에 send가 아닌 json 형식으로 response 전달
})

// GET 메소드로, '/nicetomeetyou' 경로 요청
// 매개변수로 전달받은 콜백 함수를 호출하겠다
app.get('/nicetomeetyou', function (req, res) {
    res.send('반갑습니다');
})