import { Link, useNavigate } from 'react-router-dom';
import icon from '../../assets/icons/nav-icon.png';
import icon2 from '../../assets/icons/dropdown.png'

const Navbar = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'GET',
                credentials: 'include',  // Include cookies in the request
            });

            if (response.status === 200) {
                localStorage.removeItem('username');  // Clear the username from localStorage
                localStorage.removeItem('access_token')
                navigate('/');  // Redirect to the home page
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <nav>
            <div className='navbar'>
                <div className="logo">
                    <Link className='nav-link' to="/">
                        <img src={icon} alt="icon-notShowing" className="nav-icon" />
                        <p>Miracle Blog</p>
                    </Link>
                </div>
                <div className="dropdown" style={{ float: "right" }}>
                    {/* Dropdown button */}
                    <img src={icon2} alt="icon-notShowing" className="nav-icon" />
                    {/* <button className="dropbtn">Menu</button> */}

                    {/* Dropdown content */}
                    <div className="dropdown-content">
                        {!username ? (
                            <>
                                {/* When not logged in, show Blogs and Login */}
                                <Link to="/auth/blogs">Blogs</Link>
                                <Link to="/auth/login">Login</Link>
                                <Link to="/auth/create_blog" className='add-blog'>Post</Link>
                            </>
                        ) : (
                            <>
                                {/* When logged in, show Blogs, Account, and Logout */}
                                <Link to="/auth/blogs">Blogs</Link>
                                <Link to="/account">Account</Link>
                                <Link to="/" onClick={handleLogout}>Logout</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>

    );
}
export default Navbar;
