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

<div>
    <div class="formWrapper row">
        <div class="input-field col s6 offset-s3">
            <select id="bookType">
                <option value="" disabled selected>book type</option>
                <option value="1">專書</option>
                <option value="2">專書論文</option>
                <option value="3">期刊論</option>
                <option value="4">碩博士論文</option>
            </select>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="author" type="text" class="validate">
            <label for="author">author</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="publicationDate" type="text" class="validate">
            <label for="publicationDate">publicationDate</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="title" type="text" class="validate">
            <label for="title">title</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="bookName" type="text" class="validate">
            <label for="bookName">bookName</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="editor" type="text" class="validate">
            <label for="editor">editor</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="publishingLocation" type="text" class="validate">
            <label for="publishingLocation">publishingLocation</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="publisher" type="text" class="validate">
            <label for="publisher">publisher</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="period" type="text" class="validate">
            <label for="period">period</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="chapter" type="text" class="validate">
            <label for="chapter">chapter</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="page" type="text" class="validate">
            <label for="page">page</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="department" type="text" class="validate">
            <label for="department">department</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="thesis" type="text" class="validate">
            <label for="thesis">thesis</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="ISBN" type="text" class="validate">
            <label for="ISBN">ISBN</label>
        </div>
        <div class="input-field col s6 offset-s3">
            <input id="ISSN" type="text" class="validate">
            <label for="ISSN">ISSN</label>
        </div>

        <div class="input-field col s12 center">
            <button id="submitBtn" type="submit" class="btn btn-warning">submit<i class="material-icons right">send</i></button>
        </div>
    </div>
</div>

@endsection

@section("js")
    <script>
        $(document).ready(function() {
            $('select').material_select();
        });

        $('#submitBtn').click(function() {
            var insertData = {
                _token: $("meta[name='csrf-token']").attr("content"),
                id: 50,
                bookType: $('#bookType').val(),
                author: $('#author').val(),
                publicationDate: $('#publicationDate').val(),
                title: $('#title').val(),
                bookName: $('#bookName').val(),
                editor: $('#editor').val(),
                publishingLocation: $('#publishingLocation').val(),
                publisher: $('#publisher').val(),
                period: $('#period').val(),
                chapter: $('#chapter').val(),
                page: $('#page').val(),
                department: $('#department').val(),
                thesis: $('#thesis').val(),
                ISBN: $('#ISBN').val(),
                ISSN: $('#ISSN').val()
            };

            $.ajax({
                url: '/api/book/update',
                type: 'POST',
                data: insertData,
                error: function (error) {
                    Materialize.toast('<span>server error!</span>', 5000, 'rounded');
                    return;
                },
                success: function (result) {
                    console.log(result);
                }
            });
        });
    </script>
@endsection
