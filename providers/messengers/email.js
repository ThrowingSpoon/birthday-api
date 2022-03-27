import * as nodemailer from 'nodemailer'

/**
 * Message provider with email implementation
 */

/**
 * Sends an email with provided address, subject, and body.
 * No proper auth setup, just for demonstration purposes.
 * 
 * Not allowing address to be used for sandbox reasons.
 * 
 * @param {string} address 
 * @param {string} subject 
 * @param {string} body
 */
const sendMessage = (address, subject, body) => {
    const sandboxEmail = 'liamstest123@gmail.com'

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sandboxEmail,
            pass: 'PASSWORD HERE (Should use proper auth though...)'
        }
    })

    transporter.sendMail({
        from: sandboxEmail,
        to: sandboxEmail, // Intentionally forcing sandboxed email here
        subject,
        text: body
    })
}

export default { sendMessage }