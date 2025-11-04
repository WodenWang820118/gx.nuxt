import { GoogleSignInResponse } from '../utils/google.interface';

export class AuthService {
  handleSignInWithGoogle = async (response: GoogleSignInResponse) => {
    try {
      // Implement Google sign-in with your backend API
      console.log('Google sign-in response:', response);

      // Example: Send to your backend API
      const data = await $fetch('/api/auth/google', {
        method: 'POST',
        body: {
          credential: response.credential
        }
      });

      console.log('data: ', data);
      return { data, error: null };
    } catch (error) {
      console.error('Auth error:', error);
      return { data: null, error };
    }
  };

  login = async (email: string, password: string) => {
    try {
      // Implement login with your backend API
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password
        }
      });

      return { data, error: null };
    } catch (error) {
      console.error('Auth error:', error);
      return { data: null, error };
    }
  };
}
