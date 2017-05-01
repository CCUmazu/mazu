@extends("init")

@section("css")
@stop

@section("js")
<script src="/assets/js/login.js"></script>
@stop

@section("content")
    <div class="container">
        <br/><br/><br/><br/><br/><br/>
        <div class="formWrapper">
            <div class="row">
                <div class="col s12 m6 offset-m3">
                    <div class="card z-depth-3">
                        <div class="container">
                            <div class="row">
                                <div class="card-content black-text center-align">
                                    <h2>管理者登入頁面</h2>
                                    @if(Auth::check())
                                        <a href="/auth/signOut">登出</a>
                                    @else
                                        <!--<span class="card-title">登入</span>-->
                                    @endif
                                </div>
                                @if(!Auth::check())
                                    <div class="input-field col s10 offset-s1">
                                        <input id="account" type="text">
                                        <label for="account">帳號</label>
                                    </div>
                                    <div class="input-field col s10 offset-s1">
                                        <input id="password" type="password">
                                        <label for="password">密碼</label>
                                    </div>
                                    <div class="row center">
                                        <div class="col s12">
                                            <br/>
                                            <button id="submit" class="btn btn-default">登入</button>
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
