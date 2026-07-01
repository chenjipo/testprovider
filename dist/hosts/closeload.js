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
function normalizeCloseloadEmbedUrl(rawUrl) {
    if (!rawUrl) {
        return '';
    }
    var url = String(rawUrl);
    var embedMatch = url.match(/\/embed-([A-Za-z0-9]+)/i);
    if (url.indexOf('closeload') >= 0 && embedMatch) {
        var embedId = embedMatch[1];
        var imdbMatch = url.match(/imdb_id=([^&]+)/i);
        var query = imdbMatch ? '?imdb_id=' + imdbMatch[1] : '';
        return 'https://closeload.top/video/embed/' + embedId + '/' + query;
    }
    return url;
}
function buildRidorapidEmbedUrl(rawUrl) {
    if (!rawUrl) {
        return '';
    }
    var url = String(rawUrl);
    var embedMatch = url.match(/\/embed-([A-Za-z0-9]+)/i);
    if (!embedMatch) {
        return '';
    }
    var embedId = embedMatch[1];
    var imdbMatch = url.match(/imdb_id=([^&]+)/i);
    var query = imdbMatch ? '?imdb_id=' + imdbMatch[1] : '';
    return 'https://ridorapid.closeload.top/embed-' + embedId + '/' + query;
}
function buildCloseloadUrlCandidates(rawUrl, config) {
    var list = [];
    var seen = {};
    function pushCandidate(candidate) {
        if (!candidate || seen[candidate]) {
            return;
        }
        seen[candidate] = true;
        list.push(candidate);
    }
    var raw = String((config && config.embedUrlRaw) ? config.embedUrlRaw : rawUrl || '');
    var url = String(rawUrl || '');
    pushCandidate(raw);
    if (url && url !== raw) {
        pushCandidate(url);
    }
    pushCandidate(buildRidorapidEmbedUrl(raw || url));
    pushCandidate(normalizeCloseloadEmbedUrl(raw || url));
    var embedMatch = (raw || url).match(/\/embed-([A-Za-z0-9]+)/i);
    if (embedMatch) {
        var embedId = embedMatch[1];
        var imdbMatch = (raw || url).match(/imdb_id=([^&]+)/i);
        var query = imdbMatch ? '?imdb_id=' + imdbMatch[1] : '';
        pushCandidate('https://closeload.top/video/embed/' + embedId + '/' + query);
    }
    return list;
}
function pickCloseloadWebviewUrl(rawUrl, config, candidates) {
    if (config && config.embedUrlRaw) {
        return config.embedUrlRaw;
    }
    var idx = 0;
    for (idx = 0; idx < candidates.length; idx++) {
        if (candidates[idx].indexOf('ridorapid') >= 0) {
            return candidates[idx];
        }
    }
    return candidates.length ? candidates[0] : String(rawUrl || '');
}
function buildCloseloadFetchHeaders(activeUrl, pageReferer) {
    var headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        referer: pageReferer,
        origin: 'https://ridomovies.is',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    };
    if (activeUrl && activeUrl.indexOf('ridorapid') >= 0) {
        headers.referer = activeUrl;
        headers.origin = 'https://ridorapid.closeload.top';
    }
    return headers;
}
function isCloseloadHtmlUsable(response, htmlText) {
    if (!htmlText || htmlText.length < 200) {
        return false;
    }
    if (response.status < 400) {
        return true;
    }
    if (response.status === 404) {
        return false;
    }
    if (htmlText.indexOf('eval(function(p,a,c,k,e,d)') >= 0) {
        return true;
    }
    if (htmlText.match(/let\s+url\s*=\s*['"]https/i)) {
        return true;
    }
    if (htmlText.match(/https?:[^"'\\s]+\.m3u8/i)) {
        return true;
    }
    if (htmlText.indexOf('master.txt') >= 0) {
        return true;
    }
    return response.status < 500;
}
function fetchCloseloadWithRetry(activeUrl, embedHeaders, maxAttempts) {
    maxAttempts = maxAttempts || 3;
    function attempt(n) {
        if (n >= maxAttempts) {
            return Promise.reject(new Error('closeload-fetch-exhausted'));
        }
        var delay = n === 0 ? 0 : (400 + n * 350);
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        }).then(function () {
            return fetch(activeUrl, {
                headers: embedHeaders,
                method: 'GET',
            });
        }).then(function (response) {
            return response.text().then(function (htmlText) {
                if (isCloseloadHtmlUsable(response, htmlText)) {
                    return { response: response, htmlText: htmlText };
                }
                console.log('[RN-Fetch][CLOSELOAD-RETRY] attempt=' + (n + 1) + ' status=' + response.status);
                return attempt(n + 1);
            });
        }).catch(function (err) {
            console.log('[RN-Fetch][CLOSELOAD-RETRY-ERR] attempt=' + (n + 1) + ' ' + String(err && err.message ? err.message : err));
            return attempt(n + 1);
        });
    }
    return attempt(0);
}
function buildCloseloadWebviewScript() {
    return "(function(){var done=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function postUrl(u){if(done||!u||String(u).indexOf('http')!==0)return;done=1;pm({step:'cl-url',url:u});}function scan(){if(done)return;var h=document.documentElement?document.documentElement.innerHTML:'';var m=h.match(/let\\s+url\\s*=\\s*['\"]([^'\"]+)/i);if(m&&m[1])postUrl(m[1]);var m2=h.match(/https?:[^'\"\\s<>]+\\.(?:m3u8|txt)[^'\"\\s<>]*/i);if(m2)postUrl(m2[0]);var m3=h.match(/https?:[^'\"\\s<>]+master\\.txt[^'\"\\s<>]*/i);if(m3)postUrl(m3[0]);}function hook(){if(window.__clHooked)return;window.__clHooked=1;var fo=fetch;fetch=function(a,b){return fo(a,b).then(function(r){var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(!done&&(s.indexOf('.m3u8')>=0||s.indexOf('master.txt')>=0))postUrl(s);return r;});};}hook();pm({step:'cl-boot'});scan();var n=0;var iv=setInterval(function(){scan();n++;if(done||n>80)clearInterval(iv);},400);})();";
}
function queueCloseloadWebview(embedUrl, movieInfo, provider, config, callback, candidates) {
    var pageReferer = config && config.pageReferer ? config.pageReferer : 'https://ridomovies.is/';
    var wvUrl = pickCloseloadWebviewUrl(embedUrl, config, candidates || [embedUrl]);
    var headers = buildCloseloadFetchHeaders(wvUrl, pageReferer);
    if (!libs.scheduleEmbedWebview) {
        console.log('[RN-Fetch][CLOSELOAD-SKIP] webview-unavailable');
        return;
    }
    console.log('[RN-Fetch][CLOSELOAD-WV] queue ' + String(wvUrl).substring(0, 120));
    libs.scheduleEmbedWebview(provider === 'LRIDOMOVIE' ? provider : 'closeload', function () {
        callback({
            callback: {
                provider: provider,
                host: 'closeload-embed',
                url: wvUrl,
                headers: headers,
                callback: callback,
                userAgent: headers['user-agent'],
                beforeLoadScript: buildCloseloadWebviewScript(),
                metadata: {
                    embedUrl: wvUrl,
                    embedUrlRaw: config && config.embedUrlRaw ? config.embedUrlRaw : wvUrl,
                    pageReferer: pageReferer,
                    movieInfo: movieInfo,
                },
            },
        });
    }, 8000);
}
hosts["closeload"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    function dc_o55npDX9dLL(value_parts) {
        var value = value_parts.join('');
        var result = value;
        result = result.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        result = result.split('').reverse().join('');
        result = libs.string_atob(result);
        var unmix = '';
        for (var i = 0; i < result.length; i++) {
            var charCode = result.charCodeAt(i);
            charCode = (charCode - (399756995 % (i + 5)) + 256) % 256;
            unmix += String.fromCharCode(charCode);
        }
        return unmix;
    }
    function dc_o55npDX9dLL2(value_parts) {
        var value = value_parts.join('');
        var result = value;
        result = libs.string_atob(result);
        result = result.split('').reverse().join('');
        result = result.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        var unmix = '';
        for (var i = 0; i < result.length; i++) {
            var charCode = result.charCodeAt(i);
            charCode = (charCode - (399756995 % (i + 5)) + 256) % 256;
            unmix += String.fromCharCode(charCode);
        }
        return unmix;
    }
    function dc_o55npDX9dLL3(value_parts) {
        var value = value_parts.join('');
        var result = value;
        result = result.split('').reverse().join('');
        result = result.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        result = libs.string_atob(result);
        var unmix = '';
        for (var i = 0; i < result.length; i++) {
            var charCode = result.charCodeAt(i);
            charCode = (charCode - (399756995 % (i + 5)) + 256) % 256;
            unmix += String.fromCharCode(charCode);
        }
        return unmix;
    }
    function dc_08bClqn1Nt2(value_parts) {
        var value = value_parts.join('');
        var result = value;
        result = result.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        result = libs.string_atob(result);
        result = result.split('').reverse().join('');
        var unmix = '';
        for (var i = 0; i < result.length; i++) {
            var charCode = result.charCodeAt(i);
            charCode = (charCode - (399756995 % (i + 5)) + 256) % 256;
            unmix += String.fromCharCode(charCode);
        }
        return unmix;
    }
    function dc_AEtIE9ASRaK(value_parts) {
        var value = value_parts.join('');
        var result = value;
        result = result.split('').reverse().join('');
        result = libs.string_atob(result);
        result = libs.string_atob(result);
        var unmix = '';
        for (var i = 0; i < result.length; i++) {
            var charCode = result.charCodeAt(i);
            charCode = (charCode - (399756995 % (i + 5)) + 256) % 256;
            unmix += String.fromCharCode(charCode);
        }
        return unmix;
    }
    function dc_hDbCyi9R5V2(value_parts) {
        var value = value_parts.join('');
        var result = value;
        result = result.split('').reverse().join('');
        result = libs.string_atob(result);
        result = result.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
        var unmix = '';
        for (var i = 0; i < result.length; i++) {
            var charCode = result.charCodeAt(i);
            charCode = (charCode - (399756995 % (i + 5)) + 256) % 256;
            unmix += String.fromCharCode(charCode);
        }
        return unmix;
    }
    function extractPacker(html) {
        var idx = html.indexOf('eval(function(p,a,c,k,e,d)');
        if (idx < 0) {
            return '';
        }
        var depth = 0;
        var started = false;
        var end = idx;
        for (var i = idx; i < html.length; i++) {
            if (html.charAt(i) === '(') {
                depth++;
                started = true;
            }
            else if (html.charAt(i) === ')') {
                depth--;
                if (started && depth === 0) {
                    end = i + 1;
                    break;
                }
            }
        }
        return html.substring(idx, end);
    }
    function extractFunction(code, name) {
        var start = code.indexOf('function ' + name);
        if (start < 0) {
            return '';
        }
        var brace = code.indexOf('{', start);
        var depth = 0;
        for (var i = brace; i < code.length; i++) {
            if (code.charAt(i) === '{') {
                depth++;
            }
            else if (code.charAt(i) === '}') {
                depth--;
                if (depth === 0) {
                    return code.substring(start, i + 1);
                }
            }
        }
        return '';
    }
    function decodeDynamicSource(html, unpacked) {
        var fileMatch = html.match(/sources:\s*\[\{file:\s*(s_[A-Za-z0-9]+)/i);
        var keyName = fileMatch ? fileMatch[1] : '';
        if (!keyName) {
            return '';
        }
        var searchBodies = [html];
        if (unpacked) {
            searchBodies.push(unpacked);
        }
        var assignMatch = null;
        var dcName = '';
        var parts = null;
        var bodyIdx = 0;
        for (bodyIdx = 0; bodyIdx < searchBodies.length; bodyIdx++) {
            assignMatch = searchBodies[bodyIdx].match(new RegExp(keyName + '\\s*=\\s*(dc_[A-Za-z0-9]+)\\(([^\\)]*)\\)'));
            if (assignMatch) {
                dcName = assignMatch[1];
                try {
                    parts = JSON.parse(assignMatch[2]);
                    break;
                }
                catch (parseErr) {
                    assignMatch = null;
                }
            }
        }
        if (!assignMatch || !parts) {
            return '';
        }
        var fnSrc = extractFunction(html, dcName);
        if (!fnSrc && unpacked) {
            fnSrc = extractFunction(unpacked, dcName);
        }
        if (!fnSrc) {
            return '';
        }
        fnSrc = fnSrc.replace(/\batob\(/g, 'libs.string_atob(');
        var dc = eval('(' + fnSrc + ')');
        return dc(parts);
    }
    var DOMAIN, HOST, pageReferer, embedHeaders, response, htmlText, directUrl, packerScript, unpacker, getKey, keyName, varName, parseDirect, decoders, _i, decoder, callbackHost, e_1, urlCandidates, candidateIdx, activeUrl, fetchResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DOMAIN = 'https://closeload.top';
                HOST = 'closeload';
                pageReferer = config && config.pageReferer ? config.pageReferer : 'https://ridomovies.is/';
                callbackHost = provider === 'LRIDOMOVIE' ? provider : HOST;
                urlCandidates = buildCloseloadUrlCandidates(url, config);
                candidateIdx = 0;
                console.log('[RN-Fetch][CLOSELOAD-URL] ' + String(url).substring(0, 140));
                if (config && config.embedUrlRaw) {
                    console.log('[RN-Fetch][CLOSELOAD-RAW] ' + String(config.embedUrlRaw).substring(0, 140));
                }
                console.log('[RN-Fetch][CLOSELOAD-VERSION] v5-rn-retry candidates=' + urlCandidates.length);
                _a.label = 1;
            case 1:
                if (candidateIdx >= urlCandidates.length) {
                    queueCloseloadWebview(url, movieInfo, provider, config, callback, urlCandidates);
                    return [2];
                }
                activeUrl = urlCandidates[candidateIdx];
                embedHeaders = buildCloseloadFetchHeaders(activeUrl, pageReferer);
                console.log('[RN-Fetch][CLOSELOAD-TRY] idx=' + candidateIdx + ' ' + activeUrl.substring(0, 120));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, fetchCloseloadWithRetry(activeUrl, embedHeaders, 3)];
            case 3:
                fetchResult = _a.sent();
                response = fetchResult.response;
                htmlText = fetchResult.htmlText;
                console.log('[RN-Fetch][CLOSELOAD-FETCH] status=' + response.status + ' len=' + (htmlText ? htmlText.length : 0));
                if (!isCloseloadHtmlUsable(response, htmlText)) {
                    console.log('[RN-Fetch][CLOSELOAD-SKIP] fetch-failed idx=' + candidateIdx + ' status=' + response.status);
                    candidateIdx++;
                    return [3, 1];
                }
                directUrl = htmlText.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
                directUrl = directUrl ? directUrl[0].replace(/\\/g, '') : '';
                if (!directUrl) {
                    directUrl = (htmlText.match(/let\s+url\s*=\s*['"]([^'"]+)/i) || [])[1] || '';
                }
                if (!directUrl) {
                    directUrl = (htmlText.match(/file\s*:\s*['"](https?:[^'"]+)/i) || [])[1] || '';
                }
                if (directUrl && directUrl.indexOf('http') === 0) {
                    console.log('[RN-Fetch][CLOSELOAD-DIRECT] ' + directUrl.substring(0, 120));
                    libs.embed_callback(directUrl, provider, callbackHost, 'Hls', callback, 1, [], [{ file: directUrl, quality: 1080 }], {
                        referer: activeUrl,
                        'user-agent': embedHeaders['user-agent'],
                    }, {
                        type: 'm3u8',
                    });
                    return [2];
                }
                packerScript = extractPacker(htmlText);
                unpacker = packerScript ? libs.string_unpacker_v2(packerScript) : '';
                console.log('[RN-Fetch][CLOSELOAD-SCRIPT] len=' + (packerScript ? packerScript.length : 0));
                parseDirect = decodeDynamicSource(htmlText, unpacker);
                if (parseDirect && parseDirect.indexOf('https') != -1) {
                    console.log('[RN-Fetch][CLOSELOAD-DECODE] ok dynamic');
                }
                else if (!packerScript) {
                    console.log('[RN-Fetch][CLOSELOAD-SKIP] no-packer-script idx=' + candidateIdx);
                    candidateIdx++;
                    return [3, 1];
                }
                else {
                    getKey = unpacker.match(/src\:([^\,]+)\,type\:/i);
                    getKey = getKey ? getKey[1] : '';
                    keyName = getKey.replace(/[\s'"]/g, '');
                    console.log('[RN-Fetch][CLOSELOAD-KEY] ' + keyName);
                    if (!keyName) {
                        console.log('[RN-Fetch][CLOSELOAD-SKIP] no-src-key idx=' + candidateIdx);
                        candidateIdx++;
                        return [3, 1];
                    }
                    varName = unpacker.match(new RegExp(keyName + '\\=[A-z0-9]+\\(([^\\)]*)\\)', 'i'));
                    varName = varName ? varName[1] : '';
                    try {
                        varName = JSON.parse(varName);
                    }
                    catch (parseErr) {
                        console.log('[RN-Fetch][CLOSELOAD-SKIP] json-parse-failed idx=' + candidateIdx);
                        candidateIdx++;
                        return [3, 1];
                    }
                    libs.log({ varName: varName }, provider, 'VarName_1');
                    decoders = [dc_08bClqn1Nt2, dc_o55npDX9dLL, dc_hDbCyi9R5V2, dc_o55npDX9dLL2, dc_o55npDX9dLL3, dc_AEtIE9ASRaK];
                    parseDirect = '';
                    for (_i = 0; _i < decoders.length; _i++) {
                        decoder = decoders[_i];
                        parseDirect = decoder(varName);
                        if (parseDirect && parseDirect.indexOf('https') != -1) {
                            console.log('[RN-Fetch][CLOSELOAD-DECODE] ok decoder=' + _i);
                            break;
                        }
                    }
                }
                libs.log({ parseDirect: parseDirect }, provider, 'ParseDirect');
                if (!parseDirect || parseDirect.indexOf('https') == -1) {
                    console.log('[RN-Fetch][CLOSELOAD-SKIP] decode-failed idx=' + candidateIdx);
                    candidateIdx++;
                    return [3, 1];
                }
                console.log('[RN-Fetch][CLOSELOAD-PLAY] ' + parseDirect.substring(0, 120));
                libs.embed_callback(parseDirect, provider, callbackHost, 'Hls', callback, 1, [], [{ file: parseDirect, quality: 1080 }], {
                    referer: activeUrl,
                    'user-agent': embedHeaders['user-agent'],
                }, {
                    type: 'm3u8',
                });
                return [3, 6];
            case 5:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, HOST, 'ERROR');
                console.log('[RN-Fetch][CLOSELOAD-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                candidateIdx++;
                return [3, 1];
            case 6: return [2];
        }
    });
}); };
hosts['closeload-embed'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var embedUrl, pageReferer, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        embedUrl = (config && config.embedUrl) ? config.embedUrl : String(url || '');
        pageReferer = (config && config.pageReferer) ? config.pageReferer : 'https://ridomovies.is/';
        headers = {
            referer: pageReferer,
            origin: 'https://ridomovies.is',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        };
        beforeLoadScript = buildCloseloadWebviewScript();
        console.log('[RN-Fetch][CLOSELOAD-EMBED-HOST] ' + embedUrl.substring(0, 140));
        try {
            callback({
                callback: {
                    provider: provider,
                    host: 'closeload-embed',
                    url: embedUrl,
                    headers: headers,
                    callback: callback,
                    userAgent: headers['user-agent'],
                    beforeLoadScript: beforeLoadScript,
                    metadata: {
                        embedUrl: embedUrl,
                        pageReferer: pageReferer,
                        movieInfo: movieInfo,
                    },
                },
            });
        }
        catch (e) {
            libs.log({ e: e }, 'closeload-embed', 'ERROR');
        }
        return [2];
    });
}); };
hosts['ridorapid'] = hosts['closeload'];
