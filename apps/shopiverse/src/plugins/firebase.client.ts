import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirebaseConfig } from '../utils/firebase/config';

export default defineNuxtPlugin(() => {
  if (process.client) {
    let firebaseApp: FirebaseApp;

    // Only initialize if no apps exist (prevents duplicate app error)
    if (getApps().length === 0) {
      const firebaseConfig = getFirebaseConfig();
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApps()[0];
    }

    // Initialize auth store
    const authStore = useAuthStore();
    authStore.initialize();

    return {
      provide: {
        firebaseApp
      }
    };
  }
});
