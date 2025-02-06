export const env = {
  NX_PUBLIC_BACK_GENERAL_URL:
    process.env['NX_PUBLIC_BACK_GENERAL_URL'] ?? 'http://localhost:3000',
  NX_PUBLIC_PURE_DIGITAL_ID: process.env['NX_PUBLIC_PURE_DIGITAL_ID'] ?? '',
  NX_PUBLIC_EXTERNAL_CLIENT_ID:
    process.env['NX_PUBLIC_EXTERNAL_CLIENT_ID'] ?? '',
};
