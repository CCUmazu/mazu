@extends('init')

@section('css')
  <link rel="stylesheet" href="../assets/css/manage.css">
@stop

@section('js')
  <script src="../assets/js/common_for_search_and_manage.js"></script>
  <script src="../assets/js/manage.js"></script>
@stop

@section('content')

  @if(!Auth::check())
    <h1>還沒登入</h1>
  @else
    <input type="hidden" value="{{json_encode($books)}}" id="books">
    <input type="hidden" value="{{json_encode($types)}}" id="types">
    <input type="hidden" value="{{json_encode($categories)}}" id="categories">
    <input type="hidden" value="{{json_encode($classify)}}" id="classify">

    @include('edit')

    <div class="container">
      <div class="header-container">
        <div class="header-title"><b>媽祖書籍資料搜索系統 - 管理者介面</b></div>
        <div class="search-container">
          <div id="header-image"></div>
          <div class="search-block">
            <div class="row">
              <div class="col s8 offset-s2">
                <div class="input-field">
                  <input id="search-word" type="text">
                  <label for="search-word">請輸入搜尋的關鍵字</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col s2 offset-s2">
                <p>
                  <input type="checkbox" id="search-all">
                  <label for="search-all">全部章節</label>
                </p>
              </div>
              <div class="col s6 without-search-all">
                <div class="input-field">
                  <select id="search-category" multiple>
                    @foreach($categories as $category)
                      <option value="{{$category->id}}">{{$category->name}}</option>
                    @endforeach
                  </select>
                  <label>章節</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center">
                <button id="search-btn" class="btn btn-default">搜尋</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tool-container">
        <div class="row right-align">
          <button class="btn btn-default" id="open-edit-modal" data-target="edit-modal">新增</button>
        </div>
      </div>

      <div class="content-container">
        <!--
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
          <th>#</th>
          </tr>
          </thead>
          <tbody></tbody>
          </table>
        -->
      </div>
      <div id="page-number-container"></div>

      @include('footer')
    </div>
  @endif
@stop
