$(document).ready(function() {
    $('select').material_select();
});

$('#submitBtn').click(function() {
    var insertData = {
        _token: $("meta[name='csrf-token']").attr("content"),
        bookType: $('#bookType').val(),
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

    $.ajax({
        url: '/api/book/create',
        type: "POST",
        data: insertData,
        error: function (error) {
            Materialize.toast('<span>server error!</span>', 5000, 'rounded');
            return;
        },
        success: function (result) {
            console.log(result);
        }
    });
});
