const fs = require('fs');
const crypto = require('crypto');
const c = fs.readFileSync('d:/project/github/myprovider/tmp_watch.html', 'utf8');

['parent', 'top', 'frameElement', 'postMessage', '/watch', '/get/', '1000'].forEach(function (k) {
    var n = 0, p = 0;
    while ((p = c.indexOf(k, p)) !== -1) { n++; p++; }
    if (n) console.log(k, n);
});

// Try decrypt sample with both ne variants
var hash = '3670cdd687d1d56e-ca31e795bc9cc830ee09b6e5-663c9cbd7636b68594627c9a82bef83231ac17645a89836fcf02659b74de79a598630097d6c4e68c82';
var parts = hash.split('-');
var salt8 = Buffer.from(parts[0], 'hex');
var iv = Buffer.from(parts[1], 'hex');
var ctb = Buffer.from(parts[2], 'hex');
var tag = ctb.slice(-16);
var ct = ctb.slice(0, -16);

function tryDecrypt(loc, salt, label) {
    var key = crypto.pbkdf2Sync(loc, salt, 1000, 32, 'sha256');
    try {
        var dec = crypto.createDecipheriv('aes-256-gcm', key, iv);
        dec.setAuthTag(tag);
        var pt = Buffer.concat([dec.update(ct), dec.final()]);
        console.log('DECRYPT OK', label, loc, pt.toString());
        return pt.toString();
    } catch (e) {
        return null;
    }
}

for (var i = 0; i < 20; i++) {
    var ts = 1782210441 - i;
    var plain = '1630861315+1+1+' + ts;
    var plainBuf = Buffer.from(plain);
    tryDecrypt('US', salt8, 'rand8 ts=' + ts);
    tryDecrypt('US', plainBuf, 'plainSalt ts=' + ts);
    tryDecrypt('TW', salt8, 'rand8 TW ts=' + ts);
}
