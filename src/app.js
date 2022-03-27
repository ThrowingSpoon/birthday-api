import express from 'express'
import { DateTime } from 'luxon'

// bodyParser allows us to parse a JSON encoded body
import bodyParser from 'body-parser'
var jsonParser = bodyParser.json()

/**
 * Contains all routes bound to the provided services
 * 
 * @param {object} personService - What service to use to do 
 * person actions with, can be any implementation you can think of.
 * 
 * @param {object} messageService - What service to use to do
 * messaging with, can be email, SMS, or even bind it to a physical
 * postal service if you want to get fancy.
 * 
 * @returns express app that bound to the provided services
 */
export default function (personService, messageService) {
    var app = express()

    app.get('/', (req, res) => {
        res.status(200)
        res.send(`Server is running`)
    })
 

    // Person routes
    app.put('/person', jsonParser, (req, res) => {
        personService.createPerson(req.body)
        res.send()
    })

    app.get('/people', (req, res) => {
        res.setHeader('content-type', 'application/json')
        res.send(JSON.stringify(personService.getPeople()))
    })

    app.get('/people/birthdays/today', (req, res) => {
        res.setHeader('content-type', 'application/json')
        res.send(JSON.stringify(personService.getPeopleWithSpecificBirthdate(DateTime.now().toISODate())))
    })

    app.get('/people/birthdays/:date', (req, res) => {
        res.setHeader('content-type', 'application/json')
        res.send(JSON.stringify(personService.getPeopleWithSpecificBirthdate(req.params.date)))
    })

    app.get('/person/:id', (req, res) => {
        res.setHeader('content-type', 'application/json')
        res.send(JSON.stringify(personService.getPerson(req.params.id)))
    })

    app.patch('/person/:id', jsonParser, (req, res) => {
        personService.updatePerson(req.params.id, req.body)
        res.send()
    })

    app.delete('/person/:id', (req, res) => {
        personService.deletePerson(req.params.id)
        res.send()
    })


    // Send routes
    app.post('/sendMessage', jsonParser, (req, res) => {
        var {address, subject, body} = req.body
        messageService.sendMessage(address, subject, body)
        res.send()
    })

    app.get('/sendBirthdays', jsonParser, (req, res) => {
        messageService.sendMessageBatch(personService.getPeopleWithSpecificBirthdate(DateTime.now().toISODate()))
        res.send()
    })

    return app
}
