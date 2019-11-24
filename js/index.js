document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});


let fetchBooks = () => {
    const url = `http://localhost:3000/books`
    fetch(url, {
      method:'GET',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
    })
    .then(resp => resp.json())
    .then(buildList)
    .catch((error) => {console.error(error);})
}



let buildList = (bookObj) => {
    bookObj.forEach(addBookToLi)
}

let addBookToLi = (indivBook) => {
    let bookUl = document.querySelector('#list')
    let bookLi = document.createElement('li')
   
   
    let bookTitle = document.createElement('h4')
    bookTitle.innerText = indivBook.title

    bookLi.addEventListener('click', () => {
        // window.location.href =`http://localhost:3000/books/${indivBook.id}`
       removeBookCard()
        showBookPanel(indivBook)
       
        
    })
   
    bookLi.append(bookTitle)
    bookUl.append(bookLi)
    
}

let showBookPanel = (bookDetails) => {
    
    let bookPanel = document.querySelector('#show-panel')
    let bookCard = document.createElement('div')
    let bookImg = document.createElement('img')
    bookImg.src = bookDetails.img_url
    let bookDesc = document.createElement('p')
    bookDesc.innerText = bookDetails.description
    let bookLikeButton = document.createElement('button')
    bookLikeButton.innerText = 'Like me'
    
    bookLikeButton.addEventListener('click', () => {
        removeUserLikes()
        fetchLikeBook(bookDetails)
    })

    bookCard.append(bookImg, bookLikeButton,bookDesc)
    bookPanel.append(bookCard)

    createUserList(bookDetails)

}

let createUserList = (bookDetails) => {
    console.log('createUserList',bookDetails)
    let bookPanel = document.querySelector('#show-panel')
    let bookCard = document.createElement('div')
    bookCard.setAttribute('id','user-likes')
    let bookLikesUl = document.createElement('ul')
    bookLikesUl.innerText = `Users liked this book (${bookDetails.users.length})`
    bookLikesUl.className = 'book_user_ul'
    let bookUsers = bookDetails.users
    
    bookUsers.forEach((user) => {
        let bookLikesLi = document.createElement('li')
        bookLikesLi.className = 'book_user_li'
        bookLikesLi.innerText = user.username
        bookLikesUl.append(bookLikesLi)
    })
    bookCard.append(bookLikesUl)
    bookPanel.append(bookCard)

}

let fetchLikeBook = (bookObject) => {

    const url = `http://localhost:3000/users/1`
    fetch(url, {
      method:'GET',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     }
    })
    .then(resp => resp.json())
    .then(userObject => {
        bookObject.users.push(userObject)
        console.log(bookObject.users)
        fetchPatchUser(bookObject)
    })
    .catch((error) => {console.error(error);})
   
}

let fetchPatchUser = (bookObject) => {
     console.log('fetchPatchUser',bookObject)
     console.log('fetchPatchUser',bookObject.users)
    const url = `http://localhost:3000/books/${bookObject.id}`
    fetch(url, {
      method:'PATCH',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
        users: bookObject.users
      })
    })
    .then(resp => resp.json())
    .then(json_resp => {
        createUserList(json_resp)
        
    })
    
    .catch((error) => {console.error(error);})
}

let removeBookCard = () => {
    let bookPanelInfo = document.querySelector('#show-panel')
    bookPanelInfo.innerText = ""

}

let removeUserLikes = () => {
    let userLikePanel = document.querySelectorAll('.book_user_ul')
    userLikePanel.forEach((userLikes) => {
        userLikes.remove()
    })
    
}