var category;
(function (category) {
    category["Programming"] = "programming";
    category["History"] = "history";
    category["Math"] = "math";
    category["Science"] = "science";
})(category || (category = {}));
class Book {
    #title;
    #author;
    #category;
    #isAvailable;
    constructor(title, author, category, isAvailable) {
        this.#title = title;
        this.#author = author;
        this.#category = category;
        this.#isAvailable = isAvailable;
    }
    setIsAvailable(isAvailable) {
        this.#isAvailable = isAvailable;
    }
    getTitle() {
        return this.#title;
    }
    getAuthor() {
        return this.#author;
    }
    getCategory() {
        return this.#category;
    }
    getIsAvailable() {
        return this.#isAvailable;
    }
    displayinfo(title, author, category, isAvailable) {
        if (this.#isAvailable) {
            return `titlel of the book is ${this.#title} and author name is ${this.#author} and the category is ${this.#category} and is available`;
        }
        else {
            return `titlel of the book is ${this.#title} and author name is ${this.#author} and the category is ${this.#category} and is not available`;
        }
    }
}
class ReferenceBook extends Book {
    #locationCode;
    constructor(title, author, category, isAvailable, locationCode) {
        super(title, author, category, isAvailable);
        this.#locationCode = locationCode;
    }
    displayinfo(title, author, category, isAvailable, locationCode) {
        if (isAvailable) {
            return `titlel of the book is ${title} and author name is ${author} and the category is ${category} and the location code is ${this.#locationCode} and is available`;
        }
        else {
            return `titlel of the book is ${title} and author name is ${author} and the category is ${category} and the location code is ${this.#locationCode} and is not available`;
        }
    }
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// interface Book {
//     title: string;
//     author: string;
//     category: string;
//     isAvailable: boolean;
// }
//--------------------------------------------------------------------------------------
class Library {
    #books = [];
    addBook(book) {
        this.#books.push(book);
    }
    removeBook(title) {
        this.#books = this.#books.filter(book => book.getTitle() != title);
    }
    searchBook(test) {
        return this.#books.filter(book => book.getTitle().toLowerCase().includes(test.toLowerCase()) ||
            book.getAuthor().toLowerCase().includes(test.toLowerCase()));
    }
    filterByCategory(select) {
        if (select == "ALL") {
            return this.#books;
        }
        return this.#books.filter(book => book.getCategory() == select);
    }
    toggleIsAvailabiaity(title) {
        const book = this.#books.find(bookk => bookk.getTitle() == title);
        if (book) {
            book.setIsAvailable(!book.getIsAvailable());
        }
        else {
            console.log("book is not find");
        }
    }
}
const mylibrary = new Library();
mylibrary.addBook(new Book("Clean Code", "Robert Martin", "programming", true));
mylibrary.addBook(new Book("EL GEN EGOISTA", "Richard Dawkins", "science", true));
mylibrary.addBook(new Book("Homo Deus", "Yuval Noah Harari", "science", true));
mylibrary.addBook(new Book("Mathematics from A to Z", "Riyad Zidan", "math", true));
mylibrary.addBook(new Book("How to Solve It", "George Pólya", "math", true));
mylibrary.addBook(new Book("The Pragmatic Programmer", "Andrew Hunt", "programming", true));
mylibrary.addBook(new Book("You Don’t Know JS", "Kyle Simpson", "programming", true));
mylibrary.addBook(new Book("Mathematics Can Be Fun", "Yakov Perelman ", "math", true));
mylibrary.addBook(new Book("A History Of English Poetr", "William John Courthope", "history", true));
mylibrary.addBook(new Book("The History Of The English Bible", "John Brown", "history", true));
mylibrary.addBook(new ReferenceBook("Encyclopaedia", "Oxford", "science", true, "A-101"));
const searchBooks = document.getElementById("bookSearch");
const categoryOpthins = document.querySelectorAll('#Catgories li');
function render(booksArray) {
    const cards = document.getElementById("main-div");
    if (!cards)
        return;
    cards.innerHTML = "";
    booksArray.forEach(book => {
        const card = document.createElement("div");
        card.className = "cardd";
        const state = book.getIsAvailable() ? "Available" : "not Available";
        card.innerHTML = `
        <div class="card">
            <h1 class="title">${book.getTitle()}</h1>
            <h3 class="author">${book.getAuthor()}</h3>
            <h4 class="catgory">${book.getCategory()}</h4>
            <p class="availability"><strong>${state}</strong></p>
            <button class="btn" data-title="${book.getTitle()}">change state </button>
            <button class="btn delete-btn" data-title="${book.getTitle()}" style="background-color: red; color: white;">Delete</button>
        </div>
        `;
        cards.appendChild(card);
    });
    attachToggleEvents();
    attachDeleteEvents();
}
searchBooks?.addEventListener("input", () => {
    const res = mylibrary.searchBook(searchBooks.value);
    console.log("result:", res);
    render(res);
});
categoryOpthins.forEach(option => {
    option.addEventListener('click', (e) => {
        const categorySelect = e.target.getAttribute('data-value');
        if (categorySelect) {
            const filtred = mylibrary.filterByCategory(categorySelect);
            console.log("filterd book:", filtred);
            render(filtred);
        }
    });
});
function attachToggleEvents() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const title = e.target.getAttribute("data-title");
            if (title) {
                mylibrary.toggleIsAvailabiaity(title);
                render(mylibrary.filterByCategory("ALL"));
            }
        });
    });
}
function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const title = e.target.getAttribute("data-title");
            if (title) {
                mylibrary.removeBook(title);
                render(mylibrary.filterByCategory("ALL"));
            }
        });
    });
}
const addBtn = document.getElementById("addBtn");
addBtn?.addEventListener("click", () => {
    const title = document.getElementById("newTitle").value;
    const author = document.getElementById("newAuthor").value;
    const cat = document.getElementById("newCategory").value;
    if (title && author) {
        const newBook = new Book(title, author, cat, true);
        mylibrary.addBook(newBook);
        render(mylibrary.filterByCategory("ALL"));
        document.getElementById("newTitle").value = "";
        document.getElementById("newAuthor").value = "";
    }
    else {
        alert("Please fill all fields!");
    }
});
render(mylibrary.filterByCategory("ALL"));
