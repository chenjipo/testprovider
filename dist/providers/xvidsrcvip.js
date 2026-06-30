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
var XVIP_KEY = 'x7k9mPqT2rWvY8zA5bC3nF6hJ2lK4mN9';
function xvidsrcvipSleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function xvidsrcvipGetCryptoLib() {
    if (typeof cryptoS !== 'undefined' && cryptoS && cryptoS.enc && cryptoS.AES) {
        return cryptoS;
    }
    if (typeof CryptoJS !== 'undefined' && CryptoJS && CryptoJS.enc && CryptoJS.AES) {
        return CryptoJS;
    }
    return null;
}
function xvidsrcvipPlainText(movieInfo) {
    if (movieInfo.type == 'tv') {
        return String(movieInfo.tmdb_id) + '_' + movieInfo.season + '_' + movieInfo.episode;
    }
    return String(movieInfo.tmdb_id);
}
function xvidsrcvipEncryptWithLib(lib, movieInfo) {
    var plain = xvidsrcvipPlainText(movieInfo);
    var key = lib.enc.Utf8.parse(XVIP_KEY);
    var iv = lib.enc.Utf8.parse(XVIP_KEY.substring(0, 16));
    var enc = lib.AES.encrypt(plain, key, { iv: iv }).ciphertext.toString(lib.enc.Base64);
    return enc.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function xvidsrcvipBytesToBase64(bytes) {
    var binary = '';
    for (var i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    if (typeof btoa === 'function') {
        return btoa(binary);
    }
    if (typeof global !== 'undefined' && global.Buffer) {
        return global.Buffer.from(bytes).toString('base64');
    }
    return '';
}
function xvidsrcvipEncryptWithWebCrypto(movieInfo) {
    return __awaiter(_this, void 0, void 0, function () {
        var plain, keyBytes, ivBytes, dataBytes, cryptoKey, encrypted, enc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof crypto !== 'undefined' && crypto.subtle)) {
                        return [2, ''];
                    }
                    plain = xvidsrcvipPlainText(movieInfo);
                    keyBytes = new TextEncoder().encode(XVIP_KEY);
                    ivBytes = new TextEncoder().encode(XVIP_KEY.substring(0, 16));
                    dataBytes = new TextEncoder().encode(plain);
                    return [4, crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['encrypt'])];
                case 1:
                    cryptoKey = _a.sent();
                    return [4, crypto.subtle.encrypt({ name: 'AES-CBC', iv: ivBytes }, cryptoKey, dataBytes)];
                case 2:
                    encrypted = _a.sent();
                    enc = xvidsrcvipBytesToBase64(new Uint8Array(encrypted));
                    return [2, enc.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')];
            }
        });
    });
}
function xvidsrcvipBuildEnc(movieInfo) {
    return __awaiter(_this, void 0, void 0, function () {
        var startedAt, lib, webEnc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startedAt = Date.now();
                    _a.label = 1;
                case 1:
                    lib = xvidsrcvipGetCryptoLib();
                    if (lib) {
                        return [2, xvidsrcvipEncryptWithLib(lib, movieInfo)];
                    }
                    if (!(typeof crypto !== 'undefined' && crypto.subtle)) return [3, 3];
                    return [4, xvidsrcvipEncryptWithWebCrypto(movieInfo)];
                case 2:
                    webEnc = _a.sent();
                    if (webEnc) {
                        return [2, webEnc];
                    }
                    _a.label = 3;
                case 3:
                    if (Date.now() - startedAt >= 15000) {
                        return [2, ''];
                    }
                    return [4, xvidsrcvipSleep(100)];
                case 4:
                    _a.sent();
                    return [3, 1];
                case 5: return [2];
            }
        });
    });
}
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var PROVIDER, DOMAIN, headers, enc, urlovo, response, json, _a, _b, _c, _i, item, source, qualityData, directQuality, _d, _e, qItem, dataQuality, textQuality, directQuality, _f, textQuality_1, line, directURl, quality, errorRequest_1, rank, e_1;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                PROVIDER = 'XVidsrcVip';
                DOMAIN = "https://vidrock.ru";
                headers = {
                    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                    'referer': "https://vidrock.ru/",
                    'origin': "https://vidrock.ru"
                };
                console.log('[RN-Fetch][XVIP-VERSION] v2-rn-crypto');
                _g.label = 1;
            case 1:
                _g.trys.push([1, 15, , 16]);
                return [4, xvidsrcvipBuildEnc(movieInfo)];
            case 2:
                enc = _g.sent();
                if (!enc) {
                    console.log('[RN-Fetch][XVIP-SKIP] crypto-not-ready');
                    libs.log({ e: 'crypto not ready' }, PROVIDER, 'ERROR');
                    return [2];
                }
                console.log('[RN-Fetch][XVIP-ENC] ' + enc);
                libs.log({ enc: enc }, PROVIDER, "ENCODED");
                urlovo = "".concat(DOMAIN, "/api/").concat(movieInfo.type, "/").concat(encodeURIComponent(enc));
                libs.log({ urlovo: urlovo }, PROVIDER, "URL");
                rank = 0;
                return [4, fetch(urlovo)];
            case 3:
                response = _g.sent();
                if (!response.ok) {
                    return [2];
                }
                return [4, response.json()];
            case 4:
                json = _g.sent();
                libs.log({ json: json }, PROVIDER, "JSON");
                _a = json;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _g.label = 5;
            case 5:
                if (!(_i < _b.length)) return [3, 14];
                _c = _b[_i];
                if (!(_c in _a)) return [3, 13];
                item = _c;
                _g.label = 6;
            case 6:
                _g.trys.push([6, 12, , 13]);
                source = json[item];
                if (!source.url) {
                    return [3, 13];
                }
                if (!(source.url.indexOf("vdrk.site") != -1)) return [3, 8];
                return [4, libs.request_get(source.url, headers)];
            case 7:
                qualityData = _g.sent();
                libs.log({ qualityData: qualityData }, PROVIDER, "QUALITY DATA");
                directQuality = [];
                for (_d = 0, _e = qualityData || []; _d < _e.length; _d++) {
                    qItem = _e[_d];
                    libs.log({ qItem: qItem }, PROVIDER, "QUALITY ITEM");
                    if (qItem.resolution && qItem.url) {
                        directQuality.push({
                            file: qItem.url,
                            quality: qItem.resolution,
                        });
                    }
                }
                if (directQuality.length > 0) {
                    libs.log({ directQuality: directQuality }, PROVIDER, "DIRECT QUALITY");
                    directQuality = _.orderBy(directQuality, ['quality'], ['desc']);
                    libs.embed_callback(directQuality[0].file, PROVIDER, item, 'Hls', callback, rank++, [], directQuality, headers);
                }
                return [3, 13];
            case 8:
                if (!(source.url.indexOf("/playlist.m3u8") != -1)) return [3, 11];
                return [4, fetch(source.url, {
                        headers: headers,
                        method: "GET"
                    })];
            case 9:
                dataQuality = _g.sent();
                return [4, dataQuality.text()];
            case 10:
                textQuality = _g.sent();
                textQuality = textQuality.split("\n").filter(function (line) { return line.indexOf("/playlist.m3u8") != -1; });
                libs.log({ textQuality: textQuality }, PROVIDER, "TEXT QUALITY");
                if (!textQuality) {
                    return [3, 13];
                }
                directQuality = [];
                for (_f = 0, textQuality_1 = textQuality; _f < textQuality_1.length; _f++) {
                    line = textQuality_1[_f];
                    directURl = source.url.split("/playlist.m3u8")[0] + "/" + line.trim();
                    quality = line.trim().split("/")[0] || 1080;
                    libs.log({ directURl: directURl, quality: quality }, PROVIDER, "DIRECT URL AND QUALITY");
                    if (directURl && quality) {
                        directQuality.push({
                            file: directURl,
                            quality: Number(quality),
                        });
                    }
                }
                libs.log({ directQuality: directQuality }, PROVIDER, "DIRECT QUALITY");
                if (!directQuality || directQuality.length == 0) {
                    return [3, 13];
                }
                directQuality = _.orderBy(directQuality, ['quality'], ['desc']);
                libs.log({ directQuality: directQuality }, PROVIDER, "ORDERED DIRECT QUALITY");
                libs.embed_callback(directQuality[0].file, PROVIDER, item, 'Hls', callback, rank++, [], directQuality, headers, {
                    "type": "m3u8"
                });
                return [3, 13];
            case 11:
                libs.embed_callback(source.url, PROVIDER, item, 'Hls', callback, rank++, [], [{ file: source.url, quality: 1080 }], headers, source.url.indexOf(".m3u8") != -1 ? {
                    type: "m3u8"
                } : {});
                return [3, 13];
            case 12:
                errorRequest_1 = _g.sent();
                return [3, 13];
            case 13:
                _i++;
                return [3, 5];
            case 14: return [3, 16];
            case 15:
                e_1 = _g.sent();
                libs.log({ e: e_1 }, PROVIDER, "ERROR");
                console.log('[RN-Fetch][XVIP-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [3, 16];
            case 16: return [2];
        }
    });
}); };
