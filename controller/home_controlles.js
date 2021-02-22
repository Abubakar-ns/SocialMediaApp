const Post = require('../model/post');
const User = require('../model/user');
//async function tells the function to wait for the function to execute then execute the other
module.exports.home = async function(req,res){
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path : 'user'
        }
        });
        let users= await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });


    }catch(err){
    console.log('Error',err);
    return;
    }
}    
 /*
module.exports.home = function(req,res){
   /*Post.find({},function(err,posts){
    return res.render('home',{
        title: "Codeial | Home",
        posts: posts
    });
   });//yaha'*//*
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
   
}*/


