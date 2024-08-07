const express = require('express');
const router = express.Router();
const Books = require('../models/Books');
const Shelf = require('../models/Shelf');
const Popular = require('../models/Popular');
const fetchuser = require("../middleware/fetchuser");

router.get('/getbookbycategory', async (req, res) => {
    const category = req.query.category;

    try {
        const books = await Books.find({ category });
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Server error');
    }
});

router.get('/getbooks', async (req, res) => {
    const category = req.body;

    try {
        const books = await Books.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Server error');
    }
});

router.get('/getshelfbooks', fetchuser, async (req, res) => {
    try {
        const books = await Shelf.find({ user: req.user.id });
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Server error');
    }
});

router.get('/getpopularbooks', async (req, res) => {
    try {
        const books = await Popular.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Server error');
    }
});

router.post("/createbook", async (req, res) => {
    try {
        const { bookname, bookauthor, bookoverview, category, bookimage } = req.body;

        const book = new Books({ bookname, bookauthor, bookoverview, category, bookimage });

        const saveBook = await book.save();

        res.json(saveBook);
    } catch (error) {
        console.error(error.message);
        res.json(500).send("Internal Server Error");
    }
})

router.post("/savebooktoshelf", fetchuser, async (req, res) => {
    try {
        const { bookid, bookname, bookauthor, bookoverview, category, bookimage } = req.body;
        const user = req.user.id;

        const existingBook = await Shelf.findOne({ bookid, user });
        if (existingBook) {
            return res.status(409).json({ message: 'Book already saved in the shelf' });
        }

        const book = new Shelf({ user: req.user.id, bookid, bookname, bookauthor, bookoverview, category, bookimage });

        const saveBook = await book.save();

        res.json(saveBook);
    } catch (error) {
        console.error(error.message);
        res.json(500).send("Internal Server Error");
    }
})

router.get('/checkIfSaved', fetchuser, async (req, res) => {
    try {
        const savedBook = await Shelf.findOne({ _id: _id, user: req.user.id });
        res.json({ isSaved: !!savedBook }); // Return true if book is saved, false otherwise
    } catch (error) {
        res.status(500).json({ message: 'Error checking saved status' });
    }
});

router.post("/savebooktopopular", async (req, res) => {
    try {
        const { _id, bookname, bookauthor, bookoverview, category, bookimage } = req.body;

        const book = new Popular({ _id, bookname, bookauthor, bookoverview, category, bookimage });

        const saveBook = await book.save();

        res.json(saveBook);
    } catch (error) {
        console.error(error.message);
        res.json(500).send("Internal Server Error");
    }
})

router.get('/checkbook/:id', async (req, res) => {
    try {
        const book = await Shelf.findById(req.params.id);
        if (book) {
            return res.json({ exists: true });
        }
        res.json({ exists: false });
    } catch (error) {
        console.error('Error checking book:', error);
        res.status(500).json({ message: 'Failed to check book', error });
    }
});

router.get('/checkbookpop/:id', async (req, res) => {
    try {
        const book = await Popular.findById(req.params.id);
        if (book) {
            return res.json({ exists: true });
        }
        res.json({ exists: false });
    } catch (error) {
        console.error('Error checking book:', error);
        res.status(500).json({ message: 'Failed to check book', error });
    }
});

router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        const bookId = req.params.id;
        const user = req.user.id
        const result = await Shelf.deleteOne({ _id: bookId, user: user });

        if (result.deletedCount === 1) {
            res.status(200).send({ message: 'Book deleted successfully', user: req.user });
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting book', error });
    }
});

router.delete('/deletebook/:id', fetchuser, async (req, res) => {
    try {
        const bookId = req.params.id;
        const result = await Books.deleteOne({ _id: bookId });

        if (result.deletedCount === 1) {
            res.status(200).send({ message: 'Book deleted successfully', user: req.user });
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error deleting book', error });
    }
});

module.exports = router;