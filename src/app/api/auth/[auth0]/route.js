import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';

export const GET = async (req) => {
  const { pathname } = new URL(req.url);

  if (pathname.endsWith('/login')) {
    return handleLogin(req);
  }

  if (pathname.endsWith('/logout')) {
    return handleLogout(req);
  }

  if (pathname.endsWith('/callback')) {
    return handleCallback(req);
  }

  if (pathname.endsWith('/me')) {
    return handleProfile(req);
  }

  return new Response('Not found', { status: 404 });
};
