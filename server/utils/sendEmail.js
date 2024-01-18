const nodemailer = require("nodemailer")


const sendEmail = async (subject, message, send_to, send_from) => {

    // create email transporter
    const transporter = await nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }

    })

    const details = {
        from: send_from,
        to: send_to,
        subject: subject,
        html: message,
        // reply_to: reply_to,
    }


    // send email 
    transporter.sendMail(details, function(err, info){
        if(err) {
            console.log(err)
        }else{
            console.log(info)
        }
    })


}

module.exports = sendEmail