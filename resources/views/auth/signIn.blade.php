@extends("../init")

@section("css")
    <title>Sign In</title>
@endsection


@section("content")

    @if(Auth::check())
        <h1>{{Auth::user()->name}}</h1>
    @else
        <h1>Not sign in</h1>
    @endif
    <div class="input-field col s12">
        <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <label>Materialize Select</label>
    </div>


    <br/><br/><br/><br/>
    <div id="login">
        <div class="formWrapper">
            <form action="{{url("auth/signIn")}}" method="post">
                {{ csrf_field() }}
                <div class="signin-card">
                    <div class="row">
                        <div class="col s12 m4 offset-m4">
                            <div class="card z-depth-3">
                                <div class="container">
                                    <div class="row">
                                        <div class="card-content black-text center-align">
                                            <span class="card-title">Sign in</span>
                                        </div>
                                        <form id="loginForm">
                                            <div class="input-field">
                                                <i class="material-icons prefix">account_box</i>
                                                <input type="text" id="account" name="account">
                                                <label for="account">Username</label>
                                            </div>
                                            <div class="input-field">
                                                <i class="material-icons prefix">lock</i>
                                                <input type="password" id="password" name="password">
                                                <label for="password">Password</label>
                                            </div>
                                            <div class="card-action center">
                                                <button id="loginBtn" type="submit" class="btn btn-warning">Sign in<i class="material-icons right">send</i></button>
                                            </div>
                                            <input type="checkbox" name="remember" checked hidden>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>

@endsection

@section("js")
@endsection
