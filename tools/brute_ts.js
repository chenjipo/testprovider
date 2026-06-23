const crypto = require('crypto').webcrypto;

const targetCt =
  'bee2681b5c8537acbb98b2179fe92e430b43b840cbe03151ecf3ec95605d3c28d8accd2317eb2da55f';
const salt = Buffer.from('8bd9f4eeccaffdc6', 'hex');
const iv = Buffer.from('7bb7054b6b1bf5ebba31f5b3', 'hex');
const ctb = Buffer.from(targetCt, 'hex');

async function neRand(loc, plain) {
  const enc = new TextEncoder();
  const pb = enc.encode(plain);
  const imp = await crypto.subtle.importKey('raw', enc.encode(loc), 'PBKDF2', false, ['deriveKey']);
  const ak = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 1000, hash: 'SHA-256' },
    imp,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, ak, pb);
  return Buffer.from(ct).toString('hex');
}

async function nePlain(loc, plain) {
  const enc = new TextEncoder();
  const pb = enc.encode(plain);
  const imp = await crypto.subtle.importKey('raw', enc.encode(loc), 'PBKDF2', false, ['deriveKey']);
  const ak = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: pb, iterations: 1000, hash: 'SHA-256' },
    imp,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, ak, pb);
  return Buffer.from(ct).toString('hex');
}

async function main() {
  const mid = '1630861315';
  for (let t = 1782211000; t < 1782211300; t++) {
    const plain = mid + '+1+1+' + t;
    const r = await neRand('US', plain);
    if (r === targetCt) console.log('neRand match ts', t, plain);
    const p = await nePlain('US', plain);
    if (p === targetCt) console.log('nePlain match ts', t, plain);
  }
  console.log('brute done');
}

main().catch(console.error);
