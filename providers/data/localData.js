import { v4 as uuid } from 'uuid'
import { validateDate, validatePerson } from '../../validators/personValidators.js'
import fs from 'fs'
import path from 'path'
import { DateTime } from 'luxon'

/**
 * localData.js - Local Data file data provider, for interacting with person data
 */

const filePath = path.resolve('./', 'localData.json')

let data = {}

/**
 * Updates the in-memory data object if newData is provided, otherwise will update the in memory data object from the local file.
 * Note: This is not safe to use in any async/non-locking context
 * @param {object} newData - new data that will be used to overwrite the local file
 */
const updateData = (newData = null) => {
    if (newData === null || newData === undefined) {
        data = JSON.parse(fs.readFileSync(filePath))
    } else {
        data = newData
        fs.writeFileSync(filePath, JSON.stringify(newData))
    }
}
updateData()


const getPeople = () => {
    return data
}

const getPeopleWithSpecificBirthdate = (date) => {
    validateDate(date)
    const givenDateMillis = DateTime.fromISO(date).toMillis()
    return data.filter(person => DateTime.fromISO(person.date_of_birth).toMillis() === givenDateMillis)
}

const getPerson = (id) => {
    return data.filter(person => person.id === id)
}

const createPerson = (person) => {
    try {
        validatePerson(person)
    } catch (error) {
        throw error
    }

    // Checking if a person already exists from their email address
    if (data.indexOf(person.email_address) !== -1) {
        throw Error("could not add person to list")
    }

    //// Not doing a spread incase unwanted fields end up in db
    // data.push({...person, id: uuid()})

    // Pull out only required fields and add to the db
    const { first_name, last_name, email_address, date_of_birth } = person
    data.push({
        first_name,
        last_name,
        email_address,
        date_of_birth,
        id: uuid()
    })
    updateData(data)
}

const deletePerson = (id) => {
    data = data.filter(person => person.id !== id)
    updateData(data)
}

const updatePerson = (id, person) => {
    // Validate
    try {
        validatePerson(person)
    } catch (error) {
        throw error
    }

    // Find person object
    var existingPerson = data.find(person => person.id === id)
    if (existingPerson === null || existingPerson === undefined) throw Error("Could not find person")

    // Find index of person
    var index = data.indexOf(existingPerson)
    if (index === -1) throw Error("Could not find index of person")

    // Update index of person
    const { first_name, last_name, email_address, date_of_birth } = person
    data[index] = {
        first_name,
        last_name,
        email_address,
        date_of_birth,
        id
    }
    updateData(data)
}

export default { createPerson, getPeople, getPeopleWithSpecificBirthdate, getPerson, updatePerson, deletePerson }