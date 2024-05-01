import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, Button, TextField, Typography, Box } from "@mui/material";

export default function CommentPage() {
  const { postId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/posts/${postId}/comments`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (commentText) {
      try {
        const res = await axios.post(`/posts/${postId}/comments`, {
          postId: postId,
          userId: currentUser._id,
          text: commentText,
        });
        setComments((prevComments) => [...prevComments, res.data]);
        setCommentText("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/posts/${postId}/comments/${commentId}`, {
          data: { userId: currentUser._id },
        });
        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          key={comment._id}
        >
          <Avatar sx={{ marginRight: 2 }}>U</Avatar>
          <Typography sx={{ flexGrow: 1 }}>{comment.text}</Typography>
          {currentUser._id === comment.userId && (
            <Button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </Button>
          )}
        </Box>
      ))}
      <Box
        component="form"
        onSubmit={handleAddComment}
        sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
      >
        <Avatar sx={{ marginRight: 2 }}>U</Avatar>
        <TextField
          sx={{ flexGrow: 1 }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          multiline
          rows={4}
        />
        <Button type="submit" sx={{ marginLeft: 2 }}>
          Add Comment
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Back to Post
      </Button>
    </div>
  );
}
