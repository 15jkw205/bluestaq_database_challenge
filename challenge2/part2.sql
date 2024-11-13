-- Step 1: Create the Database (if it doesn't exist already)
CREATE DATABASE IF NOT EXISTS library_management;
USE library_management;

-- Step 2: Create the Authors Table
-- This table stores information about authors
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each author
    name VARCHAR(100) NOT NULL,               -- Name of the author
    bio TEXT,                                 -- Biography of the author
    birth_date DATE,                          -- Date of birth
    nationality VARCHAR(50)                   -- Author's nationality
);

-- Step 3: Create the Books Table
-- This table stores information about books and links to authors
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique ID for each book
    title VARCHAR(200) NOT NULL,              -- Title of the book
    author_id INT,                            -- Reference to the author (foreign key)
    genre VARCHAR(50),                        -- Genre of the book
    published_date DATE,                      -- Date when the book was published
    summary TEXT,                             -- Short summary of the book
    isbn VARCHAR(20),                         -- ISBN number
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
        ON DELETE SET NULL                    -- If an author is deleted, set author_id to NULL
        ON UPDATE CASCADE                     -- If author_id changes, update it in this table
);

-- Step 4: Create the Borrowers Table
-- This table stores information about library members who can borrow books
CREATE TABLE Borrowers (
    borrower_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each borrower
    name VARCHAR(100) NOT NULL,                  -- Name of the borrower
    email VARCHAR(100),                          -- Email address
    phone VARCHAR(20),                           -- Phone number
    membership_date DATE                         -- Date when the borrower became a member
);

-- Step 5: Create the Loans Table
-- This table links books and borrowers, tracking which books are loaned out
CREATE TABLE Loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,      -- Unique ID for each loan record
    book_id INT,                                 -- Reference to the book being borrowed (foreign key)
    borrower_id INT,                             -- Reference to the borrower (foreign key)
    loan_date DATE,                              -- Date when the book was loaned
    return_date DATE,                            -- Date when the book is expected to be returned
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE                        -- If a book is deleted, delete associated loans
        ON UPDATE CASCADE,                       -- If book_id changes, update it in this table
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
        ON DELETE CASCADE                        -- If a borrower is deleted, delete associated loans
        ON UPDATE CASCADE                        -- If borrower_id changes, update it in this table
);