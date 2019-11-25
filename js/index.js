const booksUl = document.querySelector("#list")
const showPanelDiv = document.querySelector("#show-panel")


fetch("http://localhost:3000/books")
.then(r => r.json())
.then((booksObj) => {
    booksObj.forEach((oneBook) => {
        createBookLi(oneBook)
    })
})

function createBookLi(book){
    const readButton = document.createElement("button")
        readButton.innerText = "Read Book"
    let bookLi = document.createElement("li")
        bookLi.innerText = book.title
    booksUl.append(bookLi)

    bookLi.addEventListener("click", (evt) => {
        showPanelDiv.innerText = " "
        let bookTitle = document.createElement("h1")
            bookTitle.innerText = book.title
        let bookImage = document.createElement("img")
            bookImage.src = book.img_url
        let bookDescription = document.createElement("p")
            bookDescription.innerText = book.description

        let bookUsersUl = document.createElement("ul")
        const bookUsers = book.users
        for (const key in bookUsers) {
            let bookUsersLi = document.createElement("li")
            bookUsersLi.innerText = bookUsers[key].username
            bookUsersUl.append(bookUsersLi)
        }
        showPanelDiv.append(bookTitle, bookImage, bookDescription, bookUsersUl, readButton)
    })

    readButton.addEventListener("click", (evt) => {
        let user1 = {"id":1, "username":"pouros"}
        book.users.push(user1)

        fetch(`http://localhost:3000/books/${book.id}`, {
          method:'PATCH',
          headers: { 
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
              "users": book.users
          })
        })
        .then(r => r.json())
        .then((updatedObj) => {
            let bookUsersLi = document.createElement("li")
            let lastElement = updatedObj.users.pop()
                bookUsersLi.innerText = lastElement.username
            let bookUsersUl = showPanelDiv.querySelector("ul")
                bookUsersUl.append(bookUsersLi)
        })
    })
}





