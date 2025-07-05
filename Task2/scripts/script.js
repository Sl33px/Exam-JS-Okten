// get user container div
let usersContainer = document.getElementById('users-container')

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => renderPage(users))
    .catch(error => console.log(error))

// render function
function renderPage(users) {
    for (let user of users) {
        let userDiv = document.createElement('div')
        userDiv.classList.add('user')

        let idEl = document.createElement('p')
        idEl.innerHTML = `<b>ID: </b> ${user.id}`

        let nameEl = document.createElement('p')
        nameEl.innerHTML = `<b>User ID: </b> ${user.name}`

        let buttonEl = document.createElement('button')
        buttonEl.innerText = 'User Details'
        // make function to open path in new tab
        buttonEl.onclick = () => {
            const PATH = `user-details.html?id=${user.id}`
            window.open(PATH, '_blank')
        }

        userDiv.append(idEl, nameEl, buttonEl)
        usersContainer.append(userDiv)
    }
}