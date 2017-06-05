var web_root = '';

$(function() {
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        if(options.type.toLowerCase() === 'post') {
            options.data = options.data || '';
            options.data += options.data?'&':'';
            options.data += '_token=' + csrf_token;
        }
    });
});
