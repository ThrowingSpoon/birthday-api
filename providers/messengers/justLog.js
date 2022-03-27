/**
 * Message provider that just logs the requests
 */

 const sendMessage = (address, subject, body) => {
    console.log(`Send birthday message to: ${address}, subject: ${subject}, body: ${body}`)
}

export default { sendMessage }