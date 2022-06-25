// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  //Placeholder for empty book details
  let blankBookDetails = {
    "Title": "",
    "Price": "",
    "Author": "",
    "Genre": ""
  }
  //Send blank book details
  res.render('books/details', {
    title: 'Add Book',
    books: blankBookDetails
  });
    /*****************
     * ADD CODE HERE *
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //Placeholder for book details
    let newBookDetails = book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    })

    book.create(newBookDetails, (err, book) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.redirect("/books")
      }
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    let bookId = req.params.id;

    //cget book from database and send it with render request
    book.findById(bookId, (err, editBook) => {
      console.log(editBook)
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.render('books/details', {
          title: 'Edit Book',
          books: editBook
        });
      }
    })
    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    let bookId = req.params.id;
    //Placeholder for book details
    let newBookDetails = book({
      "_id": bookId,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    })
    console.log(newBookDetails)
    book.updateOne({_id: bookId}, newBookDetails, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        //Redirect o books main page
        res.redirect("/books")
      }
    })

    /*****************
     * ADD CODE HERE *
     *****************/
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let bookId = req.params.id;
  book.remove({_id: bookId}, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      //Redirect o books main page
      res.redirect("/books")
    }
  })
    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
