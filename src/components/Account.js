import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { handleDelete } from './utils';
import { useEffect, useState } from "react";

const AccountPage = () => {
    const [blogs, setBlog] = useState([]);
    const username = localStorage.getItem('username');
    const { isPending, error } = useFetch(`http://localhost:8000/auth/blogs`);

    // Filter blogs for the current logged-in user
    const userBlogs = blogs ? blogs.filter(blog => blog.author === username) : [];
    const truncate = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch('http://localhost:8000/auth/blogs', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlog();
    }, [])
    return (
        <div className="account">
            {error && <div>{error}</div>}
            {isPending && <div>Is Loading...</div>}
            {userBlogs.length > 0 && (
                <>
                    <h1 className="account-h1">Welcome, {username}! This is your account page.</h1>
                    {/* Display the user's blogs */}
                    <div className="account-blog-list" style={{ marginBottom: "50px" }}>
                        {userBlogs.map((blog) => (
                            <div className="blog_preview-account" key={blog.id}>
                                <div className="account-container">
                                    <h3>{blog.title}</h3>
                                    <p>{truncate(blog.body, 70)}</p>
                                    <Link to={`/auth/blogs/${blog.id}`} className="read-more-link">
                                        Read More
                                    </Link>
                                    <div className="date-container">
                                        <p className="text">Published on {formatDate(blog.date)}</p>
                                    </div>
                                    <Link to={'#'} className="icon-link" >
                                        <i className="material-icons icon" onClick={() => handleDelete(blog.id, setBlog)}>delete</i>
                                    </Link>
                                    <Link to={`/auth/update/${blog.id}`} className="icon-link" >
                                        <i className="material-icons icon">edit</i>
                                    </Link>

                                </div>

                            </div>
                        ))}
                    </div>
                    <Link to="/auth/create_blog" className="account-link">Add blog</Link>
                </>
            )}
            {userBlogs.length === 0 && !isPending && (
                <>
                    <p>No blogs found for {username}. Start by adding one!</p>
                    <Link to="/auth/create_blog" className="account-link">Add blog</Link>

                </>

            )}
        </div>
    );
}

export default AccountPage;

