module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeial</h1>')
}
module.exports.profile = function(req,res){
    return res.end('<h1>Yoshikage Kira</h1>')
}
module.exports.address = function(req,res){
    return res.end('<h1>Moria Village</h1>')
}
