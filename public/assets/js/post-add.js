//向服务端发送请求 获取文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(res) {
        var html = template('categoryTpl', { data: res });
        $('#category').html(html);

    }
})
$('#feature').on('change', function() {
    var file = this.files[0]; //获取到选择的文件
    // 创建formdata对象 实现二兼职文件上传
    var fd = new FormData();
    fd.append('cover', file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function(res) {
            $('.thumbnail').attr('src', res[0].cover).show()
            $('#thumbnail').val(res[0].cover)
        }
    })
})
$('#addForm').on('submit', function() {
    var forData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: forData,
        success: function(res) {
            location.href = 'posts.html'
        }
    })
    return false;
})