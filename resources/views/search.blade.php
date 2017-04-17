@extends("init")

@section("css")
    <link rel="stylesheet" href="/assets/css/search.css">
@stop

@section("js")
    <script src="/assets/js/search.js"></script>
@stop

@section("content")
    @include('detail')
    <div class="container">
        <div class="search-container">
            <div class="row">
                <div class="col s12">
                    <div class="input-field">
                        <input id="search-word" type="text">
                        <label for="search-word">請輸入搜尋的關鍵字</label>
                    </div>
                </div>
                <div class="col s12">
                    <div class="input-field">
                        <select id="search-type">
                            <option value="" disabled selected>請選擇要搜尋的類別</option>
                            <option value="1">書名</option>
                            <option value="2">作者</option>
                        </select>
                        <label>類別</label>
                    </div>
                </div>

                <div class="col s12 center">
                    <button id="search-btn" class="btn btn-default">搜尋</button>
                </div>
            </div>
        </div>
        <div class="content-container">
            <table class="striped highlight">
                <thead>
                    <tr>
                        <th>作者</th>
                        <th>出版日期</th>
                        <th>標題</th>
                        <th>書名</th>
                        <th>編輯者</th>
                        <th>出版地區</th>
                        <th>出版者</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="page-number-container"></div>
    </div>
@stop

