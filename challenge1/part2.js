const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;
const url = `mongodb://${user}:${password}@localhost:27017/bookstore?authSource=bookstore`;
const dbName = 'bookstore';

// Data
const authors = [
  { name: "Brandon Sanderson", bio: "Known for Mistborn and Stormlight Archive.", birth_date: new Date("1975-12-19"), nationality: "American" },
  { name: "Colleen Hoover", bio: "Known for It Ends with Us.", birth_date: new Date("1979-12-11"), nationality: "American" },
  { name: "Andy Weir", bio: "Author of The Martian and Project Hail Mary.", birth_date: new Date("1972-06-16"), nationality: "American" },
  { name: "Taylor Jenkins Reid", bio: "Known for Daisy Jones & The Six.", birth_date: new Date("1983-12-20"), nationality: "American" },
  { name: "Delia Owens", bio: "Author of Where the Crawdads Sing.", birth_date: new Date("1949-04-04"), nationality: "American" }
];

const genres = [
  { name: "Fantasy", description: "Epic tales with magical elements." },
  { name: "Romance", description: "Stories of love and relationships." },
  { name: "Science Fiction", description: "Exploring futuristic concepts." },
  { name: "Contemporary Fiction", description: "Modern-day stories." },
  { name: "Thriller", description: "Suspenseful, fast-paced plots." },
  { name: "Mystery", description: "Whodunnit stories with twists." },
  { name: "Adventure", description: "Exciting journeys and explorations." }
];

const books = [ 
  { 
    title: "The Final Empire", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2006-07-17"), 
    summary: "A young woman discovers her powers.",
    isbn: "978-0765311788", 
    reviews: [
      { reviewer_name: "Samira Malik", rating: 5, comment: "Absolutely captivating from start to finish!", review_date: new Date() },
      { reviewer_name: "John Doe", rating: 2, comment: "Couldn't get into it, too slow.", review_date: new Date() }
    ]
  },
  { 
    title: "It Ends with Us", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2016-08-02"), 
    summary: "A heart-wrenching story of love.",
    isbn: "978-1501110368", 
    reviews: [
      { reviewer_name: "Emily Nguyen", rating: 4, comment: "Emotional and powerful, but predictable at times.", review_date: new Date() },
      { reviewer_name: "Sophie Turner", rating: 1, comment: "Didn't live up to the hype.", review_date: new Date() }
    ]
  },
  { 
    title: "Project Hail Mary", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2021-05-04"), 
    summary: "A lone astronaut must save Earth.",
    isbn: "978-0593135204", 
    reviews: [
      { reviewer_name: "Isaac Romero", rating: 5, comment: "Brilliant mix of science and storytelling!", review_date: new Date() },
      { reviewer_name: "Karen Smith", rating: 3, comment: "Good, but not as good as The Martian.", review_date: new Date() }
    ]
  },
  { 
    title: "Daisy Jones & The Six", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2019-03-05"), 
    summary: "Rise and fall of a rock band.",
    isbn: "978-1524798628", 
    reviews: [
      { reviewer_name: "Olivia Johnson", rating: 3, comment: "Unique storytelling style, but not for everyone.", review_date: new Date() },
      { reviewer_name: "Mark Lee", rating: 1, comment: "Couldn't finish it.", review_date: new Date() }
    ]
  },
  { 
    title: "Where the Crawdads Sing", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2018-08-14"), 
    summary: "A mystery in the marshlands.",
    isbn: "978-0735219090", 
    reviews: [
      { reviewer_name: "Liam Thompson", rating: 5, comment: "Beautifully written!", review_date: new Date() },
      { reviewer_name: "Amelia Clark", rating: 4, comment: "Great story, but a bit slow.", review_date: new Date() }
    ]
  },
  { 
    title: "Skyward", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2018-11-06"), 
    summary: "A girl dreams of becoming a pilot.",
    isbn: "978-0399555770", 
    reviews: [
      { reviewer_name: "Zara Lee", rating: 5, comment: "Inspiring and thrilling!", review_date: new Date() },
      { reviewer_name: "James Parker", rating: 2, comment: "Not my cup of tea.", review_date: new Date() }
    ]
  },
  { 
    title: "Verity", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2018-12-10"), 
    summary: "A writer uncovers secrets.",
    isbn: "978-1791392796", 
    reviews: [
      { reviewer_name: "Alex Carter", rating: 4, comment: "Dark and twisted!", review_date: new Date() },
      { reviewer_name: "Maya Patel", rating: 2, comment: "Too disturbing for me.", review_date: new Date() }
    ]
  },
  { 
    title: "The Martian", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2014-02-11"), 
    summary: "An astronaut is stranded on Mars.",
    isbn: "978-0553418026", 
    reviews: [
      { reviewer_name: "David Smith", rating: 5, comment: "Brilliant and funny!", review_date: new Date() },
      { reviewer_name: "Linda Jones", rating: 4, comment: "Really enjoyed it, but a bit technical.", review_date: new Date() }
    ]
  },
  { 
    title: "Malibu Rising", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2021-06-01"), 
    summary: "A family saga set in Malibu.",
    isbn: "978-1524798659", 
    reviews: [
      { reviewer_name: "Sophia Brown", rating: 3, comment: "Good, but not great.", review_date: new Date() }
    ]
  },
  { 
    title: "Educated", 
    author_id: null, 
    genre_id: null, 
    published_date: new Date("2018-02-20"), 
    summary: "A memoir of self-discovery.",
    isbn: "978-0399590504", 
    reviews: [
      { reviewer_name: "Michael Adams", rating: 4, comment: "Inspiring story.", review_date: new Date() },
      { reviewer_name: "Nina Williams", rating: 1, comment: "Overhyped, didn't enjoy it.", review_date: new Date() }
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

    const authorsCollection = db.collection('authors');
    const insertedAuthors = await authorsCollection.insertMany(authors);
    console.log("Inserted authors:", insertedAuthors.insertedCount);

    books.forEach((book, index) => book.author_id = insertedAuthors.insertedIds[index % insertedAuthors.insertedCount]);

    const genresCollection = db.collection('genres');
    const insertedGenres = await genresCollection.insertMany(genres);
    console.log("Inserted genres:", insertedGenres.insertedCount);

    books.forEach((book, index) => book.genre_id = insertedGenres.insertedIds[index % insertedGenres.insertedCount]);

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