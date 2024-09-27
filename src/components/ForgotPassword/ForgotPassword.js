import { useNavigate } from "react-router-dom";
import { useState } from "react";
import icon from './images/forgotPass.svg';

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/auth/forgot_password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                throw new Error(errorData.error_message || "An unknown error occurred");
            }
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                // Navigate to the reset password page or show a message
                // If the backend provides a token in the response, you might use it here
                navigate('/auth/reset_password');
            } else {
                throw new Error("Response is not JSON");
            }
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    }


    return (
        <div className="forgotPasswordContainer">
            <div className="forgotContainer">
                <div className="forgotPasswordLeft">
                    <div className="forgotHeaderLeft">
                        <p class="forgotPassText">Forgot Password?</p>
                    </div>
                    <div className="forgotPassformWrapper">
                        <form onSubmit={handleSubmit} >
                            <div className="forgotInput">

                                <input
                                    className="forgot-password-input"
                                    type="email"
                                    name="userEmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                                    placeholder="Enter your email"
                                />
                                {error && <p className="forgot-password-error">{error}</p>}
                                {!isPending && <button className="forgotPasswordButton">Verify Your Email</button>}
                                {isPending && <button className="forgotPasswordButton" disabled>Verifying...</button>}
                            </div>
                        </form>
                    </div>

                </div>
                <div className="forgotRight forgotPasswordRight">
                    <img src={icon} alt="not-showing" className="full-size-image" />

                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
