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
    function buildPloyanHeaders(userAgent) {
        return {
            'user-agent': userAgent,
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate',
        };
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
            function done(text) {
                if (!settled) {
                    settled = true;
                    resolve(text || '');
                }
            }
            var timer = setTimeout(function () {
                done('');
            }, timeoutMs);
            try {
                if (typeof axiosS !== 'undefined' && axiosS.get) {
                    axiosS.get(url, {
                        headers: reqHeaders || {},
                        timeout: timeoutMs,
                        transformResponse: [function (data) {
                                return data;
                            }]
                    }).then(function (resp) {
                        clearTimeout(timer);
                        done(normalizeResponseBody(resp.data));
                    }).catch(function () {
                        clearTimeout(timer);
                        done('');
                    });
                    return;
                }
            }
            catch (e) { }
            libs.request_get(url, reqHeaders).then(function (data) {
                clearTimeout(timer);
                done(normalizeResponseBody(data));
            }).catch(function () {
                clearTimeout(timer);
                done('');
            });
        });
    }
    function xhrPostText(url, body, reqHeaders, timeoutMs) {
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
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json');
            Object.keys(reqHeaders || {}).forEach(function (key) {
                xhr.setRequestHeader(key, reqHeaders[key]);
            });
            xhr.send(body);
        });
    }
    function base64EncodeUri(b64) {
        return String(b64 || '').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }
    function fetchDatasToken(mid, eid, sv, reqHeaders, detailUrl) {
        var datasUrl = "".concat(DOMAIN, "/datas");
        var body = JSON.stringify({ m: mid, e: String(eid), s: String(sv) });
        var postHeaders = Object.assign({}, reqHeaders, {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json, text/plain, */*',
            'Referer': detailUrl || reqHeaders['Referer'] || DOMAIN,
            'Origin': DOMAIN
        });
        console.log('[RN-Fetch][YESMOVIES-DATAS] POST ' + datasUrl + ' body=' + body);
        return xhrPostText(datasUrl, body, postHeaders, 8000).then(function (text) {
            if (text && text.charAt(0) === '{') {
                try {
                    var obj = JSON.parse(text);
                    debugLog('DATAS_RESP', (text || '').substring(0, 120));
                    console.log('[RN-Fetch][YESMOVIES-DATAS] ok ' + (text || '').substring(0, 120));
                    return obj;
                }
                catch (e) { }
            }
            debugLog('DATAS_EMPTY', String(text).substring(0, 80));
            console.log('[RN-Fetch][YESMOVIES-DATAS] miss ' + String(text).substring(0, 80));
            return null;
        });
    }
    function fetchYesmoviesTrace(reqHeaders) {
        var traceUrl = "".concat(DOMAIN, "/cdn-cgi/trace");
        console.log('[RN-Fetch][YESMOVIES-TRACE] GET ' + traceUrl);
        return fetchTraceText(traceUrl, reqHeaders).then(function (text) {
            var data = parseTrace(text);
            debugLog('YES_TRACE', (text || '').substring(0, 80).replace(/\n/g, '\\n'));
            return data;
        });
    }
    function buildWatchEmbedUrl(parseURL, sv, eid, mid, yesLoc, datasToken) {
        if (datasToken) {
            var tokenUrl = "".concat(parseURL, "/watch?v=").concat(datasToken);
            debugLog('WATCH_URL', tokenUrl);
            console.log('[RN-Fetch][PLOYAN-EMBED-URL] ' + tokenUrl);
            return Promise.resolve({ url: tokenUrl, urix: '' });
        }
        var tsx = Math.floor((new Date()).getTime() / 1000);
        var encPlain = mid + "+" + eid + "+" + sv + "+" + yesLoc + "+" + tsx;
        debugLog('URIX_PLAIN', encPlain);
        return encox(encPlain, yesLoc).then(function (enc) {
            var urix = base64EncodeUri(enc);
            var watchUrl = "".concat(parseURL, "/watch/?v").concat(sv).concat(eid, "#").concat(urix);
            debugLog('ENCOX_OK', urix.substring(0, 32));
            debugLog('WATCH_URL', watchUrl.substring(0, 120));
            console.log('[RN-Fetch][PLOYAN-EMBED-URL] ' + watchUrl.substring(0, 140));
            return { url: watchUrl, urix: urix };
        }).catch(function (err) {
            debugLog('ENCOX_ERR', String(err && err.message ? err.message : err));
            console.log('[RN-Fetch][PLOYAN-ENCOX-ERR] ' + String(err && err.message ? err.message : err));
            throw err;
        });
    }
    function openYesmoviesEmbedAndWait(mid, eid, sv, movieInfo, callback, LINK_DETAIL) {
        return new Promise(function (resolve) {
            var delivered = false;
            var linkCallback = function (data) {
                callback(data);
                if (data && data.file && !delivered) {
                    delivered = true;
                    console.log('[RN-Fetch][YESMOVIES-EMBED] file ok, provider done');
                    resolve(true);
                }
            };
            if (!(LINK_DETAIL && mid && hosts && hosts['yesmovies-embed'])) {
                resolve(false);
                return;
            }
            console.log('[RN-Fetch][YESMOVIES-EMBED] early detail webview');
            hosts['yesmovies-embed'](LINK_DETAIL, movieInfo || {}, PROVIDER, {
                detailUrl: LINK_DETAIL,
                mid: mid,
                eid: eid,
                sv: sv,
                epNum: movieInfo && movieInfo.episode ? movieInfo.episode : eid,
                yesLoc: 'US',
                watchUrl: ''
            }, linkCallback);
        });
    }
    function openPloyanWebView(watchEmbedUrl, urix, mid, eid, sv, movieInfo, callback, streamHeaders, yesDetailUrl, yesLoc) {
        var watchBase = String(watchEmbedUrl || '').split('#')[0];
        var yesReferer = yesDetailUrl || 'https://ww.yesmovies.ag/';
        console.log('[RN-Fetch][PLOYAN-WEBVIEW] watch=' + watchBase + ' ref=' + yesReferer.substring(0, 80) + ' loc=' + (yesLoc || 'US'));
        if (yesDetailUrl && mid && hosts && hosts['yesmovies-embed']) {
            console.log('[RN-Fetch][YESMOVIES-EMBED] fallback detail page iframe flow');
            hosts['yesmovies-embed'](yesDetailUrl, movieInfo || {}, PROVIDER, {
                detailUrl: yesDetailUrl,
                mid: mid,
                eid: eid,
                sv: sv,
                epNum: movieInfo && movieInfo.episode ? movieInfo.episode : eid,
                yesLoc: yesLoc || 'US',
                watchUrl: watchEmbedUrl
            }, callback);
            return;
        }
        if (hosts && hosts['ployan']) {
            hosts['ployan'](watchBase, movieInfo || {}, PROVIDER, {
                urix: urix,
                mid: mid,
                eid: eid,
                sv: sv,
                yesReferer: yesReferer,
                yesLoc: yesLoc || 'US',
                watchUrl: watchBase
            }, callback);
            return;
        }
        libs.embed_redirect(watchBase, '', movieInfo, PROVIDER, callback, PROVIDER, [], streamHeaders, { urix: urix, mid: mid, eid: eid, sv: sv });
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
            xhr.withCredentials = true;
            Object.keys(reqHeaders || {}).forEach(function (key) {
                xhr.setRequestHeader(key, reqHeaders[key]);
            });
            xhr.send();
        });
    }
    function hasTraceLoc(text) {
        return !!(text && text.indexOf('loc=') >= 0);
    }
    function hasPlyUrl(text) {
        return !!(text && /plyURL\s*=\s*"/i.test(text));
    }
    function fetchDetailHtml(url, reqHeaders) {
        var timeoutMs = 10000;
        console.log('[RN-Fetch][YESMOVIES-DETAIL] GET ' + url);
        return xhrGetText(url, reqHeaders, timeoutMs).then(function (xhrText) {
            if (hasPlyUrl(xhrText)) {
                console.log('[RN-Fetch][YESMOVIES-DETAIL] ok via=xhr bytes=' + xhrText.length);
                return xhrText;
            }
            console.log('[RN-Fetch][YESMOVIES-DETAIL] xhr miss bytes=' + (xhrText ? xhrText.length : 0));
            return requestGetWithTimeout(url, reqHeaders, timeoutMs).then(function (axiosText) {
                if (hasPlyUrl(axiosText)) {
                    console.log('[RN-Fetch][YESMOVIES-DETAIL] ok via=axios bytes=' + axiosText.length);
                    return axiosText;
                }
                console.log('[RN-Fetch][YESMOVIES-DETAIL] axios miss bytes=' + (axiosText ? axiosText.length : 0));
                return fetchWithTimeout(url, reqHeaders, timeoutMs).then(function (fetchText) {
                    if (hasPlyUrl(fetchText)) {
                        console.log('[RN-Fetch][YESMOVIES-DETAIL] ok via=fetch bytes=' + fetchText.length);
                        return fetchText;
                    }
                    console.log('[RN-Fetch][YESMOVIES-DETAIL] fetch miss bytes=' + (fetchText ? fetchText.length : 0));
                    return xhrText || axiosText || fetchText || '';
                });
            });
        });
    }
    function tryTraceOnce(url, reqHeaders, timeoutMs) {
        return xhrGetText(url, reqHeaders, timeoutMs).then(function (xhrText) {
            if (hasTraceLoc(xhrText)) {
                console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (parseTrace(xhrText)['loc'] || 'MISSING') + ' via=xhr');
                return xhrText;
            }
            console.log('[RN-Fetch][PLOYAN-TRACE] xhr miss bytes=' + (xhrText ? xhrText.length : 0));
            return requestGetWithTimeout(url, reqHeaders, timeoutMs).then(function (axiosText) {
                if (hasTraceLoc(axiosText)) {
                    console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (parseTrace(axiosText)['loc'] || 'MISSING') + ' via=axios');
                    return axiosText;
                }
                console.log('[RN-Fetch][PLOYAN-TRACE] axios miss bytes=' + (axiosText ? axiosText.length : 0));
                return fetchWithTimeout(url, reqHeaders, timeoutMs).then(function (fetchText) {
                    if (hasTraceLoc(fetchText)) {
                        console.log('[RN-Fetch][PLOYAN-LOC] loc=' + (parseTrace(fetchText)['loc'] || 'MISSING') + ' via=fetch');
                        return fetchText;
                    }
                    console.log('[RN-Fetch][PLOYAN-TRACE] fetch miss bytes=' + (fetchText ? fetchText.length : 0));
                    return xhrText || axiosText || fetchText || '';
                });
            });
        });
    }
    function fetchTraceText(url, reqHeaders) {
        var traceUrls = [url, 'https://www.cloudflare.com/cdn-cgi/trace'];
        var timeoutMs = 4000;
        console.log('[RN-Fetch][PLOYAN-VERSION] v39');
        function tryNext(index) {
            if (index >= traceUrls.length) {
                console.log('[RN-Fetch][PLOYAN-LOC] loc=MISSING all trace urls failed');
                return Promise.resolve('');
            }
            var traceUrl = traceUrls[index];
            console.log('[RN-Fetch][PLOYAN-TRACE] GET ' + traceUrl);
            return tryTraceOnce(traceUrl, reqHeaders, timeoutMs).then(function (text) {
                if (hasTraceLoc(text)) {
                    debugLog('TRACE_RAW', text.substring(0, 120).replace(/\n/g, '\\n'));
                    return text;
                }
                return tryNext(index + 1);
            });
        }
        return tryNext(0);
    }
    function fetchText(url, reqHeaders) {
        return fetchTraceText(url, reqHeaders);
    }
    function parseJsonResponse(text, via) {
        if (text && text.charAt(0) === '{') {
            debugLog('FETCH_JSON', via + '|' + text.substring(0, 160));
            console.log('[RN-Fetch][PLOYAN-GET-RESP] via=' + via + ' ' + text.substring(0, 200));
            return JSON.parse(text);
        }
        return null;
    }
    function finishGetMiss(lastText) {
        if (lastText && lastText.indexOf('Not Found') >= 0) {
            debugLog('FETCH_JSON_404', 'Not Found');
            console.log('[RN-Fetch][PLOYAN-GET-404] Not Found');
            return { code: 404, info: '' };
        }
        debugLog('FETCH_JSON_EMPTY', String(lastText).substring(0, 80));
        console.log('[RN-Fetch][PLOYAN-GET-EMPTY] ' + String(lastText).substring(0, 80));
        return { code: 404, info: '' };
    }
    function fetchJson(url, reqHeaders) {
        var xhrText = '';
        var axiosText = '';
        var fetchText = '';
        var libsText = '';
        console.log('[RN-Fetch][PLOYAN-GET] GET ' + url.substring(0, 160));
        return libs.request_get(url, reqHeaders).then(function (data) {
            libsText = typeof data === 'string' ? data : JSON.stringify(data || '');
            var parsed = parseJsonResponse(libsText, 'libs');
            if (parsed) {
                return parsed;
            }
            console.log('[RN-Fetch][PLOYAN-GET] libs miss bytes=' + (libsText ? libsText.length : 0));
            return xhrGetText(url, reqHeaders, 8000).then(function (text) {
                xhrText = text;
                parsed = parseJsonResponse(xhrText, 'xhr');
                if (parsed) {
                    return parsed;
                }
                console.log('[RN-Fetch][PLOYAN-GET] xhr miss bytes=' + (xhrText ? xhrText.length : 0));
                return requestGetWithTimeout(url, reqHeaders, 8000).then(function (text2) {
                    axiosText = text2;
                    parsed = parseJsonResponse(axiosText, 'axios');
                    if (parsed) {
                        return parsed;
                    }
                    console.log('[RN-Fetch][PLOYAN-GET] axios miss bytes=' + (axiosText ? axiosText.length : 0));
                    return fetchWithTimeout(url, reqHeaders, 8000).then(function (text3) {
                        fetchText = text3;
                        parsed = parseJsonResponse(fetchText, 'fetch');
                        if (parsed) {
                            return parsed;
                        }
                        console.log('[RN-Fetch][PLOYAN-GET] fetch miss bytes=' + (fetchText ? fetchText.length : 0));
                        return finishGetMiss(xhrText || axiosText || fetchText || libsText || '');
                    });
                });
            });
        }).catch(function () {
            return xhrGetText(url, reqHeaders, 8000).then(function (text) {
                xhrText = text;
                var parsed = parseJsonResponse(xhrText, 'xhr');
                if (parsed) {
                    return parsed;
                }
                return finishGetMiss(xhrText);
            });
        });
    }
    function parseEpisodeDataId(html, episodeNum, serverId) {
        var episodePattern = String(episodeNum);
        var serverPattern = String(serverId || 1);
        var epTagRe = /<li class=ep-item([^>]*)>/gi;
        var tagMatch = void 0;
        var attrs = void 0;
        var epId = void 0;
        var dataServer = void 0;
        var dataId = void 0;
        while ((tagMatch = epTagRe.exec(html)) !== null) {
            attrs = tagMatch[1];
            epId = (attrs.match(/\bid=ep-([0-9]+)/i) || [])[1];
            if (!epId || epId !== episodePattern) {
                continue;
            }
            dataServer = (attrs.match(/\bdata-server=([0-9]+)/i) || [])[1];
            if (dataServer && dataServer !== serverPattern) {
                continue;
            }
            dataId = (attrs.match(/\bdata-id=([0-9]+)/i) || [])[1];
            if (dataId) {
                return dataId;
            }
        }
        return episodePattern;
    }
    function getEcbMode() {
        if (cryptoS.mode && cryptoS.mode.ECB) {
            return cryptoS.mode.ECB;
        }
        if (!cryptoS._iyesEcbMode) {
            cryptoS._iyesEcbMode = {
                encryptBlock: function (words, offset) {
                    this._cipher.encryptBlock(words, offset);
                },
                decryptBlock: function (words, offset) {
                    this._cipher.decryptBlock(words, offset);
                }
            };
        }
        return cryptoS._iyesEcbMode;
    }
    function aesBlockEncrypt(key32, block16) {
        var keyWa = bytesToWordArray(key32);
        var blockWa = bytesToWordArray(block16);
        var encrypted = cryptoS.AES.encrypt(blockWa, keyWa, {
            mode: getEcbMode(),
            padding: cryptoS.pad.NoPadding
        });
        return wordArrayToUint8Array(encrypted.ciphertext);
    }
    function xorBytes16(a, b) {
        var out = new Uint8Array(16);
        var i = void 0;
        for (i = 0; i < 16; i++) {
            out[i] = a[i] ^ b[i];
        }
        return out;
    }
    function shiftRightGf128(v) {
        var lsb = v[15] & 1;
        var j = void 0;
        for (j = 15; j > 0; j--) {
            v[j] = (v[j] >>> 1) | ((v[j - 1] & 1) << 7);
        }
        v[0] >>>= 1;
        return lsb;
    }
    function ghashMul128Bytes(x, y) {
        var z = new Uint8Array(16);
        var v = y.slice();
        var r = new Uint8Array(16);
        var i = void 0;
        var j = void 0;
        var lsb = void 0;
        r[0] = 0xe1;
        for (i = 0; i < 128; i++) {
            if ((x[i >>> 3] >>> (7 - (i & 7))) & 1) {
                for (j = 0; j < 16; j++) {
                    z[j] ^= v[j];
                }
            }
            lsb = shiftRightGf128(v);
            if (lsb) {
                for (j = 0; j < 16; j++) {
                    v[j] ^= r[j];
                }
            }
        }
        return z;
    }
    function ghashBlocksBytes(hBytes, xBytes, data) {
        var x = xBytes.slice();
        var offset = void 0;
        var block = void 0;
        for (offset = 0; offset < data.length; offset += 16) {
            block = new Uint8Array(16);
            block.set(data.subarray(offset, offset + 16));
            x = xorBytes16(x, block);
            x = ghashMul128Bytes(x, hBytes);
        }
        return x;
    }
    function gcmGhash(h, a, c) {
        var x = new Uint8Array(16);
        x = ghashBlocksBytes(h, x, gcmPad16(a));
        x = ghashBlocksBytes(h, x, gcmPad16(c));
        x = ghashBlocksBytes(h, x, gcmLengthBlock(a.length * 8, c.length * 8));
        return x;
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
        b[7] = aBits & 0xff;
        b[6] = (aBits >>> 8) & 0xff;
        b[5] = (aBits >>> 16) & 0xff;
        b[4] = (aBits >>> 24) & 0xff;
        b[15] = cBits & 0xff;
        b[14] = (cBits >>> 8) & 0xff;
        b[13] = (cBits >>> 16) & 0xff;
        b[12] = (cBits >>> 24) & 0xff;
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
    function generateGetHashPureSafe(loc, mid, ei, sv, tsOverride) {
        try {
            return generateGetHashPure(loc, mid, ei, sv, tsOverride);
        }
        catch (err) {
            debugLog('HASH_PURE_FAIL', String(err && err.message ? err.message : err));
            console.log('[RN-Fetch][PLOYAN-ERR] HASH_PURE_FAIL ' + String(err && err.message ? err.message : err));
            return '';
        }
    }
    function generateGetHashPure(loc, mid, ei, sv, tsOverride) {
        var ts = tsOverride || Math.floor((new Date()).getTime() / 1000);
        var plain = mid + "+" + ei + "+" + sv + "+" + ts;
        var plainBytes = utf8Encode(plain);
        debugLog('HASH_PLAIN', plain);
        var salt = getRandomBytes(8);
        var saltWordArray = bytesToSaltWordArray(salt);
        var iv = getRandomBytes(12);
        var keyBytes = deriveAesKeyBytes(loc, saltWordArray);
        var ctWithTag = gcmEncrypt(keyBytes, iv, plainBytes);
        return bytesToHex(salt) + "-" + bytesToHex(iv) + "-" + bytesToHex(ctWithTag);
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
    function bytesToWordArray(bytes) {
        return cryptoS.enc.Hex.parse(bytesToHex(bytes));
    }
    function bytesToSaltWordArray(bytes) {
        return bytesToWordArray(bytes);
    }
    function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedKeyData, key;
            return __generator(this, function (_a) {
                if (keyData instanceof Uint8Array) {
                    encodedKeyData = bytesToWordArray(keyData);
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
                    ? bytesToWordArray(plaintext)
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
    function encoxPure(plaintext, pwd) {
        var pwHash = wordArrayToUint8Array(cryptoS.SHA256(cryptoS.enc.Utf8.parse(pwd)));
        var iv = getRandomBytes(12);
        var ivStr = Array.from(iv).map(function (b) { return String.fromCharCode(b); }).join('');
        var ptBytes = utf8Encode(plaintext);
        var ctWithTag = gcmEncrypt(pwHash, iv, ptBytes);
        var ctStr = Array.from(ctWithTag).map(function (byte) { return String.fromCharCode(byte); }).join('');
        return libs.string_btoa(ivStr + ctStr);
    }
    function encox(plaintext, pwd) {
        return Promise.resolve().then(function () {
            return encoxPure(plaintext, pwd);
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
    function generateGetHashSubtle(loc, mid, ei, sv, tsOverride) {
        return __awaiter(this, void 0, void 0, function () {
            var subtle, ts, plain, plainBytes, passwordBytes, saltBytes, baseKey, aesKey, iv, ct, ctHex, ivHex, saltHex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subtle = getSubtleCrypto();
                        if (!subtle) {
                            return [2, ''];
                        }
                        ts = tsOverride || Math.floor((new Date()).getTime() / 1000);
                        plain = mid + "+" + ei + "+" + sv + "+" + ts;
                        plainBytes = utf8Encode(plain);
                        passwordBytes = utf8Encode(loc);
                        saltBytes = getRandomBytes(8);
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
    function generateGetHash(loc, mid, ei, sv, tsOverride) {
        return __awaiter(this, void 0, void 0, function () {
            var subtleHash, pureHash, ts, plain, saltBytes, saltWordArray, saltHex, plainWordArray, iv, alg, keyBytes, key, ptUint8, ctBuffer, ivHex, ctHex, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugLog('HASH_START', 'loc=' + loc + ' mid=' + mid + ' ei=' + ei + ' sv=' + sv);
                        if (!getSubtleCrypto()) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, generateGetHashSubtle(loc, mid, ei, sv, tsOverride)];
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
                            return [3, 5];
                        }
                        if (cryptoS && cryptoS.AES) {
                            pureHash = generateGetHashPureSafe(loc, mid, ei, sv, tsOverride);
                            if (pureHash) {
                                debugLog('HASH_PURE_OK', pureHash.substring(0, 80));
                                return [2, pureHash];
                            }
                        }
                        debugLog('HASH_ABORT', 'no GCM crypto available');
                        console.log('[RN-Fetch][PLOYAN-ERR] no GCM crypto available');
                        return [2, ''];
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        ts = tsOverride || Math.floor((new Date()).getTime() / 1000);
                        plain = mid + "+" + ei + "+" + sv + "+" + ts;
                        plainWordArray = cryptoS.enc.Utf8.parse(plain);
                        saltBytes = getRandomValues(8);
                        saltWordArray = bytesToSaltWordArray(saltBytes);
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
                        if (cryptoS && cryptoS.AES) {
                            debugLog('HASH_PURE', 'cryptoJS GCM failed, retry pure GCM');
                            pureHash = generateGetHashPureSafe(loc, mid, ei, sv, tsOverride);
                            if (pureHash) {
                                debugLog('HASH_PURE_OK', pureHash.substring(0, 80));
                                return [2, pureHash];
                            }
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
    var PROVIDER, DOMAIN, headers, ployanHeaders, streamHeaders, warmHeaders, getHeaders, urlDoc_1, getIP_1, getEmbed, urlSearch, LINK_DETAIL, resSearch, _i, _a, searchItem, title, href, season, type, id, textHtml, playURL, parseURL, ipData, loc, sv, eid, mid, hashTs, datasResp, datasToken, yesTraceData, yesLoc, watchEmbedUrl, watchUrix, embedPack, deHash, hashURL, hashID, directURL, e_1;
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
                ployanHeaders = buildPloyanHeaders(headers['user-agent']);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 11, , 12]);
                urlDoc_1 = "https://doc.vidcloud9.org";
                getIP_1 = function (urlDoc) { return __awaiter(_this, void 0, void 0, function () {
                    var urlDocTrace, traceData, arr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlDocTrace = "".concat(urlDoc, "/cdn-cgi/trace");
                                return [4, fetchTraceText(urlDocTrace, streamHeaders)];
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
                getEmbed = function (parseUrl, sv, mi, ei, yesLoc) { return __awaiter(_this, void 0, void 0, function () {
                    var pwd, tsx, enc, urixLocal;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                pwd = yesLoc || 'US';
                                tsx = Math.floor((new Date()).getTime() / 1000);
                                return [4, encox(mi + "+" + ei + "+" + sv + "+" + pwd + "+" + tsx, pwd)];
                            case 1:
                                enc = _c.sent();
                                urixLocal = base64EncodeUri(enc);
                                return [2, "".concat(parseUrl, "/watch/?v").concat(sv).concat(ei, "#").concat(urixLocal)];
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
                return [4, fetchDetailHtml(LINK_DETAIL, headers)];
            case 3:
                textHtml = _b.sent();
                playURL = textHtml.match(/plyURL *\= *\"([^\"]+)/i);
                playURL = playURL ? playURL[1] : "";
                libs.log({ playURL: playURL }, PROVIDER, "PLAY URL");
                if (!playURL) {
                    debugLog('ABORT', 'no plyURL in detail HTML');
                    return [2];
                }
                parseURL = libs.string_atob(playURL);
                sv = 1;
                eid = movieInfo.type == 'movie' ? 1 : movieInfo.episode;
                if (movieInfo.type == 'tv') {
                    eid = parseEpisodeDataId(textHtml, movieInfo.episode, sv);
                }
                mid = id;
                streamHeaders = Object.assign({}, ployanHeaders, {
                    'Referer': LINK_DETAIL,
                    'Origin': DOMAIN
                });
                debugLog('GET_HDR', 'referer=' + LINK_DETAIL.substring(0, 80));
                debugLog('EP_PARAMS', 'mid=' + mid + ' eid=' + eid + ' sv=' + sv);
                console.log('[RN-Fetch][PLOYAN-READY] parseURL=' + parseURL + ' mid=' + mid + ' eid=' + eid + ' sv=' + sv);
                debugLog('GET_PARALLEL', 'fire embed + RN /get/ (justhd-style)');
                if (hosts && hosts['yesmovies-embed']) {
                    hosts['yesmovies-embed'](LINK_DETAIL, movieInfo || {}, PROVIDER, {
                        detailUrl: LINK_DETAIL,
                        mid: mid,
                        eid: eid,
                        sv: sv,
                        epNum: movieInfo && movieInfo.episode ? movieInfo.episode : eid,
                        yesLoc: 'US',
                        watchUrl: ''
                    }, callback);
                }
                return [3, 7];
            case 4:
                _b.sent();
                return [2];
            case 5:
                yesTraceData = _b.sent();
                yesLoc = yesTraceData && yesTraceData.loc ? yesTraceData.loc : 'US';
                debugLog('YES_LOC', yesLoc);
                console.log('[RN-Fetch][YESMOVIES-LOC] loc=' + yesLoc);
                return [4, buildWatchEmbedUrl(parseURL, sv, eid, mid, yesLoc, datasToken)];
            case 6:
                embedPack = _b.sent();
                watchEmbedUrl = embedPack && embedPack.url ? embedPack.url : embedPack;
                watchUrix = embedPack && embedPack.urix ? embedPack.urix : '';
                debugLog('GET_FALLBACK', 'yesmovies embed webview');
                console.log('[RN-Fetch][YESMOVIES-EMBED] open detail webview');
                openPloyanWebView(watchEmbedUrl, watchUrix, mid, eid, sv, movieInfo, callback, streamHeaders, LINK_DETAIL, yesLoc);
                return [2];
            case 7:
                console.log('[RN-Fetch][PLOYAN-DIRECT] try /get/ with ployan trace');
                return [4, getIP_1(parseURL)];
            case 8:
                ipData = _b.sent();
                loc = ipData['loc'];
                debugLog('PARSE_URL', 'parseURL=' + parseURL + ' loc=' + (loc || 'EMPTY'));
                libs.log({ parseURL: parseURL, loc: loc }, PROVIDER, "PARSE URL");
                if (!parseURL || !loc) {
                    debugLog('LOC_EMPTY', 'webview pending');
                    return [2, true];
                }
                hashTs = Math.floor((new Date()).getTime() / 1000);
                debugLog('HASH_TS', String(hashTs));
                console.log('[RN-Fetch][PLOYAN-HASH] generating hash...');
                return [4, generateGetHash(loc, mid, eid, sv, hashTs)];
            case 9:
                if (!loc) {
                    return [2];
                }
                deHash = _b.sent();
                console.log('[RN-Fetch][PLOYAN-HASH] done len=' + (deHash ? deHash.length : 0));
                libs.log({ deHash: deHash, loc: loc, sv: sv, mid: mid, eid: eid }, PROVIDER, 'GET HASH');
                if (!deHash) {
                    debugLog('HASH_EMPTY', 'webview pending');
                    return [2, true];
                }
                hashURL = "".concat(parseURL, "/get/").concat(deHash);
                debugLog('GET_REQ', hashURL.substring(0, 120));
                return [4, fetchJson(hashURL, getHeaders)];
            case 10:
                if (!hashURL) {
                    return [2];
                }
                hashID = _b.sent();
                libs.log({ hashID: hashID, hashURL: hashURL }, PROVIDER, 'HASH ID');
                if (hashID && hashID.code === 200 && hashID.info) {
                    directURL = "".concat(parseURL, "/hls/").concat(hashID.info, "/master.m3u8");
                    console.log('[RN-Fetch][PLOYAN-HLS] GET ' + directURL);
                    libs.log({ directURL: directURL }, PROVIDER, 'DIRECT QUALITY');
                    libs.embed_callback(directURL, PROVIDER, PROVIDER, 'Hls', callback, 1, [], [{ file: directURL, quality: 1080 }], warmHeaders, {
                        type: 'm3u8',
                    });
                    return [2, true];
                }
                debugLog('GET_FALLBACK', 'webview pending');
                return [2, true];
            case 11:
                e_1 = _b.sent();
                debugLog('ERROR', String(e_1 && e_1.message ? e_1.message : e_1));
                console.log('[RN-Fetch][PLOYAN-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                libs.log({ e: e_1, message: e_1 && e_1.message ? e_1.message : e_1 }, PROVIDER, 'ERROR CATCH');
                if (watchEmbedUrl) {
                    console.log('[RN-Fetch][PLOYAN-EMBED] error fallback');
                    openPloyanWebView(watchEmbedUrl, watchUrix, mid, eid, sv, movieInfo, callback, streamHeaders, LINK_DETAIL, yesLoc);
                }
                return [2];
            case 12:
                return [2];
        }
    });
}); };
