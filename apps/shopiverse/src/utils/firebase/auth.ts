import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  linkWithPopup,
  type User,
  type AuthError
} from 'firebase/auth';
import { getApp } from 'firebase/app';

let auth: ReturnType<typeof getAuth> | null = null;
let googleProvider: GoogleAuthProvider | null = null;

export function initializeAuth() {
  if (process.client && !auth) {
    try {
      console.log('[FIREBASE] Initializing Firebase Auth...');
      // Get the already initialized Firebase app
      const firebaseApp = getApp();
      console.log('[FIREBASE] Firebase app found:', firebaseApp.name);

      auth = getAuth(firebaseApp);
      console.log('[FIREBASE] Auth instance created');

      googleProvider = new GoogleAuthProvider();

      // Prevent creation of duplicate accounts with same email
      // This will prompt the user to sign in with existing account first
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });

      console.log('[FIREBASE] ✓ Auth initialization complete');
    } catch (error) {
      console.error('[FIREBASE] ✗ Error initializing Firebase Auth:', error);
      throw new Error('Firebase App must be initialized before Auth');
    }
  }
  return auth;
}

export function getFirebaseAuth() {
  if (!auth) {
    console.log('[FIREBASE] Auth not initialized yet, initializing now...');
    initializeAuth();
  }
  if (!auth) {
    console.error('[FIREBASE] ✗ Failed to initialize Firebase Auth');
    throw new Error('Firebase Auth could not be initialized');
  }
  console.log('[FIREBASE] Returning auth instance');
  return auth;
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  if (!auth || !googleProvider) {
    console.error('[FIREBASE] ✗ Auth or provider not initialized:', {
      authExists: !!auth,
      providerExists: !!googleProvider
    });
    throw new Error('Firebase Auth not initialized');
  }

  try {
    console.log('[FIREBASE] Initiating Google sign-in popup...');
    console.log('[FIREBASE] Auth instance:', {
      hasAuth: !!auth,
      authDomain: auth.config.authDomain,
      currentUser: auth.currentUser?.email || 'none'
    });
    console.log('[FIREBASE] Provider config:', {
      providerId: googleProvider.providerId,
      customParameters: googleProvider.getCustomParameters()
    });

    // Use popup for Google sign-in
    console.log('[FIREBASE] Calling signInWithPopup...');
    const result = await signInWithPopup(auth, googleProvider);
    console.log('[FIREBASE] ✓ Popup sign-in successful:', {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName
    });

    const user = result.user;
    const token = await user.getIdToken();
    const credential = GoogleAuthProvider.credentialFromResult(result);

    return {
      user,
      token,
      credential
    };
  } catch (error: unknown) {
    console.error('[FIREBASE] ✗ Error with Google popup:', error);
    if (error instanceof Error) {
      console.error('[FIREBASE] Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

// Helper function to link Google account to existing email/password account
export async function linkGoogleAccount() {
  const auth = getFirebaseAuth();
  if (!auth?.currentUser || !googleProvider) {
    throw new Error('User must be signed in to link accounts');
  }

  try {
    console.log('[FIREBASE] Initiating Google account linking via popup...');
    // Use popup for account linking
    const result = await linkWithPopup(auth.currentUser, googleProvider);
    console.log('[FIREBASE] ✓ Successfully linked Google account');

    return {
      success: true,
      user: result.user,
      credential: GoogleAuthProvider.credentialFromResult(result)
    };
  } catch (error: unknown) {
    console.error('[FIREBASE] Error linking Google account:', error);

    // Handle account-exists-with-different-credential error
    const authError = error as AuthError;
    if (authError.code === 'auth/account-exists-with-different-credential') {
      const email = authError.customData?.email;
      if (email && typeof email === 'string') {
        throw new Error(
          `An account with email ${email} already exists. Please sign in with that account first.`
        );
      }
    }

    throw error;
  }
}

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    return {
      user: result.user,
      token
    };
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
}

export async function registerWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    return {
      user: result.user,
      token
    };
  } catch (error) {
    console.error('Error registering with email:', error);
    throw error;
  }
}

export async function logoutUser() {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  return onAuthStateChanged(auth, callback);
}

export async function getCurrentUserToken(): Promise<string | null> {
  const auth = getFirebaseAuth();
  if (!auth?.currentUser) {
    return null;
  }

  try {
    return await auth.currentUser.getIdToken();
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
}
