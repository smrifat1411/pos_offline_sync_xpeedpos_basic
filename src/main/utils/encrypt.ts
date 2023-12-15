import { safeStorage } from 'electron';

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
