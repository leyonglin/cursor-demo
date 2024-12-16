import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './login.module.css'; // 引入样式文件

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // 硬编码的用户名和密码
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      alert('用户名或密码错误');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>请输入用户名和密码登录</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
            placeholder="用户名"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="密码"
          />
        </div>
        <button type="submit" className={styles.button}>登录</button>
      </form>
      <div className={styles.footer}>
        <a href="#">忘记密码?</a>
      </div>
    </div>
  );
};

export default Login; 