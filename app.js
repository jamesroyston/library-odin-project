const app = document.querySelector('#app')

const addBook = document.querySelector('#addBook')
addBook.addEventListener('click', addBookToLib)

function render (book) {
  
  const bookDiv = document.createElement('div')
  bookDiv.classList.add('bookDiv')
  bookDiv.innerHTML = 
      `<h2>${book.name}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Completed: ${book.read}
          <span>
              <button id="readToggle">toggle</button>
          </span>
      </p>
      <button id="removeBook">Remove Book</button>`
  app.appendChild(bookDiv)
  document.querySelector('#removeBook')
      .addEventListener('click', function() {
        this.prototype.delete()
        app.removeChild(bookDiv)
      })
}

let myLibrary = []

function displayLib() {

  myLibrary.forEach(ball => {console.log(ball)})
}

function Book (name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function () {
  if (this.read == true) {
    return `${this.name} by ${this.author}, ${this.pages} pages, finished`
  } else {
    return `${this.name} by ${this.author}, ${this.pages} pages, not done yet`
    }
}

Book.prototype.delete = function () {
 for (let i = 0; i < myLibrary.length; i++) {
   delete myLibrary[i]
 }
}

function addBookToLib (book) {

  myLibrary.push(book)
  render(book)
}

const book1 = new Book("48 Laws of Power", 'Author Man', 584, false)
const book2 = new Book('Eloquent JavaScript', 'Another Author', 448, true)
const book3 = new Book('Eloquent JavaScript', 'Another Author', 448, true)

addBookToLib(book1)
addBookToLib(book2)
addBookToLib(book3)
displayLib()