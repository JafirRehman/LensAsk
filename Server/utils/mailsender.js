const nodemailer = require('nodemailer');

require('dotenv').config()

exports.mailsender = async (email,title, body) => {
    try {
        //create transport
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,     
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        //use transport to send mail
        const mail = await transport.sendMail({
            from: 'AskLens',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        return mail
    } catch (error) {
        console.log("something went wrong inside mailsender utility try block");
        return error
    }
}
