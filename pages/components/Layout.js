import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.layout}>
      <Sidebar collapsed={isSidebarCollapsed} />
      <Navbar 
        onToggleSidebar={handleToggleSidebar} 
        collapsed={isSidebarCollapsed}
      />
      <main className={styles.mainContent} style={{ marginLeft: isSidebarCollapsed ? '80px' : '200px' }}>
        {children}
      </main>
    </div>
  );
} 