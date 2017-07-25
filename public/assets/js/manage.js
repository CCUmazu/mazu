var paging = {
  curPage: 1,
  perPage: 10,
  totalPage: 0,

  drawContent: function() {
    var text = '';
    var i;
    var j;
    var book;
    var category;
    var concat_str;

    for(i=(this.curPage-1)*this.perPage, j=0; i<book_data.length && j<this.perPage; i++, j++) {
      book = book_data[i];
      category = concat.categoryStr(book['categoryId']);
      type = type_data[book.typeId];
      concat_str = concat.entry(book);
      
      text += `<div class="row result-item">`;
      text += `<div class="col s9">`;
      text += `<div class="row">${category}</div>`;
      text += `<div class="row">${type}</div>`;
      text += `<div class="row">${concat_str}</div>`;
      text += `</div>`;// end s9
      text += `<div class="col s3">`;
      text += `<div class="row button-wrapper center">`;
      text += `<div class="col s12"><button class="btn btn-default lime result-item-content" data-bookindex="${i}">編輯</button></div>`;
      text += `<div class="col s12"><button class="btn btn-default red deleteBtn" data-bookid="${book.id}" data.bookindex="${i}">刪除</button></div>`;
      text += `</div>`;// end button-wrapper
      text += `</div>`;// end s3
      text += `</div>`;// end result-item
    }

    $('.content-container').html(text);   
    form.formEvent();
  },

  drawPage: function() {
    var text = '';
    var i;
    var j;
    
    if((book_data.length % this.perPage) == 0) {
      var totalPage = Math.floor(book_data.length / this.perPage);
    } else {
      var totalPage = Math.floor(book_data.length / this.perPage) + 1;
    }
    var leftPage = Math.max(1, this.curPage - 5);
    var rightPage = Math.min(leftPage + 9, totalPage);

    text += `<ul class="pagination center">`;
    for(i=leftPage, j=0; i<=rightPage && j<10; i++, j++) {
      if(this.curPage == i) {
        text += `<li class="active" data-pindex="${i}"><a>${i}</a></li>`;
      } else {
        text += `<li class="waves-effect" data-pindex="${i}"><a>${i}</a></li>`;
      }
    }
    text += `</ul>`;

    $('#page-number-container').html(text);
    this.pagingEvent();
  },

  pagingEvent: function() {
    var outside = this;
    $('.pagination li').unbind('click');
    $('.pagination li').click(function() {
      outside.curPage = $(this).data('pindex');
      outside.drawContent();
      outside.drawPage();
    });
  }
};

var form = {
  empty: function() {
    $('#bookClassification').val([]),
    $('#author').val('');
    $('#publicationDate').val('');
    $('#title').val('');
    $('#bookName').val('');
    $('#editor').val('');
    $('#publishingLocation').val('');
    $('#publisher').val('');
    $('#period').val('');
    $('#chapter').val('');
    $('#page').val('');
    $('#department').val('');
    $('#thesis').val('');
    $('#ISBN').val('');
    $('#ISSN').val(''); 
    
    Materialize.updateTextFields();
    $('select').material_select();
  },

  get: function() {
    var rtl = {
      bookType: $('#bookType').val(),
      bookClassification: $('#bookClassification').val(),
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

    return rtl;
  },

  fill: function(data) {
    this.empty();

    $('#bookClassification').val(data['categoryId']);
    $('#bookType').val(data['bookType']);
    $('#author').val(data['author']);
    $('#publicationDate').val(data['publicationDate']);
    $('#title').val(data['title']);
    $('#bookName').val(data['bookName']);
    $('#editor').val(data['editor']);
    $('#publishingLocation').val(data['publishingLocation']);
    $('#publisher').val(data['publisher']);
    $('#period').val(data['period']);
    $('#chapter').val(data['chapter']);
    $('#page').val(data['page']);
    $('#department').val(data['department']);
    $('#thesis').val(data['thesis']);
    $('#ISBN').val(data['ISBN']);
    $('#ISSN').val(data['ISSN']);

    Materialize.updateTextFields();
    $('select').material_select();
  },

  valid: function() {
    var result = true;

    var category = $('#bookClassification').val();
    var author = $('#author').val();
    var date = $('#publicationDate').val();

    if(category == null) {
      result = false;
    }

    if(author == '') {
      result = false;
    }

    if(date == '') {
      result = false;
    }

    return result;
  },

  formEvent: function() {
    var outside = this;

    $('#createBtn').unbind('click');
    $('#createBtn').click(function() {
      var request = outside.get();
      
      if(outside.valid() == false) {
        Materialize.toast('您有必填欄位沒填', 2000);
        return;
      }
      console.log(request);
      $.post(`${web_root}/api/book/create`, request, function(response) {
        console.log(response);
        Materialize.toast('新增成功, 重整頁面之後資料才會顯示', 2000);
      }).fail(function() {
        Materialize.toast('新增失敗', 2000);
      });
    });

    $('#editBtn').unbind('click');
    $('#editBtn').click(function() {
      var request = outside.get();
      var id = $(this).data('id');
      var bookIndex = $(this).data('bookIndex');
      request.id = id;
      
      if(outside.valid() == false) {
        Materialize.toast('您有必填欄位沒填', 2000);
        return;
      }
      console.log(request);
      $.post(`${web_root}/api/book/update`, request, function(response) {
        console.log(response);
        Materialize.toast('更新成功', 2000);
        book_data.splice(bookIndex, 1);

        paging.drawContent();
        paging.drawPage();
      }).fail(function() {
        Materialize.toast('更新失敗', 2000);
      });   
    });

    $('.deleteBtn').unbind('click');
    $('.deleteBtn').click(function() {
      var request = {};
      var id = $(this).data('bookid');
      var bookIndex = $(this).data('bookindex');

      request.id = id;
      console.log(request);
      $.post(`${web_root}/api/book/delete`, request, function(response) {
        console.log(response);
        Materialize.toast('刪除成功', 2000);
        book_data.splice(bookIndex, 1);

        paging.drawContent();
        paging.drawPage();
      }).fail(function() {
        Materialize.toast('刪除失敗', 2000);
      });   
    });

    $('#open-edit-modal').unbind('click');
    $('#open-edit-modal').click(function() {
      $('#edit-modal .create').css('display', 'block');
      $('#edit-modal .edit').css('display', 'none');
      outside.empty();
      
      $('#edit-modal').modal('open');
    });

    $('.result-item-content').unbind('click');
    $('.result-item-content').click(function() {
      $('#edit-modal .create').css('display', 'none');
      $('#edit-modal .edit').css('display', 'block');

      var bookIndex = $(this).data('bookindex');
      outside.fill(book_data[bookIndex]);
      
      $('#editBtn').data('id', book_data[bookIndex]['id']);
      $('#editBtn').data('bookindex', bookIndex);
      $('#edit-modal').modal('open');
    });
  }
};

async function init() {
  getDataFromDom();
  
  // init filter
  filter.init();
  $('#search-all').prop('checked', true);
  $('#search-all').change();

  // init list
  paging.drawContent();
  paging.drawPage();

  $('select').material_select();
  $('#edit-modal').modal({
    startingTop: '0%',
    endingTop: '0%'
  });
}

(function() {
  init();
})();
