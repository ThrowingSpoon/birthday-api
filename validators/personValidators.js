import { DateTime } from "luxon"

/**
 * Validates whether required fields are present in person object
 * 
 * @param {object} person 
 */
export const validatePerson = (person) => {
    if (person.first_name === null || person.first_name === undefined || person.first_name === "") {
        throw Error("first_name is required")
    }
    if (person.last_name === null || person.last_name === undefined || person.last_name === "") {
        throw Error("last_name is required")
    }
    if (person.date_of_birth === null || person.date_of_birth === undefined || person.date_of_birth === "") {
        throw Error("date_of_birth is required")
    }
    if (person.email_address === null || person.email_address === undefined || person.email_address === "") {
        throw Error("email_address is required")
    }
}

/**
 * Validates whether a date string is present, and a valid ISO date
 * 
 * @param {string} date 
 */
export const validateDate = (date) => {
    if (date === null || date === undefined) {
        throw Error("date is required")
    }
    if (DateTime.fromISO(date).isValid === false){
        throw Error("Invalid date format")
    }
}