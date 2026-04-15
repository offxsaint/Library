const myLibrary = [];

function Book(title, author, pages, isread) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
}

Book.prototype.toggleReadStatus = function() {
    this.isread = !this.isread;
}

function addBookToLibrary(title, author, pages, isread) {
    const newBook = new Book(title, author, pages, isread);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.cardlist.add("book-card");

        card.setAttribute("data-id", book.id);

        card.innerHTML = `
        <h3>${book.title}</h3>
        <p> Author: ${book.author}</p>
        <p> Pages: ${book.pages}</p>
        <p> IsRead: ${book.isread ? 'Read' : 'Not Read'}</p>
        `;

        const removebtn = document.createElement("button");
        removebtn.textContent = "Remove";
        removebtn.classList.add("remove-btn");

        removebtn.addEventListener("click", () => {
            removeBookFromLibrary(book.id);
        })

        const togglebtn = document.createElement("button");
        togglebtn.textContent = "Toggle Read";
        togglebtn.classList.add("toggle-btn");

        togglebtn.addEventListener("click", () => {
            toggleBookReadStatus(book.id);
        });

        card.appendChild(removebtn);
        card.appendChild(togglebtn);

        bookContainer.appendChild(card);
    });
}