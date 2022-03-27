/**
 * personService.js - Logic surrounding person operations 
 * 
 * @param {object} database The database implementation
 * @returns PersonService object that uses the given data source
 */
export default (database) => {
    
    class PersonService {
        // Create
        createPerson = (person) => {
            return database.createPerson(person)
        }

        // Read
        getPerson = (id) => {
            return database.getPerson(id)
        }
        getPeople = () => {
            return database.getPeople()
        }
        getPeopleWithSpecificBirthdate = (date) => {
            return database.getPeopleWithSpecificBirthdate(date)
        }

        // Update
        updatePerson = (id, person) => {
            return database.updatePerson(id, person)
        }

        // Delete
        deletePerson = (id) => {
            return database.deletePerson(id)
        }
    }

    return new PersonService
}
