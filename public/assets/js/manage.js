var type_data = {};
var category_data = {};
var classify_data = [];
var book_data = [];

// the same part as search.js
//
// closure
// cmp function
// getData function

(function() {
  init()
})();

function cmp(a, b) {
  return (a['categoryId'] - b['categoryId']) || (a['typeId'] - b['typeId']) || (a['bookId'] - b['bookId']);
}

async function getData() {
  // get data from server
  var config = {method: 'GET'};
  var book_res = await fetch(`${web_root}/api/book/getAll`, config);
  var classify_res = await fetch(`${web_root}/api/classify/getAll`, config);

  if(book_res.ok && classify_res.ok) {
    await book_res.json().then((data) => {
      book_data = data.bookData;
    });

    await classify_res.json().then((data) => {
      classify_data = data.classifyData;
      for(var i=0; i<data.classifyData.length; i++) {
        classify_data[i]['index'] = i;
      }
    });
  }
  
  // get data from dom
  var data = {};

  data.typeData = JSON.parse($('#types').val());
  data.categoryData = JSON.parse($('#categories').val());
  for(var i=0; i<data.typeData.length; i++) {
    type_data[data.typeData[i]['id']] = data.typeData[i]['type'];
  }
  for(var i=0; i<data.categoryData.length; i++) {
    category_data[data.categoryData[i]['id']] = data.categoryData[i]['name'];
  }
  //console.log(type_data, category_data);
}

var concat = {
  category: function(type) {
    if(type == 1) {
    
    } else if(type == 2) {
    
    } else if(type == 3) {
    
    } else if(type == 4) {
    
    }
  },

  isEmpty: function() {
  
  },

  language: function() {
  
  },

  ChineseSpell: function() {
  
  },

  EnglishSpell: function() {
  
  },
};

// ----------------------------
// different part

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
    var type;
    var index;

    for(i=(this.curPage-1)*this.perPage, j=0; i<classify_data.length && j<this.perPage; i++, j++) {
      index = classify_data[i].index;
      book = book_data[index];
      category = category_data[classify_data[i].categoryId];
      type = type_data[classify_data[i].typeId];

      text += `<div class="row result-item">`;
      text += `<div class="col s9">`;
      text += `<div class="row">${category} - ${type}</div>`;
      text += `<div class="row">`;
      text += `${book.author}。${book.publicationDate}。`;
      text += `〈${book.title}〉。《${book.bookName}》`;
      text += `。${book.publishingLocation}: ${book.publisher}`;
      text += `</div>`;
      text += `<div class="row"></div>`;
      text += `</div>`;// end s9
      text += `<div class="col s3">`;
      text += `<div class="row button-wrapper center">`;
      text += `<button class="btn btn-default lime result-item-content">編輯</button>`;
      text += `<button class="btn btn-default red item-delete-btn" data-bookid="${book.id}">刪除</button>`;
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

    var totalPage = Math.floor(classify_data.length / this.perPage) + 1;
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
      bookType: $('#bookType')[0].value,
      bookClassification: $('#category').val(),
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

  fill: function(data, category) {
    this.empty();

    $('#category')[0].value = category;
    $('#bookType')[0].value = data['bookType'];
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

  formEvent: function() {
    var outside = this;

    $('#createBtn').unbind('click');
    $('#createBtn').click(function() {
      var request = outside.get();

      console.log(request);
      $.post(`${web_root}/api/book/create`, request, function(response) {
        console.log(response);
        Materialize.toast('新增成功, 重整頁面之後資料才會顯示', 2000);
      }).fail(function() {
        Materialize.toast('新增失敗', 2000);
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
      var category = $(this).data('category');

      outside.fill(book_data[bookIndex], category);

      $('#edit-modal').modal('open');
    });
  }
};

async function init() {
  await getData();

  classify_data.sort(cmp);

  paging.drawContent();
  paging.drawPage();

  $('select').material_select();
  $('#edit-modal').modal({
    startingTop: '0%',
    endingTop: '0%'
  });
}

