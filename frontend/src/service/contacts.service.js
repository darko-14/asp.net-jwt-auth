
export  const getContacts = (callback) => {
    fetch('api/Contacts')
    .then(res => res.json())
    .then(callback)
}

export const createContact = (contact, callback) => {
    fetch(`api/Contacts`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
    })
    .then(res => res.json())
    .then(console.log)
}

export const updateContact = (contact) => {
    fetch(`api/Contacts?id=${contact.id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
    })
    .then(res => res.json())
}


export const deleteContact = (id) => {
    fetch(`api/Contacts?id=${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}