import { withAuth } from '@auth0/nextjs-auth0/middleware'

export default withAuth()

export const config = {
  matcher: ['/dashboard/:path*']
}