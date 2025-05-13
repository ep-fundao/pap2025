import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT
  })
});