import makeApp from '../src/app.js'
import { jest } from '@jest/globals'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

// Instantiating test resources
const personService = {
    createPerson: jest.fn(),
    getPerson: jest.fn(),
    getPeople: jest.fn(),
    getPeopleWithSpecificBirthdate: jest.fn(),
    updatePerson: jest.fn(),
    deletePerson: jest.fn(),
}
const messageService = {
    sendMessage: jest.fn(),
    sendMessageBatch: jest.fn()
}
const app = makeApp(
    personService,
    messageService
)
const testBodyCreatePerson = {
    "first_name": "Bob",
    "last_name": "Lumbridge",
    "date_of_birth": "2022-10-27",
    "email_address": "bob_lumbridge@hotmail.co.uk"
}

/**
 * Single call to our webserver with a single param to be passed through to the service
 */
describe('PUT /person', () => {
    test('Person object should be passed to createPerson', async () => {
        await request(app).put('/person').send(testBodyCreatePerson)
        expect(personService.createPerson.mock.calls.length).toBe(1)
        expect(personService.createPerson.mock.calls[0][0]).toMatchObject(testBodyCreatePerson)
    })
})

/**
 * Single call like the test above, but also checking that a path variable gets passed through too
 */
describe('PATCH /person/:id', () => {
    test('Both Id and Person object should be passed to updatePerson', async () => {
        const uid = uuid();
        await request(app).patch(`/person/${uid}`).send(testBodyCreatePerson)
        expect(personService.updatePerson.mock.calls.length).toBe(1)
        expect(personService.updatePerson.mock.calls[0][0]).toBe(uid)
        expect(personService.updatePerson.mock.calls[0][1]).toMatchObject(testBodyCreatePerson)
    })
})