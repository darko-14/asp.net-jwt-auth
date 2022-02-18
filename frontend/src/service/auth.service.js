
export const authUser = (user) => {
    fetch(`api/Authenticate?Username=${user.username}&Password=${user.password}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("Token", data.AccessToken);
        localStorage.setItem("User", data.User);
    })
}
