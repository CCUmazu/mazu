<div id="edit-modal" class="modal">
  <div class="modal-content">
    <div class="form-wrapper row">
      <div class="col s6">
        <div class="row">
          <div class="input-field col s12">
            <select id="bookCategory">
              <option disabled selected>章節</option>
              <option value="1-0-0">通論</option>
              <option value="2-0-0">信仰與經典</option>
              <option value="3-0-0">媽祖文化與比較研究</option>
              <option value="4-0-0">歷史、事蹟與傳說</option>
              <option value="5-0-0">儀式與祭典</option>
              <option value="6-0-0">進香</option>
              <option value="7-0-0">祭祀活動與組織</option>
              <option value="8-0-0">媽祖廟糾紛與爭論</option>
              <option value="9-0-0">兩岸交流</option>
              <option value="10-0-0">媽祖信仰與政治</option>
              <option value="11-0-0">媽祖信仰的傳播</option>
              <option value="12-0-0">觀光與文化政策</option>
              <option value="13-0-0">信仰與社區組織</option>
              <option value="14-0-0">區域媽祖廟研究</option>
              <option value="15-0-0">單一媽祖廟研究(含廟誌)</option>
              <option value="16-0-0">建築、藝術</option>
              <option value="17-0-0">社會經濟</option>
              <option value="18-0-0">其他</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select id="bookType">
              <option disabled selected>文章類別</option>
              <option value="1">專書</option>
              <option value="2">專書論文</option>
              <option value="3">期刊論</option>
              <option value="4">碩博士論文</option>
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
