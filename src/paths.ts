export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  overview: '/dashboard',
  account: '/account',
  history: '/history',
  settings: '/settings',
  errors: { notFound: '/errors/not-found' },
} as const;
