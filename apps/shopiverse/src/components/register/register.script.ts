import { z } from 'zod';
export function useRegisterLogic() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const successMsg = useState<string>(() => '');
  const errorMsg = useState<string>(() => '');
  const validationErrors = ref<Record<string, string>>({});

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
      if (error instanceof z.ZodError) {
        validationErrors.value[field] = error.errors[0].message;
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
        error.errors.forEach((err) => {
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

    const { data, error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        data: {
          full_name: state.userName,
          address: state.address
        }
        // emailRedirectTo: 'https://shopiversee.netlify.app/'
      }
    });

    if (error) {
      errorMsg.value = error.message;
      return;
    }

    successMsg.value = 'Redirecting...';
    setTimeout(async () => {
      successMsg.value = '';
      await navigateTo('/confirm');
    }, 2000);
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

  onMounted(() => {
    if (user.value) {
      // await navigateTo('/');
    }
  });

  return {
    state,
    validationErrors,
    successMsg,
    errorMsg,
    signUp,
    schema
  };
}
