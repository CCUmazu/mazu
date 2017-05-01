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

function faker(ending) {
    var i;
    var data = [];
    for(i=0; i<ending; i++) {
        data.push({
            bookType: Math.floor(Math.random()*10) % 4,
            author: `${i}sdfsd`,
            publicationDate: 'sfdfd',
            title: 'sdfsdf',
            bookName: 'asdasd',
            editor: 'sdfsdf',
            publishingLocation: 'sfsdf',
            publisher: 'sdfsdf',
            period: 'sdfsdf',
            chapter: 'sdfsdf',
            page: 'sfsdf',
            department: 'sdfsdf',
            thesis: 'sdfs',
            ISBN: 'sdfsdf',
            ISSN: 'sssss'
        });
    }

    return data;
}

(function() {
    $('select').material_select();
    $('.modal').modal({
      startingTop: '0%',
      endingTop: '0%'
    });

    paging.data = faker(314);
    paging.drawContent();
    paging.drawPage();
})();
