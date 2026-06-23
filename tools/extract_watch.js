const fs = require('fs');
const html = fs.readFileSync('d:/project/github/myprovider/tmp_watch.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];
fs.writeFileSync('d:/project/github/myprovider/tmp_watch.js', js);
console.log('written', js.length);
