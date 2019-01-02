const table = document.querySelector("#main-table");
let myLibrary = [];
const newBookButton = document.querySelector('#new_book_button')


function Book(name, author, pages, status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}


Book.prototype.isRead = function () {
  this.status = !this.status
  console.table(myLibrary)
  renderLibrary()
};


function addBookToLib(book) {
  myLibrary.push(book)
  console.log(myLibrary)
  renderLibrary()
}


function deleteBook(index) {
  alert('deleted book: ' + myLibrary[index].name)
  console.log(myLibrary.splice(index, 1))
  renderLibrary()
  console.log(myLibrary)
}


// function for rendering the view
function renderLibrary() {
  table.innerHTML = ''
  myLibrary.map((book, index) => createBookRow(book, index))
}


// function for creating rows in table with book info
function createBookRow(book, index) {
  const bookRow = document.createElement('tr')
  // sets dataset attribute for tr to the index of book in myLib array
  bookRow.dataset.index = index

  const name = document.createElement('td')
  const deleteBtn = document.createElement('button')
  deleteBtn.style.fontSize = '12px'
  deleteBtn.innerHTML = 'X'
  deleteBtn.addEventListener('click', function() {
    deleteBook(index)
  })
  name.innerHTML = '' + book.name

  const author = document.createElement('td')
  author.innerHTML = book.author

  const pages = document.createElement('td')
  pages.innerHTML = book.pages
  pages.style.color = '#986aee'

  const status = document.createElement('td')
  status.innerHTML = book.status
  status.style.color = '#986aee'

  const toggle = document.createElement('button')
  toggle.style.fontSize = '12px'
  toggle.innerHTML = 'change'
  toggle.onclick = function () {
    book.isRead()
  }.bind(book)


  const bookRowItems = [name, author, pages, status]

  bookRowItems.forEach(item => {
    item.className = 'table-item'
    bookRow.appendChild(item)
  })
  table.appendChild(bookRow)
  name.appendChild(deleteBtn)
  status.appendChild(toggle)
}


// form functionality 
const bookForm = document.querySelector('#book_form')
bookForm.addEventListener("submit", (e) => {

  e.preventDefault();
  const { name, author, pages, status } = bookForm
  addBookToLib(
    new Book(
      name.value,
      author.value,
      pages.value,
      status.value == 'true' ? true : false
    )
  );
      // clears the input fields after entering a book
  [name, author, pages].forEach(input => {
    input.value = '';
  });
});

// form hide/show button function
newBookButton.addEventListener('click', function () {
  (bookForm.style.display === 'block') ?
  bookForm.style.display = 'none':
    bookForm.style.display = 'block';
  if (bookForm.style.display === 'none') {
    newBookButton.innerHTML = 'Add Book'
  } else {
    newBookButton.innerHTML = 'CLOSE'
  }
})

addBookToLib(new Book("Up and Going", "Kyle Simpson", 456, false))
addBookToLib(new Book("Scopes and Closures", "Kyle Simpson", 411, true))
addBookToLib(new Book("this & Object Prototypes", "Kyle Simpson", 411, true))
addBookToLib(new Book("Types & Grammar", "Kyle Simpson", 411, true))
addBookToLib(new Book("Async & Performance", "Kyle Simpson", 411, true))
addBookToLib(new Book("ES6 & Beyond", "Kyle Simpson", 411, true))
renderLibrary()
