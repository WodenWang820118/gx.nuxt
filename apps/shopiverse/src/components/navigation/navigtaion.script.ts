export function usePublicNav() {
  const isAuthenticated = ref(false);
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const profileMenuItems = computed(() => {
    if (!user.value) {
      return [
        [
          {
            label: 'Register',
            icon: 'i-heroicons-user-plus',
            to: '/register'
          },
          {
            label: 'Login',
            icon: 'i-heroicons-arrow-right-on-rectangle',
            to: '/login'
          }
        ]
      ];
    }

    return [
      [
        {
          label: 'Account Settings',
          icon: 'i-heroicons-cog-6-tooth',
          to: '/account'
        },
        {
          label: 'Logout',
          icon: 'i-heroicons-arrow-left-on-rectangle',
          click: async () => {
            await supabase.auth.signOut();
          }
        }
      ]
    ];
  });

  // Make navigationLinks computed to react to isAuthenticated changes
  const navigationLinks = computed(() => [
    [
      // Logo section
      {
        label: 'Shopiverse',
        to: '/',
        isLogo: true
      },
      ...(isAuthenticated.value
        ? [
            {
              label: 'Sell on Shopiverse',
              icon: 'i-heroicons-shopping-bag',
              to: '/sell'
            }
          ]
        : [])
    ],
    [
      {
        label: 'About',
        icon: 'i-heroicons-information-circle',
        to: '/about'
      },
      {
        label: 'Cart',
        icon: 'i-heroicons-shopping-cart',
        to: '/cart'
      },
      {
        label: 'Profile',
        icon: 'i-heroicons-user-circle',
        isProfile: true
      }
    ]
  ]);

  // Update watch to use immediate and handle user changes properly
  watch(
    () => user.value,
    (newUser) => {
      isAuthenticated.value = !!newUser;
    },
    { immediate: true }
  );

  return {
    isAuthenticated,
    profileMenuItems,
    navigationLinks
  };
}
