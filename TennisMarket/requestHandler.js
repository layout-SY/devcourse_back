const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb.js');

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}

function blueRacket(response){ //함수 대소문자 차이로 해당 함수가 실행이 안됐음.. 심지어 아래 함수명이라도 일치했음... 대문자로 근데 안됐음..
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}

function order(response, productId){
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function(err, rows){
            console.log(rows);
            //()안하면 함수 자체를 가져오고, ()하면 함수를 호출
    })

    response.write('order page'); //어떻게 하면 여디서 alert를 띄울까?
    response.end();
}

function orderlist(response, orderlist){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    mariadb.query("SELECT * FROM orderlist", function(err, rows){
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                        + "<td>" + element.product_id+"</td>"
                        + "<td>" + element.order_data+"</td>"
                        + "</tr>");
            console.log(element.product_id);
            console.log(element.order_data);
        })

        response.write("</table>");
        response.end();
    })
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;
exports.handle = handle;