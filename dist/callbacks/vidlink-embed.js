var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
function parseM3U8(content, baseOrigin) {
    var lines = content.split('\n').filter(function (line) { return line.trim() !== ''; });
    var result = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXT-X-STREAM-INF:')) {
            var resolutionMatch = lines[i].match(/RESOLUTION=(\d+)x(\d+)/);
            if (resolutionMatch && lines[i + 1]) {
                var quality = parseInt(resolutionMatch[2]);
                var file = lines[i + 1].trim();
                if (!file || file.charAt(0) === '#') {
                    continue;
                }
                if (file.indexOf('.m3u8') == -1) {
                    file += '.m3u8';
                }
                if (file.indexOf('https://') == -1 && file.indexOf('http://') == -1) {
                    if (file.charAt(0) === '/' && baseOrigin) {
                        file = baseOrigin + file;
                    }
                    else if (baseOrigin) {
                        file = baseOrigin + '/' + file;
                    }
                    else {
                        continue;
                    }
                }
                result.push({ file: file, quality: quality });
            }
            i++;
        }
    }
    return result;
}
function getStormBaseOrigin(directUrl) {
    var match = directUrl.match(/^(https?:\/\/[^/]+)/);
    return match ? match[1] : 'https://storm.vodvidl.site';
}
function stormPlaylistDedupeKey(playlistUrl) {
    if (!playlistUrl) {
        return '';
    }
    var qIdx = playlistUrl.indexOf('?');
    return qIdx >= 0 ? playlistUrl.substring(0, qIdx) : playlistUrl;
}
function buildStormQualitiesFromMasterUrl(masterUrl) {
    if (masterUrl.indexOf('/playlist.m3u8') < 0) {
        return [];
    }
    var queryString = '';
    var qIdx = masterUrl.indexOf('?');
    if (qIdx >= 0) {
        queryString = masterUrl.substring(qIdx);
    }
    var basePath = qIdx >= 0 ? masterUrl.substring(0, qIdx) : masterUrl;
    basePath = basePath.replace('/playlist.m3u8', '');
    var variants = [
        { quality: 1080, suffix: '/1080/index.m3u8' },
        { quality: 720, suffix: '/720/index.m3u8' },
        { quality: 360, suffix: '/360/index.m3u8' },
    ];
    var result = [];
    for (var i = 0; i < variants.length; i++) {
        result.push({
            file: basePath + variants[i].suffix + queryString,
            quality: variants[i].quality,
        });
    }
    return result;
}
function getVidlinkEmbedDoneMap() {
    if (typeof global !== 'undefined') {
        if (!global.__vidlinkEmbedDone) {
            global.__vidlinkEmbedDone = {};
        }
        return global.__vidlinkEmbedDone;
    }
    return {};
}
function buildHeaderDirect() {
    return {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'Referer': 'https://vidlink.pro/',
        'Origin': 'https://vidlink.pro',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
    };
}
function normalizeStreamHeaders(headersObj, headerDirect) {
    var out = __assign({}, headerDirect);
    var keys = Object.keys(headersObj || {});
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var lower = key.toLowerCase();
        if (lower === 'referer') {
            out['Referer'] = headersObj[key];
        }
        else if (lower === 'origin') {
            out['Origin'] = headersObj[key];
        }
        else {
            out[key] = headersObj[key];
        }
    }
    return out;
}
function parseProxyQueryParams(directUrl) {
    var qIndex = directUrl.indexOf('?');
    if (qIndex < 0) {
        return { headersObj: {}, host: '', tailQuery: '' };
    }
    var queryParams = directUrl.substring(qIndex + 1);
    var headersObj = {};
    var host = '';
    var tailParams = [];
    var params = queryParams.split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (param.indexOf('headers=') === 0) {
            var rawHeaders = param.substring('headers='.length);
            try {
                headersObj = JSON.parse(decodeURIComponent(rawHeaders));
            }
            catch (e1) {
                headersObj = JSON.parse(rawHeaders);
            }
        }
        else if (param.indexOf('host=') === 0) {
            host = decodeURIComponent(param.substring('host='.length));
        }
        else {
            tailParams.push(param);
        }
    }
    return {
        headersObj: headersObj,
        host: host,
        tailQuery: tailParams.length ? tailParams.join('&') : '',
    };
}
function isStormProxyUrl(directUrl) {
    return directUrl.indexOf('vodvidl.site') >= 0;
}
function transformProxyUrl(directUrl, headerDirect) {
    if (directUrl.indexOf('/proxy/') < 0) {
        return { directUrl: directUrl, headerDirect: headerDirect };
    }
    try {
        var parsed = parseProxyQueryParams(directUrl);
        var nextHeaders = normalizeStreamHeaders(parsed.headersObj, headerDirect);
        if (isStormProxyUrl(directUrl)) {
            var stormHeaders = buildHeaderDirect();
            libs.log({ directUrl: directUrl, headerDirect: stormHeaders }, 'MVidlink', 'PROXY STORM KEEP');
            console.log('[RN-Fetch][VIDLINK-PROXY] keep storm referer=' + (stormHeaders['Referer'] || ''));
            return { directUrl: directUrl, headerDirect: stormHeaders };
        }
        if (parsed.host && Object.keys(parsed.headersObj).length > 0) {
            var proxyIdx = directUrl.indexOf('/proxy/');
            var pathPart = directUrl.substring(proxyIdx + '/proxy/'.length);
            var qIdx = pathPart.indexOf('?');
            var encodedPath = qIdx >= 0 ? pathPart.substring(0, qIdx) : pathPart;
            var decodedPath = decodeURIComponent(encodedPath);
            var nextUrl = parsed.host.replace(/\/$/, '') + '/' + decodedPath.replace(/^\//, '');
            if (parsed.tailQuery) {
                nextUrl += '?' + parsed.tailQuery;
            }
            libs.log({ proxyFrom: directUrl, proxyTo: nextUrl, headerDirect: nextHeaders }, 'MVidlink', 'PROXY UNWRAP');
            return { directUrl: nextUrl, headerDirect: nextHeaders };
        }
        if (Object.keys(parsed.headersObj).length > 0) {
            libs.log({ directUrl: directUrl, headerDirect: nextHeaders }, 'MVidlink', 'PROXY HEADERS ONLY');
            return { directUrl: directUrl, headerDirect: nextHeaders };
        }
    }
    catch (error) {
        libs.log({ error: error }, 'MVidlink', 'ERROR PARSING PROXY URL');
    }
    return { directUrl: directUrl, headerDirect: headerDirect };
}
function parseTracks(captions) {
    var tracks = [];
    if (!captions || !captions.length) {
        return tracks;
    }
    for (var i = 0; i < captions.length; i++) {
        var item = captions[i];
        var type = '';
        if (item.url.indexOf('.srt') == -1 && item.url.indexOf('.vtt') == -1) {
            type = 'download';
        }
        tracks.push({
            file: item.url,
            kind: 'captions',
            label: item.language,
            type: type,
        });
    }
    return tracks;
}
function finishEmbed(file, provider, callback, tracks, qualities, headerDirect, metadata) {
    var playKey = stormPlaylistDedupeKey(file) || String(file).substring(0, 160);
    if (!global.__vidlinkPlayed) {
        global.__vidlinkPlayed = {};
    }
    if (global.__vidlinkPlayed[playKey]) {
        return;
    }
    global.__vidlinkPlayed[playKey] = true;
    console.log('[RN-Fetch][VIDLINK-PLAY] url=' + String(file).substring(0, 140) + ' referer=' + (headerDirect['Referer'] || ''));
    libs.embed_callback(file, provider, provider, 'Hls', callback, 1, tracks, qualities, headerDirect, {
        type: 'm3u8',
        is_end_webview: true,
        url_webview: metadata && metadata.url_webview ? metadata.url_webview : '',
    });
}
function processVidlinkStream(parseSearch, provider, callback, metadata) { return __awaiter(_this, void 0, void 0, function () {
    var headerDirect, directUrl, tracks, directQuality, qualityIndex, q, qualityItem, parseDirecturl, transformed, stormBase, stormQualities, parseDirectSize, textDirect, m3u8Data, directQualitySorted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!parseSearch || !parseSearch.stream) {
                    return [2];
                }
                headerDirect = buildHeaderDirect();
                directUrl = parseSearch.stream.playlist;
                tracks = parseTracks(parseSearch.stream.captions);
                if (!directUrl) {
                    if (parseSearch.stream.qualities) {
                        directQuality = [];
                        for (qualityIndex in parseSearch.stream.qualities) {
                            q = Number(qualityIndex);
                            qualityItem = parseSearch.stream.qualities[qualityIndex];
                            if (!qualityItem.url) {
                                continue;
                            }
                            directQuality.push({ file: qualityItem.url, quality: q });
                        }
                        if (!directQuality.length) {
                            return [2];
                        }
                        directQuality = _.orderBy(directQuality, ['quality'], ['desc']);
                        finishEmbed(directQuality[0].file, provider, callback, tracks, directQuality, headerDirect, metadata);
                        return [2];
                    }
                    return [2];
                }
                parseDirecturl = directUrl.split('m3u8/{');
                if (parseDirecturl.length > 1) {
                    directUrl = parseDirecturl[0] + 'm3u8';
                    headerDirect = __assign(__assign({}, JSON.parse('{' + parseDirecturl[1])), { 'User-Agent': headerDirect['User-Agent'] });
                }
                transformed = transformProxyUrl(directUrl, headerDirect);
                directUrl = transformed.directUrl;
                headerDirect = transformed.headerDirect;
                libs.log({ directUrl: directUrl, headerDirect: headerDirect }, provider, 'DIRECT URL DATA');
                stormBase = isStormProxyUrl(directUrl) ? getStormBaseOrigin(directUrl) : '';
                if (isStormProxyUrl(directUrl) && directUrl.indexOf('/playlist.m3u8') >= 0) {
                    stormQualities = buildStormQualitiesFromMasterUrl(directUrl);
                    if (stormQualities.length) {
                        directQualitySorted = _.orderBy(stormQualities, ['quality'], ['desc']);
                        console.log('[RN-Fetch][VIDLINK-M3U8] derived=' + stormQualities.length + ' best=' + directQualitySorted[0].quality);
                        finishEmbed(directQualitySorted[0].file, provider, callback, tracks, directQualitySorted, headerDirect, metadata);
                        return [2];
                    }
                }
                if (isStormProxyUrl(directUrl)) {
                    finishEmbed(directUrl, provider, callback, tracks, [{ file: directUrl, quality: 1080 }], headerDirect, metadata);
                    return [2];
                }
                if (directUrl.indexOf('/proxy/') >= 0) {
                    finishEmbed(directUrl, provider, callback, tracks, [{ file: directUrl, quality: 1080 }], headerDirect, metadata);
                    return [2];
                }
                return [4, fetch(directUrl)];
            case 1:
                parseDirectSize = _a.sent();
                if (typeof parseDirectSize === 'string') {
                    textDirect = parseDirectSize;
                    return [3, 3];
                }
                return [4, parseDirectSize.text()];
            case 2:
                textDirect = _a.sent();
                _a.label = 3;
            case 3:
                m3u8Data = parseM3U8(textDirect, stormBase);
                libs.log({ m3u8Data: m3u8Data }, provider, 'PARSE M3U8');
                if (m3u8Data.length) {
                    directQualitySorted = _.orderBy(m3u8Data, ['quality'], ['desc']);
                    console.log('[RN-Fetch][VIDLINK-M3U8] fetched=' + m3u8Data.length + ' best=' + directQualitySorted[0].quality);
                    finishEmbed(directQualitySorted[0].file, provider, callback, tracks, directQualitySorted, headerDirect, metadata);
                    return [2];
                }
                stormQualities = buildStormQualitiesFromMasterUrl(directUrl);
                if (stormQualities.length) {
                    directQualitySorted = _.orderBy(stormQualities, ['quality'], ['desc']);
                    console.log('[RN-Fetch][VIDLINK-M3U8] derived=' + stormQualities.length + ' best=' + directQualitySorted[0].quality);
                    finishEmbed(directQualitySorted[0].file, provider, callback, tracks, directQualitySorted, headerDirect, metadata);
                    return [2];
                }
                finishEmbed(directUrl, provider, callback, tracks, [{ file: directUrl, quality: 1080 }], headerDirect, metadata);
                return [2];
        }
    });
}); }
callbacksEmbed['vidlink-embed'] = function (dataCallback, provider, host, callback, metadata) { return __awaiter(_this, void 0, void 0, function () {
    var data, parseSearch, dedupeKey, embedDone, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!dataCallback) {
                    return [2];
                }
                data = JSON.parse(dataCallback);
                if (data.responseURL && data.responseURL.indexOf('cdn-cgi/rum') != -1) {
                    return [2];
                }
                if (data.step) {
                    console.log('[RN-Fetch][VIDLINK-EMBED-STEP] ' + data.step + (data.url ? ' url=' + String(data.url).substring(0, 120) : '') + (data.token ? ' token=' + String(data.token).substring(0, 40) : '') + (data.error ? ' err=' + data.error : '') + (data.getAdv ? ' getAdv=' + data.getAdv : '') + (data.sodium ? ' sodium=' + data.sodium : ''));
                    return [2];
                }
                if (data.error) {
                    console.log('[RN-Fetch][VIDLINK-EMBED-ERR] ' + data.error);
                    return [2];
                }
                if (!(data.responseURL && data.responseURL.indexOf('/api/b/') != -1 && data.responseText && data.responseText.charAt(0) === '{')) return [3, 2];
                parseSearch = JSON.parse(data.responseText);
                dedupeKey = stormPlaylistDedupeKey(parseSearch && parseSearch.stream && parseSearch.stream.playlist ? parseSearch.stream.playlist : '');
                embedDone = getVidlinkEmbedDoneMap();
                if (!dedupeKey || embedDone[dedupeKey]) {
                    return [2];
                }
                embedDone[dedupeKey] = true;
                libs.log({ parseSearch: parseSearch }, provider, 'PARSE SEARCH');
                return [4, processVidlinkStream(parseSearch, provider, callback, metadata)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [3, 4];
            case 3:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, provider, 'VIDLINK EMBED CB ERR');
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
