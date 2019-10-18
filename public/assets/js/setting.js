$('#logo').on('change', function() {
    var file = this.files[0];
    var fr = new FormData();
    fr.append('logo', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fr,
        processData: false,
        contentType: false,
        success: function(res) {
            $('#hiddenImage').val(res[0].logo);
            $('#preview').attr('src', res[0].logo)
        }
    })
})