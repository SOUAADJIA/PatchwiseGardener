import React, { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post";
import "../styles/Community.css";

function Community() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState({});
    const [newComments, setNewComments] = useState({}); // Updated state

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api.get("/api/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                data.forEach((post) => {
                    getComments(post.id);
                    setNewComments((prev) => ({
                        ...prev,
                        [post.id]: "" // Initialize new comment state for each post
                    }));
                });
            })
            .catch((err) => alert(err));
    };

    const getComments = (postId) => {
        api.get(`/api/comments/?post=${postId}`)
            .then((res) => res.data)
            .then((data) => {
                setComments((prev) => ({ ...prev, [postId]: data }));
            })
            .catch((err) => alert(err));
    };

    const deletePost = (id) => {
        api.delete(`/api/posts/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Post deleted!");
                else alert("Failed to delete post.");
                getPosts();
            })
            .catch((error) => alert(error));
    };

    const createPost = (e) => {
        e.preventDefault();
        api.post("/api/posts/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Post created!");
                    setContent(""); // Clear content
                    setTitle(""); // Clear title
                    setNewComments({}); // Clear new comments
                    getPosts(); // Fetch posts again to include the newly created post
                } else {
                    alert("Failed to make post.");
                }
            })
            .catch((err) => {
                console.error("Error creating post:", err);
                alert(`Error creating post: ${err.response?.data?.message || err.message}`);
            });
    };

    const handleCommentChange = (postId, value) => {
        setNewComments((prev) => ({ ...prev, [postId]: value }));
    };

    const createComment = (e, postId) => {
        e.preventDefault();
        api.post("/api/comments/", { content: newComments[postId], post: postId })
            .then((res) => {
                if (res.status === 201) alert("Comment created!");
                else alert("Failed to make comment.");
                getComments(postId);
            })
            .catch((err) => {
                console.error("Error creating comment:", err);
                alert(`Error creating comment: ${err.response?.data?.message || err.message}`);
            });
    };

    const deleteComment = (postId, commentId) => {
        api.delete(`/api/comments/${commentId}/`)
            .then((res) => {
                if (res.status === 204) alert("Comment deleted!");
                else alert("Failed to delete comment.");
                getComments(postId);
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <div>
                <h1>Community Posts</h1>
                {posts.map((post) => (
                    <div key={post.id}>
                        <Post post={post} onDelete={deletePost} />
                        <div className="comments">
                            <h3>Comments</h3>
                            {comments[post.id] &&
                                comments[post.id].map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <p>{comment.content}</p>
                                        <button onClick={() => deleteComment(post.id, comment.id)}>Delete Comment</button>
                                    </div>
                                ))}
                            <form onSubmit={(e) => createComment(e, post.id)}>
                                <textarea
                                    value={newComments[post.id] || ""}
                                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                    placeholder="Add a comment"
                                    required
                                ></textarea>
                                <button type="submit">Add Comment</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Create a Post</h2>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Community;
