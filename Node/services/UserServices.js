const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const User = mongoose.model("User", UserSchema); // in mongo 'users'
const BookService = require("./BookServices")

class UserService {

    // called when signing up
    async setUser(user) {

        if (user["_id"] !== undefined) {
            return await User.updateOne({ "_id": user["_id"] }, { $set: user })
        }
        else {
            const userObj = new User(user);
            userObj.setPassword(user.password);
            const result = await userObj.save();
            result["salt"] = "";
            result["hash"] = "";
            return result;
        }

    }

    async getUserById(_id) {
        return await User.findOne({ $and: [{ isDel: false }, { "_id": _id }] })

    }
    async removeUser(_id) {
        return await User.updateOne({ "_id": _id }, { $set: { isDel: true } })
    }

    async addtowishlist(_id, _bookid) {
        const bookService = new BookService();
        const result = await bookService.getBookById(_bookid);
        console.log("book by id to be added to wishlist:", result)
        const userobj = await User.findOne({ $and: [{ isDel: false }, { "_id": _id }] })
        // console.log("user whose wishlist it is:", userobj)
        return await User.findOneAndUpdate({ "_id": _id }, {
            $push: {
                "wishlist": {
                    img: result.img,
                    title: result.title,
                    author: result.author,
                    category: result.category,
                    likes_count: result.likes_count,
                    summary: result.summary,
                    content: result.content
                }
            }
        })
        console.log("user after wishlist updated,", getUserById(_id))
    }

    async addtolikedlist(_id, _bookid) {
        return await User.findOneAndUpdate({ "_id": _id }, {
            $push: {
                "likedlist": {
                    bookid: _bookid
                }
            }
        })
    }
    async removefromlikedlist(_id, _bookid) {
        // const userobj = await User.findOne({ $and: [{ isDel: false }, { "_id": _id }] })
        // console.log("in backend UserService.js ,userid:", _id)
        // console.log("in backend UserService.js ,wid:", _wid)
        const result = await User.updateOne({ "_id": _id }, { $pull: { "likedlist": _bookid } })
        console.log("result after likelist deletion:", result);
        return result
    }

    // called when signing in
    async loginUser(email, password) {
        const result = await User.find({ "email": email });
        if (result) {
            if (result.length > 0) {
                const user = result[0];
                if (user.validatePassword(password)) {
                    // SUCCESS
                    user["hash"] = "";
                    user["salt"] = "";
                    const objUser = user.toObject();
                    objUser.token = user.generateToken();
                    return objUser;
                }
                else {
                    // FAILURE
                    return;
                }
            }
        }
    }


    async deletetowishlist(_id, _wid) {

        const userobj = await User.findOne({ $and: [{ isDel: false }, { "_id": _id }] })
        console.log("in backend UserService.js ,userid:", _id)
        console.log("in backend UserService.js ,wid:", _wid)
        // console.log("userobject at wid:", userobj.wishlist[_wid]);
        const result = await User.updateOne({ "_id": _id }, { $pull: { "wishlist": userobj.wishlist[_wid] } })
        console.log("result after deletion:", result);
        return result
    }

    async getwishlist(_id) {
        return await User.findOne({ $and: [{ isDel: false }, { "_id": _id }] })
    }

    async getUser() {
        return await User.find({ isDel: false });
    }

}


module.exports = UserService;