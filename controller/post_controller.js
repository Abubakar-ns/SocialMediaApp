const Post =require('../model/post')
const Comment =require('../model/comment')

module.exports.create = async function(req,res){
    try{
        let post=await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('Error in creating a Post',err);
        return;
    }  
    
}
module.exports.destroy = async function(req,res){
    try{
        let post= await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in Deleting the Post',err);
        return;
    }
   

    
}


/*if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if (!user){
            User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error in Creating the Post',err);
        return;
    }*/