var type_data = {};
var category_data = {};
var book_data = [];
var without_filter_book_data = [];
var classify_data = {};

// the same part as search.js
//
// closure
// cmp function
// getData function

(function() {
  init()
})();

function cmp(a, b) {
  return (a['categoryId'][0] - b['categoryId'][0]) || (a['typeId'] - b['typeId']) || (a['id'] - b['id']);
}

async function getData() {
  // get data from server
  var config = {method: 'GET'};
  var book_res = await fetch(`${web_root}/api/book/getAll`, config);

  if(book_res.ok) {
    await book_res.json().then((data) => {
      book_data = data.bookData;
    });
  }
  
  // get data from dom
  var data = {};

  data.typeData = JSON.parse($('#types').val());
  data.categoryData = JSON.parse($('#categories').val());
  data.classifyData = JSON.parse($('#classify').val());
  for(var i=0; i<data.typeData.length; i++) {
    type_data[data.typeData[i]['id']] = data.typeData[i]['type'];
  }
  for(var i=0; i<data.categoryData.length; i++) {
    category_data[data.categoryData[i]['id']] = data.categoryData[i]['name'];
  }
  for(var i=0; i<data.classifyData.length; i++) {
    bookId = data.classifyData[i].bookId;
    categoryId = data.classifyData[i].categoryId;
    typeId = data.classifyData[i].typeId;
    
    if(!(bookId in classify_data)) {
      classify_data[bookId] = {};
      classify_data[bookId]['categoryId'] = [categoryId];
      classify_data[bookId]['typeId'] = typeId;
    } else {
      classify_data[bookId]['categoryId'].push(categoryId);
    }
  }
 
  // connection book and classify
  for(var i=0; i<book_data.length; i++) {
    bookId = book_data[i].id;
    book_data[i]['categoryId'] = classify_data[bookId]['categoryId'];
    book_data[i]['typeId'] = classify_data[bookId]['typeId']
    
    // copy to maintain raw data
    without_filter_book_data.push(book_data[i]);
  }
  book_data.sort(cmp);
}

var filter = {
  category: function() {
    var all_or_not = $('#search-all').prop('checked');
    var categories = $('#search-category').val();
    var book;
    var exist;
       
    if(all_or_not) {// copy all, because select all category
      for(var i=0; i<without_filter_book_data.length; i++) {
        book_data.push(without_filter_book_data[i]);
      }
    } else {
      for(var i=0; i<without_filter_book_data.length; i++) {
        book = without_filter_book_data[i];
        exist = false;
        for(var j=0; j<book.categoryId.length; j++) {
          for(var k=0; k<categories.length; k++) {
            if(categories[k] == book.categoryId[j]) {
              exist = true;
              break;
            }
          }
        }

        if(exist) {
          book_data.push(book);
        }
      }
    }
  },

  keyword: function() {
    var keyword = $('#search-word').val();
  },

  init: function() {
    var outside = this;

    $('#search-all').unbind('change');
    $('#search-all').change(function() {
      var all_or_not = $('#search-all').prop('checked');

      if(all_or_not) {
        $('.without-search-all').css('display', 'none');
      } else {
        $('.without-search-all').css('display', 'block');
      }
    });

    $('#search-btn').unbind('click');
    $('#search-btn').click(function() {
      // reset
      book_data = [];
      
      // filter
      outside.category();
      outside.keyword();

      // draw
      paging.drawContent();
      paging.drawPage();
    });
  }
};

