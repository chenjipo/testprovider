const crypto = require('crypto').webcrypto;
const fs = require('fs');

const hash =
  '8bd9f4eeccaffdc6-7bb7054b6b1bf5ebba31f5b3-bee2681b5c8537acbb98b2179fe92e430b43b840cbe03151ecf3ec95605d3c28d8accd2317eb2da55f';
const [s, iv, ct] = hash.split('-');
const salt = Buffer.from(s, 'hex');
const ivb = Buffer.from(iv, 'hex');
const ctb = Buffer.from(ct, 'hex');

async function tryDec(loc, iterations, keyLen) {
  const enc = new TextEncoder();
  const imp = await crypto.subtle.importKey('raw', enc.encode(loc), 'PBKDF2', false, ['deriveKey']);
  const ak = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    imp,
    { name: 'AES-GCM', length: keyLen },
    false,
    ['decrypt']
  );
  try {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivb }, ak, ctb);
    return new TextDecoder().decode(pt);
  } catch (e) {
    return null;
  }
}

async function main() {
  for (const iterations of [1, 100, 1000, 10000]) {
    for (const keyLen of [128, 256]) {
      const r = await tryDec('US', iterations, keyLen);
      if (r) console.log('US', iterations, keyLen, r);
    }
  }
  // nePlain: salt = plaintext bytes
  const mid = '1630861315';
  for (let t = 1782211100; t < 1782211250; t++) {
    const plain = mid + '+1+1+' + t;
    const pb = Buffer.from(plain, 'utf8');
    const enc = new TextEncoder();
    const imp = await crypto.subtle.importKey('raw', enc.encode('US'), 'PBKDF2', false, ['deriveKey']);
    const ak = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: pb, iterations: 1000, hash: 'SHA-256' },
      imp,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    try {
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivb }, ak, ctb);
      console.log('nePlain match ts', t, new TextDecoder().decode(pt));
    } catch (e) {}
    if (pb.equals(salt)) console.log('salt equals plain bytes for ts', t);
  }
  if (salt.equals(Buffer.from(mid + '+1+1', 'utf8').slice(0, 8))) console.log('partial salt match');
  console.log('salt hex', s, 'as utf8', salt.toString('utf8'));
}

main().catch(console.error);
