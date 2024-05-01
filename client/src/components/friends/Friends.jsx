import "./friends.css";

export default function Friends({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img src={PF + user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendItem">{user.username}</span>
    </li>
  );
}
