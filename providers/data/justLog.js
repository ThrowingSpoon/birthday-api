/**
 * Data provider that just logs the requests
 */

const createPerson = (person) => {
    console.log(`CREATE person ${JSON.stringify(person)}`)
    return true
}

const getPeople = () => {
    console.log(`GET people`)
    return true
}

const getPerson = (id) => {
    console.log(`GET person, id: ${id}`)
    return true
}

const updatePerson = (id, person) => {
    console.log(`UPDATE person, id: ${id}, person: ${person}`)
    return true
}

const deletePerson = (id) => {
    console.log(`DELETE person, id: ${id}`)
    return true
}

export default { createPerson, getPeople, getPerson, updatePerson, deletePerson }