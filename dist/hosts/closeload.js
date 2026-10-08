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
function extractCloseloadEmbedId(rawUrl) {
    if (!rawUrl) {
        return '';
    }
    var url = String(rawUrl);
    var videoMatch = url.match(/\/video\/embed\/([A-Za-z0-9]+)/i);
    if (videoMatch) {
        return videoMatch[1];
    }
    var legacyMatch = url.match(/\/embed-([A-Za-z0-9]+)/i);
    if (legacyMatch) {
        return legacyMatch[1];
    }
    return '';
}
function buildCloseloadImdbQuery(rawUrl) {
    var imdbMatch = String(rawUrl || '').match(/imdb_id=([^&]+)/i);
    return imdbMatch ? '?imdb_id=' + imdbMatch[1] : '';
}
function normalizeCloseloadEmbedUrl(rawUrl) {
    if (!rawUrl) {
        return '';
    }
    var embedId = extractCloseloadEmbedId(rawUrl);
    if (!embedId) {
        return String(rawUrl);
    }
    return 'https://closeload.top/video/embed/' + embedId + '/' + buildCloseloadImdbQuery(rawUrl);
}
function buildRidorapidEmbedUrl(rawUrl) {
    var embedId = extractCloseloadEmbedId(rawUrl);
    if (!embedId) {
        return '';
    }
    return 'https://ridorapid.closeload.top/embed-' + embedId + '/' + buildCloseloadImdbQuery(rawUrl);
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
    var base = raw || url;
    var embedId = extractCloseloadEmbedId(base);
    var query = buildCloseloadImdbQuery(base);
    pushCandidate(raw);
    if (url && url !== raw) {
        pushCandidate(url);
    }
    if (embedId) {
        pushCandidate('https://closeload.top/video/embed/' + embedId + '/' + query);
        pushCandidate('https://closeload.top/video/embed/' + embedId + '/');
        pushCandidate('https://closeload.top/video/embed/' + embedId);
        pushCandidate('https://closeload.top/embed-' + embedId + '/' + query);
        pushCandidate('https://ridorapid.closeload.top/video/embed/' + embedId + '/' + query);
        pushCandidate('https://ridorapid.closeload.top/embed-' + embedId + '/' + query);
    }
    pushCandidate(normalizeCloseloadEmbedUrl(base));
    pushCandidate(buildRidorapidEmbedUrl(base));
    return list;
}
function buildCloseloadWebviewPageUrl(embedUrl) {
    var base = String(embedUrl || '').split('#')[0];
    if (!base) {
        return '';
    }
    var sep = base.indexOf('?') >= 0 ? '&' : '?';
    return base + sep + '_wv=' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
}
function pickCloseloadWebviewUrl(rawUrl, config, candidates) {
    var pick = '';
    var idx = 0;
    for (idx = 0; idx < candidates.length; idx++) {
        if (candidates[idx].indexOf('closeload.top/video/embed') >= 0) {
            pick = candidates[idx];
            break;
        }
    }
    if (!pick) {
        for (idx = 0; idx < candidates.length; idx++) {
            if (candidates[idx].indexOf('closeload') >= 0) {
                pick = candidates[idx];
                break;
            }
        }
    }
    if (!pick) {
        pick = candidates.length ? candidates[0] : String(rawUrl || '');
    }
    return buildCloseloadWebviewPageUrl(pick);
}
function deriveOriginFromReferer(pageReferer) {
    var match = String(pageReferer || '').match(/^(https?:\/\/[^\/]+)/i);
    return match ? match[1] : 'https://closeload.top';
}
function buildCloseloadFetchHeaders(activeUrl, pageReferer) {
    var referer = pageReferer || 'https://closeload.top/';
    var origin = deriveOriginFromReferer(referer);
    if (activeUrl && activeUrl.indexOf('ridorapid') >= 0) {
        referer = activeUrl;
        origin = 'https://ridorapid.closeload.top';
    } else if (activeUrl && activeUrl.indexOf('closeload.top') >= 0) {
        // Prefer closeload embed itself as referer; parent ridomovie alone often 403s the CDN.
        referer = activeUrl || pageReferer || 'https://closeload.top/';
        origin = 'https://closeload.top';
    }
    return {
        'user-agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        referer: referer,
        Referer: referer,
        origin: origin,
        Origin: origin,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    };
}
function buildCloseloadPlayHeaders(activeUrl) {
    // CDN (/hls/*, playmix master.txt) checks closeload.top referrer stealth — use origin root, not ridomovie parent.
    var isRapid = !!(activeUrl && String(activeUrl).indexOf('ridorapid') >= 0);
    var origin = isRapid ? 'https://ridorapid.closeload.top' : 'https://closeload.top';
    var referer = origin + '/';
    return {
        'user-agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        referer: referer,
        Referer: referer,
        origin: origin,
        Origin: origin,
        Accept: 'application/vnd.apple.mpegurl,application/x-mpegURL,application/octet-stream,*/*',
    };
}
function normalizeCloseloadPlayUrl(file) {
    var url = String(file || '').replace(/&amp;/g, '&').replace(/\\\//g, '/').trim();
    if (!url || url.indexOf('http') !== 0) {
        return '';
    }
    // Do not append #.m3u8 — some Exo builds send the fragment in the request path → 404.
    return url;
}
function closeloadPlayType(file) {
    return 'm3u8';
}
function probeCloseloadStream(playUrl, headers) {
    return fetch(playUrl, {
        method: 'GET',
        headers: headers || {},
    }).then(function (response) {
        var status = response && response.status ? response.status : 0;
        try {
            if (response && typeof response.text === 'function') {
                response.text();
            }
        }
        catch (_e) { }
        return status;
    }).catch(function () {
        return 0;
    });
}
function extractCloseloadPlainStreamSkipContentUrl(htmlText) {
    if (!htmlText) {
        return '';
    }
    var text = String(htmlText);
    var match = text.match(/let\s+url\s*=\s*['"](https?:[^'"]+)/i);
    if (match && match[1]) {
        return match[1];
    }
    match = text.match(/https?:\/\/[^"'\\\s<>]*playmix[^"'\\\s<>]*\/master\.txt[^"'\\\s<>]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    match = text.match(/https?:\/\/[^"'\\\s<>]+\/master\.txt[^"'\\\s<>]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    match = text.match(/https?:\/\/[^"'\\\s<>]+\.m3u8[^"'\\\s<>]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    return '';
}
function isCloseloadCloudflareBlock(response, htmlText) {
    if (!htmlText) {
        return false;
    }
    if (htmlText.indexOf('eval(function(p,a,c,k,e,d)') >= 0) {
        return false;
    }
    if (htmlText.match(/let\s+url\s*=\s*['"]https/i)) {
        return false;
    }
    if (htmlText.match(/https?:[^"'\\s]+\.m3u8/i)) {
        return false;
    }
    if (response.status === 403 && (htmlText.indexOf('cloudflare') >= 0 || htmlText.indexOf('cf-browser-verification') >= 0 || htmlText.indexOf('Just a moment') >= 0)) {
        return true;
    }
    if (response.status === 403 && htmlText.length < 9000) {
        return true;
    }
    return false;
}
function isCloseloadHtmlUsable(response, htmlText) {
    if (!response || !htmlText || htmlText.length < 200) {
        return false;
    }
    if (isCloseloadCloudflareBlock(response, htmlText)) {
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
    if (htmlText.indexOf('master.txt') >= 0 || htmlText.indexOf('contentUrl') >= 0) {
        return true;
    }
    return false;
}
function extractCloseloadPlainStream(htmlText) {
    if (!htmlText) {
        return '';
    }
    var text = String(htmlText);
    var match = text.match(/"contentUrl"\s*:\s*"(https?:\\\/\\\/[^"]+)"/i);
    if (!match) {
        match = text.match(/"contentUrl"\s*:\s*"(https?:\/\/[^"]+)"/i);
    }
    if (match && match[1]) {
        return match[1].replace(/\\\//g, '/');
    }
    match = text.match(/https?:\/\/[^"'\\\s<>]*playmix[^"'\\\s<>]*\/master\.txt[^"'\\\s<>]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    match = text.match(/https?:\/\/[^"'\\\s<>]+\/master\.txt[^"'\\\s<>]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    match = text.match(/https?:\/\/[^"'\\\s<>]+\.m3u8[^"'\\\s<>]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    match = text.match(/let\s+url\s*=\s*['"](https?:[^'"]+)/i);
    if (match && match[1]) {
        return match[1];
    }
    return '';
}
function fetchCloseloadWithRetry(activeUrl, embedHeaders, maxAttempts) {
    maxAttempts = maxAttempts || 2;
    function attempt(n) {
        if (n >= maxAttempts) {
            return Promise.reject(new Error('closeload-fetch-exhausted'));
        }
        var delay = n === 0 ? 0 : (300 + n * 250);
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
            var msg = String(err && err.message ? err.message : err);
            if (msg.indexOf('closeload-fetch-exhausted') >= 0) {
                return Promise.reject(err);
            }
            console.log('[RN-Fetch][CLOSELOAD-RETRY-ERR] attempt=' + (n + 1) + ' ' + msg);
            if (n + 1 >= maxAttempts) {
                return Promise.reject(new Error('closeload-fetch-exhausted'));
            }
            return attempt(n + 1);
        });
    }
    return attempt(0);
}
function buildCloseloadWebviewScript(deadUrls) {
    var dead = Array.isArray(deadUrls) ? deadUrls : [];
    var deadJson = JSON.stringify(dead.map(function (u) {
        return String(u || '').split('#')[0].split('?')[0];
    }).filter(Boolean));
    return (
        "(function(){" +
        "if(window.__clBooted){return true;}" +
        "window.__clBooted=1;" +
        "var done=0,ticks=0,dead=" + deadJson + ";" +
        "function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}" +
        "function isDead(u){u=String(u||'').split('#')[0].split('?')[0];if(!u)return 1;for(var i=0;i<dead.length;i++){if(dead[i]&&(u===dead[i]||u.indexOf(dead[i])>=0||dead[i].indexOf(u)>=0))return 1;}return 0;}" +
        "function postUrl(u,src){if(done||!u||String(u).indexOf('http')!==0)return;u=String(u).replace(/&amp;/g,'&');if(isDead(u)){pm({step:'cl-skip-dead',url:String(u).substring(0,120),source:src||''});return;}done=1;pm({step:'cl-url',url:u,source:src||'net'});}" +
        "function hook(){if(window.__clHooked)return;window.__clHooked=1;" +
        "try{var fo=window.fetch;if(fo){window.fetch=function(a,b){var s=typeof a==='string'?a:(a&&a.url?a.url:'');return fo.apply(this,arguments).then(function(r){try{if(!done&&s&&(String(s).indexOf('m3u8')>=0||String(s).indexOf('master.txt')>=0||String(s).indexOf('playmix')>=0))postUrl(String(s),'fetch');}catch(e){}return r;});};}}" +
        "catch(e1){}" +
        "try{var XO=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){try{if(!done&&u&&(String(u).indexOf('m3u8')>=0||String(u).indexOf('master.txt')>=0||String(u).indexOf('playmix')>=0))postUrl(String(u),'xhr');}catch(e){}return XO.apply(this,arguments);};}" +
        "catch(e2){}" +
        "}" +
        "function scan(){if(done)return;try{var h=(document.documentElement&&document.documentElement.innerHTML)||'';" +
        "var m1=h.match(/let\\s+url\\s*=\\s*['\"](https?:[^'\"]+)/i);if(m1&&m1[1]){postUrl(m1[1],'let-url');return;}" +
        "var m4=h.match(/https?:\\/\\/[^\\s'\"<>]+\\.m3u8[^\\s'\"<>]*/i);if(m4){postUrl(m4[0],'m3u8');return;}" +
        "if(ticks<30)return;" +
        "var m2=h.match(/https?:\\/\\/[^\\s'\"<>]*playmix[^\\s'\"<>]*master\\.txt[^\\s'\"<>]*/i);if(m2){postUrl(m2[0],'playmix-late');return;}" +
        "}catch(e3){pm({step:'cl-scan-err',msg:String(e3&&e3.message?e3.message:e3)});}}" +
        "hook();" +
        "pm({step:'cl-boot',href:String(location.href||'')});" +
        "var iv=setInterval(function(){ticks++;scan();if(done||ticks>100)clearInterval(iv);},400);" +
        "})();true;"
    );
}
function buildCloseloadWebviewScripts(deadUrls) {
    var main = buildCloseloadWebviewScript(deadUrls);
    // cl-ping path is proven; run the same main script from beforeLoad too.
    var before = "(function(){try{window.ReactNativeWebView.postMessage(JSON.stringify({step:'cl-ping',href:String(location.href||'')}));}catch(e){}})();" + main;
    return {
        beforeLoadScript: before,
        script: main,
    };
}

function queueCloseloadWebview(embedUrl, movieInfo, provider, config, callback, candidates, deadUrls) {
    try {
        var pageReferer = config && config.pageReferer ? config.pageReferer : 'https://closeload.top/';
        var wvUrl = pickCloseloadWebviewUrl(embedUrl, config, candidates || [embedUrl]);
        if (!wvUrl) {
            console.log('[RN-Fetch][CLOSELOAD-WV-ERR] empty-embed-url');
            return;
        }
        var headers = buildCloseloadFetchHeaders(wvUrl, pageReferer);
        var deadList = [];
        var rawDead = deadUrls || (config && config.deadStreams) || [];
        for (var di = 0; di < rawDead.length; di++) {
            var du = normalizeCloseloadPlayUrl(rawDead[di]);
            if (du) {
                deadList.push(du);
            }
        }
        var wvScripts = buildCloseloadWebviewScripts(deadList);
        var payload = {
            callback: {
                provider: provider,
                host: 'closeload-embed',
                url: wvUrl,
                headers: headers,
                callback: callback,
                userAgent: headers['user-agent'],
                beforeLoadScript: wvScripts.beforeLoadScript,
                script: wvScripts.script,
                metadata: {
                    embedUrl: wvUrl,
                    embedUrlRaw: config && config.embedUrlRaw ? config.embedUrlRaw : wvUrl,
                    pageReferer: pageReferer,
                    movieInfo: movieInfo,
                    deadStreams: deadList,
                },
            },
        };
        console.log('[RN-Fetch][CLOSELOAD-WV] queue ' + String(wvUrl).substring(0, 120) + ' dead=' + deadList.length + ' provider=' + provider);
        var opened = false;
        var openNow = function (why) {
            if (opened) {
                console.log('[RN-Fetch][CLOSELOAD-WV-SKIP] already-opened why=' + why);
                return;
            }
            opened = true;
            console.log('[RN-Fetch][CLOSELOAD-WV] open why=' + why + ' url=' + String(wvUrl).substring(0, 80));
            try {
                if (typeof libs.__closeEmbedWebview === 'function') {
                    try {
                        libs.__closeEmbedWebview(callback, { url_webview: wvUrl });
                        console.log('[RN-Fetch][CLOSELOAD-WV] close-prev');
                    }
                    catch (eClose) { }
                }
            }
            catch (e0) { }
            setTimeout(function () {
                try {
                    callback(payload);
                    console.log('[RN-Fetch][CLOSELOAD-WV] payload-sent');
                }
                catch (eOpen) {
                    console.log('[RN-Fetch][CLOSELOAD-WV-ERR] open ' + String(eOpen && eOpen.message ? eOpen.message : eOpen));
                }
            }, 350);
        };
        // Wait until sync flush fully finishes, then delay — never open mid-flush / mid-I-handoff.
        var waitFlushThenOpen = function () {
            console.log('[RN-Fetch][CLOSELOAD-WV] wait-flush');
            var startedAt = Date.now();
            var iv = setInterval(function () {
                var bag = typeof libs.__getVodSyncBag === 'function' ? libs.__getVodSyncBag() : null;
                var flushed = !!(bag && bag.flushed);
                var releasing = !!libs.__vodSyncReleasing;
                var elapsed = Date.now() - startedAt;
                if (flushed && !releasing) {
                    clearInterval(iv);
                    console.log('[RN-Fetch][CLOSELOAD-WV] flush-seen elapsed=' + elapsed);
                    setTimeout(function () { openNow('after-flush'); }, 2000);
                    return;
                }
                if (elapsed > 32000) {
                    clearInterval(iv);
                    console.log('[RN-Fetch][CLOSELOAD-WV] wait-timeout');
                    openNow('timeout');
                }
            }, 400);
        };
        var bag0 = typeof libs.__getVodSyncBag === 'function' ? libs.__getVodSyncBag() : null;
        if (bag0 && bag0.flushed && !libs.__vodSyncReleasing) {
            console.log('[RN-Fetch][CLOSELOAD-WV] already-flushed');
            setTimeout(function () { openNow('already-flushed'); }, 2000);
            return;
        }
        waitFlushThenOpen();
    }
    catch (e) {
        console.log('[RN-Fetch][CLOSELOAD-WV-ERR] ' + String(e && e.message ? e.message : e));
    }
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
        var fileMatch = html.match(/sources:\s*\[\{\s*file:\s*([A-Za-z0-9_]+)/i);
        var keyName = fileMatch ? fileMatch[1] : '';
        if (!keyName && unpacked) {
            fileMatch = unpacked.match(/sources:\s*\[\{\s*file:\s*([A-Za-z0-9_]+)/i);
            keyName = fileMatch ? fileMatch[1] : '';
        }
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
    function resolveCloseloadSrcKey(htmlText, unpacker) {
        var match = null;
        if (unpacker) {
            match = unpacker.match(/src\s*:\s*([^,]+)\s*,\s*type\s*:/i);
            if (!match) {
                match = unpacker.match(/file\s*:\s*([A-Za-z0-9_]+)\s*,\s*type\s*:/i);
            }
        }
        if (!match && htmlText) {
            match = htmlText.match(/sources:\s*\[\{\s*file:\s*([A-Za-z0-9_]+)/i);
        }
        if (!match) {
            return '';
        }
        return String(match[1] || '').replace(/[\s'"]/g, '');
    }
    var DOMAIN, HOST, pageReferer, embedHeaders, response, htmlText, directUrl, packerScript, unpacker, getKey, keyName, varName, parseDirect, decoders, _i, decoder, callbackHost, e_1, urlCandidates, candidateIdx, activeUrl, fetchResult, playUrlCandidate, playHeaders, probeStatus, contentUrlRaw, deadStreams, wvOpened;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DOMAIN = 'https://closeload.top';
                HOST = 'closeload';
                pageReferer = config && config.pageReferer ? config.pageReferer : 'https://closeload.top/';
                callbackHost = provider === 'LRIDOMOVIE' ? provider : HOST;
                urlCandidates = buildCloseloadUrlCandidates(url, config);
                candidateIdx = 0;
                deadStreams = [];
                wvOpened = false;
                console.log('[RN-Fetch][CLOSELOAD-URL] ' + String(url).substring(0, 140));
                if (config && config.embedUrlRaw) {
                    console.log('[RN-Fetch][CLOSELOAD-RAW] ' + String(config.embedUrlRaw).substring(0, 140));
                }
                console.log('[RN-Fetch][CLOSELOAD-VERSION] v15-after-flush candidates=' + urlCandidates.length);
                _a.label = 1;
            case 1:
                if (candidateIdx >= urlCandidates.length) {
                    queueCloseloadWebview(url, movieInfo, provider, config, callback, urlCandidates, deadStreams);
                    return [2];
                }
                activeUrl = urlCandidates[candidateIdx];
                embedHeaders = buildCloseloadFetchHeaders(activeUrl, pageReferer);
                console.log('[RN-Fetch][CLOSELOAD-TRY] idx=' + candidateIdx + ' ' + activeUrl.substring(0, 120));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
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
                // Prefer packer decode over schema.org contentUrl (often a dead playmix path).
                directUrl = extractCloseloadPlainStreamSkipContentUrl(htmlText);
                contentUrlRaw = extractCloseloadPlainStream(htmlText);
                packerScript = extractPacker(htmlText);
                unpacker = packerScript ? libs.string_unpacker_v2(packerScript) : '';
                console.log('[RN-Fetch][CLOSELOAD-SCRIPT] len=' + (packerScript ? packerScript.length : 0) + ' plain=' + (directUrl ? 1 : 0) + ' contentUrl=' + (contentUrlRaw ? 1 : 0));
                parseDirect = decodeDynamicSource(htmlText, unpacker);
                if (parseDirect && parseDirect.indexOf('https') != -1) {
                    console.log('[RN-Fetch][CLOSELOAD-DECODE] ok dynamic');
                }
                else if (packerScript) {
                    keyName = resolveCloseloadSrcKey(htmlText, unpacker);
                    console.log('[RN-Fetch][CLOSELOAD-KEY] ' + keyName);
                    if (keyName) {
                        varName = unpacker.match(new RegExp(keyName + '\\=[A-z0-9]+\\(([^\\)]*)\\)', 'i'));
                        if (!varName) {
                            varName = htmlText.match(new RegExp(keyName + '\\s*=\\s*[A-z0-9_]+\\(([^\\)]*)\\)', 'i'));
                        }
                        varName = varName ? varName[1] : '';
                        try {
                            varName = JSON.parse(varName);
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
                        catch (parseErr) {
                            console.log('[RN-Fetch][CLOSELOAD-SKIP] json-parse-failed idx=' + candidateIdx);
                            parseDirect = '';
                        }
                    }
                }
                libs.log({ parseDirect: parseDirect }, provider, 'ParseDirect');
                playUrlCandidate = '';
                if (parseDirect && parseDirect.indexOf('https') != -1) {
                    playUrlCandidate = normalizeCloseloadPlayUrl(parseDirect);
                    console.log('[RN-Fetch][CLOSELOAD-PLAY] ' + playUrlCandidate.substring(0, 120));
                }
                else {
                    if (contentUrlRaw) {
                        console.log('[RN-Fetch][CLOSELOAD-CONTENTURL-SKIP] ' + String(contentUrlRaw).substring(0, 120));
                        deadStreams.push(normalizeCloseloadPlayUrl(contentUrlRaw));
                    }
                    if (directUrl) {
                        console.log('[RN-Fetch][CLOSELOAD-DIRECT-SKIP] ' + String(directUrl).substring(0, 120));
                        deadStreams.push(normalizeCloseloadPlayUrl(directUrl));
                    }
                    console.log('[RN-Fetch][CLOSELOAD-WV-EARLY] no-decode idx=' + candidateIdx);
                    if (!wvOpened) {
                        wvOpened = true;
                        queueCloseloadWebview(activeUrl || url, movieInfo, provider, config, callback, urlCandidates, deadStreams);
                    } else {
                        console.log('[RN-Fetch][CLOSELOAD-WV-SKIP] already-opened');
                    }
                    return [2];
                }
                playHeaders = buildCloseloadPlayHeaders(activeUrl);
                return [4, probeCloseloadStream(playUrlCandidate, playHeaders)];
            case 4:
                probeStatus = _a.sent();
                console.log('[RN-Fetch][CLOSELOAD-PROBE] status=' + probeStatus + ' url=' + String(playUrlCandidate).substring(0, 100));
                if (!(probeStatus >= 200 && probeStatus < 400)) {
                    console.log('[RN-Fetch][CLOSELOAD-PROBE-DEAD] idx=' + candidateIdx);
                    if (playUrlCandidate) {
                        deadStreams.push(playUrlCandidate);
                    }
                    console.log('[RN-Fetch][CLOSELOAD-WV-EARLY] probe-dead');
                    if (!wvOpened) {
                        wvOpened = true;
                        queueCloseloadWebview(activeUrl || url, movieInfo, provider, config, callback, urlCandidates, deadStreams);
                    }
                    return [2];
                }
                libs.embed_callback(playUrlCandidate, provider, callbackHost, 'Hls', callback, provider === 'LRIDOMOVIE' ? 0 : 1, [], [{ file: playUrlCandidate, quality: 1080 }], playHeaders, {
                    type: closeloadPlayType(playUrlCandidate),
                });
                return [2];
            case 5:
                e_1 = _a.sent();
                console.log('[RN-Fetch][CLOSELOAD-ERROR] idx=' + candidateIdx + ' ' + String(e_1 && e_1.message ? e_1.message : e_1));
                candidateIdx++;
                return [3, 1];
            case 6: return [2];
        }
    });
}); };

hosts['closeload-embed'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var embedUrl, pageReferer, headers, wvScripts;
    return __generator(this, function (_a) {
        embedUrl = (config && config.embedUrl) ? config.embedUrl : String(url || '');
        pageReferer = (config && config.pageReferer) ? config.pageReferer : 'https://closeload.top/';
        headers = buildCloseloadFetchHeaders(embedUrl, pageReferer);
        wvScripts = buildCloseloadWebviewScripts();
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
                    beforeLoadScript: wvScripts.beforeLoadScript,
                    script: wvScripts.script,
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
