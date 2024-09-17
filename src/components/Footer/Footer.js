import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    <h4>Miracle Blog</h4>
                    <p>Your space for sharing wisdom and stories.</p>
                </div>

                <div className="footer-middle">
                    <ul>
                        <li><Link to="/story">Our Story</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className="footer-right">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <Link to="/">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Miracle Blog. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
