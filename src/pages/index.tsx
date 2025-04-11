import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the embedded.html file
    router.push('/embedded.html');
  }, [router]);

  return null; // This component doesn't render anything as it redirects immediately
} 