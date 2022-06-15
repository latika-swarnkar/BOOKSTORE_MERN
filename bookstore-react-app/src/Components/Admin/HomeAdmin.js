import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "../User/Home.css"
import NavbarHomeAdmin from "../Admin/NavbarHomeAdmin";
import BookService from "../../Services/BookService";
import AdminService from "../../Services/AdminService"
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const USER_BASE_URL = "http://localhost:4507/book";
const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token")

};

const Home = () => {
    const params = "";
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getBook();
    }, []);

    useEffect(() => {
        const localData = localStorage.getItem("adminid")
        console.log("localData=", localData)
        if (localData == null) {
            alert("You are not Admin")
            navigate("/home")
        }
    }, []);

    const getBook = () => {

        return axios.get(USER_BASE_URL, { headers: headers }).then((res) => {
            console.log(res);
            setBooks(res.data);
        })
            .catch((err) => {
                console.log(err);
            });
    }




    const deleteHandler = (id) => {
        localStorage.setItem("id", id)
        AdminService.deleteBookbyAdmin(id).then((res) => {
            if (res.status == 200) {
                getBook()
            }
            else {
                console.log("Couldn't find book")
            }
        })

    }
    const editHandler = (id) => {
        localStorage.setItem("bookid", id)
        navigate("/editBook")
        // AdminService.editBookbyAdmin(id).then((res) => {
        //     if (res.status == 200) {
        //         getBook()
        //     }
        //     else {
        //         console.log("Couldn't find book")
        //     }
        // })

    }

    const id = localStorage.getItem("id")


    function compare(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }
    books.sort(compare)

    return (
        <div className="full">
            <NavbarHomeAdmin />

            <div>
                <h1>Featured Books</h1>
                <div className='item-container card-grid'>
                    {books.map((book) => (
                        <Card style={{ width: '18rem' }} key={book._id}>
                            <Card.Img variant="top" src={book.img} style={{ height: '18rem', width: '18rem' }} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>
                                    {book.author}
                                </Card.Text>
                                <Card.Text>
                                    {book.summary}
                                </Card.Text>
                            </Card.Body>
                            {/* <Button variant="danger" onClick={() => deleteHandler(book._id)} style={{ height: '2.5rem', width: '5rem' }}>
                                Delete
                            </Button> */}
                            < div>
                                <IconButton aria-label="delete" onClick={() => deleteHandler(book._id)} >

                                    <DeleteIcon className="deleteme" />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => editHandler(book._id)} >

                                    <EditIcon className="editme" />
                                </IconButton>
                            </div>



                            {/* <Button variant="success" onClick={() => editHandler(book._id)} style={{ height: '2.5rem', width: '5rem' }}>
                                <a href="/editBook" className="text-light">Edit</a>
                            </Button> */}
                        </Card>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Home