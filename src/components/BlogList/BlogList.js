// How to make a component take in props-data and use that data inside that component.
// In other words, we can also make it to be reuseable.
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogList = ({ title }) => {
    const [blogs, setBlogs] = useState([]);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    //fetch the blogs from the backend
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
                    setBlogs(data);
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlog();
    }, [])
    const truncate = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    return (
        <div className="blog-list" style={{ marginBottom: "50px" }}>
            <h1>{title}</h1>
            {blogs.map((blog) => (
                <div className="blog_preview" key={blog.id}>
                    <div>
                        <h3>{blog.title}</h3>
                        <p>{truncate(blog.body, 70)}</p>
                        <Link to={`/auth/blogs/${blog.id}`} className="read-more-link">
                            Read More
                        </Link>
                        <div>
                            <p className="text">Published on {formatDate(blog.date)}</p>
                        </div>
                        <Link to={'/comment'} className="icon-link">
                            <i style={{ color: "#333" }} className="material-icons icon">comment</i>
                        </Link>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
