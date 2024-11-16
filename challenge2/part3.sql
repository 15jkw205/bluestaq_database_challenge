DELIMITER // 

-- Create a stored procedure to insert a new record into the Books table 
CREATE PROCEDURE AddNewBook( 
  IN book_title VARCHAR(200), 
  IN book_author_id INT, 
  IN book_genre VARCHAR(50), 
  IN book_published_date DATE,
  IN book_isbn VARCHAR(20)
)
BEGIN 
    INSERT INTO Books (title, author_id, genre, published_date, isbn) 
    VALUES (book_title, book_author_id, book_genre, book_published_date, book_isbn);
END // 

DELIMITER ; 