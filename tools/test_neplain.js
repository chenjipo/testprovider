const crypto = require('crypto').webcrypto;
const { execSync } = require('child_process');

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
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, ak, pb);
  const hx = (b) => Buffer.from(b).toString('hex');
  return hx(pb) + '-' + hx(iv) + '-' + hx(ct);
}

async function main() {
  const ts = Math.floor(Date.now() / 1000);
  const plain = '1630861315+1+1+' + ts;
  const hash = await nePlain('US', plain);
  console.log('plain', plain);
  console.log('part1 len', hash.split('-')[0].length);
  console.log('hash prefix', hash.substring(0, 80));
  const url = 'https://ployan.me/get/' + hash;
  const out = execSync(
    'curl.exe -s -w "\\n%{http_code}" -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "' + url + '"',
    { encoding: 'utf8' }
  );
  console.log('response', out);
}

main().catch(console.error);
