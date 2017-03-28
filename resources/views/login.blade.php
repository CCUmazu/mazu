@extends("init")

@section("css")
@stop

@section("js")
<script>
    
</script>
@stop

@section("content")
    <div class="container">
        <div class="row">
            <div class="col s12">
                <div class="input-field">
                    <input id="account" type="text">
                    <label for="account">Account</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="input-field">
                    <input id="password" type="password">
                    <label for="password">Password</label>
                </div>
            </div>
        </div>
        <div class="row center">
            <div class="col s12">
                <button class="btn btn-default">Login</button>
            </div>
        </div>
    </div>
@stop
