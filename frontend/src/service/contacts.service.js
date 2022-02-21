
export  const getContacts = (callback) => {
    fetch(`api/Contacts`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('Token')
        }
    })
    .then(res => res.json())
    .then(callback)
}

export const createContact = (userId, contact) => {
    fetch(`api/Contacts?userId=${userId}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('Token')
        },
        body: JSON.stringify(contact)
    })
    .then(res => res.json())
    .then(console.log)
}

export const updateContact = (contact) => {
    fetch(`/api/Contacts?id=${contact.id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('Token')
        },
        body: JSON.stringify(contact)
    })
}

export const deleteContact = (id) => {
    fetch(`api/Contacts?id=${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem('Token')
        }
    })
    .then(res => res.json())
}