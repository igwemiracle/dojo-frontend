import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/Home/home.css'
import './components/Account/account.css'
import './components/ForgotPassword/forgot-pass.css'
import './components/BlogDetails/blog-details.css'
import './components/Navbar/navbar.css'
import './components/SidePanel/sidepanel.css'
import './components/BlogList/blog-list.css'
import './components/NotFound/not-found.css'
import './components/SignInSignUp/signin.css'
import './components/CreateBlog/create.css'
import './components/Comments/comments.css'
import './components/OurStory/story.css'
import './components/Footer/footer.css'
import './components/SignInSignUp/signup.css'
import './components/Profile/profile.css'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
