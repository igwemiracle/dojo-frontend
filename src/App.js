import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Home/Home';
import Blogs from './components/BlogList/Blogs';
import Comments from './components/Comments/Comment';
import NotFound from './components/NotFound/NotFound';
import OurStory from './components/OurStory/OurStory';
// import backgroundImage from './assets/images/back-img3.jpg';
import SignUp from './components/SignInSignUp/SignUp';
import SignIn from './components/SignInSignUp/SignIn';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import CreateBlog from './components/CreateBlog/CreateBlog';
import UpdateBlog from './components/CreateBlog/Update';
import AccountPage from './components/Account/Account';
import BlogDetails from './components/BlogDetails/BlogDetails';
import SidePanel from './components/SidePanel/SidePanel';
import Profile from './components/Profile/Profile'

/**
 *    FIRST STEP to making use of the Router component:
 * We need to surround our whole application using the `Router` Component. And
 * That means we can use the Router in our entire application, all components that
 * are nested inside the App Component have access to the Router
 *    SECOND STEP:
 * The second step is to decide where we want our page content to go when we go to
 * different pages. We can do this using the `Switch` Component provided we have a 
 * specific location we want our page content to be.
 */

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

const Main = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobileView(window.innerWidth >= 360 && window.innerWidth <= 435);
    };

    // Check initial screen size on mount
    checkScreenWidth();

    // Update state when screen resizes
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);
  return (
    <div className='app'>
      {isMobileView ? <SidePanel /> : <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/blogs" element={<Blogs />} />
          {/* <Route path="/auth/create_blog" element={<Create />} /> */}
          <Route path="/auth/create_blog" element={<CreateBlog />} />
          <Route path="/account" element={<AccountPage />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/auth/forgot_password" element={<ForgotPassword />} />
          <Route path="/auth/reset_password" element={<ResetPassword />} />
          <Route path="/auth/update/:id" element={<UpdateBlog />} />
          <Route path="/auth/blogs/:id" element={<BlogDetails />} />

          <Route path="/comment" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;