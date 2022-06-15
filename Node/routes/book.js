const express = require("express");
const router = express.Router();
const BookService = require("../services/BookServices");
const auth = require("./auth");

router.get("/gethome", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.getBook();
    res.send(result);
})
router.get("/", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.getBook();
    res.send(result);
})

router.get("/likes/:bookid", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.incrementLikes(req.params.bookid);
    res.send(result);
})
router.get("/likes_decrease/:bookid", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.decrementLikes(req.params.bookid);
    res.send(result);
})

// adding a book
router.post("/add", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.setBook(req.body);
    res.send(result)
})


// delete book
router.delete("/remove/:id", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.removeBook(req.params.id);
    res.send(result)
})

//content of the book
router.get("/:id/content", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.getBookById(req.params.id);
    res.send(result)
})
router.get("/:id", async (req, res) => {
    const bookService = new BookService();
    const result = await bookService.getBookById(req.params.id);
    res.send(result)
})
module.exports = router;