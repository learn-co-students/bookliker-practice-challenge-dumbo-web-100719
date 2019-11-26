document.addEventListener("DOMContentLoaded", function() {

let list = document.getElementById("list")
let showBookInfo = document.getElementById("show-panel")

function clearBox() {
    showBookInfo.innerHTML = "";
}



fetch("http://localhost:3000/books")
.then(r => r.json())
.then((books) => {
    books.forEach((book) => {
        addBooktoList(book)
    })
})




function addBooktoList(book) {
    
    let bookH3 = document.createElement("h3")
    let bookLi = document.createElement("li")
    let bookButton = document.createElement("button")
    bookButton.innerText = "More Info"
    bookLi.innerText = book.title
    bookLi.append(bookButton)
    bookH3.append(bookLi)
    list.append(bookH3)
    
    let userArray = book.users
    console.log(userArray)
    
    
    bookLi.addEventListener("click", (event) => {
        clearBox()
        
        let bookInfoDiv = document.createElement("div")
        bookInfoDiv.id = "clear-this-out"
        let bookImage = document.createElement("img")
        let bookDescription = document.createElement("p")
        let bookUsers = document.createElement("ul")
        let likeButton = document.createElement("button")
        likeButton.innerText = "Like <3"
            

        userArray.forEach((user) => {
            let userLi = document.createElement("li")
            userLi.innerText = `${user.username}`
            bookUsers.append(userLi)
            bookInfoDiv.append(bookUsers)
        })

        bookImage.src = book.img_url
        bookDescription.innerText = book.description
        
        
        bookInfoDiv.append(bookImage, bookDescription, bookUsers, likeButton)
        showBookInfo.append(bookInfoDiv)

     
            likeButton.addEventListener('click', (event) => {
                fetch(`http://localhost:3000/users/1`)
                .then(r => r.json())
                .then((userOne) => {
                    book.users.push(userOne)
                    console.log(book.users)
                    fetch(`http://localhost:3000/books/${book.id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            users: book.users
                        })
                    })
                    .then(r => r.json())
                    .then((response) => {
                    })
                    let newUserUl = document.createElement("ul")
                    let newUserLi = document.createElement("li")
                    newUserLi.innerText = `${userOne.username} has liked this book!`
                    newUserUl.append(newUserLi)
                    bookInfoDiv.append(newUserUl)
                })       
            })
        })
    }
})
                 
