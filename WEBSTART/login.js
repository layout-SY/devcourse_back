/* var vs let vs const */
function compareVariable(){
    let num1;
    const num2 = 30;

    num2 = 20;
    alert('num2 : ' + num2);
}

//나만의 함수 만들고, 버튼 클릭하면 호출하기
function myFunction(){
    alert('조승연님, 환영합니다.');
}

function myFunction2(){
    alert(document.getElementById('login_id').value);
}

function myFunction3(){
    let login_id = document.getElementById('login_id').value;
    if(!login_id){//=login_id == ""(null쓰면 안됨)
        alert('id칸이 비어있습니다.')
    }else{
        alert(login_id + '님, 환영합니다.');
    }
}