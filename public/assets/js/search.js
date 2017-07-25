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
    var concat_str;


    for(i=(this.curPage-1)*this.perPage, j=0; i<book_data.length && j<this.perPage; i++, j++) {
      book = book_data[i];
      category = concat.categoryStr(book['categoryId']);
      type = type_data[book.typeId];
      concat_str = concat.entry(book);

      text += `<div class="row result-item">`;
      text += `<div class="col s9 result-item-content">`;
      text += `<div class="row">${category}</div>`;
      text += `<div class="row">${type}</div>`;
      text += `<div class="row">${concat_str}</div>`;
      text += `</div>`;// end s9
      text += `<div class="col s3">`;
      text += `<div class="row button-wrapper center">`;
      text += `<div class="col s12"><a href="${web_root}/api/download/ris/${book.id}"><button class="btn btn-default">匯出 RIS</button></a></div>`;
      text += `<div class="col s12"><button class="btn btn-default light-green copy" data-value="${concat_str}">複製</button></div>`
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

    $('.copy').unbind('click');
    $('.copy').click(function() {
      // Get value
      var value = $(this).data('value');

      $('body').append('<textarea id="clip_area"></textarea>');
      var clip_area = $('#clip_area');
      clip_area.text(value);
      clip_area.select();
      document.execCommand('copy');
      clip_area.remove();

      Materialize.toast('已複製至您的剪貼簿', 2000);
    });
  }
};

async function init() {
  // get data
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
