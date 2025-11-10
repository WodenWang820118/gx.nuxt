import { getDataSource } from '../../database';
import { User } from '../../entities/User';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { firebaseUid, email, fullName, address, photoUrl, authProvider } =
      body;

    console.log('[REGISTER] Called with:', {
      firebaseUid,
      email,
      authProvider
    });

    if (!firebaseUid || !email) {
      throw createError({
        statusCode: 400,
        message: 'Firebase UID and email are required'
      });
    }

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    // Check if user already exists by Firebase UID
    let user = await userRepository.findOne({
      where: { id: firebaseUid }
    });

    if (user) {
      // Update existing user - this is idempotent and safe to call multiple times
      console.log('[REGISTER] User exists, updating:', user.id);
      user.full_name = fullName || user.full_name;
      user.address = address || user.address;
      user.photo_url = photoUrl || user.photo_url;
      user.email_verified = true;
      await userRepository.save(user);

      console.log('[REGISTER] Successfully updated existing user');
    } else {
      // Check if another user exists with the same email but different UID
      // This would indicate duplicate Firebase accounts
      const existingEmailUser = await userRepository.findOne({
        where: { email }
      });

      console.log('[REGISTER] Checking for duplicate email:', {
        email,
        existingUser: existingEmailUser?.id,
        requestedUid: firebaseUid
      });

      if (existingEmailUser && existingEmailUser.id !== firebaseUid) {
        console.error('[REGISTER] Duplicate account detected!', {
          existingUid: existingEmailUser.id,
          requestedUid: firebaseUid,
          email
        });
        throw createError({
          statusCode: 409,
          message: `An account with email ${email} already exists with a different authentication provider. This indicates duplicate Firebase accounts. Please delete the duplicate account in Firebase Console.`
        });
      }

      // Create new user
      console.log('[REGISTER] Creating new user:', firebaseUid);
      user = userRepository.create({
        id: firebaseUid,
        email,
        full_name: fullName,
        address,
        photo_url: photoUrl,
        auth_provider: authProvider || 'email',
        email_verified: true
      });
      await userRepository.save(user);
      console.log('[REGISTER] Successfully created new user');
    }

    console.log('[REGISTER] Returning success response for user:', user.id);
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        address: user.address,
        photo_url: user.photo_url,
        auth_provider: user.auth_provider
      }
    };
  } catch (error: unknown) {
    console.error('Error in register endpoint:', error);

    // If it's already a Nuxt error with a status code, re-throw it as is
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error;
    }

    // Otherwise, wrap it in a 500 error
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Registration failed'
    });
  }
});
