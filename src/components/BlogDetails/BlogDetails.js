import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/auth/blogs/${id}`);


    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article style={{ lineHeight: "20px" }}>
                    <h2> {blog.title} </h2>
                    <div>{blog.body}</div>
                    <p style={{
                        paddingLeft: "70%"
                    }}>Written by {blog.author}</p>
                </article>

            )}
        </div>
    );
}

export default BlogDetails;