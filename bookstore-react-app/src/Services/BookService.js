import axios from "axios"
const USER_BASE_URL = "http://localhost:4507/book"
const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token")

};

class BookService {

    //get content of the book
    getContent(id) {
        return axios.get(USER_BASE_URL + "/" + id + "/content", { headers: headers })
    }
    getlikes(bookid) {
        return axios.get(USER_BASE_URL + "/likes/" + bookid, { headers: headers })
    }
    decreaseLikes(bookid) {
        return axios.get(USER_BASE_URL + "/likes_decrease/" + bookid, { headers: headers })
    }

    getBookById(id) {
        return axios.get(USER_BASE_URL + "/" + id, { headers: headers })
    }
}

export default new BookService();