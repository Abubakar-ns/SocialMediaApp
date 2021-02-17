
const User = require('../model/user');
module.exports.profile = function(req, res){
    return res.render('user_page',{
        title: "Profile"
    });
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
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.createSession= function(req,res){
    //todo
    return res.redirect('/');
}
module.exports.destroySession= function(req,res){
    //given by passport
    req.logout();
    return res.redirect('/');
}
