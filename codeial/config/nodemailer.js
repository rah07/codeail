const nodemailer = require("nodemailer");

const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({


    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {

        user: "khuranaplastoncrockery@gmail.com",
        pass: "Khuranaplasto@123#"

    }


})




let rendertemplate = (data, relativePath) => {

    let mailHTML;

    ejs.renderFile(

        path.join(__dirname, "../views/mailers", relativePath),
        data,
        function(err, template) {
            if (err) {

                console.log("error in rendering template");
                return;
            }

            mailHTML = template;


        }


    )


    return mailHTML;



}

module.exports = {

    transporter: transporter,
    rendertemplate: rendertemplate
}