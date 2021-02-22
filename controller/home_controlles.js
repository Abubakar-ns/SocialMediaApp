const Post = require('../model/post');
const User = require('../model/user');
module.exports.home = function(req,res){
   /*Post.find({},function(err,posts){
    return res.render('home',{
        title: "Codeial | Home",
        posts: posts
    });
   });*/
   //find all posts and populate everything fromuser
   Post.find({})
   .populate('user')
   .populate({
       path: 'comments',
       populate: {
           path : 'user'
       }
   })
   .exec(function(err,posts){
    User.find({},function(err,users){
        if(err){
            return console.log('Error in finding users');
        }
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    });

    
   });
   
}


