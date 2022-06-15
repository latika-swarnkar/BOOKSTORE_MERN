import { useNavigate } from 'react-router-dom';
import AdminService from '../../Services/AdminService';
import BookService from '../../Services/BookService';
import NavbarHomeAdmin from './NavbarHomeAdmin';
import Card from 'react-bootstrap/Card'
import React, { useEffect, useMemo, useState } from "react";
import './AddBook.css'
const EditBook = () => {

    const navigate = useNavigate();
    const bookid = localStorage.getItem("bookid")
    const [title, settitle] = useState('')
    const [author, setauthor] = useState('')
    const [content, setcontent] = useState('')
    const [category, setcategory] = useState('')
    const [img, setimg] = useState('')
    const [summary, setsummary] = useState('')
    const [likes, setlikes] = useState('')

    // console.log("bookid is:", bookid)
    const test = () => {
        // const res = BookService.getContent(bookid)
        // console.log("result after api call", res)
        BookService.getContent(bookid).then((res) => {
            console.log(res.data.title);
            settitle(res.data.title)
            setauthor(res.data.author)
            setimg(res.data.img)
            setcontent(res.data.content)
            setlikes(res.data.likes_count)
            setcategory(res.data.category)
            setsummary(res.data.summary)
            // const id = localStorage.getItem("id")

        })

    }

    useEffect(() => {
        test();
    }, [])

    useEffect(() => {
        const localData = localStorage.getItem("adminid")
        // console.log(localData)
        if (localData == null) {
            alert("Sorry,you are not admin!!")
            navigate("/")
        }
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const bookData = {
            img: img,
            title: title,
            author: author,
            content: content,
            summary: summary,
            category: category,
            likes_count: likes
        }
        console.log("bookData to edit is", bookData)

        AdminService.editBookbyAdmin(bookData, bookid).then((res) => {
            console.log("Results are=", res);
            if (res.status == 200) {
                navigate("/homeAdmin");
            }
        })
    }

    return (
        <div>
            <NavbarHomeAdmin />
            <div className="container ">
                <h1> Edit this  Book</h1>
                <Card style={{ width: '50rem', height: '46.5rem', padding: '1.5rem' }} className="card-class">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                className="form-control"
                                placeholder="Enter author"
                                defaultValue={author}
                                onChange={(e) => setauthor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="img">Enter image url:</label>
                            <input
                                type="img"
                                name="img"
                                id="img"
                                className="form-control"
                                placeholder="Enter img"
                                value={img}
                                onChange={(e) => setimg(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="title"
                                name="title"
                                id="title"
                                className="form-control"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="category"
                                name="category"
                                id="category"
                                className="form-control"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="likes_count">Likes Count</label>
                            <input
                                type="likes_count"
                                name="likes_county"
                                id="likes_count"
                                className="form-control"
                                value={likes}
                                onChange={(e) => setlikes(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">

                            <label htmlFor="summary">Summary</label>

                            <textarea
                                id="summary"
                                name="summary"
                                className="form-control"
                                placeholder="Enter summary"
                                value={summary}
                                onChange={(e) => setsummary(e.target.value)}
                                //  onChange={(e) => dispatch({ type: 'summary', value: e.target.value })} 
                                rows="2" cols="50">

                            </textarea>
                        </div>
                        <div className="form-group">

                            <label htmlFor="content">Content</label>

                            <textarea
                                id="content"
                                name="content"
                                className="form-control"
                                placeholder="Enter Content"
                                value={content}
                                onChange={(e) => setcontent(e.target.value)}

                                rows="6" cols="50">

                            </textarea>
                        </div>





                        <div className='form-group'>
                            <input type="submit" value="Update Book" className='btn btn-info' />
                        </div>

                    </form>
                </Card>
                <br /><br /><br />
            </div>

        </div>

    );
};
export default EditBook;