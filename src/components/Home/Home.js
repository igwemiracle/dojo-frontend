import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const HomePage = () => {
    return (
        <div className="home">
            <header>
                <div className="header-container">
                    <div className="header-container-inner">
                        <h1>Explore, Learn, Inspire: Your Blogging Journey Starts Here.</h1>
                        <p>Welcome to Miracle Blog, your go-to destination for insightful blog posts. Our mission is to provide a platform where ideas flow freely, and knowledge is shared generously.</p>
                        <Link to="/auth/blogs" className="btn">Start reading</Link>
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    );
}

export default HomePage;
