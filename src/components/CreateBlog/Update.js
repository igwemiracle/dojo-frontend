import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    // Fetch the blog data when the component mounts
    useEffect(() => {
        const fetchBlogDetails = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await fetch(`http://localhost:8000/auth/blogs/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const blog = await response.json();
                    setTitle(blog.title); // Populate title input
                    setBody(blog.body); // Populate body textarea
                } else {
                    console.error('Failed to fetch blog details');
                }
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlogDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const accessToken = localStorage.getItem('access_token');
        // Get the access token from localStorage
        try {
            const response = await fetch(`http://localhost:8000/auth/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                    // Include the access token in the Authorization header
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                })
            });
            if (response.ok) {
                // Check if response body is not empty before parsing JSON
                if (response.status === 200) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        await response.json(); // Only parse JSON if content-type is JSON
                    }
                    navigate('/auth/blogs');  // Redirect after successful update
                }
            }
            else {
                const errorData = await response.json();
                if (errorData.detail === "Could not validate credentials") {
                    alert("You need to register or login to update a blog.");
                    navigate("/auth/login"); // Redirect to login page
                } else {
                    alert(errorData.detail || "Failed to update blog");
                }
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="create">
            <div className="form-style" style={{ marginTop: "40px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label for="title">Blog title:</label>
                        <input
                            placeholder="Re-Enter your title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <label>Blog body:</label>
                    <textarea
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>

                    {!isPending && <button>update</button>}
                    {isPending && <button disabled>updating...</button>}
                </form>
            </div>
        </div>
    );
}

export default UpdateBlog;