//where to add book information
let listArea = document.getElementById("list")
let showArea = document.getElementById("show-panel")
// --> show book's thumbnail, description, and list of users who have liked it

//fetch the books 
fetch("http://localhost:3000/books")
.then(r => r.json())
.then((books) => {
    books.forEach((book) => {
       createBookListandShow(book)
    })
})

function getUserOne(){
    // fetch("http://localhost:3000/users/1")
    // .then(r => r.json())
    // .then((userOne) => {
    // })
}

function createBookListandShow(book){
    let bookTitleLi = document.createElement("li")
    bookTitleLi.innerText = book.title
    listArea.append(bookTitleLi)

    bookTitleLi.addEventListener("click", (event) => {
        showArea.innerHTML = ""
        let bookImage = document.createElement("img")
        bookImage.src = book.img_url
        let bookDescription = document.createElement("p")
        bookDescription.innerText = book.description

        let bookUsersList = document.createElement("ul")
        book.users.forEach((user) => {
            let userLi = document.createElement("li")
            userLi.id = `user-${user.id}`
            userLi.innerText = user.username
            bookUsersList.append(userLi)
        })

        let likeButton = document.createElement("button")
        likeButton.innerText = "Like <3"

        let unlikeButton = document.createElement("button")
        unlikeButton.innerText = "jk this sucked"

        showArea.append(bookImage, bookDescription, bookUsersList, likeButton, unlikeButton)

        likeButton.addEventListener("click", (event) => {
            fetch("http://localhost:3000/users/1")
            .then(r => r.json())
            .then((userOne) => {
                book.users.push(userOne)
                console.log(book.users)
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        users: book.users
                    })
                })
                .then(r => r.json())
                .then((book) => {
                    let userOneLi = document.createElement("li")
                    userOneLi.id = `user-${userOne.id}`
                    userOneLi.innerText = userOne.username
                    bookUsersList.append(userOneLi)
                })
            })
        })

        unlikeButton.addEventListener("click", (event) => {
            fetch("http://localhost:3000/users/1")
            .then((userOne) => {
              book.users.pop(userOne)
              console.log(book.users)
              fetch(`http://localhost:3000/books/${book.id}`, {
                  method: "PATCH",
                  headers: {
                      'content-type': 'application/json',
                      'accept': 'application/json'
                  },
                  body: JSON.stringify({
                      users: book.users
                  })
              })
              .then(r => r.json())
              .then((book) => {
                  let userOneLi = document.getElementById("user-1")
                  userOneLi.remove() 
              })
            })
        })
    })
}
                
