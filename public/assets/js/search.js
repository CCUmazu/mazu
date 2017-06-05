var type_data = {}
var category_data = {}
var classify_data = [];
var book_data = [];

// the same part as manage.js
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
  console.log(type_data, category_data);
}

var order = {

};

// ----------------------------
// different part

async function init() {
  await getData();
  
  console.log(classify_data);
  classify_data.sort(cmp);
  console.log(classify_data);

  paging.drawContent();
  paging.drawPage();

  $('select').material_select();
  $('#edit-modal').modal({
    startingTop: '0%',
    endingTop: '0%'
  });
}

var paging = {
  data: [],
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


    for(i=(this.curPage-1)*this.perPage, j=0; i<classify_data.length && j<this.perPage; i++, j++) {
      book = book_data[classify_data[i].index];
      category = category_data[classify_data[i].categoryId];
      type = type_data[classify_data[i].typeId];

      text += `<div class="row result-item">`;
      text += `<div class="col s9 result-item-content" data-dindex="${book.id}">`;
      text += `<div class="row">${category} - ${type}</div>`;
      text += `<div class="row title"><b>${book.title}</b></div>`;
      text += `<div class="row author">${book.author}</div>`;
      text += `<div class="row"></div>`;
      text += `</div>`;// end s9
      text += `<div class="col s3">`;
      text += `<div class="row button-wrapper center">`;
      text += `<a href="${web_root}/api/download/ris/${book.id}"><button class="btn btn-default">匯出 RIS</button></a>`;
      text += `</div>`;// end button-wrapper
      text += `</div>`;// end s3
      text += `</div>`;// end result-item
    }

    $('.content-container').html(text);
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

    console.log(leftPage);
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

    $('tbody tr').unbind('click');
    $('tbody tr').click(function() {
      var dindex = $(this).data('dindex');
      var data = outside.data[dindex];

      $(`#bookType[value="${data.bookType}"]`).prop('checked', true);
      $('#author').html(data.author);
      $('#publicationDate').html(data.publicationDate)
      $('#title').html(data.title);
      $('#bookName').html(data.bookName);
      $('#editor').html(data.editor);
      $('#publishingLocation').html(data.publishingLocation);
      $('#publisher').html(data.publisher);
      $('#period').html(data.period);
      $('#chapter').html(data.chapter);
      $('#page').html(data.page);
      $('#department').html(data.department);
      $('#thesis').html(data.thesis);
      $('#ISBN').html(data.ISBN);
      $('#ISSN').html(data.ISSN);
    });
  }
};

