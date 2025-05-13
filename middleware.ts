import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0';

export default withMiddlewareAuthRequired({
  returnTo: '/login'
});

export const config = {
  matcher: [
    '/dashboard',
    '/perfil',
    '/consultas',
    '/registos',
    // Adicione outras rotas protegidas aqui
  ]
};