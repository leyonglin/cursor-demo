import '../styles/globals.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const publicPaths = ['/login'];
    const path = router.pathname;

    if (!isLoggedIn && !publicPaths.includes(path)) {
      router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />
}

export default MyApp 