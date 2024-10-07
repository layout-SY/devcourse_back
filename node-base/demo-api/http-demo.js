let http = require('http');

function onRequset(requset, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Hello Node.js');
    response.end();
}

http.createServer(onRequset).listen(8888);
//http 모듈에 createServer 함수에서 내부 기능을 동작한 다음
// onRequest 콜백 함수를 실행 요청을 매개변수로 전달