<div id="edit-modal" class="modal">
    <div class="modal-content">
        <div class="formWrapper row">
            <div class="input-field col s6 offset-s3">
                <select id="bookType">
                    <option value="" disabled selected>類別</option>
                    <option value="1">專書</option>
                    <option value="2">專書論文</option>
                    <option value="3">期刊論</option>
                    <option value="4">碩博士論文</option>
                </select>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="author" type="text" class="validate">
                <label for="author">作者</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="title" type="text" class="validate">
                <label for="title">標題</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="bookName" type="text" class="validate">
                <label for="bookName">書名</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="editor" type="text" class="validate">
                <label for="editor">編輯者</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="publicationDate" type="text" class="validate">
                <label for="publicationDate">出版日期</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="publishingLocation" type="text" class="validate">
                <label for="publishingLocation">出版地區</label>
            </div>
            <div class="input-field col s6 offset-s3">
                <input id="publisher" type="text" class="validate">
                <label for="publisher">出版者</label>
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
        </div>
    </div>
    <div class="modal-footer">
        <div class="row">
            <div class="col s12 create">
                <button id="createBtn" class="btn btn-warning">
                    新增<i class="material-icons right">send</i>
                </button>
            </div>
            <div class="col s12 edit">
                <button id="editBtn" class="btn btn-warning">
                    更新<i class="material-icons right">send</i>
                </button>
                <button id="deleteBtn" class="btn btn-warning">
                    刪除<i class="material-icons right">send</i>
                </button>
            </div>
        </div>
    </div>
</div>
