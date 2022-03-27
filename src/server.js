// Services
import personService from '../services/personService.js'
import messageService from '../services/messageService.js'

// Providers
import dataProvider from '../providers/data/localData.js'
// import dataProvider from '../providers/data/justLog.js'

import messengerProvider from '../providers/messengers/email.js'
// import messengerProvider from '../providers/messengers/justLog.js'

// Router
import makeApp from './app.js'

// Make the app by injecting chosen services
const app = makeApp(personService(dataProvider), messageService(messengerProvider))

// Start the server
var server = app.listen(4001, '0.0.0.0', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening on port http://%s:%s", host, port)
})