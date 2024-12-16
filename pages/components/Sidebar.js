import Link from 'next/link';
import styles from './Sidebar.module.css';
import { FaGraduationCap } from 'react-icons/fa';

export default function Sidebar({ collapsed }) {
  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <FaGraduationCap className={styles.logo} />
        {!collapsed && <span className={styles.title}>后台管理系统</span>}
      </div>
      <div className={styles.menuList}>
        <Link href="/" className={styles.menuItem}>
          <span>首页</span>
        </Link>
        <Link href="/students" className={styles.menuItem}>
          <span>学生管理</span>
        </Link>
        <Link href="/kimi" className={styles.menuItem}>
          <span>kimi聊天</span>
        </Link>
      </div>
    </div>
  );
} 