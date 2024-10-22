import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/auth/blogs/${id}`);


    return (
        <div className="blog-details">
            {isPending && <div className="blog-load">Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article className="blog-article">
                    <h2> {blog.title} </h2>
                    <div>
                        <p className="blog-details-body">{blog.body}</p>
                        <p>Written by {blog.author}</p></div>
                </article>

            )}
            {/* {isPending && <div className="blog-load">Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article style={{ lineHeight: "20px" }}>
                    <h2> {blog.title} </h2>
                    <div>
                        <p className="blog-details-body">{blog.body}</p>
                        <p>Written by {blog.author}</p></div>
                </article>

            )} */}
        </div>
    );
}

export default BlogDetails;