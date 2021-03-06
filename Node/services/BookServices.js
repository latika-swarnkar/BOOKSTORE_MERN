const mongoose = require("mongoose");
const BookSchema = require("../models/Books");
const Book = mongoose.model("Book", BookSchema); // in mongo 'books'

class BookService {

    // called by admin while adding books
    async setBook(book) {

        if (book["_id"] !== undefined) {
            return await Book.updateOne({ "_id": book["_id"] }, { $set: book })
        }
        else {
            const bookObj = new Book(book);
            const result = await bookObj.save();
            return result;
        }

    }
    async editBook(bookid, book) {
        return await Book.updateOne({ "_id": bookid }, { $set: book })
    }


    // called by home page
    async getBook() {
        return await Book.find({ isDel: false });
    }

    async getBookById(_id) {
        return await Book.findOne({ $and: [{ isDel: false }, { "_id": _id }] })

    }
    async incrementLikes(_bookid) {
        let result = await Book.findOne({ $and: [{ isDel: false }, { "_id": _bookid }] })
        console.log(result)
        result["likes_count"]++;
        let likes = result["likes_count"];
        return await Book.updateOne({ "_id": _bookid }, { $set: { "likes_count": likes } })

    }
    async decrementLikes(_bookid) {
        let result = await Book.findOne({ $and: [{ isDel: false }, { "_id": _bookid }] })
        console.log(result)
        result["likes_count"]--;
        let likes = result["likes_count"];
        return await Book.updateOne({ "_id": _bookid }, { $set: { "likes_count": likes } })
        // }
    }

    async removeBook(_id) {
        return await Book.updateOne({ "_id": _id }, { $set: { isDel: true } })
    }






}


module.exports = BookService;