const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs")
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accesslogStream = rfs.createStream("access.log", {

    interval: "1d",
    path: logDirectory

})

const development = {

    name: "development",
    asset_path: './assets',
    session_cookie_key: "blahsomething",
    db: "codeial_development",

    smtp: {


        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {

            user: "khuranaplastoncrockery@gmail.com",
            pass: "Khuranaplasto@123#"

        }


    },


    google_client_id: "702236515083-v2bcp5qnan7hta1vm30vhl5cses2pje1.apps.googleusercontent.com",
    google_client_secret: "od5HUW0QNV0zz2R3y1ROKLMq",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',

    morgan: {

        mode: "dev",
        options: {

            stream: accesslogStream
        }

    }

}


const production = {
    name: "production",
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIEAL_DB,

    smtp: {


        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,

        secure: false,
        auth: {

            user: process.env.CODIEAL_GMAIL_USERNAME,
            pass: process.env.CODIEAL_GMAIL_PASSWORD

        }


    },


    google_client_id: process.env.GOOGLE_CLEINT_ID,
    google_client_secret: process.env.GOOGLE_CLEINT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

    morgan: {

        mode: "combined",
        options: {

            stream: accesslogStream
        }

    }

}


module.exports = eval(process.env.CODEIAL_ENVIROMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIROMENT);