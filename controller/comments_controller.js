const Comment =require('../model/comment');
const User = require('../model/user');
const Post = require('../model/post');
module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}


module.exports.destroy = function(req,res){

    //now we are getting our comment id in the pparam 
    let commentId = req.query.commentId;
    Comment.findById(commentId , function(err,comment) {

        if(err){
            console.log("Error finding comment to be deleted : ",err);
            return;
        }

        if(comment){

            //check of the guy deleting the comment is the one who posted the comment
            if(comment.user == req.user.id || req.query.postAuthor  == req.user.id ){

                postId = comment.post;
                comment.remove();

                //now we must delete the id of the this comment from the array of comments in our post
                Post.findByIdAndUpdate(postId ,{ $pull: {comments : commentId}} , function(err, comment){
                    if(err){
                        console.log("comment not found in post : " , err);
                        return;
                    }

                    return res.redirect('back');
                });

            }else{
                return res.redirect('back');
            }
        }

    });



}