import {
  hashPassword,
  verifyPassword,
  isLegacyPlaintext,
} from '../main/utils/encrypt';

// encrypt.ts also wraps Electron's safeStorage, which does not exist under jsdom.
// Only the scrypt helpers are exercised here, so the module is stubbed at the
// import boundary rather than pulling in the real Electron runtime.
jest.mock('electron', () => ({ safeStorage: {} }));

describe('password hashing', () => {
  it('accepts the correct password', () => {
    const stored = hashPassword('correct horse battery');
    expect(verifyPassword('correct horse battery', stored)).toBe(true);
  });

  it('rejects the wrong password', () => {
    const stored = hashPassword('correct horse battery');
    expect(verifyPassword('wrong password', stored)).toBe(false);
  });

  it('rejects an empty password', () => {
    // The original login() returned success as soon as the username matched, so
    // an empty password signed in. This is the regression guard for that.
    const stored = hashPassword('correct horse battery');
    expect(verifyPassword('', stored)).toBe(false);
  });

  it('salts, so the same password hashes differently each time', () => {
    expect(hashPassword('same')).not.toEqual(hashPassword('same'));
  });

  it('never stores the password in the hash', () => {
    expect(hashPassword('hunter2')).not.toContain('hunter2');
  });

  it('still accepts an account stored before hashing existed', () => {
    expect(verifyPassword('legacy-pass', 'legacy-pass')).toBe(true);
    expect(verifyPassword('other', 'legacy-pass')).toBe(false);
    expect(isLegacyPlaintext('legacy-pass')).toBe(true);
    expect(isLegacyPlaintext(hashPassword('x'))).toBe(false);
  });
});
