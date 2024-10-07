const express = require("express")
const app = express()

app.listen(8888)

/*
app.get('/:nicknumber', function (req, res){
    const {nicknumber} = req.params
    if(db.has(parseInt(nicknumber))){
        res.json({
            nicknumber : db.get(parseInt(nicknumber))
        })
    }else{
        res.json({
            message : "값이 없습니다."
        })
    }
})
*/

app.get('/:id', function (req, res){
    let {id} = req.params;
    id = parseInt(id);
    
    if(db.get(id) == undefined){
        res.json({
            message : "없는 상품"
        })
    }else{
        product = db.get(id);
        //객체에 원하는 키를 추가하고 싶을 때 이렇게 추가
        product.id = id
        //product["id"] = id
        res.json(product);
    }
})

let db = new Map();
//숫자로 들어 있음
/*
db.set(1, "MonsterRat") // 키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, "Chanho")
db.set(3, "Paka")
*/
db.set(1, {
    message : "항목 없음"
})