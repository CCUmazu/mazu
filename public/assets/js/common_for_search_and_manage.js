// the same part in search.js and manage.js
//

var type_data = {};
var category_data = {};
var book_data = [];
var without_filter_book_data = [];
var classify_data = {};

function cmp(a, b) {
  return (a['categoryId'][0] - b['categoryId'][0]) || (a['typeId'] - b['typeId']) || (a['id'] - b['id']);
}

function getDataFromDom() {
  // get data from dom
  var data = {};
  
  book_data = JSON.parse($('#books').val());
  data.typeData = JSON.parse($('#types').val());
  data.categoryData = JSON.parse($('#categories').val());
  data.classifyData = JSON.parse($('#classify').val());

  // classification
  for(var i=0; i<data.typeData.length; i++) {
    type_data[data.typeData[i]['id']] = data.typeData[i]['type'];
  }
  for(var i=0; i<data.categoryData.length; i++) {
    // map category_id and name
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
  swit = false;
  for(var i=0; i<book_data.length; i++) {
    bookId = book_data[i].id;
    if(classify_data[bookId]) {
        swit = true;
        book_data[i]['categoryId'] = classify_data[bookId]['categoryId'];
        book_data[i]['typeId'] = classify_data[bookId]['typeId'];

        // copy to maintain raw data
        without_filter_book_data.push(book_data[i]);
    }
  }
  if(swit) {
    book_data.sort(cmp);
  }
}

async function getDataFromServer() {
  // get data from server
  var config = {method: 'GET'};
  var book_res = await fetch(`${web_root}/api/book/getAll`, config);

  if(book_res.ok) {
    await book_res.json().then((data) => {
      book_data = data.bookData;
    });
  }
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
          for(var k=0; categories!=null && k<categories.length; k++) {
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
    var target = keyword.split(' ');
    var exist;
    var temp_data = [];

    // copy and check
    for(var i=0; i<book_data.length; i++) {
      book = book_data[i];
      
      exist = false;
      for(var j=0; j<target.length; j++) {
        for(var key in book) {
          if(key=='categoryId' && key=='id' && key=='typeId') {
            continue;
          }

          if(String(book[key]).match(target[j])!==null) {
            exist = true;
            break;
          }
        }

        if(exist) {// find at least one, and then quit
          break;
        }
      }

      if(exist) {// find it
        temp_data.push(book);
      }
    }
    
    console.log('search number:' + temp_data.length);
    // write back
    book_data = [];
    for(var i=0; i<temp_data.length; i++) {
      book_data.push(temp_data[i]);
    }
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
        $('#search-category').val([]);
        $('select').material_select();
      }
    });

    $('#search-btn').unbind('click');
    $('#search-btn').click(function() {
      // reset
      book_data = [];
      
      // filter
      outside.category();
      outside.keyword();
      book_data.sort(cmp);

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
    var special='〈〉，。《》';
    var text = '';
    var temp = '';
    
    // 並非每一次都要檢查它是否為空
    // 因為有可能是好幾個物件
    switch(chars) {
      case 0:// Chinese Mode
        if(!this.isEmpty(str)) {// 一般
          text += `${str}。`;
        }
        break;
      case 1:
        if(!this.isEmpty(str)) {// 篇名
          text += `〈${str}〉。`;
        }
        break;
      case 2:
        if(!this.isEmpty(str)) {// 書名
          text += `《${str}》。`
        }
        break;
      case 3:
        if(!this.isEmpty(str)) {// 出版地點
          text += `${str}：`
        }
        break;
      case 4:
        if((!this.isEmpty(str.chapter)) && (!this.isEmpty(str.period))) {
          text += `${str.chapter}(${str.period}): `;
        } else if(!this.isEmpty(str.chapter)) {
          text += `${str.chapter}: `;
        }
        break;
      case 5:
        if(!this.isEmpty(str)) {// 專書論文書名
          text += `收於《${str}》。`
        }
        break;
      case 6:
        if(!this.isEmpty(str)) {// 專書論文編輯者
          text += `${str}主編。`
        }
        break;
      case 7:
        if(!this.isEmpty(str.publisher) && !this.isEmpty(str.page)) {// 專書論文最後一段
          text += `${str.publisher}，${str.page}。`;
        } else if(!this.isEmpty(str.publisher)) {
          text += `${str.publisher}。`;
        } else {
          text += `${str.page}。`;
        }
        break;
      case 8:
        temp = '';
        temp += this.addChars(str, 4);// get period
        temp += this.addChars(str.page, 0);// get page
        temp = temp.slice(0, -1);// remove 。

        if(!this.isEmpty(str.bookName) && !this.isEmpty(temp)) {// 期刊論文最後一段
          text += `《${str.bookName}》${temp}。`;
        } else if(!this.isEmpty(str.bookName)) {
          text += `《${str.bookName}》。`;
        }
        
        break;
      case 11:// English Mode
        if(!this.isEmpty(str)) {// 英文一般
          text += `${str}. `;
        }
        break;
      case 12:
        if(!this.isEmpty(str)) {// 英文篇名
          text += `"${str}" `;
        }
        break;
      case 13:
        if(!this.isEmpty(str)) {
          text += `${str}: `;
        }
        break;
      case 14:
        if(!this.isEmpty(str)) {// 英文編輯者
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
      switch(book.typeId) {
        case 1:
          return this.ChineseMode1(book);
          break;
        case 2:
          return this.ChineseMode2(book);
          break;
        case 3:
          return this.ChineseMode3(book);
          break;
        case 4:
          return this.ChineseMode4(book);
          break;
      }
    } else {// English
      return this.EnglishMode(book);
    }
  },

  ChineseMode1: function(book) {// 專書
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

  ChineseMode2: function(book) {// 專書論文
    var text = '';
    
    text += this.addChars(book.author, 0);
    text += this.addChars(book.publicationDate, 0);
    text += this.addChars(book.title, 1);
    text += this.addChars(book.bookName, 5);
    text += this.addChars(book.editor, 6);
    text += this.addChars(book.publishingLocation, 3);
    text += this.addChars(book, 7);

    return text;
  },

  ChineseMode3: function(book) {// 期刊論
    var text = '';
    
    text += this.addChars(book.author, 0);
    text += this.addChars(String(book.publicationDate), 0);
    text += this.addChars(book.title, 1);
    text += this.addChars(book, 8);

    return text;
  },

  ChineseMode4: function(book) {// 碩博士論文
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

      if(categories) {
        for (var i = 0; i < categories.length; i++) {
            if (i + 1 != categories.length) {// if not end, need a comma
                text += `${category_data[categories[i]]}, `
            } else {
                text += `${category_data[categories[i]]}`
            }
        }
      }
      return text;
  }
};


