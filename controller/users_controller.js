const User = require('../model/user');
module.exports.profile = function(req, res){
User.findById(req.params.id,function(err,user){
    return res.render('user_page',{
        title: 'User Profile',
        profile_user: user

    }); 
});

} 
module.exports.Update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }


} 
// render the signup page
module.exports.signup= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
    title: "Codeial- SignUp"
    });
}
//render the signin page
module.exports.signin= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial- SignIn"
    });
}
//get the signup data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
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
    }
}



module.exports.createSession= function(req,res){
//todo
    req.flash('success','Logged in Succesfuly');
    return res.redirect('/');
}
module.exports.destroySession= function(req,res){
//given by passport
    req.logout();
    req.flash('success','Logged Out Succesfuly');
    //we have sent flash on req but it is returning res we have to do something
    //so we need a custom middleware
    return res.redirect('/');
}
