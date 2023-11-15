import { useState, useEffect } from 'react';

const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [wasOffline, setWasOffline] = useState<boolean>(false); // Track previous status

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setWasOffline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(false);
    };

    if (typeof window !== 'undefined' && 'onLine' in navigator) {
      setIsOnline(navigator.onLine);
      setWasOffline(!navigator.onLine); // Initialize wasOffline based on initial status
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return wasOffline && isOnline; // Return true only if transitioning from offline to online
};

export default useOnlineStatus;
