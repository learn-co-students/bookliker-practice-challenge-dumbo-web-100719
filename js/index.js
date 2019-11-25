
// - You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}]`, you should send as the body of your PATCH request:

// ```javascript
// {
//   "users": [
//     {"id":2, "username":"auer"},
//     {"id":8, "username":"goodwin"},
//     {"id":1, "username":"pouros"}
//   ]
// }
// ```

// - This route will respond with the updated book json including the list of users who have liked the book.

let booksUl = document.querySelector("#list")
let booksUrl = "http://localhost:3000/books"
let bookShowDiv = document.querySelector("#show-panel")
let meTheUser = {id: 1, username: "pouros"}
document.addEventListener("DOMContentLoaded", function() {});

let getAllBooks = () => {
    fetch(booksUrl)
    .then(resp => resp.json())
    .then(bookArr => {
        console.log(bookArr)
        bookArr.forEach(bookObj => {
            putAllBooksOnLiThenOnUl(bookObj)
        });
    })
}

let putAllBooksOnLiThenOnUl = (bookObj) => {
    let newBookLi = document.createElement("li")
    newBookLi.innerText = bookObj.title
    newBookLi.addEventListener("click", (event) => {
        bookShowDiv.innerHTML = ""
        let newBookImg = document.createElement("img")
        newBookImg.src = bookObj.img_url
        let newBookDescLi = document.createElement("li")
        newBookDescLi.innerText = bookObj.description
        let newBookUsersUl = document.createElement("ul")
        let newBookLikeButton = document.createElement("button")
        newBookLikeButton.innerText = "Like This Book"
        newBookLikeButton.addEventListener("click", (event) => {
            newBookUsersUl.innerHTML = ""
            console.log(bookObj.users)
            bookObj.users.push(meTheUser)
            console.log(bookObj.users)
            fetch(`http://localhost:3000/books/${bookObj.id}`, {
              method:'PATCH',
             headers: { 
                 'Content-type': 'application/json',
                 'accept': 'application/json'
             },
             body: JSON.stringify({
            users: bookObj.users
              })
            })
            .then(resp => resp.json())
            .then(json_resp => {
                bookObj.users.forEach(user => {
                    let bookLikerLi = document.createElement("li")
                    bookLikerLi.innerText = user.username
                    newBookUsersUl.append(bookLikerLi)
                })
            })
        })
        bookObj.users.forEach(user => {
            let bookLikerLi = document.createElement("li")
            bookLikerLi.innerText = user.username
            newBookUsersUl.append(bookLikerLi)
        })
        bookShowDiv.append(newBookImg, newBookDescLi, newBookUsersUl, newBookLikeButton)
    }) 
    booksUl.append(newBookLi)
}

getAllBooks()
