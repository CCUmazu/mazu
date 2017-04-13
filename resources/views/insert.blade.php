@extends("init")

@section("css")
    <title>Insert Data</title>
@stop

@section("js")
    <script src="assets/js/insert.js"></script>
@stop

@section("content")
    <div class="container">
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
@stop
