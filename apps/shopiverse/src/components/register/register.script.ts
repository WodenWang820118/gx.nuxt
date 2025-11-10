import { z } from 'zod';
import { useAuthStore } from '../../stores/auth';

export function useRegisterLogic() {
  const authStore = useAuthStore();
  const successMsg = useState<string>(() => '');
  const errorMsg = useState<string>(() => '');
  const validationErrors = ref<Record<string, string>>({});
  const isGoogleLoading = ref(false);

  // Log when component is initialized
  console.log('🟦 [REGISTER SCRIPT] Component initialized');

  const schema = z.object({
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    userName: z
      .string()
      .min(2, 'Username must be at least 2 characters')
      .max(50, 'Username must be less than 50 characters'),
    address: z
      .string()
      .min(2, 'Address must be at least 2 characters')
      .max(200, 'Address must be less than 200 characters')
  });

  type Schema = z.infer<typeof schema>;

  const state = reactive({
    email: '',
    password: '',
    userName: '',
    address: ''
  });

  // Validate a single field
  const validateField = (field: keyof Schema, value: string) => {
    try {
      schema.shape[field].parse(value);
      validationErrors.value[field] = '';
    } catch (error) {
      if (error instanceof z.ZodError && error.issues.length > 0) {
        validationErrors.value[field] = error.issues[0].message;
      }
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    try {
      schema.parse(state);
      validationErrors.value = {};
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          if (err.path[0]) {
            validationErrors.value[err.path[0].toString()] = err.message;
          }
        });
      }
      return false;
    }
  };

  const signUp = async () => {
    // Clear previous messages
    successMsg.value = '';
    errorMsg.value = '';

    // Validate form before submission
    if (!validateForm()) {
      errorMsg.value = 'Please fix the validation errors';
      return;
    }

    try {
      await authStore.register(
        state.email,
        state.password,
        state.userName,
        state.address
      );

      successMsg.value = 'Registration successful! Redirecting...';
      setTimeout(async () => {
        successMsg.value = '';
        await navigateTo('/');
      }, 2000);
    } catch (error) {
      errorMsg.value =
        error instanceof Error ? error.message : 'Registration failed';
    }
  };

  const signUpWithGoogle = async () => {
    console.log('[REGISTER] 🔵 FUNCTION ENTRY - signUpWithGoogle called!');

    try {
      console.log('[REGISTER] 🔵 Inside try block');
      // Clear previous messages
      successMsg.value = '';
      errorMsg.value = '';
      isGoogleLoading.value = true;

      console.log('[REGISTER] Starting Google sign-up...');
      console.log('[REGISTER] Auth store exists:', !!authStore);
      console.log(
        '[REGISTER] Auth store.loginWithGoogle exists:',
        !!authStore.loginWithGoogle
      );

      const result = await authStore.loginWithGoogle();
      console.log('[REGISTER] Google sign-up result:', result);

      successMsg.value = 'Sign in successful! Redirecting...';
      setTimeout(async () => {
        successMsg.value = '';
        await navigateTo('/');
      }, 1500);
    } catch (error) {
      console.error('[REGISTER] 🔴 CAUGHT ERROR in signUpWithGoogle:', error);
      console.error('[REGISTER] Error type:', typeof error);
      console.error('[REGISTER] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown',
        stack: error instanceof Error ? error.stack : 'No stack',
        error: error
      });
      errorMsg.value =
        error instanceof Error ? error.message : 'Google sign-in failed';
      isGoogleLoading.value = false;
    }
  };

  // Watch for changes to validate in real-time
  watch(
    state,
    (newState) => {
      Object.keys(newState).forEach((key) => {
        validateField(key as keyof Schema, newState[key as keyof Schema]);
      });
    },
    { deep: true }
  );

  return {
    state,
    validationErrors,
    successMsg,
    errorMsg,
    signUp,
    signUpWithGoogle,
    isGoogleLoading,
    schema
  };
}
