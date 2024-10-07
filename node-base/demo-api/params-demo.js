const express = require('express');
const app = express()

app.listen(8888);

app.get(`/products/:n`, function(req, res){
    // products/ __ 빈칸에 오는 값을 n이라는 변수에 담음
    // : => URL로 매개변수 전달의 의미
    // : 뒤에 오는 데이터를 req.params에 json 형식으로 담아놓음
    // req.params 뒤에 있는 json 데이터를 값만 뽑아내는 방법
    // -> req.params.(해당 json의 키)

    //req.params.n이 string 타입으로 출력
    if (req.params.n - 10 > 5){
        //근데 이게 출력. 원래 에러가 나는 게 정상
        //javascript의 특징
        //그래서 헷갈리지 않기 위해 parseInt 사용 
        console.log(`${parseInt(req.params.n)}`)
    }
    res.json({
        num : parseInt(req.params.n)
    });
})

app.get(`/test/1`, function(req, res){
    res.json({
        //1은 int로 출력
        test : 1
    });
})