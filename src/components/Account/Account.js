import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { handleDelete } from '../utils';
import { useEffect, useState } from "react";
import cameraIcon from '../../assets/icons/camera-icon.png'

const AccountPage = () => {
    const [blogs, setBlog] = useState([]);
    const username = localStorage.getItem('username');
    const { isPending, error } = useFetch(`http://localhost:8000/auth/blogs`);
    const [profileImage, setProfileImage] = useState(null);
    const [panelWidth, setPanelWidth] = useState("0");
    const openProfile = () => setPanelWidth("300px");
    const closeProfile = () => setPanelWidth("0");

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
    //Handles the Image upload
    const HandleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // eslint-disable-next-line no-undef
            setProfileImage(window.URL.createObjectURL(file));
        }
    };
    const handleRemoveImage = () => {
        setProfileImage(null);  // Resets to default icon
    };

    return (
        <div className="account">
            {error && <div>{error}</div>}
            {userBlogs && isPending ?
                (
                    <>
                        <p className="account-loading">Loading...</p>
                    </>
                ) : <>
                    <div className="account-left">
                        <div className="profile-picture-container">
                            {profileImage ? (
                                <img className="profile-img" src={profileImage} alt="Profile" />
                            ) : (
                                <i className="material-icons person-icon">person</i>
                            )}
                            <img src={cameraIcon} alt="icon-notShowing" className="camera-icon "
                                onClick={openProfile} />

                            <div className="open-profile-container" style={{ width: panelWidth }}>
                                <div className="open-profile-row-1">
                                    <Link to="#" className="close-profile" onClick={closeProfile}>×</Link>
                                    <i style={{ color: "#333" }} className="material-icons icon" onClick={handleRemoveImage}>delete</i>
                                </div>
                                <div className="open-profile-row-2">
                                    <img src={cameraIcon} alt="icon-notShowing" className="icon" onClick={openProfile} />
                                    <i style={{ color: "#333" }} className="material-icons icon" onClick={() => document.getElementById('imageUpload').click()}>photo</i>
                                </div>
                            </div>

                        </div>

                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}  /* Hides the input */
                            onChange={HandleImageUpload}
                        />
                        <div className="user-profile-infos">
                            <ul className="user-profile-infos-left">
                                <li><i className="material-icons">person</i></li>
                                <li><i className="material-icons">infos</i></li>
                                <li><i className="material-icons">phone</i></li>
                            </ul>
                            <ul className="user-profile-infos-right">
                                <li>
                                    <div className="input-container">
                                        <input
                                            id="nameInput"
                                            type="text"
                                            placeholder=" "
                                        // value={username}
                                        // onChange={(e) => setName(e.target.value)}
                                        />
                                        <label htmlFor="nameInput">Name</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-container">
                                        <input
                                            id="aboutInput"
                                            type="text"
                                            placeholder=" "
                                        // value={about}
                                        // onChange={(e) => setAbout(e.target.value)}
                                        />
                                        <label htmlFor="aboutInput">About</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-container">
                                        <input
                                            id="phoneInput"
                                            type="tel"
                                            placeholder=" "
                                        // value={email}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="phoneInput">Email</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="account-blog-list account-right">
                        <h1 className="account-h1">Welcome, {username}! This is your account page.</h1>
                        {userBlogs.map((blog) => (

                            <div className="blog_preview-account" key={blog.id}>

                                <div className="blog_preview-container">
                                    <h3>{blog.title}</h3>
                                    <p>{truncate(blog.body, 70)}</p>
                                    <Link to={`/auth/blogs/${blog.id}`} className="read-more-link">
                                        Read More
                                    </Link>
                                    <div className="date-container">
                                        <p className="text">Published on {formatDate(blog.date)}</p>
                                    </div>
                                    <Link to={'#'} className="icon-link" >
                                        <i style={{ color: "#333" }} className="material-icons icon" onClick={() => handleDelete(blog.id, setBlog)}>delete</i>
                                    </Link>
                                    <Link to={`/auth/update/${blog.id}`} className="icon-link" >
                                        <i style={{ color: "#333" }} className="material-icons icon">edit</i>
                                    </Link>

                                </div>

                            </div>
                        ))}
                        <Link to="/auth/create_blog" className="account-button">Add blog</Link>

                    </div>
                </>}
        </div>
    );
}

export default AccountPage;

