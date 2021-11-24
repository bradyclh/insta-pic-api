import * as crypto from 'crypto';
import { BinaryToTextEncoding } from 'crypto';

/**
 * helper to create hash
 * @param {string} algorithm hash algorithm [md5, sha1, sha256, sha512 ...]
 * @param {string} data data to hash
 * @param {string} salt salt to use
 * @param {string} encoding Output encoding [hex, base64]
 * @returns {string} Hash string
 */
export function getHash({
  algorithm = 'sha256',
  data = new Date().getTime().toString(),
  salt = null,
  encoding = 'hex' as BinaryToTextEncoding,
} = {}): string {
  const hasher = salt ? crypto.createHmac(algorithm, salt) : crypto.createHash(algorithm);

  return <string>hasher.update(data).digest(encoding);
}

/**
 * helper to encrypt string
 * @param {string} data (Required) UTF-8 string data that you want to encrypt
 * @param {string} key (Required) Encryption key (length should match the algorithm you choose)
 * @param {string} iv (Required if algorithm is aes-*) Initialization vector (length should match the aes you choose)
 * @param {string} algorithm Encryption algorithm [aes-128-cbc, aes-256-cbc, ...]
 * @param {string} encoding Output encoding [hex, base64]
 * @returns {string} Encrypted string
 */
export function encrypt({
  data = null,
  key = null,
  iv = null,
  algorithm = 'aes-256-cbc',
  encoding = 'hex' as BufferEncoding,
} = {}) {
  // check parameters
  if (
    typeof data !== 'string' ||
    typeof key !== 'string' ||
    (algorithm.includes('aes') && typeof iv !== 'string')
  ) {
    return new Error('[Encryption Error] Parameter is invalid');
  }
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  return cipher.update(data, 'utf8', encoding) + cipher.final(encoding);
}

/**
 * helper to decrypt string
 * @param {string} data (Required) UTF-8 string data that you want to decrypt
 * @param {string} key (Required) Decryption key
 * @param {string} iv (Required if algorithm is aes-*) Initialization vector
 * @param {string} algorithm Decryption algorithm [aes-128-cbc, aes-256-cbc, ...]
 * @param {string} encoding Output encoding [hex, base64]
 * @returns {string} Decrypted UTF-8 string
 */
export function decrypt({
  data = null,
  key = null,
  iv = null,
  algorithm = 'aes-256-cbc',
  encoding = 'hex' as BufferEncoding,
} = {}) {
  // check parameters
  if (
    typeof data !== 'string' ||
    typeof key !== 'string' ||
    (algorithm.includes('aes') && typeof iv !== 'string')
  ) {
    return new Error('[Encryption Error] Parameter is invalid');
  }
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return decipher.update(data, encoding, 'utf8') + decipher.final('utf8');
}
