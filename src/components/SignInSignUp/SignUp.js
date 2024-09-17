import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username, email: email, password: password,
                    confirm_password: confirmPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error_message || "An unknown error occurred")
            }

            // Check if the response is JSON before parsing
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                // Store the username in localStorage
                localStorage.setItem("username", username);
                localStorage.setItem('access_token', data.access_token);
                //redirect or navigate to the account page
                navigate(data.redirect_url);
            } else {
                throw new Error("Response is not JSON");
            }
            // Handle the data returned from the backend
            return data;

        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }

    };

    return (
        <div className="overall-container">
            <div className="container signUpPage">
                <div className="leftContainer">
                    {/* <div className="leftContainer"> */}
                    <div className="signInHeaderLeft">
                        <p className="siginText">Sign Up</p>
                    </div>
                    <div className="formWrapper">
                        <form onSubmit={handleSubmitSignUp}>
                            {/* Sign Up Form */}
                            <div className="inputWrapper">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="inputWrapper">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            <div className="inputWrapper">
                                <label>Confirm Password:</label>
                                <input
                                    placeholder="Confirm Password"
                                    name="password"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {!isPending && <button type="submit">Sign Up</button>}
                            {isPending && <button disabled>Signing up...</button>}
                            {error && <p style={{ color: "red", marginTop: "9px" }}>{error}</p>}
                        </form>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="itemsWrapper">
                        <h1 className="welcomeText">Already Have An Account?</h1>
                        <Link to="/auth/login" className="dontHaveAcctText">Start Writing Today!<button className="signUpBtn">
                            Sign In
                        </button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;