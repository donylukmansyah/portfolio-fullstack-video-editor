const normalizeEmail = (email?: string | null) => email?.trim().toLowerCase() ?? "";

export function isAdminEmail(email?: string | null) {
  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
  return Boolean(adminEmail) && normalizeEmail(email) === adminEmail;
}
