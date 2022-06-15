const express = require("express");
const router = express.Router();
const UserService = require("../services/UserServices");
const auth = require("./auth");
const jwt = require("express-jwt");

// welcome page
router.get("/", async (req, res) => {
    const userService = new UserService();
    const result = await userService.getUser();
    res.send(result);
})


// sign up page
router.post("/signup", async (req, res) => {
    const userService = new UserService();
    const result = await userService.setUser(req.body);
    res.send(result)
})

// sign in page
router.post("/login", async (req, res) => {
    const userService = new UserService();
    const result = await userService.loginUser(req.body.email, req.body.password);
    res.send(result)
})


// account deleted by user
router.delete("/:id", async (req, res) => {
    const userService = new UserService();
    const result = await userService.removeUser(req.params.id);
    res.send(result)
})

//add to wishlist
router.post("/:userid/:bookid", async (req, res) => {
    const userService = new UserService();
    console.log("in add to wishlist of user")
    console.log(req.params.userid, req.params.bookid)
    const result = await userService.addtowishlist(req.params.userid, req.params.bookid);
    console.log("added to wishlist", result)
    res.send(result)
})
router.post("/:id/:bookid", async (req, res) => {
    const userService = new UserService();
    const result = await userService.addtolikedlist(req.params.id, req.params.bookid);
    res.send(result)
})

//get wishlist
router.get("/wishlist/:id", async (req, res) => {
    const userService = new UserService();
    const result = await userService.getwishlist(req.params.id);
    console.log("result in get wishlist:", result)
    if (result)
        res.send(result["wishlist"]);
})

//delete book from wishlist
router.delete("/wishlist/:id/:wid", async (req, res) => {
    const userService = new UserService();
    const result = await userService.deletetowishlist(req.params.id, req.params.wid);
    console.log("in user,js result after deleted :", result)
    res.send(result);
})


module.exports = router;