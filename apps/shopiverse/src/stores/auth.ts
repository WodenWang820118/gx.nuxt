import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  logoutUser,
  onAuthStateChange,
  getCurrentUserToken
} from '../utils/firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  address?: string;
  photo_url?: string;
  auth_provider?: string;
  email_verified?: boolean;
}

interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  exists?: boolean;
}

// Helper to extract safe, serializable data from Firebase User
// This prevents Vue reactivity errors with cross-origin iframe references
interface SafeFirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  providerId: string;
}

function extractSafeUserData(
  fbUser: FirebaseUser | null
): SafeFirebaseUser | null {
  if (!fbUser) return null;

  return {
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName,
    photoURL: fbUser.photoURL,
    emailVerified: fbUser.emailVerified,
    providerId: fbUser.providerId
  };
}

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<UserProfile | null> = ref(null);
  const firebaseUser: Ref<SafeFirebaseUser | null> = ref(null);
  const loading = ref(false);
  const error: Ref<string | null> = ref(null);
  const isInitialized = ref(false);
  const isAuthenticating = ref(false); // Track if we're in the middle of an auth operation

  const setUser = (newUser: UserProfile | null) => {
    user.value = newUser;
  };

  const setFirebaseUser = (newFirebaseUser: FirebaseUser | null) => {
    // Extract only safe, serializable properties to avoid cross-origin errors
    firebaseUser.value = extractSafeUserData(newFirebaseUser);
  };

  // Sync Firebase user with database user profile
  const syncUserProfile = async (fbUser: FirebaseUser) => {
    try {
      const response = await $fetch<AuthResponse>('/api/auth/user', {
        method: 'POST',
        body: {
          firebaseUid: fbUser.uid
        }
      });

      if (response.exists && response.user) {
        setUser(response.user);
      }
    } catch (err) {
      console.error('Error syncing user profile:', err);
    }
  };

  // Initialize auth state listener
  const initialize = async () => {
    if (isInitialized.value) return;

    loading.value = true;
    try {
      if (process.client) {
        console.log('[AUTH STORE] Initializing auth...');

        console.log('[AUTH STORE] Setting up auth state listener...');
        onAuthStateChange(async (fbUser) => {
          console.log(
            '[AUTH STORE] Auth state changed:',
            fbUser
              ? {
                  uid: fbUser.uid,
                  email: fbUser.email,
                  displayName: fbUser.displayName
                }
              : 'null'
          );
          setFirebaseUser(fbUser);
          // Only sync profile if we're not in the middle of a manual auth operation
          // (login, register, loginWithGoogle already handle profile syncing)
          if (fbUser && !isAuthenticating.value) {
            console.log(
              '[AUTH STORE] Syncing user profile from auth state change...'
            );
            await syncUserProfile(fbUser);
          } else if (fbUser) {
            console.log(
              '[AUTH STORE] Skipping profile sync (isAuthenticating=true)'
            );
          } else {
            console.log('[AUTH STORE] User signed out, clearing user data');
            setUser(null);
          }
        });
        isInitialized.value = true;
        console.log('[AUTH STORE] ✓ Auth initialization complete');
      }
    } catch (err) {
      console.error('[AUTH STORE] ✗ Error initializing auth:', err);
      error.value = 'Failed to initialize authentication';
    } finally {
      loading.value = false;
    }
  };

  // Register with email and password
  const register = async (
    email: string,
    password: string,
    fullName?: string,
    address?: string
  ) => {
    loading.value = true;
    error.value = null;
    isAuthenticating.value = true; // Set flag to prevent duplicate sync

    try {
      const { user: fbUser } = await registerWithEmail(email, password);

      // Create user profile in database
      const response = await $fetch<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: {
          firebaseUid: fbUser.uid,
          email: fbUser.email,
          fullName,
          address,
          photoUrl: fbUser.photoURL,
          authProvider: 'email'
        }
      });

      if (response.success && response.user) {
        setUser(response.user);
        setFirebaseUser(fbUser);
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Registration failed';
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
      // Delay resetting the flag to prevent race conditions with onAuthStateChange
      setTimeout(() => {
        isAuthenticating.value = false;
      }, 500);
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    isAuthenticating.value = true; // Set flag to prevent duplicate sync

    try {
      const { user: fbUser } = await signInWithEmail(email, password);

      // Get user profile from database
      const response = await $fetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: {
          firebaseUid: fbUser.uid
        }
      });

      if (response.success && response.user) {
        setUser(response.user);
        setFirebaseUser(fbUser);
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
      // Delay resetting the flag to prevent race conditions with onAuthStateChange
      setTimeout(() => {
        isAuthenticating.value = false;
      }, 500);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    loading.value = true;
    error.value = null;
    isAuthenticating.value = true; // Set flag to prevent duplicate sync

    try {
      console.log('[AUTH STORE] Starting Google sign-in popup...');
      const result = await signInWithGoogle();

      console.log('[AUTH STORE] ✓ Google sign-in successful:', {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName
      });

      // Set Firebase user immediately from the sign-in result
      setFirebaseUser(result.user);

      // Create a local user profile from Firebase data
      const localUser: UserProfile = {
        id: result.user.uid,
        email: result.user.email || '',
        full_name: result.user.displayName || undefined,
        photo_url: result.user.photoURL || undefined,
        auth_provider: 'google',
        email_verified: result.user.emailVerified
      };

      setUser(localUser);

      console.log('[AUTH STORE] ✓ User set successfully');
      return { success: true };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Google sign-in failed';
      console.error('[AUTH STORE] Google sign-in error:', errorMessage);
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      isAuthenticating.value = false;
      loading.value = false;
    }
  };

  // Logout
  const logout = async () => {
    loading.value = true;
    error.value = null;

    try {
      await logoutUser();
      await $fetch('/api/auth/logout', {
        method: 'POST'
      });

      setUser(null);
      setFirebaseUser(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  // Get current user token
  const getToken = async () => {
    return await getCurrentUserToken();
  };

  return {
    user,
    firebaseUser,
    loading,
    error,
    isInitialized,
    setUser,
    initialize,
    register,
    login,
    loginWithGoogle,
    logout,
    getToken
  };
});
