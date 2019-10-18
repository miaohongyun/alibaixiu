// 向服务器索要文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);


    }
})
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { data: res });
        $('#categoryBox').html(html)
    }
})

function dateFormat(date) {
    date = new Date(date)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
$('#filterForm').on('submit', function() {
    var formData = $(this).serialize();
    // 收集表单数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html)
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    })
    return false
})

function changePage(pageNum) {
    // 向服务器索要文章列表
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: pageNum
        },
        success: function(res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
            console.log(res);

        }
    })
}