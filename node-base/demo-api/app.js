const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//request으로 오는 body값을 json 형태로 받을 수 있는 미들웨어
app.use(express.json())
app.post('/test', (req, res) => {
  // body에 숨겨져서 들어온 데이터 화면에 뿌리기

  //위에 express.json()이 있어야 확인할 수 있음
  console.log(req.body.message);

  //res.send(req.body.message);
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})