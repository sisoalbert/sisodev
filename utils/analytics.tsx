import React, { useEffect } from 'react';
import { Platform } from 'react-native';

// Analytics wrapper component
export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Vercel Analytics on web platform only
    if (Platform.OS === 'web') {
      try {
        // Dynamic import for web only
        const { inject } = require('@vercel/analytics');
        // Call inject function to add analytics script
        inject();
        console.log('Vercel Analytics initialized with inject function');
      } catch (error) {
        console.warn('Failed to initialize Vercel Analytics:', error);
      }
    }
  }, []);

  // Just render children (no additional components needed since using inject)
  return <>{children}</>;
}
