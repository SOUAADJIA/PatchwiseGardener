import React, { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post";
import Comment from "../components/Comment";
import "../styles/Community.css";

function Community() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState({});
    const [newComments, setNewComments] = useState({});

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const response = await api.get("/api/posts/");
            const data = response.data;
            setPosts(data);
            const initialCommentsState = {};
            const initialNewCommentsState = {};
            data.forEach((post) => {
                initialCommentsState[post.id] = [];
                initialNewCommentsState[post.id] = "";
                getComments(post.id);
            });
            setComments(initialCommentsState);
            setNewComments(initialNewCommentsState);
        } catch (err) {
            alert(err);
        }
    };

    const getComments = async (postId) => {
        try {
            const response = await api.get(`/api/comments/?post_id=${postId}`);
            const data = response.data;
            setComments((prev) => ({ ...prev, [postId]: data }));
        } catch (err) {
            alert(err);
        }
    };

    const deletePost = async (id) => {
        try {
            const response = await api.delete(`/api/posts/${id}/`);
            if (response.status === 204) {
                alert("Post deleted!");
                getPosts();
            } else {
                alert("Failed to delete post.");
            }
        } catch (error) {
            alert(error);
        }
    };

    const createPost = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/posts/", { content, title });
            if (response.status === 201) {
                alert("Post created!");
                setContent("");
                setTitle("");
                getPosts();
            } else {
                alert("Failed to make post.");
            }
        } catch (err) {
            console.error("Error creating post:", err);
            alert(`Error creating post: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleCommentChange = (postId, value) => {
        setNewComments((prev) => ({ ...prev, [postId]: value }));
    };

    const createComment = async (e, postId) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/comments/", { content: newComments[postId], post: postId });
            if (response.status === 201) {
                alert("Comment created!");
                getComments(postId);
                setNewComments((prev) => ({ ...prev, [postId]: "" }));
            } else {
                alert("Failed to make comment.");
            }
        } catch (err) {
            console.error("Error creating comment:", err);
            alert(`Error creating comment: ${err.response?.data?.message || err.message}`);
        }
    };

    const deleteComment = async (postId, commentId) => {
        try {
            const response = await api.delete(`/api/comments/${commentId}/`);
            if (response.status === 204) {
                alert("Comment deleted!");
                getComments(postId);
            } else {
                alert("Failed to delete comment.");
            }
        } catch (error) {
            alert(error);
        }
    };

    const editPost = async (postId, newTitle, newContent) => {
        try {
            const response = await api.put(`/api/posts/${postId}/`, { title: newTitle, content: newContent });
            if (response.status === 200) {
                alert("Post updated!");
                getPosts();
            } else {
                alert("Failed to update post.");
            }
        } catch (err) {
            console.error("Error updating post:", err);
            alert(`Error updating post: ${err.response?.data?.message || err.message}`);
        }
    };

    const editComment = async (commentId, newContent, postId) => {
        try {
            const payload = { content: newContent.trim(), post: postId };  // Include post ID in the payload
            console.log("Sending PUT request with payload:", payload);
            const response = await api.put(`/api/comments/${commentId}/`, payload);
            if (response.status === 200) {
                alert("Comment updated!");
                getComments(postId);  // Refresh comments for the specific post
            } else {
                console.error("Failed to update comment:", response);
                alert("Failed to update comment.");
            }
        } catch (err) {
            if (err.response) {
                console.error("Error updating comment:", err.response.data);
                alert(`Error updating comment: ${JSON.stringify(err.response.data)}`);
            } else {
                console.error("Error updating comment:", err.message);
                alert(`Error updating comment: ${err.message}`);
            }
        }
    };

    return (
        <div className="container">
            <h1>Community Posts</h1>
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <Post post={post} onDelete={() => deletePost(post.id)} onEdit={editPost} />
                    <div className="comments">
                        <h3>Comments</h3>
                        {comments[post.id] &&
                            comments[post.id].map((comment) => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    postId={post.id}  // Pass postId to Comment component
                                    onDelete={() => deleteComment(post.id, comment.id)}
                                    onEdit={(commentId, newContent) => editComment(commentId, newContent, post.id)}  // Pass postId to editComment
                                />
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
            <h2>New Post</h2>
            <form onSubmit={createPost} className="create-post-form">
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
