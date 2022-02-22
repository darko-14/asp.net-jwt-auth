export  const getNumbers = (id, callback) => {
    fetch(`api/Numbers?contactId=${id}`)
    .then(res => res.json())
    .then(callback)
}

export const createNumber = (contact_id, number) => {
    fetch(`/api/Numbers?contactId=${contact_id}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(number)
    })
    .then(res => res.json())
}

export const updateNumber = (contact_id, number) => {
    fetch(`/api/Numbers?numberId=${contact_id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(number)
    })
    .then(res => res.json())
}


export const deleteNumber = (id) => {
    fetch(`api/Numbers?id=${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}