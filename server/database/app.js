/* jshint esversion: 8 */
// const express = require('express');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const  cors = require('cors')
// const app = express()
// const port = 3030;

// app.use(cors())
// app.use(require('body-parser').urlencoded({ extended: false }));

// const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
// const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

// mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});


// const Reviews = require('./review');

// const Dealerships = require('./dealership');

// try {
//   Reviews.deleteMany({}).then(()=>{
//     Reviews.insertMany(reviews_data['reviews']);
//   });
//   Dealerships.deleteMany({}).then(()=>{
//     Dealerships.insertMany(dealerships_data['dealerships']);
//   });
  
// } catch (error) {
//   res.status(500).json({ error: 'Error fetching documents' });
// }


// // Express route to home
// app.get('/', async (req, res) => {
//     res.send("Welcome to the Mongoose API")
// });

// // Express route to fetch all reviews
// app.get('/fetchReviews', async (req, res) => {
//   try {
//     const documents = await Reviews.find();
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching documents' });
//   }
// });

// // Express route to fetch reviews by a particular dealer
// app.get('/fetchReviews/dealer/:id', async (req, res) => {
//   try {
//     const documents = await Reviews.find({dealership: req.params.id});
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching documents' });
//   }
// });

// // Express route to fetch all dealerships
// app.get('/fetchDealers', async (req, res) => {
// //Write your code here
//   try {
//     const documents = await Dealerships.find();
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching documents' });
//   }
// });

// // Express route to fetch Dealers by a particular state
// app.get('/fetchDealers/:state', async (req, res) => {
// //Write your code here
//     try {
//         const documents = await Dealerships.find({"state": req.params.state});
//         res.json(documents);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching documents' });
//     }
// });

// // Express route to fetch dealer by a particular id
// app.get('/fetchDealer/:id', async (req, res) => {
// //Write your code here
//     try {
//         const documents = await Reviews.find({"id": req.params.id});
//         res.json(documents);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching documents' });
//     }
// });

// //Express route to insert review
// app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
//   data = JSON.parse(req.body);
//   const documents = await Reviews.find().sort( { id: -1 } )
//   let new_id = documents[0]['id']+1

//   const review = new Reviews({
// 		"id": new_id,
// 		"name": data['name'],
// 		"dealership": data['dealership'],
// 		"review": data['review'],
// 		"purchase": data['purchase'],
// 		"purchase_date": data['purchase_date'],
// 		"car_make": data['car_make'],
// 		"car_model": data['car_model'],
// 		"car_year": data['car_year'],
// 	});

//   try {
//     const savedReview = await review.save();
//     res.json(savedReview);
//   } catch (error) {
// 		console.log(error);
//     res.status(500).json({ error: 'Error inserting review' });
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors'); // Fixed missing semicolon
const app = express();
const port = 3030; // Fixed missing semicolon

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false })); // Fixed missing semicolon

const reviewsData = JSON.parse(fs.readFileSync('reviews.json', 'utf8'));
const dealershipsData = JSON.parse(fs.readFileSync('dealerships.json', 'utf8'));

mongoose.connect('mongodb://mongo_db:27017/', { dbName: 'dealershipsDB' });

const Reviews = require('./review');
const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviewsData.reviews); // Changed to dot notation
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealershipsData.dealerships); // Changed to dot notation
  });
} catch (error) {
  console.error('Error:', error); // Fixed undefined 'res' and added error logging
}

// Express route to home
app.get('/', async (req, res) => {
  res.send('Welcome to the Mongoose API'); // Fixed missing semicolon
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ id: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const data = JSON.parse(req.body); // Fixed undefined variable and semicolon
  const documents = await Reviews.find().sort({ id: -1 });
  const newId = documents[0].id + 1; // Changed to dot notation

  const review = new Reviews({
    id: newId,
    name: data.name, // Changed to dot notation
    dealership: data.dealership, // Changed to dot notation
    review: data.review, // Changed to dot notation
    purchase: data.purchase, // Changed to dot notation
    purchase_date: data.purchase_date, // Changed to dot notation
    car_make: data.car_make, // Changed to dot notation
    car_model: data.car_model, // Changed to dot notation
    car_year: data.car_year, // Changed to dot notation
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error); // Added error logging
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Fixed template literal
});
