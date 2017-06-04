<div id="edit-modal" class="modal">
  <div class="modal-content">
    <div class="form-wrapper row">
      <div class="col s6">
        <div class="row">
          <div class="input-field col s12">
            <select id="category" multiple></select>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select id="bookType"></select>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="author" type="text" class="validate">
            <label for="author">作者</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="bookName" type="text" class="validate">
            <label for="bookName">書名</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="editor" type="text" class="validate">
            <label for="editor">編輯者</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="publicationDate" type="text" class="validate">
            <label for="publicationDate">出版日期</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="publishingLocation" type="text" class="validate">
            <label for="publishingLocation">出版地區</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="publisher" type="text" class="validate">
            <label for="publisher">出版者</label>
          </div>
        </div>
      </div>
      <div class="col s6">
        <div class="row">
          <div class="input-field col s12">
            <input id="title" type="text" class="validate">
            <label for="title">標題</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="period" type="text" class="validate">
            <label for="period">period</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="chapter" type="text" class="validate">
            <label for="chapter">chapter</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="page" type="text" class="validate">
            <label for="page">page</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="department" type="text" class="validate">
            <label for="department">department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="thesis" type="text" class="validate">
            <label for="thesis">thesis</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="ISBN" type="text" class="validate">
            <label for="ISBN">ISBN</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="ISSN" type="text" class="validate">
            <label for="ISSN">ISSN</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <div class="row">
      <div class="col s12 create">
        <button id="createBtn" class="btn">
          新增<i class="material-icons right">send</i>
        </button>
      </div>
      <div class="col s12 edit">
        <button id="deleteBtn" class="btn red">
          刪除<i class="material-icons right">send</i>
        </button>
        <button id="editBtn" class="btn lime">
          更新<i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>
</div>
