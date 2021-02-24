//method to submit post by using AJAX
{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                },error: function(err){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a post in DOM
    createPost();
}