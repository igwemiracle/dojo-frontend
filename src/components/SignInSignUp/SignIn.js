import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom/";

const SignIn = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                localStorage.setItem('username', username);
                localStorage.setItem('access_token', data.access_token);
                navigate(encodeURI(data.redirect_url));
            } else {
                const data = await response.json();
                setError(data.error_message || "Login failed.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="overall-container">
            <div className="container">
                <div className="leftContainer signInPage">
                    <div className="signInHeaderLeft">
                        <p class="siginText">Sign In</p>
                        {/* <div class="socialsWrapper">
                            <p class="icon">f</p>
                            <p class="icon">t</p>
                        </div> */}
                    </div>
                    <div className="formWrapper">
                        <form onSubmit={handleSubmitSignIn}>
                            <div className="inputWrapper">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {!isPending && <button type="submit">Sign In</button>}
                            {isPending && <button disabled>Signing in...</button>}
                            {error && <p style={{ color: "red", textAlign: "center", marginTop: "15px" }}>{error}</p>}
                        </form>
                    </div>

                    <div className="formFooterWrapper">
                        <div>
                            <input type="checkbox" id="check1" />
                            <label className="rememberMe" htmlFor="check1">
                                Remember Me
                            </label>
                        </div>
                        <div>
                            <Link className="forgotPass" to="/auth/forgot_password">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="rightContainer">
                    <div className="itemsWrapper">
                        <h1 className="welcomeText">Don't Have Än Account?</h1>
                        <Link to="/auth/register" className="dontHaveAcctText">Sign Up to Create<button className="signUpBtn">
                            Sign Up
                        </button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
