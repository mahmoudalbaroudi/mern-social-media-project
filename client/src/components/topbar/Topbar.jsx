import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Albaroudi-Social</span>
        </Link>
        {user && (
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        )}
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="search for friends, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge"></span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge"></span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge"></span>
          </div>
        </div>
        {user && (
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
