import { Link, useNavigate } from 'react-router-dom';
import icon from '../../assets/icons/nav-icon.png';
import icon2 from '../../assets/icons/dropdown.png'
import { useState } from 'react';

const Navbar = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [panelWidth, setPanelWidth] = useState("0");
    const openNav = () => setPanelWidth("250px");
    const closeNav = () => setPanelWidth("0");

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
                <div className="icon-div ">
                    <img src={icon2} onClick={openNav} alt="icon-notShowing" className="nav-icon2" />
                    <Link to="/">
                        <img src={icon} alt="icon-notShowing" className="nav-icon" />
                    </Link>
                </div>

                <div>
                    <>
                        <div id="mySidepanel" className="sidepanel" style={{ width: panelWidth }}>
                            <Link to="#" className="closebtn" onClick={closeNav}>×</Link>
                            {!username ? (
                                <>
                                    <Link to="/auth/create_blog" className='add-blog'>Post</Link>
                                    <Link to="/auth/blogs">Blogs</Link>
                                    <Link to="/auth/login">Login</Link>
                                    <Link to="#">Contact</Link>
                                </>
                            ) :
                                <>
                                    {/* When logged in, show Blogs, Account, and Logout */}
                                    <Link to="/auth/blogs">Blogs</Link>
                                    <Link to="/account">Account</Link>
                                    <Link to="/" onClick={handleLogout}>Logout</Link>
                                </>}

                        </div>
                    </>
                </div>
            </div>
        </nav>

    );



}
export default Navbar;
