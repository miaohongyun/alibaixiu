$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        var html = template('commentsTpl', res);
        $('#commentsBox').html(html)
        var page = template('pageTpl', res);
        $('.pagination').html(page) //分页的渲染
    }
})


function dateFormat(date) {
    date = new Date(date)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
// 上一页 下一页
function changePage(pageNum) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: pageNum
        },
        success: function(res) {
            var html = template('commentsTpl', res);
            $('#commentsBox').html(html)
            var page = template('pageTpl', res);
            $('.pagination').html(page) //分页的渲染
        }
    })
}
//批准拨回
$('#commentsBox').on('click', '.status', function() {
    var id = $(this).parent().attr('data-id');
    var status = $(this).parent().attr('data-status');
    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        data: {
            status: status == 1 ? 0 : 1
        },
        success: function(res) {
            location.reload()
        }
    })

})

//删除功能
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('确定要删除评论')) {
        var id = $(this).parent().attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function() {
                location.reload()
            }
        })
    }

})