export const handleDelete = (blogId, updateBlogs) => {
    fetch(`http://localhost:8000/auth/delete/${blogId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }).then((response) => {
        if (response.ok) {
            // Use the updateBlogs callback to remove the blog from the state
            updateBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
        } else {
            console.error("Failed to delete the blog");
        }

    }).catch((error) => {
        console.error('Error during delete request:', error);
    });
};
