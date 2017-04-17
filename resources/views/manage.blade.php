@extends('init')

@section('css')
@stop

@section('js')
    <script src="/assets/js/manage.js"></script>
@stop

@section('content')

    @if(!Auth::check())
        <h1>還沒登入</h1>
    @else
        @include('edit')

        <div class="container">
            <div class="header-container">
                <div class="row">
                    <button class="btn btn-default" id="open-edit-modal" data-target="edit-modal">新增</button>
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
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div id="page-number-container"></div>
        </div>
    @endif
@stop
