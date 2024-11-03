import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from "../Hooks/useFetch";


function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");
    const [blogs, setBlog] = useState([]);
    // const username = localStorage.getItem('username');
    const { username } = useParams();  // Capture username from the route parameter
    const { isPending, error } = useFetch(`http://localhost:8000/auth/blogs`);
    const userProfile = blogs ? blogs.filter(blog => blog.author === username) : [];

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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    const truncate = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    return (
        <div className="profile-page">
            {error && <div>{error}</div>}
            {/* {userProfile && isPending ? ( */}
            {isPending ? (
                <>
                    <p className="account-loading">Loading...</p>
                </>
            ) :
                <>
                    <div class="profile-picture-wrapper">
                        <i class="material-icons person-icon">person</i>
                    </div>
                    <p className='profile-username'>{username}</p>
                    {/* Tab headers */}
                    <div className="tab-header">
                        <span
                            className={`tab-label ${activeTab === "posts" ? "active" : ""}`}
                            onClick={() => setActiveTab("posts")}
                        >
                            Posts
                        </span>
                        <span
                            className={`tab-label ${activeTab === "about" ? "active" : ""}`}
                            onClick={() => setActiveTab("about")}
                        >
                            About
                        </span>
                    </div>

                    {/* Tab content */}
                    <div className="tab-content">
                        {activeTab === "posts" && (
                            <div className="posts-content">
                                {/* Display user's blog posts here */}
                                {userProfile.map((blog) => (
                                    <div className="blog_preview profile-blogs" key={blog.id}>
                                        <div>
                                            <h3>{blog.title}</h3>
                                            <p>{truncate(blog.body, 70)}</p>
                                            <Link to={`/auth/blogs/${blog.id}`} className="read-more-link">
                                                Read More
                                            </Link>
                                            <div>
                                                <p className="text">Published on {formatDate(blog.date)}</p>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === "about" && (
                            <div className="about-content">
                                <h2>About You</h2>
                                <p>This section will contain details about the user.</p>
                                {/* Display user information here */}
                            </div>
                        )}
                    </div>
                </>}
        </div>
    );
}

export default ProfilePage;
