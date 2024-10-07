const express = require('express');
const app = express()

app.listen(8888);

//채널 주소 : https://www.youtube.com/@ChimChakMan_Official

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

app.get('/:nickname', function(req, res){

    const {nickname} = req.params;
    if( nickname === "15ya"){
        res.json(youtuber1)
    }else if(nickname === "괴물쥐"){
        res.json(youtuber2)
    }else if(nickname === "침착맨"){
        res.json(youtuber3)
    }else{
        res.json({
            message : "찾으시는 유튜버가 없습니다"
        })
    }
})