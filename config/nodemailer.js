const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smptp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'abudeveloper02@gmail.com',
        pass: 'SukiMun85'
    },tls: {
        rejectUnauthorized: false
    }
});

let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in Rendering Template',err);return;}
            mailHTML = template;
        }
        
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}