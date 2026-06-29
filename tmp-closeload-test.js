const fs = require('fs');
const path = require('path');
global.libs = {};
eval(fs.readFileSync(path.join(__dirname, 'dist/configs/string.js'), 'utf8'));

const UA = 'Mozilla/5.0';
const url = 'https://ridorapid.closeload.top/embed-1up2p36igb1p/?imdb_id=tt9813792';

function extractPacker(html) {
  const idx = html.indexOf('eval(function(p,a,c,k,e,d)');
  if (idx < 0) return '';
  let depth = 0, started = false, end = idx;
  for (let i = idx; i < html.length; i++) {
    if (html[i] === '(') { depth++; started = true; }
    else if (html[i] === ')') { depth--; if (started && depth === 0) { end = i + 1; break; } }
  }
  return html.substring(idx, end);
}
function extractFunction(code, name) {
  const start = code.indexOf('function ' + name);
  if (start < 0) return '';
  const brace = code.indexOf('{', start);
  let depth = 0;
  for (let i = brace; i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') { depth--; if (depth === 0) return code.substring(start, i + 1); }
  }
  return '';
}
function decodeDynamicSource(html, unpacked) {
  const fileMatch = html.match(/sources:\s*\[\{file:(s_[A-Za-z0-9]+)\}/);
  const keyName = fileMatch ? fileMatch[1] : '';
  if (!keyName || !unpacked) return '';
  const assignMatch = unpacked.match(new RegExp(keyName + '\\s*=\\s*(dc_[A-Za-z0-9]+)\\(([^\\)]*)\\)'));
  if (!assignMatch) return '';
  const fnSrc = extractFunction(unpacked, assignMatch[1]);
  if (!fnSrc) return '';
  const parts = JSON.parse(assignMatch[2]);
  let decoded = '';
  const decodeEnv = { atob: libs.string_atob };
  eval('with(decodeEnv){ var dc = (' + fnSrc + '); decoded = dc(parts); }');
  return decoded;
}

(async () => {
  delete global.atob;
  const html = await (await fetch(url, { headers: { 'user-agent': UA, referer: 'https://ridomovies.is/' } })).text();
  const unpacked = libs.string_unpacker_v2(extractPacker(html));
  const playUrl = decodeDynamicSource(html, unpacked);
  console.log('has global atob', typeof global.atob);
  console.log('[CLOSELOAD-DECODE] ok', playUrl ? 'dynamic' : 'failed');
  console.log('[CLOSELOAD-PLAY]', playUrl ? playUrl.substring(0, 140) : 'none');
})();
