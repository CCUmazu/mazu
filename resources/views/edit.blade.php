<div id="edit-modal" class="modal">
  <div class="modal-content">
    <div class="form-wrapper row">
      <div class="col s6">
        <div class="row">
          <div class="input-field col s12">
            <select id="bookType">
              <option disabled>書籍類別</option>
              @foreach($types as $type)
                <option value="{{$type->id}}">{{$type->type}}</option>
              @endforeach
            </select>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select id="bookClassification" multiple>
              <option disabled>書籍章節</option>
              @foreach($categories as $category)
                <option value="{{$category->id}}">{{$category->name}}</option>
              @endforeach
            </select>
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
            <label for="bookName">書刊名</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="editor" type="text" class="validate">
            <label for="editor">編者</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="publicationDate" type="text" class="validate">
            <label for="publicationDate">年份</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="publishingLocation" type="text" class="validate">
            <label for="publishingLocation">出版地</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="publisher" type="text" class="validate">
            <label for="publisher">出版社</label>
          </div>
        </div>
      </div>
      <div class="col s6">
        <div class="row">
          <div class="input-field col s12">
            <input id="title" type="text" class="validate">
            <label for="title">篇名</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="period" type="text" class="validate">
            <label for="period">期</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="chapter" type="text" class="validate">
            <label for="chapter">卷</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="page" type="text" class="validate">
            <label for="page">頁數</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="department" type="text" class="validate">
            <label for="department">學系</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="thesis" type="text" class="validate">
            <label for="thesis">碩博論</label>
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
      <div class="col s12 edit"><!--
        <button id="deleteBtn" class="btn red">
          刪除<i class="material-icons right">send</i>
        </button>-->
        <button id="editBtn" class="btn lime">
          更新<i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>
</div>
