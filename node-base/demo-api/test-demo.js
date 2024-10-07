const express = require('express')
const app = express()

app.listen(8888);

// API : GET + "http:localhost:8888/test"
// "TEST SUCCESS"
app.get('/test', function (req, res) {

    res.send('TEST SUCCESS');
})

// API : GET + "http:localhost:8888/test/1"
// "One"
app.get('/test/1', function (req, res) {
    res.send('One');
})

//채널 주소 : https://www.youtube.com/@ChimChakMan_Official
app.get('/nickname', function(req, res){

    const param = req.params;

    res.json({
        channel : param.nickname
    })
})

//영상 클릭 주소 : https://www.youtube.com/watch?v=qgR9Bu5EZPk
// 타임라인 주소 : https://www.youtube.com/watch?v=qgR9Bu5EZPk&t=1396s
app.get('/watch', function(req, res){
    //url 주소 뒤에 오는 ? 뒤에 오는 데이터를 가져오는 query
    // const q = req.query;
    // console.log()

    // js객체(JSON)의 비구조화
    //객체는 변수 이름을 맞춰줘야함
    //변수명이 query의 쿼리 변수명과 같아야함.
    const {v, t} = req.query;
    console.log(v)
    console.log(t)
    res.json({
        "영상" : v,
        "영상 타임라인" : t
    })
})