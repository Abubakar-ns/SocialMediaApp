
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
                    let newPost = newPostDom(data.data.post);
                    console.log(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(err){
                    console.log(error.responseText);
                }
            });
        });
        
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                 
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>

                        </small>
               
                    </p>
                    <h3>${post.user.name}</h3>
                    <h5>${post.content}</h5>

                    <div class="post-comment">
                        <form action="/comments/create" id="new-comment-form" method="POST">
                            <input type="text" name="content" placeholder="Add a comment..." required >
                            <input type="hidden" name="post" value="${post._id}" >
                            <input type="submit" value="Add Comment">
                        </form>
                        
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id}">
                            
                        </ul>
                    </div>
                </div>
    </li>`)
    }
    //method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
            
        });
    }



    convertPostsToAjax();
    createPost();
    
   

}
