const crypto = require('crypto').webcrypto;

const hash =
  '8bd9f4eeccaffdc6-7bb7054b6b1bf5ebba31f5b3-bee2681b5c8537acbb98b2179fe92e430b43b840cbe03151ecf3ec95605d3c28d8accd2317eb2da55f';
const [s, iv, ct] = hash.split('-');
const salt = Buffer.from(s, 'hex');
const ivb = Buffer.from(iv, 'hex');
const ctb = Buffer.from(ct, 'hex');

async function tryPwd(pwd) {
  const enc = new TextEncoder();
  const imp = await crypto.subtle.importKey('raw', enc.encode(pwd), 'PBKDF2', false, ['deriveKey']);
  const ak = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 1000, hash: 'SHA-256' },
    imp,
    { name: 'AES-GCM', length: 256 },
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
  const pwds = [
    '1630861315+1+1+US+1782211180',
    '1630861315+1+1+1782211180',
    '1630861315+1+1+1782211182',
    '1630861315+1+1+1782211191',
    'ployan',
    'ployan.me',
    'https://ployan.me',
    'v11',
    'watch',
    'yesmovies',
    'ww.yesmovies.ag',
    '1630861315',
    '1',
    '',
  ];
  for (const p of pwds) {
    const r = await tryPwd(p);
    if (r) console.log('PWD', JSON.stringify(p), '=>', r);
  }
  // password = sha256 hex of loc
  const sha = require('crypto').createHash('sha256').update('US').digest('hex');
  const r2 = await tryPwd(sha);
  if (r2) console.log('sha256hex', r2);
  // raw sha256 bytes as key directly (no pbkdf2)
  const key = require('crypto').createHash('sha256').update('US').digest();
  try {
    const tag = ctb.slice(-16);
    const c = ctb.slice(0, -16);
    const dec = require('crypto').createDecipheriv('aes-256-gcm', key, ivb);
    dec.setAuthTag(tag);
    console.log('direct aes', Buffer.concat([dec.update(c), dec.final()]).toString());
  } catch (e) {}
}

main().catch(console.error);
