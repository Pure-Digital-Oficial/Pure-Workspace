export const env = {
  NX_PUBLIC_BACK_PURE_BLOG_URL:
    process.env['NX_PUBLIC_BACK_PURE_BLOG_URL'] ?? 'http://localhost:3001',
  NX_PUBLIC_BACK_GENERAL_URL:
    process.env['NX_PUBLIC_BACK_GENERAL_URL'] ?? 'http://localhost:3000',
  NX_PUBLIC_APOL_BLOG_ID: process.env['NX_PUBLIC_APOL_BLOG_ID'] ?? '',
  NX_PUBLIC_EXTERNAL_CLIENT_ID:
    process.env['NX_PUBLIC_EXTERNAL_CLIENT_ID'] ?? '',
};
