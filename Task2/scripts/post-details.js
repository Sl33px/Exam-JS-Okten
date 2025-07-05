// get url parameters for further data retrieval at the address
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const divContainer = document.getElementById("postDetailsDiv");
const commentsDiv = document.getElementById('commentsDiv');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(async post => {
        // create elements of post
        let userId = document.createElement('p');
        userId.innerHTML = `<b>User Id: </b> ${post.userId}`;

        let id = document.createElement('p');
        id.innerHTML = `<b>ID: </b> ${post.id}`;

        let title = document.createElement('p');
        title.innerHTML = `<b>Title: </b> ${post.title}`;

        let body = document.createElement('p');
        body.innerHTML = `<b>Body: </b> ${post.body}`;

        // add elements to div container
        divContainer.append(userId, id, title, body);

        // create fetch request
        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const commentsArr = await commentsRes.json();

        // reset data in commentsDiv in case of reload
        commentsDiv.innerHTML = '';

        for (let comment of commentsArr) {
            // create comment div and elements
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('commentDiv');

            let postIdP = document.createElement('p');
            postIdP.innerHTML = `<b>Post Id: </b> ${comment.postId}`;

            let idP = document.createElement('p');
            idP.innerHTML = `<b>ID: </b> ${comment.id}`;

            let name = document.createElement('p');
            name.innerHTML = `<b>Name: </b> ${comment.name}`;

            let email = document.createElement('p');
            email.innerHTML = `<b>Email: </b> ${comment.email}`;

            let bodyP = document.createElement('p');
            bodyP.innerHTML = `<b>Body: </b> ${comment.body}`;

            // append elements to commentDiv and commentDiv to commentsDiv
            commentDiv.append(postIdP, idP, name, email, bodyP);
            commentsDiv.appendChild(commentDiv);
        }
    })
    .catch(error => console.log(error))