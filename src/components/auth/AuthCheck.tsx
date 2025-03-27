import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';

/**
 * This component doesn't render anything visually
 * It just checks for authentication status on mount
 */
export default function AuthCheck() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status on component mount
    const verifyAuth = async () => {
      await checkAuth();
    };

    verifyAuth();
  }, [checkAuth]);

  return null;
}
