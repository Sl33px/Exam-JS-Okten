// get url params to get user
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const divContainer = document.getElementById("userDetailsDiv");

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        // create every field user object
        let id = document.createElement("p");
        id.innerHTML = `<b>ID:</b> ${user.id}`;

        let name = document.createElement("p");
        name.innerHTML = `<b>Name:</b> ${user.name}`;

        let username = document.createElement("p");
        username.innerHTML = `<b>Username:</b> ${user.username}`;

        let email = document.createElement("p");
        email.innerHTML = `<b>Email:</b> ${user.email}`;

        let street = document.createElement("p");
        street.innerHTML = `<b>Street:</b> ${user.address.street}`

        let suite = document.createElement("p");
        suite.innerHTML = `<b>Suite:</b> ${user.address.suite}`

        let city = document.createElement("p");
        city.innerHTML = `<b>City:</b> ${user.address.city}`

        let zipcode = document.createElement("p");
        zipcode.innerHTML = `<b>Zipcode:</b> ${user.address.zipcode}`

        let geo = document.createElement("p");
        geo.innerHTML = `<b>lat:</b> ${user.address.geo.lat}, <b>lng:</b> ${user.address.geo.lng}`

        let phone = document.createElement("p");
        phone.innerHTML = `<b>Phone:</b> ${user.phone}`

        let website = document.createElement("p");
        website.innerHTML = `<b>Website:</b> ${user.website}`

        let company = document.createElement("p");
        company.innerHTML = `<b>Name:</b> ${user.company.name}; <b>Catch Phrase:</b> ${user.company.catchPhrase}; <b>BS:</b> ${user.company.bs}`

        // add elements to divContainer
        divContainer.append(id, name, username, email, street, suite, city, zipcode, geo, phone, website, company);
    })
    .catch(error => console.log(error))

const postOfUserBtn = document.getElementById("postOfUserBtn");

postOfUserBtn.onclick = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const posts = await response.json();

    // create list to show list of posts titles
    const list = document.getElementById("listOfPostTitles");
    list.innerHTML = '';

    for (let post of posts) {
        const li = document.createElement("li");
        // create path to open him in new window
        const postPagePath = `post-details.html?id=${post.id}`;
        li.innerHTML = `<a href="${postPagePath}" target="_blank">${post.title}</a>`;
        list.append(li);
    }
};