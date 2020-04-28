let bookListUl = document.getElementById("list")
let showDiv = document.getElementById("show-panel")

fetch("http://localhost:3000/books")
.then(resp => resp.json())
.then((bookArr) => {
    bookArr.forEach(book => {
        createBookLi(book)
    });
})

function createBookLi(book){
    let bookLi = document.createElement("li")
    bookLi.innerText = book.title
    bookListUl.append(bookLi)

    bookLi.addEventListener("click", () => {
        fetch(`http://localhost:3000/books/${book.id}`)
        .then(resp => resp.json())
        .then((book) => {
            showBookDetails(book)
        })
        })
}

function showBookDetails(book){
    // console.log(book.users.username)
    showDiv.innerText = ""
    let bookImage = document.createElement("img")
    let bookDescription = document.createElement("p")
    let bookUserUl = document.createElement("ul")
    let bookLikeButton = document.createElement("button")
   
    bookImage.src = book.img_url
    bookDescription.innerText = book.description
    bookUserUl.innerText = "Users"
    bookLikeButton.innerText = "<3 Button"

    if(!book.users.username){
        book.users.forEach(user => {
            let userLi = document.createElement("li")
            userLi.innerText = user.username
            bookUserUl.append(userLi)
        })
    } else{
        let userLi = document.createElement("li")
            userLi.innerText = book.users.username
            bookUserUl.append(userLi)
    }

    showDiv.append(bookImage, bookDescription, bookUserUl, bookLikeButton)

    bookLikeButton.addEventListener("click", (e) => {
        let allUsers = [...book.users, {"id":4, "username":"batz"}]
        // console.log()
       
        fetch(`http://localhost:3000/books/${book.id}`, {
          method:'PATCH',
          headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
          },
          body: JSON.stringify({
             users: allUsers
          })
        })
        .then(resp => resp.json())
        .then((params) => {
            // console.log(params)
            showBookDetails(params)
        })
    })

}