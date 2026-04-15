// PSEUDOCODE FOR LIBRARY APP WITH BOOK MANAGEMENT
// ===============================================

// 1. DECLARE GLOBAL ARRAY TO STORE ALL BOOK OBJECTS
DECLARE myLibrary = []

// 2. DEFINE BOOK CONSTRUCTOR (creates individual book objects)
FUNCTION Book(title, author, pages, isRead)
  SET this.id = crypto.randomUUID()  // generate unique ID
  SET this.title = title
  SET this.author = author
  SET this.pages = pages
  SET this.isRead = isRead
END FUNCTION

// 3. ADD PROTOTYPE METHOD TO TOGGLE READ STATUS
FUNCTION Book.prototype.toggleReadStatus()
  SET this.isRead = NOT this.isRead
END FUNCTION

// 4. DEFINE FUNCTION TO ADD BOOK TO LIBRARY ARRAY
FUNCTION addBookToLibrary(title, author, pages, isRead)
  CREATE newBook = CALL Book(title, author, pages, isRead)
  PUSH newBook INTO myLibrary
  CALL displayBooks()  // refresh display after adding
END FUNCTION

// 5. DEFINE FUNCTION TO DISPLAY ALL BOOKS ON PAGE
FUNCTION displayBooks()
  CLEAR the book container element in DOM
  LOOP through each book in myLibrary
    CREATE card/row element for current book
    SET data-attribute of card = book.id  // associate DOM with book
    DISPLAY book.title, author, pages, read status
    CREATE "Remove" button for this card
      ATTACH click event to remove button
      INSIDE event: CALL removeBookFromLibrary(book.id)
    CREATE "Toggle Read" button for this card
      ATTACH click event to toggle button
      INSIDE event: CALL toggleBookReadStatus(book.id)
    APPEND card to book container
  END LOOP
END FUNCTION

// 6. DEFINE FUNCTION TO REMOVE BOOK BY ID
FUNCTION removeBookFromLibrary(bookId)
  FILTER myLibrary to keep books where id != bookId
  CALL displayBooks()  // refresh display
END FUNCTION

// 7. DEFINE FUNCTION TO TOGGLE BOOK READ STATUS BY ID
FUNCTION toggleBookReadStatus(bookId)
  FIND book in myLibrary where id == bookId
  IF book exists
    CALL book.toggleReadStatus()
    CALL displayBooks()  // refresh display
  END IF
END FUNCTION

// 8. SETUP "NEW BOOK" BUTTON AND FORM HANDLING
FUNCTION setupNewBookButton()
  SELECT "New Book" button from DOM
  ATTACH click event to button
    INSIDE event: DISPLAY form modal/sidebar
END FUNCTION

// 9. HANDLE FORM SUBMISSION
FUNCTION handleAddBookForm(event)
  CALL event.preventDefault()  // prevent page refresh
  GET title, author, pages, isRead from form inputs
  CALL addBookToLibrary(title, author, pages, isRead)
  CLEAR form inputs
  CLOSE/HIDE form modal/sidebar
END FUNCTION

// 10. INITIALIZE APP WITH SAMPLE BOOKS (for testing)
FUNCTION initializeSampleBooks()
  CALL addBookToLibrary("The Hobbit", "Tolkien", 310, false)
  CALL addBookToLibrary("1984", "Orwell", 328, true)
  CALL addBookToLibrary("Dune", "Herbert", 412, false)
END FUNCTION

// 11. MAIN EXECUTION FLOW
CALL setupNewBookButton()
ATTACH handleAddBookForm to form's submit event
CALL initializeSampleBooks()
CALL displayBooks()