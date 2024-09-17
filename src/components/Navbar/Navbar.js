import { Link, useNavigate } from 'react-router-dom';
import icon from '../../assets/icons/nav-icon.png';

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
    // <nav>
    //     <div class="navbar">
    //         <div class="logo"><a href="#">MiräcleBlög</a></div>
    //         <ul class="menu">
    //             <li><a href="#Blogs">Blogs</a></li>
    //             <li><a href="#Login">Login</a></li>
    //             <li><a href="#Post">Post</a></li>
    //         </ul>
    //     </div>
    // </nav>

    return (
        <nav>
            <div className='navbar'>
                <div className="logo"><Link className='nav-link' to="/">
                    <img src={icon} alt="icon-notShowing" className="nav-icon" />
                    <p>Miracle Blog</p></Link>
                </div>
                <ul className='menu'>
                    {!username ? (
                        <>
                            {/* When not logged in show Home and Blogs */}
                            <li><Link to="/auth/blogs">Blogs</Link></li>
                        </>
                    ) : (<></>)}

                    {username ? (
                        <>
                            {/* When logged in, always show Account and Logout */}
                            {/* <Link to="/">Home</Link> */}

                            <li><Link to="/auth/blogs">Blogs</Link></li>
                            <li><Link to="/account">Account</Link></li>
                            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>

                        </>
                    ) : (
                        <>
                            {/* When not logged in, show Login */}
                            <li><Link to="/auth/login">Login</Link></li>
                            <li><Link to="/auth/create_blog" className='add-blog'>Post</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );

    // return (

    //     <nav className="navbar">
    //         <div className="miracle-icon">
    //             <Link to="/">
    //                 <img src={icon} alt="icon-notShowing" className="nav-icon" />

    //                 <span style={{ color: "#f1356d", fontSize: "1.7rem", marginLeft: "14px", paddingTop: "15px" }}>Miracle Blog</span>
    //             </Link>
    //         </div>
    //         <div className="links">
    //             {!username ? (
    //                 <>
    //                     {/* When not logged in show Home and Blogs */}
    //                     <Link to="/auth/blogs">Blogs</Link>
    //                 </>
    //             ) : (<></>)}

    //             {username ? (
    //                 <>
    //                     {/* When logged in, always show Account and Logout */}
    //                     {/* <Link to="/">Home</Link> */}
    //                     <Link to="/auth/blogs">Blogs</Link>
    //                     <Link to="/account">Account</Link>
    //                     <Link to="/" onClick={handleLogout}>Logout</Link>
    //                 </>
    //             ) : (
    //                 <>
    //                     {/* When not logged in, show Login */}
    //                     <Link to="/auth/login">Login</Link>
    //                     <Link to="/auth/create_blog" className='add-blog'>Post</Link>
    //                 </>
    //             )}

    //         </div>
    //     </nav>
    // );
}

export default Navbar;
