import { getDataSource } from '../../database';
import { User } from '../../entities/User';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { firebaseUid } = body;

    if (!firebaseUid) {
      throw createError({
        statusCode: 400,
        message: 'Firebase UID is required'
      });
    }

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: firebaseUid }
    });

    if (!user) {
      return {
        exists: false,
        user: null
      };
    }

    return {
      exists: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        address: user.address,
        photo_url: user.photo_url,
        auth_provider: user.auth_provider,
        email_verified: user.email_verified
      }
    };
  } catch (error) {
    console.error('Error checking user:', error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to check user'
    });
  }
});
