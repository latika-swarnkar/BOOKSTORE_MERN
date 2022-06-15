import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useMemo, useState, useRef } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux";
import "./Home.css"
import NavbarHome from "./NavbarHome";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookService from "../../Services/BookService";
import UserService from "../../Services/UserService";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CardActions from '@mui/material/CardActions';
import { filteredList } from '../Filter/Filter'
import Item from "../Filter/Item";
import Tooltip from '@mui/material/Tooltip';

const USER_BASE_URL = "http://localhost:4507/book";




const headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token")

};

const Home = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const id = localStorage.getItem("id")
    const user_id = localStorage.getItem("userid")
    // const myref = useRef(null);
    // const [likecalled, setflaglike] = useState(0);
    // console.log(user_id)
    // var ele;
    useEffect(() => {
        getBook();
        // ele = document.querySelector(".liked");
    }, []);

    useEffect(() => {
        const localData = localStorage.getItem("userid")
        // console.log(localData)
        if (localData == null) {
            navigate("/")
            alert("you have to login as user!!")
        }
    });

    const getBook = async () => {
        // e.preventDefault();
        const res = await axios.get(USER_BASE_URL, { headers: headers })
        // then((res) => {
        //     // console.log(res);
        //     setBooks(res.data);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
        setBooks(res.data);
    }

    const wishlistHandler = (id) => {
        localStorage.setItem("id", id)
        // console.log("In")
        UserService.addtoWishlist(user_id, id).then((res) => {
            console.log("after adding:", res)
            navigate("/wishlist")
        })
    }

    const contentHandler = (id) => {
        //event.preventDefault();
        localStorage.setItem("id", id)
        BookService.getContent(id).then((res) => {
            if (res.status == 200) {
                navigate("/book/" + id + "/content")
            }
            else {
                console.log("Couldn't find book")
            }
        })

    }
    // useEffect(() => {
    //     console.log("outside if in useeffect of likecalled ,", myref.current)
    //     if (myref.current && likecalled) {
    //         console.log("inside likecalled ,", myref.current)
    //         const heart = myref.current.querySelector(".heart")

    //         // heart.classList.add("afterliked")
    //         myref.current.querySelector(".heart").classList.add("afterliked")
    //         console.log("heart element:", heart)
    //         console.log("actual heart element:", myref.current.querySelector(".heart"))
    //         setflaglike(0)

    //     }

    // }, [likecalled]);

    const likeHandler = (bookid) => {
        // setflaglike(1)
        // console.log("likecalled is:", likecalled)
        // console.log("inside likehandler ,", myref.current)
        // if (myref.current)
        //     myref.current.querySelector(".heart").classList.add("latika")

        BookService.getlikes(bookid).then((res) => {
            if (res.status == 200) {
                console.log("after incremented:", res)
                getBook()

                // console.log("ele to be added liked class:", ele)
                // // ele.classList.add('divstyle')
                // ele.classList.toggle('afterliked')

            }
            else {
                console.log("Couldn't find book")
            }
        })

    }
    const dislikeHandler = (bookid) => {
        BookService.decreaseLikes(bookid).then((res) => {
            if (res.status == 200) {
                console.log("after incremented:", res)
                getBook()
            }
            else {
                console.log("Couldn't find book")
            }
        })

    }
    const { selectedCategory, search } = useSelector((state) => state);
    // console.log("in home search:", search)
    function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory && !search) {
            // console.log("when both null")
            return books;
        }
        else if (search == "") {
            // console.log("when search null")
            return books.filter((item) => item.category === selectedCategory);
        }
        else {
            // console.log("when search is not null")
            // string.includes(substring
            // str.toLowerCase().includes('Stark'.toLowerCase());
            return books.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        }
    }
    function compare(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }
    var filteredList = useMemo(getFilteredList, [selectedCategory, search, books]);
    filteredList.sort(compare)
    // console.log("in home selected category is:", selectedCategory)
    return (
        <div>
            <NavbarHome />
            <div>
                <h1>Featured Books</h1>


                <div className='item-container card-grid'>
                    {filteredList.map((book) => (

                        <Card style={{ width: '18rem' }} key={book._id} >
                            {/* <IconButton aria-label="add to favorites" ref={myref} style={{ marginLeft: '0rem' }}>
                                <FavoriteIcon className="heart" />
                            </IconButton> */}
                            <IconButton aria-label="add to favorites" style={{ marginLeft: '0rem' }}>
                                <FavoriteIcon className="heart" />
                            </IconButton>
                            <Card.Img variant="top" src={book.img} style={{ height: '18rem', width: '18rem' }} />

                            <Card.Body>

                                <Card.Title>{book.title}</Card.Title>

                                <Card.Text>
                                    {book.author}
                                </Card.Text>
                                <Card.Text>Category: {book.category}</Card.Text>
                                <Card.Text>
                                    {book.summary}
                                </Card.Text>
                            </Card.Body>


                            <CardActions disableSpacing>

                                <IconButton aria-label="add to favorites" style={{ marginLeft: '0rem' }}>

                                    <Tooltip title="Like this book" arrow>
                                        <ThumbUpOutlinedIcon className="like" onClick={() => likeHandler(book._id)} />
                                    </Tooltip>
                                    <Tooltip title="Dislike this book" arrow>
                                        <ThumbDownAltOutlinedIcon className="dislike" onClick={() => dislikeHandler(book._id)} />
                                    </Tooltip>


                                    <div style={{ fontSize: '1rem' }}>{book.likes_count}</div>
                                </IconButton>


                                <Tooltip title="Read this book" arrow>
                                    <IconButton aria-label="readme" onClick={() => contentHandler(book._id)} >
                                        <MenuBookIcon className="book" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Add to your Wishlist" arrow>
                                    <IconButton aria-label="add to wishlist" onClick={() => wishlistHandler(book._id)} >
                                        <ShoppingBasketIcon className="bag" />
                                    </IconButton>
                                </Tooltip>



                            </CardActions>



                        </Card>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Home