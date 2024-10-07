//express 모듈 셋팅
const express = require('express')
const app = express()

app.listen(8888);

// 데이터 셋팅
let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "괴물쥐",
    sub : "115만명",
    videoNum : "1.7천개"
}

let youtuber3 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

// REST API 설계
app.get('/youtuber/:id', function (req, res) {
    let {id} = req.params;
    id = parseInt(id);
    if(!db.has(id)){
        res.json({
            message : "유튜버 없음"
        })
    }else{
        res.json({
            youtuber : db.get(id)
        })
    }
  })

  let db = new Map();

  db.set(1, youtuber1);
  db.set(2, youtuber2);
  db.set(3, youtuber3);