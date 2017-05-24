$(document).ready(function() {
    $('#submit').click(function() {
        var request = {};
        request.account = $('#account').val();
        request.password = $('#password').val();

        $.post(`${web_root}/auth/signIn`, request, function(response) {
            console.log(response);
            if(response.status == 2) {
                Materialize.toast('帳號或密碼錯誤，請重新輸入', 2000);
                return;
            }
            
            Materialize.toast('成功登入', 2000);
            Materialize.toast('將為您導向至管理者介面', 2000);
            setTimeout(function() {
                window.location = `${web_root}/manager/manage`;
            }, 2000);
        }).fail(function() {
            Materialize.toast('伺服器發生錯誤', 2000);
        });
    });
});