var concat = {
  isEmpty: function(str) {
    return (str=='') ? true : false;
  },
  
  addChars: function(str, chars) {
    var special='〈〉。《》';
    var text = '';

    switch(chars) {
      case 0:// Chinese Mode
        if(!this.isEmpty(str)) {
          text += `${str}。`;
        }
        break;
      case 1:
        if(!this.isEmpty(str)) {
          text += `〈${str}〉。`;
        }
        break;
      case 2:
        if(!this.isEmpty(str)) {
          text += `《${str}》。`
        }
        break;
      case 3:
        if(!this.isEmpty(str)) {
          text += `${str}：`
        }
        break;
      case 4:
        if((!this.isEmpty(str.chapter)) && (!this.isEmpty(str.period))) {
          text += `${str.chapter}(${str.period}):`;
        } else if(!this.isEmpty(str.chapter)) {
          text += `${str.chapter}:`;
        }
        break;
      case 11:// English Mode
        if(!this.isEmpty(str)) {
          text += `${str}. `;
        }
        break;
      case 12:
        if(!this.isEmpty(str)) {
          text += `“${str}” `;
        }
        break;
      case 13:
        if(!this.isEmpty(str)) {
          text += `${str}: `;
        }
        break;
      case 14:
        if(!this.isEmpty(str)) {
          text += `Edited by ${str}. `;
        }
        break;
    }

    return text;
  },

  entry: function(book) {
    // check language
    rules = /^[A-Za-z,. ]+$/;
    
    if(
      ((String(book.bookName).match(rules)) === null) || 
      ((String(book.title).match(rules)) === null)
    ) {// Chinese
      return this.ChineseMode(book);
    } else {// English
      return this.EnglishMode(book);
    }
  },

  ChineseMode: function(book) {
    var text = '';
    
    text += this.addChars(book.author, 0);
    text += this.addChars(book.publicationDate, 0);
    text += this.addChars(book.title, 1);
    text += this.addChars(book.bookName, 2);
    text += this.addChars(book.editor, 0);
    text += this.addChars(book.publishingLocation, 3);
    text += this.addChars(book.publisher, 0);
    text += this.addChars(book.department, 0);
    text += this.addChars(book.thesis, 0);
    text += this.addChars(book, 4);
    text += this.addChars(book.page, 0);

    return text;
  },

  EnglishMode: function(book) {
    var text = '';
    
    text += this.addChars(book.author, 11);
    text += this.addChars(book.publicationDate, 11);
    text += this.addChars(book.title, 12);
    text += this.addChars(book.bookName, 11);
    text += this.addChars(book.editor, 14)
    text += this.addChars(book.publishingLocation, 13);
    text += this.addChars(book.publisher, 11);
    text += this.addChars(book, 4);
    text += this.addChars(book.page, 11);

    if(text[text.length-1] == ' ') {
      text.slice(0, -1);
    }

    return text;
  },

  categoryStr: function(categories) {
    var text = '';
    for(var i=0; i<categories.length; i++) {
      if(i+1 != categories.length) {// if not end, need a comma
        text += `${category_data[categories[i]]}, `
      } else {
        text += `${category_data[categories[i]]}`
      }
    }

    return text;
  }
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
      text += `<button class="btn btn-default lime result-item-content" data-bookindex="${i}">編輯</button>`;
      text += `<button class="btn btn-default red deleteBtn" data-bookid="${book.id}">刪除</button>`;
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

    var totalPage = Math.floor(book_data.length / this.perPage) + 1;
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

    $('#editBtn').unbind('click');
    $('#editBtn').click(function() {
      var request = outside.get();
      var id = $(this).data('id');
      request.id = id;

      console.log(request);
      $.post(`${web_root}/api/book/update`, request, function(response) {
        console.log(response);
        Materialize.toast('更新成功, 重整頁面之後資料才會顯示', 2000);
      }).fail(function() {
        Materialize.toast('更新失敗', 2000);
      });   
    });

    $('.deleteBtn').unbind('click');
    $('.deleteBtn').click(function() {
      var request = {};
      var id = $(this).data('bookid');

      request.id = id;
      console.log(request);
      $.post(`${web_root}/api/book/delete`, request, function(response) {
        console.log(response);
        Materialize.toast('刪除成功, 重整頁面之後資料才會顯示', 2000);
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
      $('#edit-modal').modal('open');
    });
  }
};

async function init() {
  await getData();
  
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

