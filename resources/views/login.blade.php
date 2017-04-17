@extends("init")

@section("css")
@stop

@section("js")
<script src="/assets/js/login.js"></script>
@stop

@section("content")
    <div class="container">
        <div class="row center">
            <h3>媽祖管理者</h3>
            @if(Auth::check())
                <h1>登入</h1>
                <a href="/auth/signOut">登出</a>
            @else
                <h1>沒登入</h1>

            @endif
        </div>
        <div class="row">
            <div class="col s12">
                <div class="input-field">
                    <input id="account" type="text">
                    <label for="account">帳號</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="input-field">
                    <input id="password" type="password">
                    <label for="password">密碼</label>
                </div>
            </div>
        </div>
        <div class="row center">
            <div class="col s12">
                <button id="submit" class="btn btn-default">登入</button>
            </div>
        </div>
    </div>
@stop
