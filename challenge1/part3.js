const { MongoClient } = require('mongodb'); 

// Connection URL and Database Name 
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;
const url = `mongodb://${user}:${password}@localhost:27017/bookstore?authSource=bookstore`;
const dbName = 'bookstore'; 

async function main() { 
  const client = new MongoClient(url); 

  try { 
    await client.connect(); 
    console.log("Connected to MongoDB"); 
    const db = client.db(dbName); 
    const booksCollection = db.collection('books'); 
    const authorsCollection = db.collection('authors'); 

    // 1. Total Number of Books per Genre 
    console.log("\nTotal Number of Books per Genre:"); 
    const booksPerGenre = await booksCollection.aggregate([ 
      { 
        $lookup: { 
          from: 'genres', 
          localField: 'genre_id', 
          foreignField: '_id', 
          as: 'genre'
        }
      }, 
      {$unwind: '$genre' }, 
      { 
        $group: { 
          _id: '$genre.name', 
          totalBooks: { $sum: 1 }
        }
      }, 
      { $sort: { totalBooks: -1 } } 
    ]).toArray(); 
    console.table(booksPerGenre); 

    // 2. Average Rating of Each Book 
    console.log("\nAverage Rating of Each Book:");
    const averageRatingPerBook = await booksCollection.aggregate([ 
      { 
        $project: { 
          title: 1, 
          averageRating: { $avg: '$reviews.rating' }
        }
      }, 
      { $sort: { averageRating: -1 } }
    ]).toArray(); 
    console.table(averageRatingPerBook);

    // 3. Top 3 Authors by Number of Books 
    console.log("\nTop 3 Authors by Number of Books:"); 
    const topAuthors = await booksCollection.aggregate([
      { 
        $lookup: {
          from: 'authors', 
          localField: 'author_id', 
          foreignField: '_id', 
          as: 'author',
        }
      }, 
      { $unwind: '$author' }, 
      { 
        $group: {
          _id: '$author.name', 
          booksCount: { $sum: 1 } 
        }
      }, 
      { $sort: {booksCount: -1 } }, 
      { $limit: 3 }
    ]).toArray(); 
    console.log(topAuthors); 

  } catch (err) { 
    console.error("An error occurred:", err.message); 
  } finally { 
    await client.close(); 
    console.table("\nConnection closed");
  }
}

main(); 