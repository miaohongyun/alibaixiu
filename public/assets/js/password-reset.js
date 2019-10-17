$('#modifyForm').on('submit', function() {
    var formData = $(this).serialize(); // 获取表单数据
    console.log('111');

    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            location.href = '/admin/login.html'
        }

    })
    return false
})