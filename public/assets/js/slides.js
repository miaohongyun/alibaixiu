$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        var html = template('slidesTpl', { data: res });
        $('#slidesBox').html(html);
    }
})
$("#file").on('change', function() {
        var file = this.files[0]; // 获取当前文件的数据
        var formData = new FormData();
        formData.append('avatar', file);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {

                $('#hiddenImage').val(res[0].avatar)
            }
        })
    })
    // 轮播图提交时
$('#slidesForm').on('submit', function() {
        var formData = $(this).serialize(); // 获取表单输入内容
        $.ajax({
            type: 'post',
            url: '/slides',
            data: formData,
            success: function(res) {
                location.reload();
                console.log(1);
            }
        })
        return false;
    })
    // 删除功能
$('#slidesBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: `/slides/${id}`,
        success: function() {
            location.reload()
        }
    })
})