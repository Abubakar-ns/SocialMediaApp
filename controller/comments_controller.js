const Comment =require('../model/comment');
const User = require('../model/user');
const Post = require('../model/post');
module.exports.create = async function(req, res){
    try{
        let post=await Post.findById(req.body.post);
        if (post){
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            req.flash('success','Comment Added');
            res.redirect('/');
            
        }
    }catch(err){
        req.flash('Error','Error in Adding Comment');
        return;
    }
}   


module.exports.destroy = async function(req,res){

    //now we are getting our comment id in the pparam 
    try{
        let commentId = req.query.commentId;
        let comment=await Comment.findById(commentId);
        if(comment){
                //check of the guy deleting the comment is the one who posted the comment
                if(comment.user == req.user.id || req.query.postAuthor  == req.user.id ){
                    postId = comment.post;
                    comment.remove();
                    //now we must delete the id of the this comment from the array of comments in our post
                    let post=await Post.findByIdAndUpdate(postId ,{ $pull: {comments : commentId}}); 
                    req.flash('success','Comment Deleted');
                    return res.redirect('back');

                }else{
                    return res.redirect('back');
                }
        }

    }catch(err){
        req.flash('Error','Error in deleting Comment');
        return;
    }

}