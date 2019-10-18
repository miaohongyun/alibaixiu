$.ajax({ //文章数量
        type: 'get',
        url: '/posts/count',
        success: function(res) {
            $('#postsBox').html(`<strong>${res.postCount}</strong>篇文章（<strong>${res.draftCount}</strong>篇草稿）`)
        }
    })
    // $.ajax({ //分类数量
    //     type:'get',
    //     url:'/categories/count',
    //     success:function(res){

//     }
// })
// $.ajax({ //评论数量
//     type:'get',
//     url:'/categories/count',
//     success:function(res){

//     }
// })