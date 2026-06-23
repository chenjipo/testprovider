const crypto = require('crypto').webcrypto;

const info =
  '12b7659cd8b496be-4533e6affd9ad1ba68a4830c-903baf4e324e417d64669180a264c7b997da63103945b14c68bf9e2b9a98c48046622e2d28d08a091cfffa7b0a';
const [s, iv, ct] = info.split('-');
const salt = Buffer.from(s, 'hex');
const ivb = Buffer.from(iv, 'hex');
const ctb = Buffer.from(ct, 'hex');

async function decryptInfo(loc) {
  const enc = new TextEncoder();
  const imp = await crypto.subtle.importKey('raw', enc.encode(loc), 'PBKDF2', false, ['deriveKey']);
  const ak = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 1000, hash: 'SHA-256' },
    imp,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivb }, ak, ctb);
  return new TextDecoder().decode(pt);
}

async function main() {
  for (const loc of ['US', 'TW', 'GB', 'DE', 'FR', 'CN', 'HK', 'SG', 'AU', 'CA', 'IN', 'BR', 'JP', 'KR']) {
    try {
      const r = await decryptInfo(loc);
      console.log('loc', loc, '=>', r);
    } catch (e) {}
  }
  // try using info part1 as plaintext salt in nePlain style for get hash decrypt
  const hash =
    '8bd9f4eeccaffdc6-7bb7054b6b1bf5ebba31f5b3-bee2681b5c8537acbb98b2179fe92e430b43b840cbe03151ecf3ec95605d3c28d8accd2317eb2da55f';
  const [hs, hiv, hct] = hash.split('-');
  const hsalt = Buffer.from(hs, 'hex');
  const hivb = Buffer.from(hiv, 'hex');
  const hctb = Buffer.from(hct, 'hex');
  const enc = new TextEncoder();
  for (const loc of ['US', 'TW']) {
    const imp = await crypto.subtle.importKey('raw', enc.encode(loc), 'PBKDF2', false, ['deriveKey']);
    const ak = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: hsalt, iterations: 1000, hash: 'SHA-256' },
      imp,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    try {
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: hivb }, ak, hctb);
      console.log('hash decrypt', loc, new TextDecoder().decode(pt));
    } catch (e) {}
  }
}

main().catch(console.error);
