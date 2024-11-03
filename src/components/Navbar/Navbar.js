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
  return (
    <nav>
      <div className='navbar'>
        <div className='logo'>
          <Link to="/">
            <img src={icon} alt="icon-notShowing" className="nav-icon" />
          </Link>
        </div>
        <div className='nav-link-container'>
          <div className='nav-link'>
            {!username ? (
              <>
                {/* When not logged in, show Blogs and Login */}
                <Link to="/auth/blogs">Blogs</Link>
                <Link to="/auth/login">Sign In</Link>
                <Link to="/auth/create_blog">Add blog</Link>
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
