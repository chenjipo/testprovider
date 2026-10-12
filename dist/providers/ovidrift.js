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
var PROVIDER = 'OVidrift';
var VERSION = 'v4-libresub';
var EMBED_ORIGIN = 'https://embed.vidrift.net';
var LIBRE_SUBS_ORIGIN = 'https://libre-subs.fifthwit.net';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36';
var MAX_REPORT_QUALITY = 1080;
var SUB_LANGS = [
    { id: 'en', name: 'English' },
    { id: 'zh', name: 'Chinese' },
    { id: 'cn', name: 'Chinese' },
    { id: 'es', name: 'Spanish' },
    { id: 'ar', name: 'Arabic' },
];
var TMDB_API_KEYS = libs.TMDB_API_KEYS || [
    '4e44c9029b1270a41c75c666510b46f5',
    '4219e299c89411838049ab0dab19ebd5',
];
function ovidriftBuildHeaders(referer) {
    var ref = referer || (EMBED_ORIGIN + '/');
    return {
        'user-agent': USER_AGENT,
        accept: '*/*',
        referer: ref,
        Referer: ref,
        origin: EMBED_ORIGIN,
        Origin: EMBED_ORIGIN,
    };
}
function ovidriftNormalizeImdbNumeric(raw) {
    if (!raw) {
        return '';
    }
    return String(raw).replace(/^tt/i, '').trim();
}
function ovidriftNeedsTmdbResolve(movieInfo) {
    var rawTmdb = String(movieInfo && movieInfo.tmdb_id !== undefined && movieInfo.tmdb_id !== null ? movieInfo.tmdb_id : '');
    var imdbNumeric = ovidriftNormalizeImdbNumeric(movieInfo && movieInfo.imdb_id ? movieInfo.imdb_id : '');
    if (!rawTmdb) {
        return imdbNumeric ? 'tt' + imdbNumeric : '';
    }
    if (/^tt/i.test(rawTmdb)) {
        return 'tt' + ovidriftNormalizeImdbNumeric(rawTmdb);
    }
    if (imdbNumeric && rawTmdb === imdbNumeric) {
        return 'tt' + imdbNumeric;
    }
    return '';
}
function ovidriftGetCachedTmdbId(cacheKey) {
    var cache = libs.__ovidriftTmdbCache;
    if (cache && cache[cacheKey]) {
        return cache[cacheKey];
    }
    return '';
}
function ovidriftSetCachedTmdbId(cacheKey, tmdbId) {
    if (!libs.__ovidriftTmdbCache) {
        libs.__ovidriftTmdbCache = {};
    }
    libs.__ovidriftTmdbCache[cacheKey] = tmdbId;
}
function ovidriftResolveTmdbId(movieInfo) {
    return __awaiter(_this, void 0, void 0, function () {
        var imdbId, cacheKey, cached, keyIndex, apiKey, findUrl, findResult, resolved, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imdbId = ovidriftNeedsTmdbResolve(movieInfo);
                    if (!imdbId) {
                        return [2, String(movieInfo.tmdb_id || '')];
                    }
                    cacheKey = imdbId + '|' + String(movieInfo.type || 'movie');
                    cached = ovidriftGetCachedTmdbId(cacheKey);
                    if (cached) {
                        console.log('[RN-Fetch][OVIDRIFT-TMDB] source=cache imdb=' + imdbId + ' tmdb=' + cached);
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
                        ovidriftSetCachedTmdbId(cacheKey, resolved);
                        console.log('[RN-Fetch][OVIDRIFT-TMDB] imdb=' + imdbId + ' tmdb=' + resolved);
                        return [2, resolved];
                    }
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log('[RN-Fetch][OVIDRIFT-TMDB-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                    return [3, 5];
                case 5:
                    keyIndex++;
                    return [3, 1];
                case 6:
                    console.log('[RN-Fetch][OVIDRIFT-TMDB] miss imdb=' + imdbId);
                    return [2, String(movieInfo.tmdb_id || '')];
            }
        });
    });
}
function ovidriftBuildEmbedUrl(movieInfo, tmdbId) {
    var id = String(tmdbId || '').trim();
    if (!id) {
        return '';
    }
    if (movieInfo.type == 'tv') {
        var season = movieInfo.season || 1;
        var episode = movieInfo.episode || 1;
        return EMBED_ORIGIN + '/embed/tv/' + id + '/' + season + '/' + episode;
    }
    return EMBED_ORIGIN + '/embed/movie/' + id;
}
function ovidriftParseEmbedMeta(html) {
    var source = String(html || '');
    var match = source.match(/embedMeta\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/i);
    if (!match || !match[1]) {
        return null;
    }
    try {
        return JSON.parse(match[1]);
    }
    catch (e) {
        return null;
    }
}
function ovidriftPickOrionStream(streams) {
    if (!streams || !streams.length) {
        return null;
    }
    var i;
    for (i = 0; i < streams.length; i++) {
        var item = streams[i];
        if (item && item.direct !== false && item.url && /original/i.test(String(item.name || ''))) {
            return item;
        }
    }
    for (i = 0; i < streams.length; i++) {
        var fallback = streams[i];
        if (fallback && fallback.direct !== false && fallback.url) {
            return fallback;
        }
    }
    return null;
}
function ovidriftAbsoluteUrl(pathOrUrl, baseUrl) {
    var value = String(pathOrUrl || '').trim();
    if (!value) {
        return '';
    }
    if (/^https?:\/\//i.test(value)) {
        return value;
    }
    if (value.charAt(0) === '/') {
        return EMBED_ORIGIN + value;
    }
    try {
        return new URL(value, baseUrl || (EMBED_ORIGIN + '/')).href;
    }
    catch (e) {
        return '';
    }
}
function ovidriftQualityFromRungs(rungs) {
    if (!rungs || !rungs.length) {
        return 1080;
    }
    var best = 0;
    for (var i = 0; i < rungs.length; i++) {
        var height = Number(rungs[i] && (rungs[i].height || rungs[i]) || 0);
        if (height > MAX_REPORT_QUALITY) {
            continue;
        }
        if (height > best) {
            best = height;
        }
    }
    if (!best) {
        for (var j = 0; j < rungs.length; j++) {
            var raw = Number(rungs[j] && (rungs[j].height || rungs[j]) || 0);
            if (raw > best) {
                best = raw;
            }
        }
    }
    if (!best) {
        return 1080;
    }
    return best > MAX_REPORT_QUALITY ? MAX_REPORT_QUALITY : best;
}
function ovidriftPickSubFile(item) {
    if (!item) {
        return '';
    }
    var file = item.file || item.url || item.src || item.path || '';
    return String(file || '').trim();
}
function ovidriftPickSubLabel(item) {
    if (!item) {
        return 'sub';
    }
    return String(item.label || item.language || item.lang || item.name || 'sub').trim() || 'sub';
}
function ovidriftExtractMetaSubs(meta) {
    var tracks = [];
    if (!meta) {
        return tracks;
    }
    var lists = [meta.subtitles, meta.captions, meta.tracks, meta.subs, meta.subtitleTracks];
    for (var li = 0; li < lists.length; li++) {
        var list = lists[li];
        if (!list || !list.length) {
            continue;
        }
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var file = ovidriftAbsoluteUrl(ovidriftPickSubFile(item), EMBED_ORIGIN + '/');
            if (!file || file.indexOf('http') !== 0) {
                continue;
            }
            tracks.push({
                file: file,
                label: ovidriftPickSubLabel(item),
                kind: item.kind || 'captions',
            });
        }
    }
    return tracks;
}
function ovidriftBuildLibreSubsUrl(movieInfo, tmdbId, langId) {
    var id = String(tmdbId || '').trim();
    if (!id) {
        return '';
    }
    var url = LIBRE_SUBS_ORIGIN + '/search?id=' + encodeURIComponent(id) + '&language=' + encodeURIComponent(langId);
    if (movieInfo.type == 'tv') {
        url += '&season=' + encodeURIComponent(String(movieInfo.season || 1))
            + '&episode=' + encodeURIComponent(String(movieInfo.episode || 1));
    }
    return url;
}
function ovidriftNormalizeLibreSubs(payload, fallbackLabel) {
    var tracks = [];
    var list = payload;
    if (!list) {
        return tracks;
    }
    if (!list.length && payload.data) {
        list = payload.data;
    }
    if (!list || !list.length) {
        return tracks;
    }
    for (var i = 0; i < list.length && tracks.length < 3; i++) {
        var item = list[i];
        var file = ovidriftPickSubFile(item) || String(item.url || '');
        if (!file || file.indexOf('http') !== 0) {
            continue;
        }
        if (file.indexOf('opensubtitles') >= 0) {
            continue;
        }
        tracks.push({
            file: file,
            label: String(item.display || item.label || fallbackLabel || 'sub'),
            kind: 'captions',
        });
    }
    return tracks;
}
function ovidriftFetchExternalSubs(movieInfo, tmdbId) {
    return __awaiter(_this, void 0, void 0, function () {
        var tracks, seen, li, lang, url, payload, part, pi, e_subs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tracks = [];
                    seen = {};
                    li = 0;
                    _a.label = 1;
                case 1:
                    if (!(li < SUB_LANGS.length && tracks.length < 8)) return [3, 6];
                    lang = SUB_LANGS[li];
                    url = ovidriftBuildLibreSubsUrl(movieInfo, tmdbId, lang.id);
                    if (!url) {
                        return [3, 5];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, libs.request_get(url, {
                            'user-agent': USER_AGENT,
                            accept: 'application/json',
                        }, false, true, 1)];
                case 3:
                    payload = _a.sent();
                    if (typeof payload === 'string' && payload) {
                        try {
                            payload = JSON.parse(payload);
                        }
                        catch (parseError) {
                            payload = null;
                        }
                    }
                    part = ovidriftNormalizeLibreSubs(payload, lang.name);
                    for (pi = 0; pi < part.length; pi++) {
                        if (seen[part[pi].file]) {
                            continue;
                        }
                        seen[part[pi].file] = true;
                        tracks.push(part[pi]);
                    }
                    return [3, 5];
                case 4:
                    e_subs = _a.sent();
                    console.log('[RN-Fetch][OVIDRIFT-SUBS-ERR] lang=' + lang.id + ' ' + String(e_subs && e_subs.message ? e_subs.message : e_subs));
                    return [3, 5];
                case 5:
                    li++;
                    return [3, 1];
                case 6:
                    console.log('[RN-Fetch][OVIDRIFT-SUBS] external=' + tracks.length + ' tmdb=' + tmdbId);
                    return [2, tracks];
            }
        });
    });
}
function ovidriftMergeTracks(primary, secondary) {
    var out = [];
    var seen = {};
    var lists = [primary || [], secondary || []];
    for (var li = 0; li < lists.length; li++) {
        var list = lists[li];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (!item || !item.file || seen[item.file]) {
                continue;
            }
            seen[item.file] = true;
            out.push(item);
        }
    }
    return out;
}
function ovidriftSelectPlayable(meta) {
    if (!meta) {
        return null;
    }
    // Prefer Evion when present: better player/subtitle compatibility than Orion HEVC.
    if (meta.evionUrl) {
        var evionUrl = ovidriftAbsoluteUrl(meta.evionUrl, EMBED_ORIGIN + '/');
        if (evionUrl) {
            return {
                file: evionUrl,
                quality: 1080,
                label: 'Evion',
                kind: 'evion',
            };
        }
    }
    var orion = ovidriftPickOrionStream(meta.orionStreams);
    if (orion) {
        var orionUrl = ovidriftAbsoluteUrl(orion.url, EMBED_ORIGIN + '/');
        if (orionUrl) {
            return {
                file: orionUrl,
                quality: ovidriftQualityFromRungs(orion.rungs),
                label: String(orion.name || 'Orion'),
                kind: 'orion',
            };
        }
    }
    if (meta.selfhostUrl) {
        var selfUrl = ovidriftAbsoluteUrl(meta.selfhostUrl, EMBED_ORIGIN + '/');
        if (selfUrl) {
            return {
                file: selfUrl,
                quality: 1080,
                label: 'Selfhost',
                kind: 'selfhost',
            };
        }
    }
    return null;
}
function ovidriftDeliver(playable, embedUrl, tracks, callback) {
    var headers = ovidriftBuildHeaders(embedUrl);
    var quality = playable.quality > MAX_REPORT_QUALITY ? MAX_REPORT_QUALITY : playable.quality;
    var directQuality = [{ file: playable.file, quality: quality }];
    var subs = tracks || [];
    console.log('[RN-Fetch][OVIDRIFT-PLAY] kind=' + playable.kind + ' q=' + quality + ' subs=' + subs.length + ' label=' + playable.label + ' file=' + playable.file);
    libs.embed_callback(playable.file, PROVIDER, PROVIDER, 'Hls', callback, 0, subs, directQuality, headers, { type: 'm3u8' });
}
source.getResource = function (movieInfo, config, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var tmdbId, embedUrl, html, meta, playable, metaTracks, externalTracks, tracks, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('[RN-Fetch][OVIDRIFT-VERSION] ' + VERSION);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4, ovidriftResolveTmdbId(movieInfo)];
                case 2:
                    tmdbId = _a.sent();
                    embedUrl = ovidriftBuildEmbedUrl(movieInfo, tmdbId);
                    if (!embedUrl) {
                        console.log('[RN-Fetch][OVIDRIFT-SKIP] tmdb-missing');
                        return [2];
                    }
                    console.log('[RN-Fetch][OVIDRIFT-EMBED] ' + embedUrl);
                    return [4, libs.request_get(embedUrl, ovidriftBuildHeaders('https://7movies.ac/'), false, true, 2)];
                case 3:
                    html = _a.sent();
                    if (!html || typeof html !== 'string') {
                        console.log('[RN-Fetch][OVIDRIFT-SKIP] embed-empty');
                        return [2];
                    }
                    meta = ovidriftParseEmbedMeta(html);
                    if (!meta) {
                        console.log('[RN-Fetch][OVIDRIFT-SKIP] embedMeta-miss size=' + html.length);
                        return [2];
                    }
                    playable = ovidriftSelectPlayable(meta);
                    if (!playable) {
                        console.log('[RN-Fetch][OVIDRIFT-SKIP] no-stream provider=' + String(meta.provider || '') + ' orion=' + (meta.orionStreams ? meta.orionStreams.length : 0));
                        return [2];
                    }
                    metaTracks = ovidriftExtractMetaSubs(meta);
                    return [4, ovidriftFetchExternalSubs(movieInfo, tmdbId)];
                case 4:
                    externalTracks = _a.sent();
                    tracks = ovidriftMergeTracks(metaTracks, externalTracks);
                    ovidriftDeliver(playable, embedUrl, tracks, callback);
                    return [2, true];
                case 5:
                    e_2 = _a.sent();
                    libs.log({ e: e_2 }, PROVIDER, 'ERROR');
                    console.log('[RN-Fetch][OVIDRIFT-ERROR] ' + String(e_2 && e_2.message ? e_2.message : e_2));
                    return [2];
                case 6: return [2];
            }
        });
    });
};
