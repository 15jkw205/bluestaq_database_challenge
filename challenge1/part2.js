const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'bookstore';

// Data
const authors = [
  { 
    name: "Brandon Sanderson", 
    bio: "American author known for epic fantasy series like Mistborn and Stormlight Archive.",
    birth_date: new Date("1975-12-19"), 
    nationality: "American" 
  },
  { 
    name: "Colleen Hoover", 
    bio: "American author of romance and contemporary fiction, known for It Ends with Us.",
    birth_date: new Date("1979-12-11"), 
    nationality: "American" 
  },
  { 
    name: "Andy Weir", 
    bio: "American author known for science fiction novels like The Martian and Project Hail Mary.",
    birth_date: new Date("1972-06-16"), 
    nationality: "American" 
  },
  { 
    name: "Taylor Jenkins Reid", 
    bio: "American novelist known for contemporary fiction such as Daisy Jones & The Six.",
    birth_date: new Date("1983-12-20"), 
    nationality: "American" 
  },
  { 
    name: "Delia Owens", 
    bio: "American author and zoologist, known for the bestseller Where the Crawdads Sing.",
    birth_date: new Date("1949-04-04"), 
    nationality: "American" 
  }
];

const genres = [ 
  { name: "Fantasy", description: "Epic tales with magical elements and grand adventures." }, 
  { name: "Romance", description: "Stories of love and relationships." }, 
  { name: "Science Fiction", description: "Exploring futuristic and scientific concepts." }, 
  { name: "Contemporary Fiction", description: "Modern-day stories focusing on character and plot." }, 
  { name: "Thriller", description: "Suspenseful stories filled with twists and turns." }
];

const books = [ 
  { 
    title: "The Final Empire (Mistborn Book 1)", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2006-07-17"), 
    summary: "In a world where ash falls from the sky, a young woman discovers her powers.",
    isbn: "978-0765311788", 
    reviews: [
      { reviewer_name: "Samira Malik", rating: 5, comment: "Absolutely captivating from start to finish!", review_date: new Date() },
      { reviewer_name: "Arjun Patel", rating: 4, comment: "A fantastic world-building experience.", review_date: new Date() }
    ]
  },
  { 
    title: "It Ends with Us", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2016-08-02"), 
    summary: "A story of love and heartache that explores the complexities of relationships.",
    isbn: "978-1501110368", 
    reviews: [
      { reviewer_name: "Emily Nguyen", rating: 5, comment: "Heart-wrenching and unforgettable.", review_date: new Date() }
    ]
  },
  { 
    title: "Project Hail Mary", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2021-05-04"), 
    summary: "A lone astronaut must save Earth from disaster.",
    isbn: "978-0593135204", 
    reviews: [
      { reviewer_name: "Isaac Romero", rating: 5, comment: "An incredible mix of science and storytelling!", review_date: new Date() }
    ]
  },
  { 
    title: "Daisy Jones & The Six", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2019-03-05"), 
    summary: "A fictional oral history of a rock band's rise and fall.",
    isbn: "978-1524798628", 
    reviews: [
      { reviewer_name: "Olivia Johnson", rating: 4, comment: "Unique storytelling style!", review_date: new Date() }
    ]
  },
  { 
    title: "Where the Crawdads Sing", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2018-08-14"), 
    summary: "A mystery set in the marshlands of North Carolina.",
    isbn: "978-0735219090", 
    reviews: [
      { reviewer_name: "Liam Thompson", rating: 5, comment: "A beautifully written tale.", review_date: new Date() }
    ]
  }
];

// Function to Insert Data
async function main() { 
  const client = new MongoClient(url);

  try { 
    await client.connect(); 
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Insert authors
    const authorsCollection = db.collection('authors'); 
    const insertedAuthors = await authorsCollection.insertMany(authors); 
    console.log("Inserted authors:", insertedAuthors.insertedCount);

    // Update author references in books
    books[0].author_id = insertedAuthors.insertedIds[0]; 
    books[1].author_id = insertedAuthors.insertedIds[1];
    books[2].author_id = insertedAuthors.insertedIds[2];
    books[3].author_id = insertedAuthors.insertedIds[3];
    books[4].author_id = insertedAuthors.insertedIds[4];

    // Insert genres
    const genresCollection = db.collection('genres'); 
    const insertedGenres = await genresCollection.insertMany(genres); 
    console.log("Inserted genres:", insertedGenres.insertedCount);

    // Update genre references in books
    books[0].genre_id = insertedGenres.insertedIds[0]; 
    books[1].genre_id = insertedGenres.insertedIds[1];
    books[2].genre_id = insertedGenres.insertedIds[2];
    books[3].genre_id = insertedGenres.insertedIds[3];
    books[4].genre_id = insertedGenres.insertedIds[4];

    // Insert books with embedded reviews
    const booksCollection = db.collection('books'); 
    const insertedBooks = await booksCollection.insertMany(books); 
    console.log("Inserted books:", insertedBooks.insertedCount);
  } catch (err) { 
    console.error("An error occurred:", err.message); 
  } finally { 
    await client.close(); 
    console.log("Connection closed");
  }
}

main();