var paging = {
    data: [],
    curPage: 1,
    perPage: 10,
    totalPage: 0,
    
    drawContent: function() {
        var text = '';
        var i;
        var j;

        for(i=(this.curPage-1)*this.perPage, j=0; i<this.data.length && j<this.perPage; i++, j++) {
          text += `<div class="row result-item">`;
          text += `<div class="col s9">`;
          text += `<div class="row title"><b>${this.data[i].title}</b></div>`;
          text += `<div class="row author">${this.data[i].author}</div>`;
          text += `<div class="row"></div>`;
          text += ``;
          text += ``;
          text += ``;
          text += `</div>`;// end s9
          text += `<div class="col s3">`;
          text += `<div class="row"><button class="btn waves-effect">Export RIS</button></div>`
          text += `</div>`;// end s3
          text += `</div>`;// end result-item
        }

        $('.content-container').html(text);   
    },

    drawTable: function() {
        var text = '';
        var i;
        var j;
        

        for(i=(this.curPage-1)*this.perPage, j=0; i<this.data.length && j<this.perPage; i++, j++) {
            text += `<tr data-target="detail-modal" data-dindex="${i}">`;
            text += `<td>${this.data[i].author}</td>`;
            text += `<td>${this.data[i].publicationDate}</td>`;
            text += `<td>${this.data[i].title}</td>`;
            text += `<td>${this.data[i].bookName}</td>`;
            text += `<td>${this.data[i].editor}</td>`;
            text += `<td>${this.data[i].publishingLocation}</td>`;
            text += `<td>${this.data[i].publisher}</td>`;
            text += `</tr>`;
        }
        
        $('tbody').html(text);
    },

    drawPage: function() {
        var text = '';
        var i;
        var j;
        
        var totalPage = Math.floor(this.data.length / this.perPage) + 1;
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

function getData() {
    var request = {};
    $.post('/', request, function(response) {
        console.log(response);
    });
}

function genData(ending) {
    var i;
    var data = [];
    var category = [
      '章節',
      '通論',
      '信仰與經典',
      '媽祖文化與比較研究',
      '歷史、事蹟與傳說',
      '儀式與祭典',
      '進香',
      '祭祀活動與組織',
      '媽祖廟糾紛與爭論',
      '兩岸交流',
      '媽祖信仰與政治',
      '媽祖信仰的傳播',
      '觀光與文化政策',
      '信仰與社區組織',
      '區域媽祖廟研究',
      '單一媽祖廟研究(含廟誌)',
      '建築、藝術',
      '社會經濟',
      '其他'
    ];

    var type = [
      '專書',
      '專書論文',
      '期刊論',
      '碩博士論文'
    ];

    faker.locale = 'zh_TW';
    for(i=0; i<ending; i++) {
        data.push({
            category: category[Math.floor(Math.random()*100) % 18],
            bookType: type[Math.floor(Math.random()*10) % 4],
            author: faker.name.firstName() + faker.name.lastName(),
            publicationDate: faker.date.past(),
            title: faker.lorem.sentence(),
            bookName: faker.lorem.word(),
            editor: faker.name.firstName() + faker.name.lastName(),
            publishingLocation: faker.address.city(),
            publisher: faker.company.companyName(),
            period: Math.floor(Math.random()*100) % 58 + 14,
            chapter: Math.floor(Math.random()*100) % 30 + 1,
            page: Math.floor(Math.random()*100) % 58 + 1,
            department: faker.commerce.department(),
            thesis: faker.lorem.word(),
            ISBN: faker.phone.phoneNumberFormat(),
            ISSN: faker.phone.phoneNumberFormat()
        });
    }
    
    console.log(data);
    return data;
}

(function() {
    $('select').material_select();
    $('.modal').modal({
      startingTop: '0%',
      endingTop: '0%'
    });

    paging.data = genData(137);
    paging.drawContent();
    paging.drawPage();
})();
