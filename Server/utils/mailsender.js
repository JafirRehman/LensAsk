const nodemailer = require('nodemailer');

require('dotenv').config()

exports.mailsender = async (email, newProduct) => {
    try {
        //create transport
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,        // check what happen if we use this and not
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        //use transport to send mail
        const mail = await transport.sendMail({
            from: 'AskLens',
            to: `${email}`,
            subject: 'New product available',
            html: `<p>A new product is available: <a href="http://localhost:5173/products">${newProduct.title}</a></p>`
        })
        return mail
    } catch (error) {
        console.log("something went wrong inside mailsender utility try block");
        return error
    }
}