const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('d:/project/github/myprovider/tmp_watch.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

const nodeCrypto = require('crypto');
const webcrypto = nodeCrypto.webcrypto;
const calls = [];
const origRandom = webcrypto.getRandomValues.bind(webcrypto);
let randomBuf = Buffer.from('8bd9f4eeccaffdc6', 'hex'); // fix salt from browser sample
let randomIdx = 0;
webcrypto.getRandomValues = (arr) => {
  if (arr.length === 8 && randomIdx === 0) {
    arr.set(randomBuf);
    randomIdx++;
    calls.push({ type: 'salt', hex: Buffer.from(arr).toString('hex') });
    return arr;
  }
  if (arr.length === 12 && randomIdx === 1) {
    Buffer.from('7bb7054b6b1bf5ebba31f5b3', 'hex').copy(arr);
    randomIdx++;
    calls.push({ type: 'iv', hex: Buffer.from(arr).toString('hex') });
    return arr;
  }
  return origRandom(arr);
};

const subtleCalls = [];
const subtle = webcrypto.subtle;
const origImport = subtle.importKey.bind(subtle);
const origDerive = subtle.deriveKey.bind(subtle);
const origEncrypt = subtle.encrypt.bind(subtle);
const origDecrypt = subtle.decrypt.bind(subtle);

subtle.importKey = async (...a) => {
  subtleCalls.push({ fn: 'importKey', fmt: a[0], algo: a[2] });
  return origImport(...a);
};
subtle.deriveKey = async (...a) => {
  subtleCalls.push({
    fn: 'deriveKey',
    pbkdf2: a[0],
    keyAlgo: a[2],
    pwdLen: a[1] && a[1].algorithm ? 'key' : '',
  });
  return origDerive(...a);
};
subtle.encrypt = async (...a) => {
  subtleCalls.push({ fn: 'encrypt', algo: a[0], ptLen: a[2] && a[2].byteLength });
  return origEncrypt(...a);
};
subtle.decrypt = async (...a) => {
  subtleCalls.push({ fn: 'decrypt', algo: a[0] });
  return origDecrypt(...a);
};

const sandbox = {
  console,
  crypto: webcrypto,
  TextEncoder,
  TextDecoder,
  Uint8Array,
  Array,
  String,
  Object,
  Math,
  Date,
  parseInt,
  parseFloat,
  JSON,
  atob: (s) => Buffer.from(s, 'base64').toString('binary'),
  btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
  location: {
    hash: '#U0juoER1YW3HXdoLCjPIVTGy73O4Fy3WkQFi7N9mc8oaqfSyVcnXCj85QFqfFyxLmWMfnNg8uJ4',
    origin: 'https://ployan.me',
    pathname: '/watch/',
    search: '?v11',
    href: 'https://ployan.me/watch/?v11#U0juoER1YW3HXdoLCjPIVTGy73O4Fy3WkQFi7N9mc8oaqfSyVcnXCj85QFqfFyxLmWMfnNg8uJ4',
  },
  window: {},
  document: { readyState: 'complete', createElement: () => ({ style: {} }) },
  navigator: { userAgent: 'Mozilla/5.0' },
  fetch: async (url) => {
    calls.push({ type: 'fetch', url: String(url) });
    if (String(url).includes('trace')) {
      return {
        text: async () =>
          'fl=x\nh=ployan.me\nip=1.2.3.4\nts=1782211182.000\nloc=US\n',
      };
    }
    return { text: async () => 'Not Found', status: 404 };
  },
  XMLHttpRequest: function () {
    this.open = () => {};
    this.send = () => {};
    this.addEventListener = () => {};
  },
  setTimeout: (fn) => {
    try {
      fn();
    } catch (e) {
      console.error('timeout err', e.message);
    }
  },
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
};
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.top = { location: { href: 'https://ww.yesmovies.ag/' } };
sandbox.parent = sandbox.top;

try {
  vm.runInNewContext(js, sandbox, { timeout: 5000 });
} catch (e) {
  console.error('vm error', e.message);
}
console.log('calls', JSON.stringify(calls, null, 2));
console.log('subtle', JSON.stringify(subtleCalls, null, 2));
