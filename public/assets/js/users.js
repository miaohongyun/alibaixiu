$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        var html = template('userTpl', { data: res });

        $('#usersBox').html(html)
    }
})

$('#userForm').on('submit', function() {
    var formData = $(this).serialize(); //用jq方法获取表单数据
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(res) {
            location.reload(); //刷新当前页面
        }


    })


    return false; //兼容性最强 组织提交
})
$('#modifyBox').on('change', '#avatar', function() {
    var fd = new FormData();
    fd.append('avater', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        //jq默认我们传递是一个对象，他会帮我们转换为键值对的形式
        //但是我们现在数据文件上传
        processData: false,
        contentType: false,
        data: fd,
        success: function(res) {

            $('#hiddenImg').val(res[0].avater);
            $('#preview').attr('src', res[0].avater);
        }
    })
})

$('#usersBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    console.log(id);

    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html)
        }
    })
})
$('#modifyBox').on('submit', '#modifyForm', function() {
    console.log($(this).serialize()); //自动收集表单里面的信息
    var id = $(this).attr('data-id');
    console.log(id);

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: $(this).serialize(),
        success: function(res) {
            location.reload()
                // console.log(res);

        }
    })

    return false;
})
$('#usersBox').on('click', '.del', function() {
        if (confirm('确认要删除吗')) {
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function() {
                    location.reload();
                }
            })
        }
    })
    //批量删除功能
$('#checkAll').on('change', function() {
        var bool = $(this).prop('checked');
        var checkList = $('#usersBox input[type="checkbox"]'); //找到所有的INPUT复选框
        checkList.prop('checked', bool); //给所有的框加状态
        if (bool) {
            $('#deleteAll').show();
        } else {
            $('#deleteAll').hide();
        }
    })
    // 全选效果的切换
$('#usersBox').on('change', 'input[type="checkbox"]', function() {
        if ($('#usersBox input[type="checkbox"]').length == $('#usersBox input[type="checkbox"]:checked').length) { // 当所有的复选框数量和打钩的复选框数量一样时
            $('#checkAll').prop('checked', true)
        } else {
            $('#checkAll').prop('checked', false)
        }
        if ($('#usersBox input[type="checkbox"]:checked').length > 1) {
            $('#deleteAll').show();
        } else {
            $('#deleteAll').hide();
        }
    })
    // 全部删除
$('#deleteAll').on('click', function() {
    if (confirm('确定要删除吗')) {
        var checkList = $('#usersBox input[type="checkbox"]:checked'); //选出所有打钩的复选框
        var str = "";
        checkList.each(function(index, item) {


            str += $(item).attr('data-id') + '-'
        })
        str = str.substr(0, str.length - 1)
        $.ajax({
            type: 'delete',
            url: '/users/' + str,
            success: function(res) {
                location.reload();
            }
        })
    }

})