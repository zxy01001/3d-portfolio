/**
 * Client-side XOR obfuscation shield so static HTML and JS bundles
 * never contain plaintext email or QQ numbers for regex/scraper bots.
 */
const KEY = 0x5a;
const ENCODED_BYTES = [
  110, 109, 108, 107, 98, 107, 109, 110, 106, 26, 43, 43, 116, 57, 53, 55,
] as const;

export function decodeProtectedEmail(): string {
  return String.fromCharCode(...ENCODED_BYTES.map((b) => b ^ KEY));
}

export function getMaskedEmail(): string {
  return "476***740@qq.com";
}
