/**
 * messageService.js - Logic surrounding messenging
 * 
 * @param {object} messenger The messenging implementation
 * @returns MessageService object that uses the given messenging source
 */

export default (messenger) => {

    class MessageService {
        sendMessage = (address, subject, body) => {
            return messenger.sendMessage(address, subject, body)
        }

        sendMessageBatch = (messages) => {
            messages.forEach(message => {
                var { address, subject, body } = message
                messenger.sendMessage(address, subject, body)
            })
        }
    }

    return new MessageService
}
