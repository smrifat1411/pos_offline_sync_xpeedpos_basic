import { safeStorage } from 'electron';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

/**
 * Password hashing for the users table.
 *
 * safeStorage below encrypts and decrypts - it is reversible, and it is keyed to
 * the OS keychain of the machine that wrote it, so it is the wrong tool for a
 * stored credential. scrypt is one-way and salted per user, and it ships with
 * Node, so this needs no dependency.
 *
 * Format: scrypt$<salt hex>$<derived hex>. The scheme is recorded in the value
 * itself so the parameters can change later without a migration.
 */
const SCRYPT_KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!stored) return false;

  const [scheme, salt, expectedHex] = stored.split('$');

  // Rows written before passwords were hashed hold the password as plain text.
  // They are accepted once so nobody is locked out of an existing install, and
  // the caller re-hashes on the way through - see login().
  if (scheme !== 'scrypt' || !salt || !expectedHex) {
    return stored === password;
  }

  // Uint8Array rather than Buffer: timingSafeEqual is typed against
  // ArrayBufferView and Buffer no longer satisfies it.
  const derived = new Uint8Array(scryptSync(password, salt, SCRYPT_KEYLEN));
  const expected = new Uint8Array(Buffer.from(expectedHex, 'hex'));

  // Length check first: timingSafeEqual throws on a mismatch rather than
  // returning false.
  return (
    derived.length === expected.length && timingSafeEqual(derived, expected)
  );
}

export function isLegacyPlaintext(stored: string): boolean {
  return !stored?.startsWith('scrypt$');
}

export function hashText(text: string) {
  try {
    if (!safeStorage.isEncryptionAvailable()) {
      return false;
    }

    return safeStorage.encryptString(text);
  } catch (err) {
    return false;
  }
}

export function decryptText(textBuffer: Buffer) {
  try {
    if (!safeStorage.isEncryptionAvailable()) {
      return false;
    }

    const decryptedBuffer = safeStorage.decryptString(textBuffer);

    if (!decryptedBuffer) {
      return false;
    }

    const decryptedText = decryptedBuffer.toString();
    console.log('Decrypted Text:', decryptedText);

    return decryptedText;
  } catch (err) {
    console.error(err);
    return false;
  }
}
