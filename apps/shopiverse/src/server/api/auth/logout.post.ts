export default defineEventHandler(async (event) => {
  try {
    // In a Nuxt app with Firebase, logout is typically handled on the client
    // This endpoint can be used to clear server-side sessions if needed

    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch (error) {
    console.error('Error in logout endpoint:', error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Logout failed'
    });
  }
});
