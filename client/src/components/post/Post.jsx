// import { MoreVert } from "@mui/icons-material";
// import "./post.css";
// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { AuthContext } from "../../context/AuthContext";

// export default function Post({ post }) {
//   const [like, setLike] = useState(post.likes.length);
//   const [isLiked, setIsLiked] = useState(false);
//   const [user, setUser] = useState({});
//   const [showDeleteButton, setShowDeleteButton] = useState(false);
//   const [showUpdateDescButton, setShowUpdateDescButton] = useState(false);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const { user: currentUser, dispatch } = useContext(AuthContext);

//   // for date and time manipulation.
//   const format = (date) => {
//     return moment(date).fromNow();
//   };

//   useEffect(() => {
//     setIsLiked(post.likes.includes(currentUser._id));
//   }, [currentUser._id, post.likes]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`/users?userId=${post.userId}`);
//         setUser(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUser();
//   }, [post.userId]);

//   const likeHandler = () => {
//     try {
//       axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
//     } catch (err) {
//       console.log(err);
//     }
//     setLike(isLiked ? like - 1 : like + 1);
//     setIsLiked(!isLiked);
//   };

//   const handleDeletePost = async (postId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this post?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`/posts/${postId}`, {
//           data: { userId: currentUser._id },
//         });
//         dispatch({ type: "DELETE_POST", payload: postId });
//         window.location.reload();
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   const handleUpdateDesc = async (postId) => {
//     const newDesc = prompt("Enter new description:");
//     if (newDesc) {
//       try {
//         await axios.put(`/posts/${postId}`, {
//           userId: currentUser._id,
//           desc: newDesc,
//         });
//         window.location.reload();
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   const handleMoreVertClick = () => {
//     setShowDeleteButton(!showDeleteButton);
//     setShowUpdateDescButton(!showUpdateDescButton);
//   };

//   return (
//     <div className="post">
//       <div className="postWrapper">
//         <div className="postTop">
//           <div className="postTopLeft">
//             <Link to={`profile/${user.username}`}>
//               <img
//                 src={
//                   user.profilePicture
//                     ? PF + user.profilePicture
//                     : PF + "person/noAvatar.png"
//                 }
//                 alt=""
//                 className="postProfileImg"
//               />
//             </Link>
//             <span className="postUserName">{user.username}</span>
//             <span className="postDate">{format(post.createdAt)}</span>
//           </div>
//           <div className="postTopRight">
//             <MoreVert onClick={handleMoreVertClick} />
//             {showDeleteButton && currentUser._id === post.userId && (
//               <button
//                 className="deleteButton"
//                 onClick={() => handleDeletePost(post._id)}
//               >
//                 Delete
//               </button>
//             )}
//             {showUpdateDescButton && currentUser._id === post.userId && (
//               <button
//                 className="updateDescButton"
//                 onClick={() => handleUpdateDesc(post._id)}
//               >
//                 Update Desc
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="postCenter">
//           <span className="postText">{post?.desc}</span>
//           <img className="postImg" src={PF + post.img} alt="" />
//         </div>
//         <div className="postBottom">
//           <div className="postBottomLeft">
//             <img
//               className="likeIcon"
//               src={`${PF}like.png`}
//               onClick={likeHandler}
//               alt=""
//             />
//             <img
//               className="likeIcon"
//               src={`${PF}heart.png`}
//               onClick={likeHandler}
//               alt=""
//             />
//             <span className="postLikeCounter">
//               <b>{like}</b> People like it
//             </span>
//           </div>
//           <div className="postBottomRight">
//             <Link to={`/posts/${post._id}/comments`}>
//               <button className="addCommentButton"> Comments</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { MoreVert } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./post.css";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showUpdateDescButton, setShowUpdateDescButton] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [openUpdateDescDialog, setOpenUpdateDescDialog] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // for date and time manipulation.
  const format = (date) => {
    return moment(date).fromNow();
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDeleteDialogOpen = (postId) => {
    setPostIdToDelete(postId);
    setOpenDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${postIdToDelete}`, {
        data: { userId: currentUser._id },
      });
      dispatch({ type: "DELETE_POST", payload: postIdToDelete });
      setOpenDialog(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateDescDialogOpen = (postId) => {
    setPostIdToDelete(postId);
    setOpenUpdateDescDialog(true);
  };

  const handleUpdateDescDialogClose = () => {
    setOpenUpdateDescDialog(false);
  };

  const handleUpdateDesc = async () => {
    // const newDesc = prompt("Enter new description:");
    if (newDesc) {
      try {
        await axios.put(`/posts/${post._id}`, {
          userId: currentUser._id,
          desc: newDesc,
        });
        setOpenUpdateDescDialog(false);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleMoreVertClick = () => {
    setShowDeleteButton(!showDeleteButton);
    setShowUpdateDescButton(!showUpdateDescButton);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert onClick={handleMoreVertClick} />
            {showDeleteButton && currentUser._id === post.userId && (
              <button
                className="deleteButton"
                onClick={() => handleDeleteDialogOpen(post._id)}
              >
                Delete
              </button>
            )}
            {showUpdateDescButton && currentUser._id === post.userId && (
              <button
                className="updateDescButton"
                onClick={() => handleUpdateDescDialogOpen(post._id)}
              >
                Update Desc
              </button>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">
              <b>{like}</b> People like it
            </span>
          </div>
          <div className="postBottomRight">
            <Link to={`/posts/${post._id}/comments`}>
              <button className="addCommentButton"> Comments</button>
            </Link>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeletePost}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdateDescDialog} onClose={handleUpdateDescDialogClose}>
        <DialogTitle>Update Description</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newDesc"
            label="New Description"
            type="text"
            fullWidth
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDescDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateDesc}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
