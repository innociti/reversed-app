// Vercel Routing Middleware: HTTP Basic Auth gate for the whole site.
// Credentials default to reversed / mortgage, but can be overridden by the
// Vercel environment variables SITE_USER / SITE_PASSWORD (recommended for
// production, so the password is not stored in the repository).
import { next } from '@vercel/functions';

export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const user = process.env.SITE_USER || 'reversed';
  const pass = process.env.SITE_PASSWORD || 'mortgage';
  const expected = 'Basic ' + btoa(`${user}:${pass}`);
  const provided = request.headers.get('authorization') || '';

  if (provided === expected) {
    return next();
  }

  return new Response('Prihlasenie potrebne.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="reversed", charset="UTF-8"' },
  });
}
