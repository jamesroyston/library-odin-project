const table = document.querySelector('#main-table')
const title = document.querySelector('#title_field')
const author = document.querySelector('#author_field')
const pages = document.querySelector('#pages_field')
const read = document.querySelector('#read_field')

let myLibrary = []
let index = 0

const bookFields = [title, author, pages, read]

const render = book => {
  const bookRow = document.createElement('tr')
  bookRow.dataset.id = book.id
  bookRow.innerHTML =
    `<td class="table-item">
            <button onclick="removeBook(this)">X</button>${book.name}
        </td>
        <td class="table-item">${book.author}</td>
        <td class="table-item">${book.pages}</td>
        <td class="table-item">
            <button>read</button>
            <button>not read</button>${book.read}
        </td>`
  table.appendChild(bookRow)
}


function addBookToLib(book) {
  myLibrary.push(book)
  table.innerHTML = ''
  myLibrary.forEach(book => {
    render(book)
  })
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].id = i
  }
}

/* Cody Loyd's advice:
  instead of trying to surgically remove each book from the HTML,
  remove the book from the array and re-render the view

  mind blown
*/

function removeBook(x) {
  let bookID = Number(x.closest('tr').dataset.id)
  let libraryID = myLibrary[bookID].id
  if (bookID === libraryID) {
    console.log(`removed ${myLibrary[bookID].name}`)
    myLibrary.splice(bookID, 1)
    table.innerHTML = ''



    for (let i = 0; i < myLibrary.length; i++) {
      myLibrary[i].id = i
    }
    myLibrary.forEach(book => {
      render(book)
    })
  }


  console.table(myLibrary)
}


bookFields.forEach(prop => {
  prop.addEventListener('keypress', e => {
    if (e.keyCode === 13 || e.which === 13) {
      addBookToLib(new Book(title.value, author.value, pages.value, read.value))
      bookFields.forEach(value => value.value = '')
      title.focus()
      console.table(myLibrary)
    }
  })
})

function Book(name, author, pages, read) {
  this.id = index++
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}


const ex1 = new Book('99 Bottles Of OOP', "Sandi Metz", 456, false)
const ex2 = new Book('Clean Code', "A Person", 456, true)
const ex3 = new Book('Eloquent JavaScript', "A Person", 411, false)
const ex4 = new Book('Green Eggs & Ham', "Dr. Suess", 45, true)
const ex5 = new Book('H.P./Sorceror\'s Stone', "J.K. Rowlings",
  600, true)
addBookToLib(ex1)
addBookToLib(ex2)
addBookToLib(ex3)
addBookToLib(ex4)
addBookToLib(ex5)
// console.table(myLibrary)
// console.table(idArray)