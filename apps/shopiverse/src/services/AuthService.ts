import { GoogleSignInResponse } from '../utils/google.interface';
import { User, Session } from '@supabase/supabase-js';

export class AuthService {
  handleSignInWithGoogle = async (response: GoogleSignInResponse) => {
    try {
      // https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=framework&framework=sveltekit&queryGroups=environment&environment=client#configure-your-services-id
      const { data, error } = await useSupabaseClient().auth.signInWithIdToken({
        provider: 'google',
        token: response.credential
      });

      console.log('data: ', data);
      return { data, error };
    } catch (error) {
      console.error('Supabase auth error:', error);
      return { data: null, error };
    }
  };

  login = async (email: string, password: string) => {
    try {
      const { data, error } = await useSupabaseClient().auth.signInWithPassword(
        {
          email: email,
          password: password
        }
      );

      return { data, error };
    } catch (error) {
      console.error('Supabase auth error:', error);
      return { data: null, error };
    }
  };
}
