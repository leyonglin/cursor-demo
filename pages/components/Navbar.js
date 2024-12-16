import styles from './Navbar.module.css';
import { FaBars } from 'react-icons/fa'; // 需要安装 react-icons

export default function Navbar({ onToggleSidebar, collapsed }) {
  return (
    <nav className={`${styles.navbar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button 
          className={styles.toggleButton}
          onClick={onToggleSidebar}
        >
          <FaBars />
        </button>
      </div>
      <div className={styles.userInfo}>
        <span>管理员</span>
        <button onClick={() => {
          localStorage.removeItem('isLoggedIn');
          window.location.href = '/login';
        }}>
          退出
        </button>
      </div>
    </nav>
  );
} 