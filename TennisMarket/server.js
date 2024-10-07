let http = require('http');
let url = require('url');

function start(route, handle) {
    function onRequset(request, response){
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;

        route(pathname, handle, response, queryData.productId, queryData.orderlist);
    }
    
    http.createServer(onRequset).listen(8888);
}

exports.start = start;
