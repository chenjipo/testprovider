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
var PROVIDER = 'RRiveStream';
var VERSION = 'v3-no-4k-ads';
var SCRAPPER_ORIGIN = 'https://scrapper.rivestream.app';
var SITE_ORIGIN = 'https://www.rivestream.app';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
// Skip vanguard/zephyr (4K HDR promo/ads). Keep 1080p/720p services only.
var PREFERRED_SERVICES = ['apogee', 'primevids', 'citadel', 'apollo', 'asiacloud'];
var MAX_DELIVER = 4;
var ALLOWED_QUALITIES = { 1080: true, 720: true };
var RIVE_SALT = ["4Z7lUo", "gwIVSMD", "PLmz2elE2v", "Z4OFV0", "SZ6RZq6Zc", "zhJEFYxrz8", "FOm7b0", "axHS3q4KDq", "o9zuXQ", "4Aebt", "wgjjWwKKx", "rY4VIxqSN", "kfjbnSo", "2DyrFA1M", "YUixDM9B", "JQvgEj0", "mcuFx6JIek", "eoTKe26gL", "qaI9EVO1rB", "0xl33btZL", "1fszuAU", "a7jnHzst6P", "wQuJkX", "cBNhTJlEOf", "KNcFWhDvgT", "XipDGjST", "PCZJlbHoyt", "2AYnMZkqd", "HIpJh", "KH0C3iztrG", "W81hjts92", "rJhAT", "NON7LKoMQ", "NMdY3nsKzI", "t4En5v", "Qq5cOQ9H", "Y9nwrp", "VX5FYVfsf", "cE5SJG", "x1vj1", "HegbLe", "zJ3nmt4OA", "gt7rxW57dq", "clIE9b", "jyJ9g", "B5jXjMCSx", "cOzZBZTV", "FTXGy", "Dfh1q1", "ny9jqZ2POI", "X2NnMn", "MBtoyD", "qz4Ilys7wB", "68lbOMye", "3YUJnmxp", "1fv5Imona", "PlfvvXD7mA", "ZarKfHCaPR", "owORnX", "dQP1YU", "dVdkx", "qgiK0E", "cx9wQ", "5F9bGa", "7UjkKrp", "Yvhrj", "wYXez5Dg3", "pG4GMU", "MwMAu", "rFRD5wlM"];
var TMDB_API_KEYS = (typeof libs !== 'undefined' && libs && libs.TMDB_API_KEYS) ? libs.TMDB_API_KEYS : [
    '4e44c9029b1270a41c75c666510b46f5',
    '4219e299c89411838049ab0dab19ebd5',
];
console.log('[RN-Fetch][RIVESTREAM-CFG] ' + VERSION + ' provider=' + PROVIDER);
function rriveBtoa(input) {
    if (typeof btoa === 'function') {
        return btoa(input);
    }
    if (libs && typeof libs.string_btoa === 'function') {
        return libs.string_btoa(input);
    }
    return input;
}
function rriveHashOne(input) {
    var e = String(input);
    var t = 0;
    for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        var i = ((t = (r + (t << 6) + (t << 16) - t) >>> 0) << (n % 5) | t >>> (32 - n % 5)) >>> 0;
        t ^= (i ^ (r << (n % 7) | r >>> (8 - n % 7))) >>> 0;
        t = (t + ((t >>> 11) ^ (t << 3))) >>> 0;
    }
    t ^= t >>> 15;
    t = ((65535 & t) * 49842 + (((t >>> 16) * 49842 & 65535) << 16)) >>> 0;
    t ^= t >>> 13;
    t = ((65535 & t) * 40503 + (((t >>> 16) * 40503 & 65535) << 16)) >>> 0;
    return rrivePad8((t ^= t >>> 16).toString(16));
}
function rrivePad8(hex) {
    var text = String(hex || '');
    while (text.length < 8) {
        text = '0' + text;
    }
    return text;
}
function rriveHashTwo(input) {
    var t = String(input);
    var n = 3735928559 ^ t.length;
    for (var e = 0; e < t.length; e++) {
        var r = t.charCodeAt(e);
        r ^= (131 * e + 89 ^ (r << (e % 5))) & 255;
        n = ((n << 7 | n >>> 25) >>> 0) ^ r;
        var i = (65535 & n) * 60205;
        var o = ((n >>> 16) * 60205) << 16;
        n = (i + o) >>> 0;
        n ^= n >>> 11;
    }
    n ^= n >>> 15;
    n = ((65535 & n) * 49842 + ((n >>> 16) * 49842 << 16)) >>> 0;
    n ^= n >>> 13;
    n = ((65535 & n) * 40503 + ((n >>> 16) * 40503 << 16)) >>> 0;
    n ^= n >>> 16;
    n = ((65535 & n) * 10196 + ((n >>> 16) * 10196 << 16)) >>> 0;
    return rrivePad8((n ^= n >>> 15).toString(16));
}
function rriveSecretKey(id) {
    if (id === undefined || id === null || id === '') {
        return 'rive';
    }
    try {
        var r = String(id);
        var salt = void 0;
        var insertAt = void 0;
        if (isNaN(Number(id))) {
            var sum = r.split('').reduce(function (acc, ch) { return acc + ch.charCodeAt(0); }, 0);
            salt = RIVE_SALT[sum % RIVE_SALT.length] || rriveBtoa(r);
            insertAt = Math.floor(sum % r.length / 2);
        }
        else {
            var num = Number(id);
            salt = RIVE_SALT[num % RIVE_SALT.length] || rriveBtoa(r);
            insertAt = Math.floor(num % r.length / 2);
        }
        var mixed = r.slice(0, insertAt) + salt + r.slice(insertAt);
        return rriveBtoa(rriveHashTwo(rriveHashOne(mixed)));
    }
    catch (e) {
        return 'topSecret';
    }
}
function rriveBuildApiHeaders() {
    return {
        'user-agent': USER_AGENT,
        accept: 'application/json',
        referer: SITE_ORIGIN + '/',
        Referer: SITE_ORIGIN + '/',
        origin: SITE_ORIGIN,
        Origin: SITE_ORIGIN,
    };
}
function rriveBuildPlayHeaders(fileUrl) {
    var headers = {
        'user-agent': USER_AGENT,
        accept: '*/*',
        referer: SITE_ORIGIN + '/',
        Referer: SITE_ORIGIN + '/',
    };
    var text = String(fileUrl || '');
    if (text.indexOf('valhallastream.com') >= 0) {
        headers.origin = 'https://proxy.valhallastream.com';
        headers.Origin = headers.origin;
        headers.referer = 'https://proxy.valhallastream.com/';
        headers.Referer = headers.referer;
    }
    var marker = 'headers=';
    var idx = text.indexOf(marker);
    if (idx >= 0) {
        try {
            var raw = text.substring(idx + marker.length);
            var amp = raw.indexOf('&');
            if (amp >= 0) {
                raw = raw.substring(0, amp);
            }
            var decoded = JSON.parse(decodeURIComponent(raw));
            if (decoded && typeof decoded === 'object') {
                if (decoded['User-Agent'] || decoded['user-agent']) {
                    headers['user-agent'] = decoded['User-Agent'] || decoded['user-agent'];
                }
                if (decoded.Referer || decoded.referer) {
                    headers.referer = decoded.Referer || decoded.referer;
                    headers.Referer = headers.referer;
                }
                if (decoded.Origin || decoded.origin) {
                    headers.origin = decoded.Origin || decoded.origin;
                    headers.Origin = headers.origin;
                }
            }
        }
        catch (e) {
        }
    }
    return headers;
}
function rriveNormalizeImdbNumeric(raw) {
    if (!raw) {
        return '';
    }
    return String(raw).replace(/^tt/i, '').trim();
}
function rriveNeedsTmdbResolve(movieInfo) {
    var rawTmdb = String(movieInfo && movieInfo.tmdb_id !== undefined && movieInfo.tmdb_id !== null ? movieInfo.tmdb_id : '');
    var imdbNumeric = rriveNormalizeImdbNumeric(movieInfo && movieInfo.imdb_id ? movieInfo.imdb_id : '');
    if (!rawTmdb) {
        return imdbNumeric ? 'tt' + imdbNumeric : '';
    }
    if (/^tt/i.test(rawTmdb)) {
        return 'tt' + rriveNormalizeImdbNumeric(rawTmdb);
    }
    if (imdbNumeric && rawTmdb === imdbNumeric) {
        return 'tt' + imdbNumeric;
    }
    return '';
}
function rriveGetCachedTmdbId(cacheKey) {
    var cache = libs.__rriveTmdbCache;
    if (cache && cache[cacheKey]) {
        return cache[cacheKey];
    }
    return '';
}
function rriveSetCachedTmdbId(cacheKey, tmdbId) {
    if (!libs.__rriveTmdbCache) {
        libs.__rriveTmdbCache = {};
    }
    libs.__rriveTmdbCache[cacheKey] = tmdbId;
}
function rriveResolveTmdbId(movieInfo) {
    return __awaiter(_this, void 0, void 0, function () {
        var imdbId, cacheKey, cached, keyIndex, apiKey, findUrl, findResult, resolved, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imdbId = rriveNeedsTmdbResolve(movieInfo);
                    if (!imdbId) {
                        return [2, String(movieInfo.tmdb_id || '')];
                    }
                    cacheKey = imdbId + '|' + String(movieInfo.type || 'movie');
                    cached = rriveGetCachedTmdbId(cacheKey);
                    if (cached) {
                        console.log('[RN-Fetch][RIVESTREAM-TMDB] source=cache imdb=' + imdbId + ' tmdb=' + cached);
                        return [2, cached];
                    }
                    keyIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!(keyIndex < TMDB_API_KEYS.length)) return [3, 6];
                    apiKey = TMDB_API_KEYS[keyIndex];
                    findUrl = 'https://api.themoviedb.org/3/find/' + encodeURIComponent(imdbId)
                        + '?external_source=imdb_id&api_key=' + encodeURIComponent(apiKey);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, libs.request_get(findUrl)];
                case 3:
                    findResult = _a.sent();
                    resolved = '';
                    if (movieInfo.type == 'tv' && findResult && findResult.tv_results && findResult.tv_results.length) {
                        resolved = String(findResult.tv_results[0].id);
                    }
                    else if (movieInfo.type != 'tv' && findResult && findResult.movie_results && findResult.movie_results.length) {
                        resolved = String(findResult.movie_results[0].id);
                    }
                    else if (findResult && findResult.tv_results && findResult.tv_results.length) {
                        resolved = String(findResult.tv_results[0].id);
                    }
                    else if (findResult && findResult.movie_results && findResult.movie_results.length) {
                        resolved = String(findResult.movie_results[0].id);
                    }
                    if (resolved) {
                        rriveSetCachedTmdbId(cacheKey, resolved);
                        console.log('[RN-Fetch][RIVESTREAM-TMDB] imdb=' + imdbId + ' tmdb=' + resolved);
                        return [2, resolved];
                    }
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log('[RN-Fetch][RIVESTREAM-TMDB-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                    return [3, 5];
                case 5:
                    keyIndex++;
                    return [3, 1];
                case 6:
                    console.log('[RN-Fetch][RIVESTREAM-TMDB] miss imdb=' + imdbId);
                    return [2, String(movieInfo.tmdb_id || '')];
            }
        });
    });
}
function rriveParseQuality(raw) {
    var text = String(raw || '').toLowerCase();
    if (text.indexOf('4k') >= 0 || text.indexOf('2160') >= 0) {
        return 2160;
    }
    if (text.indexOf('1080') >= 0) {
        return 1080;
    }
    if (text.indexOf('720') >= 0) {
        return 720;
    }
    if (text.indexOf('480') >= 0) {
        return 480;
    }
    if (text.indexOf('360') >= 0) {
        return 360;
    }
    return 1080;
}
function rriveBuildScrapperUrl(movieInfo, tmdbId, service) {
    var id = String(tmdbId || '').trim();
    if (!id || !service) {
        return '';
    }
    var url = SCRAPPER_ORIGIN + '/api/provider?provider=' + encodeURIComponent(service) + '&id=' + encodeURIComponent(id);
    if (movieInfo.type == 'tv') {
        url += '&season=' + encodeURIComponent(String(movieInfo.season || 1))
            + '&episode=' + encodeURIComponent(String(movieInfo.episode || 1));
    }
    if (service === 'primevids' || service === 'citadel') {
        url += '&cb=' + String(Math.floor(Date.now() / 3000000));
    }
    return url;
}
function rriveBuildProxyUrl(movieInfo, tmdbId, service) {
    var id = String(tmdbId || '').trim();
    if (!id || !service) {
        return '';
    }
    var requestID = movieInfo.type == 'tv' ? 'tvVideoProvider' : 'movieVideoProvider';
    var url = SITE_ORIGIN + '/api/backendfetch?requestID=' + requestID
        + '&id=' + encodeURIComponent(id)
        + '&service=' + encodeURIComponent(service)
        + '&secretKey=' + encodeURIComponent(rriveSecretKey(id))
        + '&proxyMode=noProxy';
    if (movieInfo.type == 'tv') {
        url += '&season=' + encodeURIComponent(String(movieInfo.season || 1))
            + '&episode=' + encodeURIComponent(String(movieInfo.episode || 1));
    }
    return url;
}
function rriveIsAllowedQuality(quality) {
    return !!ALLOWED_QUALITIES[quality];
}
function rriveExtractSources(payload, service) {
    var data = payload && payload.data ? payload.data : payload;
    var sources = data && data.sources ? data.sources : [];
    if (!sources || !sources.length) {
        return [];
    }
    var out = [];
    for (var i = 0; i < sources.length; i++) {
        var item = sources[i];
        if (!item || !item.url) {
            continue;
        }
        var file = String(item.url).trim();
        if (!file || file.indexOf('http') !== 0) {
            continue;
        }
        var qualityLabel = String(item.quality || item.source || '');
        var quality = rriveParseQuality(qualityLabel);
        if (!rriveIsAllowedQuality(quality)) {
            console.log('[RN-Fetch][RIVESTREAM-FILTER] drop q=' + quality + ' service=' + service + ' label=' + qualityLabel);
            continue;
        }
        out.push({
            file: file,
            quality: quality,
            label: String(item.source || item.quality || service),
            service: service,
            format: String(item.format || 'hls').toLowerCase(),
        });
    }
    return out;
}
function rriveNormalizePayload(payload) {
    if (!payload) {
        return null;
    }
    if (typeof payload === 'string') {
        try {
            return JSON.parse(payload);
        }
        catch (e) {
            return null;
        }
    }
    return payload;
}
function rriveFetchService(movieInfo, tmdbId, service) {
    return __awaiter(_this, void 0, void 0, function () {
        var urls, ui, payload, sources, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urls = [
                        rriveBuildScrapperUrl(movieInfo, tmdbId, service),
                        rriveBuildProxyUrl(movieInfo, tmdbId, service),
                    ];
                    ui = 0;
                    _a.label = 1;
                case 1:
                    if (!(ui < urls.length)) return [3, 6];
                    if (!urls[ui]) {
                        return [3, 5];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, libs.request_get(urls[ui], rriveBuildApiHeaders(), false, true, 1)];
                case 3:
                    payload = rriveNormalizePayload(_a.sent());
                    sources = rriveExtractSources(payload, service);
                    if (sources.length) {
                        console.log('[RN-Fetch][RIVESTREAM-SVC-OK] service=' + service + ' n=' + sources.length + ' via=' + (ui === 0 ? 'scrapper' : 'proxy'));
                        return [2, sources];
                    }
                    return [3, 5];
                case 4:
                    e_2 = _a.sent();
                    console.log('[RN-Fetch][RIVESTREAM-SVC-ERR] service=' + service + ' via=' + (ui === 0 ? 'scrapper' : 'proxy') + ' ' + String(e_2 && e_2.message ? e_2.message : e_2));
                    return [3, 5];
                case 5:
                    ui++;
                    return [3, 1];
                case 6: return [2, []];
            }
        });
    });
}
function rrivePickBestSource(sources) {
    if (!sources || !sources.length) {
        return null;
    }
    var best = null;
    for (var i = 0; i < sources.length; i++) {
        var item = sources[i];
        if (!item || !rriveIsAllowedQuality(item.quality)) {
            continue;
        }
        if (!best || item.quality > best.quality) {
            best = item;
        }
    }
    return best;
}
function rriveDeliver(playable, rank, callback) {
    var headers = rriveBuildPlayHeaders(playable.file);
    var streamType = playable.format === 'mp4' ? 'mp4' : 'm3u8';
    console.log('[RN-Fetch][RIVESTREAM-PLAY] rank=' + rank + ' service=' + playable.service + ' q=' + playable.quality + ' label=Server R' + (rank || '') + ' file=' + playable.file.substring(0, 140));
    libs.embed_callback(playable.file, PROVIDER, PROVIDER, 'Hls', callback, rank, [], [{ file: playable.file, quality: playable.quality }], headers, { type: streamType });
}
source.getResource = function (movieInfo, config, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var tmdbId, delivered, seen, tasks, settled, si, sources, best, rank, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('[RN-Fetch][RIVESTREAM-VERSION] ' + VERSION);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4, rriveResolveTmdbId(movieInfo)];
                case 2:
                    tmdbId = _a.sent();
                    if (!tmdbId) {
                        console.log('[RN-Fetch][RIVESTREAM-SKIP] tmdb-missing');
                        return [2];
                    }
                    console.log('[RN-Fetch][RIVESTREAM-START] tmdb=' + tmdbId + ' type=' + String(movieInfo.type || 'movie')
                        + ' season=' + String(movieInfo.season || '') + ' episode=' + String(movieInfo.episode || ''));
                    delivered = 0;
                    seen = {};
                    tasks = PREFERRED_SERVICES.map(function (service) {
                        return rriveFetchService(movieInfo, tmdbId, service);
                    });
                    return [4, Promise.all(tasks)];
                case 3:
                    settled = _a.sent();
                    for (si = 0; si < settled.length && delivered < MAX_DELIVER; si++) {
                        sources = settled[si] || [];
                        best = rrivePickBestSource(sources);
                        if (!best || seen[best.file]) {
                            continue;
                        }
                        seen[best.file] = true;
                        rank = delivered === 0 ? 0 : delivered;
                        rriveDeliver(best, rank, callback);
                        delivered++;
                    }
                    if (!delivered) {
                        console.log('[RN-Fetch][RIVESTREAM-SKIP] no-stream tmdb=' + tmdbId);
                        return [2];
                    }
                    console.log('[RN-Fetch][RIVESTREAM-DONE] delivered=' + delivered);
                    return [2, true];
                case 4:
                    e_3 = _a.sent();
                    libs.log({ e: e_3 }, PROVIDER, 'ERROR');
                    console.log('[RN-Fetch][RIVESTREAM-ERROR] ' + String(e_3 && e_3.message ? e_3.message : e_3));
                    return [2];
                case 5: return [2];
            }
        });
    });
};
