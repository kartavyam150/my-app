import { useNavigate, useLocation } from 'react-router-dom';
import styles from './navbar.css'; // Optional, based on your CSS setup

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <button className={isActive('/home') ? styles.active : ''} onClick={() => navigate("/home")}>Home</button>
      <button className={isActive('/about') ? styles.active : ''} onClick={() => navigate("/about")}>About</button>
      <button className={isActive('/userlist') ? styles.active : ''} onClick={() => navigate("/userlist")}>User List</button>
      <button className={isActive('/counter') ? styles.active : ''} onClick={() => navigate("/counter")}>Counter</button>
      <button className={isActive('/hooks') ? styles.active : ''} onClick={() => navigate("/hooks")}>Hooks</button>
    </nav>
  );
}
