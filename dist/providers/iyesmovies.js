var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    function debugLog(step, detail) {
        var msg = 'IYESDBG:' + step + (detail ? '|' + detail : '');
        console.log(msg);
        try {
            libs.log({ step: step, detail: detail || '' }, PROVIDER, 'DEBUG');
        }
        catch (e) { }
    }
    function parseTrace(text) {
        var result = {};
        if (!text) {
            return result;
        }
        text = text.replace(/\\n/g, '\n');
        text.trim().split(/\r?\n/).forEach(function (line) {
            var idx = line.indexOf('=');
            if (idx > 0) {
                result[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
            }
        });
        return result;
    }
    function getSubtleCrypto() {
        try {
            if (typeof crypto !== 'undefined' && crypto.subtle) {
                return crypto.subtle;
            }
            if (typeof global !== 'undefined' && global.crypto && global.crypto.subtle) {
                return global.crypto.subtle;
            }
        }
        catch (e) { }
        return null;
    }
    function getRandomBytes(length) {
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            return crypto.getRandomValues(new Uint8Array(length));
        }
        return getRandomValues(length);
    }
    function utf8Encode(str) {
        if (typeof TextEncoder !== 'undefined') {
            return new TextEncoder().encode(str);
        }
        return wordArrayToUint8Array(cryptoS.enc.Utf8.parse(str));
    }
    function utf8Decode(bytes) {
        if (typeof TextDecoder !== 'undefined') {
            return new TextDecoder().decode(bytes);
        }
        return cryptoS.enc.Utf8.stringify(cryptoS.lib.WordArray.create(Array.prototype.slice.call(bytes)));
    }
    function normalizeResponseBody(data) {
        if (typeof data === 'string') {
            return data;
        }
        if (!data) {
            return '';
        }
        if (typeof data.data === 'string') {
            return data.data;
        }
        if (typeof data.body === 'string') {
            return data.body;
        }
        return '';
    }
    function fetchWithTimeout(url, reqHeaders, timeoutMs) {
        return new Promise(function (resolve) {
            var timer = setTimeout(function () {
                resolve('');
            }, timeoutMs);
            fetch(url, { headers: reqHeaders }).then(function (resp) {
                return resp.text();
            }).then(function (text) {
                clearTimeout(timer);
                resolve(text || '');
            }).catch(function () {
                clearTimeout(timer);
                resolve('');
            });
        });
    }
    function requestGetWithTimeout(url, reqHeaders, timeoutMs) {
        return new Promise(function (resolve) {
            var settled = false;
            var timer = setTimeout(function () {
                if (!settled) {
                    settled = true;
                    resolve('');
                }
            }, timeoutMs);
            libs.request_get(url, reqHeaders).then(function (data) {
                if (!settled) {
                    settled = true;
                    clearTimeout(timer);
                    resolve(normalizeResponseBody(data));
                }
            }).catch(function () {
                if (!settled) {
                    settled = true;
                    clearTimeout(timer);
                    resolve('');
                }
            });
        });
    }
    function xhrGetText(url, reqHeaders, timeoutMs) {
        return new Promise(function (resolve) {
            var xhr = void 0;
            var timer = void 0;
            if (typeof XMLHttpRequest === 'undefined') {
                resolve('');
                return;
            }
            xhr = new XMLHttpRequest();
            timer = setTimeout(function () {
                try {
                    xhr.abort();
                }
                catch (e) { }
                resolve('');
            }, timeoutMs);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    clearTimeout(timer);
                    resolve(xhr.responseText || '');
                }
            };
            xhr.onerror = function () {
                clearTimeout(timer);
                resolve('');
            };
            xhr.open('GET', url, true);
            Object.keys(reqHeaders || {}).forEach(function (key) {
                xhr.setRequestHeader(key, reqHeaders[key]);
            });
            xhr.send();
        });
    }
    function fetchTraceText(url, reqHeaders) {
        console.log('[RN-Fetch][PLOYAN-VERSION] v5');
        console.log('[RN-Fetch][PLOYAN-TRACE] GET ' + url);
        return fetchWithTimeout(url, reqHeaders, 8000).then(function (text) {
            if (text && text.indexOf('loc=') >= 0) {
                console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (parseTrace(text)['loc'] || 'MISSING') + ' via=fetch');
                return text;
            }
            console.log('[RN-Fetch][PLOYAN-TRACE] xhr fallback bytes=' + (text ? text.length : 0));
            return xhrGetText(url, reqHeaders, 5000).then(function (xhrText) {
                if (xhrText && xhrText.indexOf('loc=') >= 0) {
                    console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (parseTrace(xhrText)['loc'] || 'MISSING') + ' via=xhr');
                    return xhrText;
                }
                console.log('[RN-Fetch][PLOYAN-TRACE] axios fallback');
                return requestGetWithTimeout(url, reqHeaders, 5000).then(function (axiosText) {
                    if (axiosText && axiosText.indexOf('loc=') >= 0) {
                        console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (parseTrace(axiosText)['loc'] || 'MISSING') + ' via=axios');
                    }
                    else {
                        console.log('[RN-Fetch][PLOYAN-LOC] loc=MISSING bytes=' + (axiosText ? axiosText.length : 0));
                    }
                    return axiosText || xhrText || text || '';
                });
            });
        });
    }
    function fetchText(url, reqHeaders) {
        return fetchTraceText(url, reqHeaders);
    }
    function fetchJson(url, reqHeaders) {
        console.log('[RN-Fetch][PLOYAN-GET] GET ' + url.substring(0, 160));
        return fetchWithTimeout(url, reqHeaders, 10000).then(function (text) {
            if (text && text.charAt(0) === '{') {
                debugLog('FETCH_JSON', text.substring(0, 160));
                return JSON.parse(text);
            }
            if (text && text.indexOf('Not Found') >= 0) {
                return { code: 404, info: '' };
            }
            return requestGetWithTimeout(url, reqHeaders, 8000).then(function (data) {
                if (typeof data === 'string' && data.charAt(0) === '{') {
                    return JSON.parse(data);
                }
                if (data && typeof data === 'object') {
                    return data;
                }
                return { code: 404, info: '' };
            });
        });
    }
    function aesBlockEncrypt(key32, block16) {
        var keyWa = cryptoS.lib.WordArray.create(Array.prototype.slice.call(key32));
        var blockWa = cryptoS.lib.WordArray.create(Array.prototype.slice.call(block16));
        var encrypted = cryptoS.AES.encrypt(blockWa, keyWa, {
            mode: cryptoS.mode.ECB,
            padding: cryptoS.pad.NoPadding
        });
        return wordArrayToUint8Array(encrypted.ciphertext);
    }
    function hasBigIntSupport() {
        try {
            return typeof BigInt !== 'undefined' && BigInt(1) === BigInt(1);
        }
        catch (e) {
            return false;
        }
    }
    function bytesToBigInt128(bytes) {
        var result = BigInt(0);
        var i = void 0;
        for (i = 0; i < bytes.length; i++) {
            result = (result << BigInt(8)) | BigInt(bytes[i]);
        }
        return result;
    }
    function bigInt128ToBytes(value) {
        var out = new Uint8Array(16);
        var n = value;
        var i = void 0;
        for (i = 15; i >= 0; i--) {
            out[i] = Number(n & BigInt(255));
            n >>= BigInt(8);
        }
        return out;
    }
    function ghashMul128(x, y) {
        var z = BigInt(0);
        var v = y;
        var r = BigInt(225) << BigInt(120);
        var i = void 0;
        for (i = 0; i < 128; i++) {
            if ((x >> BigInt(127 - i)) & BigInt(1)) {
                z ^= v;
            }
            if (v & BigInt(1)) {
                v = (v >> BigInt(1)) ^ r;
            }
            else {
                v >>= BigInt(1);
            }
        }
        return z;
    }
    function ghashBlocks(hBytes, xBig, data) {
        var hBig = bytesToBigInt128(hBytes);
        var offset = void 0;
        var block = void 0;
        var i = void 0;
        for (offset = 0; offset < data.length; offset += 16) {
            block = new Uint8Array(16);
            block.set(data.subarray(offset, offset + 16));
            xBig ^= bytesToBigInt128(block);
            xBig = ghashMul128(xBig, hBig);
        }
        return xBig;
    }
    function gcmGhash(h, a, c) {
        if (!hasBigIntSupport()) {
            throw new Error('BigInt is not available for GHASH');
        }
        var xBig = BigInt(0);
        xBig = ghashBlocks(h, xBig, gcmPad16(a));
        xBig = ghashBlocks(h, xBig, gcmPad16(c));
        xBig = ghashBlocks(h, xBig, gcmLengthBlock(a.length * 8, c.length * 8));
        return bigInt128ToBytes(xBig);
    }
    function gcmPad16(data) {
        var rem = data.length % 16;
        if (rem === 0) {
            return data;
        }
        var out = new Uint8Array(data.length + (16 - rem));
        out.set(data);
        return out;
    }
    function gcmLengthBlock(aBits, cBits) {
        var b = new Uint8Array(16);
        var i = void 0;
        for (i = 0; i < 8; i++) {
            b[7 - i] = (aBits >>> (i * 8)) & 0xff;
        }
        for (i = 0; i < 8; i++) {
            b[15 - i] = (cBits >>> (i * 8)) & 0xff;
        }
        return b;
    }
    function gcmInc32(block) {
        var out = block.slice();
        var i = void 0;
        for (i = 15; i >= 12; i--) {
            out[i] = (out[i] + 1) & 0xff;
            if (out[i] !== 0) {
                break;
            }
        }
        return out;
    }
    function gcmGctr(key, icb, input) {
        var output = new Uint8Array(input.length);
        var counter = icb.slice();
        var off = void 0;
        var i = void 0;
        var e = void 0;
        for (off = 0; off < input.length; off += 16) {
            counter = gcmInc32(counter);
            e = aesBlockEncrypt(key, counter);
            for (i = 0; i < 16 && off + i < input.length; i++) {
                output[off + i] = input[off + i] ^ e[i];
            }
        }
        return output;
    }
    function gcmEncrypt(key, iv, plaintext) {
        var h = aesBlockEncrypt(key, new Uint8Array(16));
        var j0 = new Uint8Array(16);
        var s = void 0;
        var c = void 0;
        var tag = void 0;
        var out = void 0;
        var ej0 = void 0;
        var i = void 0;
        j0.set(iv);
        j0[15] = 1;
        c = gcmGctr(key, j0, plaintext);
        s = gcmGhash(h, new Uint8Array(0), c);
        ej0 = aesBlockEncrypt(key, j0);
        tag = new Uint8Array(16);
        for (i = 0; i < 16; i++) {
            tag[i] = s[i] ^ ej0[i];
        }
        out = new Uint8Array(c.length + 16);
        out.set(c);
        out.set(tag, c.length);
        return out;
    }
    function gcmDecrypt(key, iv, ciphertextWithTag) {
        var tag = ciphertextWithTag.slice(-16);
        var c = ciphertextWithTag.slice(0, -16);
        var h = aesBlockEncrypt(key, new Uint8Array(16));
        var j0 = new Uint8Array(16);
        var s = void 0;
        var expectedTag = void 0;
        var ej0 = void 0;
        var i = void 0;
        j0.set(iv);
        j0[15] = 1;
        s = gcmGhash(h, new Uint8Array(0), c);
        ej0 = aesBlockEncrypt(key, j0);
        expectedTag = new Uint8Array(16);
        for (i = 0; i < 16; i++) {
            expectedTag[i] = s[i] ^ ej0[i];
        }
        for (i = 0; i < 16; i++) {
            if (tag[i] !== expectedTag[i]) {
                throw new Error('GCM tag mismatch');
            }
        }
        return gcmGctr(key, j0, c);
    }
    function generateGetHashPureSafe(loc, mid, ei, sv) {
        try {
            return generateGetHashPure(loc, mid, ei, sv);
        }
        catch (err) {
            debugLog('HASH_PURE_FAIL', String(err && err.message ? err.message : err));
            console.log('[RN-Fetch][PLOYAN-ERR] HASH_PURE_FAIL ' + String(err && err.message ? err.message : err));
            return '';
        }
    }
    function generateGetHashPure(loc, mid, ei, sv) {
        var ts = Math.floor((new Date()).getTime() / 1000);
        var plain = mid + "+" + ei + "+" + sv + "+" + ts;
        var plainBytes = utf8Encode(plain);
        var saltBytes = getRandomBytes(8);
        var saltWordArray = cryptoS.lib.WordArray.create(Array.prototype.slice.call(saltBytes));
        var keyBytes = deriveAesKeyBytes(loc, saltWordArray);
        var iv = getRandomBytes(12);
        var ctWithTag = gcmEncrypt(keyBytes, iv, plainBytes);
        return bytesToHex(saltBytes) + "-" + bytesToHex(iv) + "-" + bytesToHex(ctWithTag);
    }
    function decryptInfoPure(loc, infoToken) {
        var parts = infoToken.split('-');
        var saltWordArray = cryptoS.enc.Hex.parse(parts[0]);
        var iv = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[1]));
        var ctWithTag = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[2]));
        var keyBytes = deriveAesKeyBytes(loc, saltWordArray);
        var plain = gcmDecrypt(keyBytes, iv, ctWithTag);
        return utf8Decode(plain);
    }
    function encode(text, encoding) {
        if (encoding === void 0) { encoding = 'utf-8'; }
        var codePoints = Array.from(text, function (char) { return char.charCodeAt(0); });
        var encodedData = new Uint8Array(codePoints.map(function (point) { return point & 0xff; }));
        return encodedData;
    }
    function digestSHA256(data) {
        return __awaiter(this, void 0, void 0, function () {
            var message, hash, hashHex, hashBytes;
            return __generator(this, function (_a) {
                message = cryptoS.enc.Utf8.parse(data);
                hash = cryptoS.SHA256(message);
                hashHex = hash.toString(cryptoS.enc.Hex);
                hashBytes = cryptoS.enc.Hex.parse(hashHex);
                return [2, new Uint8Array(hashBytes.words)];
            });
        });
    }
    function wordArrayToUint8Array(wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var result = new Uint8Array(sigBytes);
        for (var i = 0; i < sigBytes; i++) {
            result[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        }
        return result;
    }
    function getRandomValues(length) {
        return wordArrayToUint8Array(cryptoS.lib.WordArray.random(length));
    }
    function bytesToHex(bytes) {
        return Array.from(bytes).map(function (b) {
            return ('0' + b.toString(16)).slice(-2);
        }).join('');
    }
    function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedKeyData, key;
            return __generator(this, function (_a) {
                if (keyData instanceof Uint8Array) {
                    encodedKeyData = cryptoS.lib.WordArray.create(Array.prototype.slice.call(keyData));
                }
                else {
                    encodedKeyData = cryptoS.enc.Hex.parse(cryptoS.enc.Hex.stringify(keyData));
                }
                key = {
                    format: format,
                    encoded: encodedKeyData,
                    algorithm: algorithm,
                    extractable: extractable,
                    usages: keyUsages
                };
                return [2, key];
            });
        });
    }
    function encrypt(algorithm, key, plaintext, iv) {
        return __awaiter(this, void 0, void 0, function () {
            var ptWordArray, encryptedData, ciphertext, tagBytes, out, i;
            return __generator(this, function (_a) {
                ptWordArray = plaintext instanceof Uint8Array
                    ? cryptoS.lib.WordArray.create(Array.prototype.slice.call(plaintext))
                    : plaintext;
                encryptedData = cryptoS[algorithm].encrypt(ptWordArray, key, {
                    iv: cryptoS.enc.Hex.parse(cryptoS.enc.Hex.stringify(iv)),
                    mode: cryptoS.mode.GCM,
                });
                ciphertext = wordArrayToUint8Array(encryptedData.ciphertext);
                if (encryptedData.tag) {
                    tagBytes = wordArrayToUint8Array(encryptedData.tag);
                    out = new Uint8Array(ciphertext.length + tagBytes.length);
                    out.set(ciphertext);
                    out.set(tagBytes, ciphertext.length);
                    return [2, out];
                }
                return [2, ciphertext];
            });
        });
    }
    function decrypt(algorithm, key, ciphertext, iv) {
        return __awaiter(this, void 0, void 0, function () {
            var ctWordArray, decryptedData;
            return __generator(this, function (_a) {
                ctWordArray = cryptoS.enc.Hex.parse(bytesToHex(ciphertext));
                decryptedData = cryptoS[algorithm].decrypt(cryptoS.lib.CipherParams.create({ ciphertext: ctWordArray }), key, {
                    iv: cryptoS.enc.Hex.parse(cryptoS.enc.Hex.stringify(iv)),
                    mode: cryptoS.mode.GCM,
                });
                return [2, decryptedData.toString(cryptoS.enc.Utf8)];
            });
        });
    }
    function encox(plaintext, pwd) {
        return __awaiter(this, void 0, void 0, function () {
            var pwUtf8, pwHash, iv, ivStr, alg, key, ptUint8, ctBuffer, ctArray, ctStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pwUtf8 = encode(pwd);
                        return [4, digestSHA256('SHA-256', pwUtf8)];
                    case 1:
                        pwHash = _a.sent();
                        iv = getRandomValues(12);
                        ivStr = Array.from(iv).map(function (b) { return String.fromCharCode(b); }).join('');
                        alg = {
                            name: 'AES',
                            iv: iv
                        };
                        return [4, importKey('raw', pwHash, alg, false, ['encrypt'])];
                    case 2:
                        key = _a.sent();
                        ptUint8 = encode(plaintext);
                        return [4, encrypt(alg.name, key, ptUint8, alg.iv)];
                    case 3:
                        ctBuffer = _a.sent();
                        ctArray = Array.from(new Uint8Array(ctBuffer));
                        ctStr = ctArray.map(function (byte) { return String.fromCharCode(byte); }).join('');
                        return [2, libs.string_btoa(ivStr + ctStr)];
                }
            });
        });
    }
    function deriveAesKeyBytes(loc, saltWordArray) {
        var pbkdf2Opts = {
            keySize: 8,
            iterations: 1000
        };
        if (cryptoS.algo && cryptoS.algo.SHA256) {
            pbkdf2Opts.hasher = cryptoS.algo.SHA256;
        }
        else if (cryptoS.HmacSHA256) {
            var password = cryptoS.enc.Utf8.parse(loc);
            var dk = cryptoS.lib.WordArray.create();
            var blockIndex = cryptoS.lib.WordArray.create([0x00000001], 4);
            var u = cryptoS.HmacSHA256(saltWordArray.clone().concat(blockIndex), password);
            var t = u.clone();
            for (var i = 1; i < 1000; i++) {
                u = cryptoS.HmacSHA256(u, password);
                t = t.xor(u);
            }
            return wordArrayToUint8Array(t);
        }
        var keyWordArray = cryptoS.PBKDF2(cryptoS.enc.Utf8.parse(loc), saltWordArray, pbkdf2Opts);
        return wordArrayToUint8Array(keyWordArray);
    }
    function generateGetHashSubtle(loc, mid, ei, sv) {
        return __awaiter(this, void 0, void 0, function () {
            var subtle, ts, plain, saltBytes, plainBytes, passwordBytes, baseKey, aesKey, iv, ct, ctHex, ivHex, saltHex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subtle = getSubtleCrypto();
                        if (!subtle) {
                            return [2, ''];
                        }
                        ts = Math.floor((new Date()).getTime() / 1000);
                        plain = mid + "+" + ei + "+" + sv + "+" + ts;
                        saltBytes = getRandomBytes(8);
                        plainBytes = utf8Encode(plain);
                        passwordBytes = utf8Encode(loc);
                        return [4, subtle.importKey('raw', passwordBytes, 'PBKDF2', false, ['deriveKey'])];
                    case 1:
                        baseKey = _a.sent();
                        return [4, subtle.deriveKey({
                                name: 'PBKDF2',
                                salt: saltBytes,
                                iterations: 1000,
                                hash: 'SHA-256'
                            }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt'])];
                    case 2:
                        aesKey = _a.sent();
                        iv = getRandomBytes(12);
                        return [4, subtle.encrypt({ name: 'AES-GCM', iv: iv }, aesKey, plainBytes)];
                    case 3:
                        ct = _a.sent();
                        saltHex = bytesToHex(saltBytes);
                        ivHex = bytesToHex(iv);
                        ctHex = bytesToHex(new Uint8Array(ct));
                        return [2, saltHex + "-" + ivHex + "-" + ctHex];
                }
            });
        });
    }
    function decryptInfoSubtle(loc, infoToken) {
        return __awaiter(this, void 0, void 0, function () {
            var subtle, parts, saltBytes, iv, ctBytes, passwordBytes, baseKey, aesKey, pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subtle = getSubtleCrypto();
                        if (!subtle) {
                            return [2, ''];
                        }
                        parts = infoToken.split('-');
                        saltBytes = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[0]));
                        iv = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[1]));
                        ctBytes = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[2]));
                        passwordBytes = utf8Encode(loc);
                        return [4, subtle.importKey('raw', passwordBytes, 'PBKDF2', false, ['deriveKey'])];
                    case 1:
                        baseKey = _a.sent();
                        return [4, subtle.deriveKey({
                                name: 'PBKDF2',
                                salt: saltBytes,
                                iterations: 1000,
                                hash: 'SHA-256'
                            }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['decrypt'])];
                    case 2:
                        aesKey = _a.sent();
                        return [4, subtle.decrypt({ name: 'AES-GCM', iv: iv }, aesKey, ctBytes)];
                    case 3:
                        pt = _a.sent();
                        return [2, utf8Decode(new Uint8Array(pt))];
                }
            });
        });
    }
    function generateGetHash(loc, mid, ei, sv) {
        return __awaiter(this, void 0, void 0, function () {
            var subtleHash, ts, plain, saltBytes, saltWordArray, saltHex, plainWordArray, iv, alg, keyBytes, key, ptUint8, ctBuffer, ivHex, ctHex, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugLog('HASH_START', 'loc=' + loc + ' mid=' + mid + ' ei=' + ei + ' sv=' + sv);
                        if (!getSubtleCrypto()) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, generateGetHashSubtle(loc, mid, ei, sv)];
                    case 2:
                        subtleHash = _a.sent();
                        if (subtleHash) {
                            debugLog('HASH_SUBTLE_OK', subtleHash.substring(0, 80));
                            return [2, subtleHash];
                        }
                        _a.label = 4;
                    case 3:
                        err_1 = _a.sent();
                        debugLog('HASH_SUBTLE_FAIL', String(err_1 && err_1.message ? err_1.message : err_1));
                        _a.label = 4;
                    case 4:
                        if (cryptoS.mode && cryptoS.mode.GCM) {
                            _a.label = 5;
                        }
                        else if (hasBigIntSupport() && cryptoS.mode && cryptoS.mode.ECB) {
                            debugLog('HASH_PURE', 'GCM mode missing, using pure GCM');
                            return [2, generateGetHashPureSafe(loc, mid, ei, sv)];
                        }
                        else {
                            debugLog('HASH_ABORT', 'no GCM and no pure fallback');
                            console.log('[RN-Fetch][PLOYAN-ERR] no GCM crypto available');
                            return [2, ''];
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        ts = Math.floor((new Date()).getTime() / 1000);
                        plain = mid + "+" + ei + "+" + sv + "+" + ts;
                        saltBytes = getRandomBytes(8);
                        saltWordArray = cryptoS.lib.WordArray.create(Array.prototype.slice.call(saltBytes));
                        plainWordArray = cryptoS.enc.Utf8.parse(plain);
                        saltHex = bytesToHex(saltBytes);
                        iv = getRandomValues(12);
                        keyBytes = deriveAesKeyBytes(loc, saltWordArray);
                        alg = { name: 'AES', iv: iv };
                        return [4, importKey('raw', keyBytes, alg, false, ['encrypt'])];
                    case 6:
                        key = _a.sent();
                        ptUint8 = wordArrayToUint8Array(plainWordArray);
                        return [4, encrypt('AES', key, ptUint8, iv)];
                    case 7:
                        ctBuffer = _a.sent();
                        ivHex = bytesToHex(iv);
                        ctHex = bytesToHex(ctBuffer);
                        debugLog('HASH_CRYPTOJS_OK', saltHex.substring(0, 40));
                        return [2, saltHex + "-" + ivHex + "-" + ctHex];
                    case 8:
                        err_1 = _a.sent();
                        debugLog('HASH_FAIL', String(err_1 && err_1.message ? err_1.message : err_1));
                        if (hasBigIntSupport() && cryptoS.mode && cryptoS.mode.ECB) {
                            debugLog('HASH_PURE', 'cryptoJS failed, using pure GCM');
                            return [2, generateGetHashPureSafe(loc, mid, ei, sv)];
                        }
                        console.log('[RN-Fetch][PLOYAN-ERR] HASH_FAIL ' + String(err_1 && err_1.message ? err_1.message : err_1));
                        return [2, ''];
                    case 9: return [2];
                }
            });
        });
    }
    function decryptInfo(loc, infoToken) {
        return __awaiter(this, void 0, void 0, function () {
            var subtlePath, parts, saltWordArray, iv, ctBytes, keyBytes, alg, key, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!getSubtleCrypto()) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 2]);
                        return [4, decryptInfoSubtle(loc, infoToken)];
                    case 2:
                        subtlePath = _a.sent();
                        if (subtlePath) {
                            return [2, subtlePath];
                        }
                        _a.label = 4;
                    case 3:
                        err_2 = _a.sent();
                        debugLog('DECRYPT_SUBTLE_FAIL', String(err_2 && err_2.message ? err_2.message : err_2));
                        _a.label = 4;
                    case 4:
                        if (!cryptoS.mode || !cryptoS.mode.GCM) {
                            return [2, decryptInfoPure(loc, infoToken)];
                        }
                        parts = infoToken.split('-');
                        saltWordArray = cryptoS.enc.Hex.parse(parts[0]);
                        iv = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[1]));
                        ctBytes = wordArrayToUint8Array(cryptoS.enc.Hex.parse(parts[2]));
                        keyBytes = deriveAesKeyBytes(loc, saltWordArray);
                        alg = { name: 'AES', iv: iv };
                        return [4, importKey('raw', keyBytes, alg, false, ['decrypt'])];
                    case 5:
                        key = _a.sent();
                        return [4, decrypt('AES', key, ctBytes, iv)];
                    case 6: return [2, _a.sent()];
                }
            });
        });
    }
    var PROVIDER, DOMAIN, headers, streamHeaders, urlDoc_1, getIP_1, getEmbed, urlSearch, LINK_DETAIL, resSearch, _i, _a, searchItem, title, href, season, type, id, htmlDetail, textHtml, playURL, parseURL, ipData, loc, sv, eid, mid, deHash, hashURL, hashID, hlsPath, directURL, e_1;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                PROVIDER = 'IYesMovies';
                DOMAIN = "https://ww.yesmovies.ag";
                headers = {
                    "referer": DOMAIN,
                    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                urlDoc_1 = "https://doc.vidcloud9.org";
                getIP_1 = function (urlDoc) { return __awaiter(_this, void 0, void 0, function () {
                    var urlDocTrace, traceData, arr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlDocTrace = "".concat(urlDoc, "/cdn-cgi/trace");
                                return [4, fetchText(urlDocTrace, headers)];
                            case 1:
                                traceData = _a.sent();
                                if (typeof traceData !== 'string') {
                                    traceData = traceData ? String(traceData) : '';
                                }
                                debugLog('TRACE_RAW', (traceData || '').substring(0, 120).replace(/\n/g, '\\n'));
                                libs.log({ traceData: traceData }, PROVIDER, 'TRACE DATA');
                                arr = parseTrace(traceData);
                                debugLog('TRACE_LOC', arr['loc'] || 'MISSING');
                                console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (arr['loc'] || 'MISSING'));
                                return [2, arr];
                        }
                    });
                }); };
                getEmbed = function (sv, mi, ei) { return __awaiter(_this, void 0, void 0, function () {
                    var ipData, pwd, tsx, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4, getIP_1()];
                            case 1:
                                ipData = _c.sent();
                                pwd = ipData['loc'];
                                tsx = Math.floor((new Date()).getTime() / 1000);
                                _b = (_a = libs).string_base64_encode;
                                return [4, encox(mi + "+" + ei + "+" + sv + "+" + pwd + "+" + tsx, pwd)];
                            case 2:
                                urix = _b.apply(_a, [_c.sent()]);
                                return [2, "".concat(urlDoc_1, "/watch/?v").concat(sv).concat(ei, "#").concat(urix)];
                        }
                    });
                }); };
                urlSearch = "".concat(DOMAIN, "/searching?q=").concat(movieInfo.title.replace(/\s+/ig, '+'), "&limit=40&offset=0");
                LINK_DETAIL = '';
                libs.log({ urlSearch: urlSearch }, PROVIDER, 'URL SEARCH');
                return [4, libs.request_get(urlSearch, {})];
            case 2:
                resSearch = _b.sent();
                libs.log({
                    length: resSearch,
                }, PROVIDER, 'SEARCH LENGTH');
                for (_i = 0, _a = resSearch.data; _i < _a.length; _i++) {
                    searchItem = _a[_i];
                    title = searchItem.t;
                    href = searchItem.s;
                    season = title.match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.replace(/\- *season *[0-9]+/i, '').trim();
                    type = 'movie';
                    if (season) {
                        type = 'tv';
                    }
                    libs.log({
                        title: title,
                        href: href,
                        season: season,
                        type: type
                    }, PROVIDER, 'SEARCH INFO');
                    if (libs.string_matching_title(movieInfo, title) && !LINK_DETAIL) {
                        if (movieInfo.type == 'movie' && type == 'movie') {
                            LINK_DETAIL = "".concat(DOMAIN, "/movie/").concat(href, ".html");
                        }
                        else if (movieInfo.type == 'tv' && type == 'tv' && season == movieInfo.season) {
                            LINK_DETAIL = "".concat(DOMAIN, "/movie/").concat(href, ".html");
                        }
                    }
                }
                libs.log({
                    LINK_DETAIL: LINK_DETAIL
                }, PROVIDER, 'LINK DETAIL');
                if (!LINK_DETAIL) {
                    debugLog('ABORT', 'no LINK_DETAIL match');
                    return [2];
                }
                id = LINK_DETAIL.match(/([0-9]+)\.html$/i);
                id = id ? id[1] : '';
                libs.log({ id: id }, PROVIDER, 'ID');
                if (!id) {
                    debugLog('ABORT', 'no id from detail URL');
                    return [2];
                }
                return [4, fetch(LINK_DETAIL, {
                        headers: headers
                    })];
            case 3:
                htmlDetail = _b.sent();
                return [4, htmlDetail.text()];
            case 4:
                textHtml = _b.sent();
                playURL = textHtml.match(/plyURL *\= *\"([^\"]+)/i);
                playURL = playURL ? playURL[1] : "";
                libs.log({ playURL: playURL }, PROVIDER, "PLAY URL");
                if (!playURL) {
                    debugLog('ABORT', 'no plyURL in detail HTML');
                    return [2];
                }
                parseURL = libs.string_atob(playURL);
                return [4, getIP_1(parseURL)];
            case 5:
                ipData = _b.sent();
                loc = ipData['loc'];
                debugLog('PARSE_URL', 'parseURL=' + parseURL + ' loc=' + (loc || 'EMPTY'));
                libs.log({ parseURL: parseURL, loc: loc }, PROVIDER, "PARSE URL");
                if (!parseURL || !loc) {
                    debugLog('ABORT', 'missing parseURL or loc');
                    console.log('[RN-Fetch][PLOYAN-ERR] ABORT missing parseURL or loc');
                    return [2];
                }
                console.log('[RN-Fetch][PLOYAN-READY] parseURL=' + parseURL + ' loc=' + loc + ' mid=' + id + ' eid=' + (movieInfo.type == 'movie' ? 1 : movieInfo.episode));
                streamHeaders = Object.assign({}, headers, { referer: "".concat(parseURL, "/") });
                sv = 1;
                eid = movieInfo.type == 'movie' ? 1 : movieInfo.episode;
                mid = id;
                console.log('[RN-Fetch][PLOYAN-HASH] generating hash...');
                return [4, generateGetHash(loc, mid, eid, sv)];
            case 6:
                deHash = _b.sent();
                console.log('[RN-Fetch][PLOYAN-HASH] done len=' + (deHash ? deHash.length : 0));
                libs.log({ deHash: deHash, loc: loc, sv: sv, mid: mid, eid: eid }, PROVIDER, 'GET HASH');
                if (!deHash) {
                    debugLog('ABORT', 'generateGetHash returned empty');
                    return [2];
                }
                hashURL = "".concat(parseURL, "/get/").concat(deHash);
                debugLog('GET_REQ', hashURL.substring(0, 120));
                return [4, fetchJson(hashURL, streamHeaders)];
            case 7:
                hashID = _b.sent();
                libs.log({ hashID: hashID, hashURL: hashURL }, PROVIDER, 'HASH ID');
                if (!hashID || !hashID.info) {
                    debugLog('ABORT', 'get response missing info: ' + JSON.stringify(hashID).substring(0, 120));
                    return [2];
                }
                return [4, decryptInfo(loc, hashID.info)];
            case 8:
                hlsPath = _b.sent();
                libs.log({ hlsPath: hlsPath }, PROVIDER, 'HLS PATH');
                if (!hlsPath) {
                    debugLog('ABORT', 'decryptInfo returned empty');
                    return [2];
                }
                directURL = "".concat(parseURL, "/hls/").concat(hlsPath, "/master.m3u8");
                console.log('[RN-Fetch][PLOYAN-HLS] GET ' + directURL);
                libs.log({ directURL: directURL }, PROVIDER, 'DIRECT QUALITY');
                libs.embed_callback(directURL, PROVIDER, PROVIDER, 'Hls', callback, 1, [], [{ file: directURL, quality: 1080 }], streamHeaders);
                return [2];
            case 9:
                e_1 = _b.sent();
                debugLog('ERROR', String(e_1 && e_1.message ? e_1.message : e_1));
                console.log('[RN-Fetch][PLOYAN-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                libs.log({ e: e_1, message: e_1 && e_1.message ? e_1.message : e_1 }, PROVIDER, 'ERROR CATCH');
                return [3, 10];
            case 10: return [2, true];
        }
    });
}); };
