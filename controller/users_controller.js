module.exports.profile = function(req, res){
    return res.render('user_page',{
        title: "Profile"
    });
}
