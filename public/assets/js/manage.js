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
            text += `<tr>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].author}</td>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].publicationDate}</td>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].title}</td>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].bookName}</td>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].editor}</td>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].publishingLocation}</td>`;
            text += `<td class="view-detail" data-target="edit" data-dindex="${i}">${this.data[i].publisher}</td>`;
            text += `<td><button class="btn btn-default red">刪除</button></td>`;
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

        $('tbody tr .view-detail').unbind('click');
        $('tbody tr .view-detail').click(function() {
            var dindex = $(this).data('dindex');
            var data = outside.data[dindex];

        });
    }
};

var form = {
    empty: function() {

    },

    get: function() {
        var rtl = {
            bookType: (Math.floor(Math.random()*10) % 4) + 1,
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
        $('#bookType').val();
        $('#author').val();
        $('#publicationDate').val();
        $('#title').val();
        $('#bookName').val();
        $('#editor').val();
        $('#publishingLocation').val();
        $('#publisher').val();
        $('#period').val();
        $('#chapter').val();
        $('#page').val();
        $('#department').val();
        $('#thesis').val();
        $('#ISBN').val();
        $('#ISSN').val(); 
    },

    formEvent: function() {
        var outside = this;

        $('#createBtn').click(function() {
            var request = outside.get();

            $.post('/api/book/create', request, function(response) {
                console.log(response);
            }).fail(function() {
                console.log('server error');
            });
        });
    }
};

function getData() {
    var request = {};
    $.get('/api/book/get', request, function(response) {
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
    $('#edit-modal').modal();

    $('#open-edit-modal').click(function() {
        $('#edit-modal').modal('open');
    });

    paging.data = faker(314);
    paging.drawContent();
    paging.drawPage();

    form.formEvent();

    getData();
})();
