@extends("init")

@section("css")
@stop

@section("js")
    <script src="assets/js/search.js"></script>
@stop

@section("content")
    @include('detail')
    <div class="container">
        <div class="search-container">
            <div class="row">
                <div class="col s12">
                    <div class="input-field">
                        <input id="search-word" type="text">
                        <label for="search-word">Word</label>
                    </div>
                </div>
                <div class="col s12">
                    <div class="input-field">
                        <select id="search-type">
                            <option value="" disabled selected>Choose your search type</option>
                            <option value="1">Book Name</option>
                            <option value="2">Author</option>
                        </select>
                        <label>Type</label>
                    </div>
                </div>

                <div class="col s12 center">
                    <button id="search-btn" class="btn btn-default">search</button>
                </div>
            </div>
        </div>
        <div class="content-container">
            <table class="striped highlight">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Publication Date</th>
                        <th>Title</th>
                        <th>Book Name</th>
                        <th>Editor</th>
                        <th>Publishing Location</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="page-number-container"></div>
    </div>
@stop

