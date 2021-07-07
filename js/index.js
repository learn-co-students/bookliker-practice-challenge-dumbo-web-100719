document.addEventListener("DOMContentLoaded", function() {});

let listDiv = document.querySelector("#list")
let showDiv = document.querySelector("#show-panel")
fetch("http://localhost:3000/books")
.then(r => r.json())
.then((bookArr) => {
    bookArr.forEach(renderBooks)
})

function renderBooks(book) {
    let bookLi = document.createElement("li")
    bookLi.innerText = book.title
    listDiv.append(bookLi)
    bookLi.addEventListener("click", (event) => {
    
    showDiv.innerText = ""
    let bookDiv = document.createElement("div")
    let bookImage = document.createElement("img")
        bookImage.src = book.img_url
    let bookDescription = document.createElement("p")
    bookDescription.innerText = book.description
    let likeButton = document.createElement('button')
        likeButton.innerText = 'LIKE'
    let userList = document.createElement('ul')
        likeButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/books/${book.id}`, {
            method:'PATCH',
            headers: { 
                'Content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
            users: book.users.push({"id":1, "username":"pouros"})
            })
        })
        .then(resp => resp.json())
        .then(json_resp => {
            getUserName(userList)
        })
        
    })
    userList.innerText = 'Users List'.toUpperCase()
    book.users.forEach(user => {
        let userShow = document.createElement('li')
        userShow.innerText = user.username
        userList.append(userShow)
        bookDiv.append(bookImage, bookDescription, userList, likeButton)
        showDiv.append(bookDiv)
    })
})
}
    function getUserName(userList) {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(usersArray => {
            let user = usersArray[0]
            let userLi = document.createElement('li')
            userLi.innerText = user.username
            userList.append(userLi)
        })
    }

