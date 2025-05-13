import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL || process.env.APP_BASE_URL,
  secret: process.env.AUTH0_SECRET,
  authorizationParams: {
    scope: process.env.AUTH0_SCOPE || 'openid profile email',
    audience: process.env.AUTH0_AUDIENCE,
    redirect_uri: process.env.AUTH0_REDIRECT_URI || `${process.env.APP_BASE_URL}/api/auth/callback`
  }
});