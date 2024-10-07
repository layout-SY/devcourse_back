let http = require('http');
let url = require('url');

function start(route, handle) {
    function onRequset(requset, response){
        let pathname = url.parse(requset.url).pathname;
        route(pathname, handle, response);
    }
    
    http.createServer(onRequset).listen(8888);
}

exports.start = start;
