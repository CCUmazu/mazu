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


