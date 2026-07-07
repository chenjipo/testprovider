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
var AVIDEASY_PROVIDER = 'AVideasy';
var AVIDEASY_VERSION = 'v3-wings-stable';
var AVIDEASY_SEED_URL = 'https://api.wingsdatabase.com/seed';
var AVIDEASY_API_BASE = 'https://api.wingsdatabase.com';
var AVIDEASY_DEC_URL = 'https://enc-dec.app/api/dec-videasy';
var AVIDEASY_PLAYER_ORIGIN = 'https://player.videasy.to';
var AVIDEASY_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36';
var AVIDEASY_CACHE_MS = 90000;
var AVIDEASY_SERVER_DELAY_MS = 180;
var AVIDEASY_MAX_OK = 3;
var AVIDEASY_SERVERS = [
    { name: 'Neon', path: 'neon2' },
    { name: 'Sage', path: 'ym' },
    { name: 'Cypher', path: 'downloader2' },
    { name: 'Yoru', path: 'cdn', moviesOnly: true },
    { name: 'Jett', path: 'jett' },
    { name: 'Tejo', path: 'tejo' },
    { name: 'Breach', path: 'm4uhd' },
    { name: 'Vyse', path: 'hdmovie' },
    { name: 'Raze', path: 'superflix' },
];
function avideasyBuildHeaders() {
    return {
        'user-agent': AVIDEASY_USER_AGENT,
        accept: '*/*',
        origin: AVIDEASY_PLAYER_ORIGIN,
        referer: AVIDEASY_PLAYER_ORIGIN + '/',
    };
}
function avideasyEncTitle(title) {
    return encodeURIComponent(encodeURIComponent(String(title || '')));
}
function avideasyNormalizeImdbId(raw) {
    if (!raw) {
        return '';
    }
    var value = String(raw).trim();
    if (/^tt/i.test(value)) {
        return value;
    }
    return 'tt' + value.replace(/^tt/i, '');
}
function avideasyIsEncryptedBlob(text) {
    if (!text || text.length < 20) {
        return false;
    }
    var trimmed = String(text).trim();
    if (trimmed.charAt(0) === '{' || trimmed.charAt(0) === '[') {
        return false;
    }
    if (trimmed.indexOf('<') === 0 || trimmed.indexOf('<!DOCTYPE') === 0) {
        return false;
    }
    if (trimmed.indexOf('404 page not found') === 0) {
        return false;
    }
    return true;
}
function avideasyBuildSourceUrl(serverPath, movieInfo, seed) {
    var params = [
        'title=' + avideasyEncTitle(movieInfo.title),
        'mediaType=' + encodeURIComponent(movieInfo.type || 'movie'),
        'year=' + encodeURIComponent(String(movieInfo.year || '')),
        'tmdbId=' + encodeURIComponent(String(movieInfo.tmdb_id || '')),
        'imdbId=' + encodeURIComponent(avideasyNormalizeImdbId(movieInfo.imdb_id)),
        'enc=2',
        'seed=' + encodeURIComponent(seed),
    ];
    if (movieInfo.type == 'tv') {
        params.push('episodeId=' + encodeURIComponent(String(movieInfo.episode || '1')));
        params.push('seasonId=' + encodeURIComponent(String(movieInfo.season || '1')));
    }
    return AVIDEASY_API_BASE + '/' + serverPath + '/sources-with-title?' + params.join('&');
}
function avideasyParseQuality(rawQuality) {
    var match = String(rawQuality || '').match(/([0-9]+)/i);
    return match ? Number(match[1]) : 1080;
}
function avideasySleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function avideasyRunKey(movieInfo) {
    return [
        String(movieInfo.tmdb_id || ''),
        String(movieInfo.type || 'movie'),
        String(movieInfo.season || '0'),
        String(movieInfo.episode || '0'),
    ].join('|');
}
function avideasyGetCacheEntry(runKey) {
    if (!libs.__avideasyCache) {
        return null;
    }
    var entry = libs.__avideasyCache[runKey];
    if (!entry || Date.now() - entry.at > AVIDEASY_CACHE_MS) {
        return null;
    }
    return entry;
}
function avideasySetCacheEntry(runKey, items) {
    if (!libs.__avideasyCache) {
        libs.__avideasyCache = {};
    }
    libs.__avideasyCache[runKey] = {
        at: Date.now(),
        items: items,
    };
}
function avideasyDeliverCached(items, callback) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        libs.embed_callback(item.file, AVIDEASY_PROVIDER, item.host, 'Hls', callback, item.rank, item.tracks, item.directQuality, item.headers);
    }
}
function avideasyFetchSeed(tmdbId) {
    return fetch(AVIDEASY_SEED_URL + '?mediaId=' + encodeURIComponent(String(tmdbId)), {
        headers: avideasyBuildHeaders(),
        method: 'GET',
    }).then(function (response) {
        return response.json().then(function (data) {
            if (!response.ok || !data || !data.seed) {
                throw new Error('seed-missing status=' + response.status);
            }
            return String(data.seed);
        });
    });
}
function avideasyExtractSources(decryptData) {
    if (!decryptData || typeof decryptData !== 'object') {
        return [];
    }
    if (decryptData.result && decryptData.result.sources && decryptData.result.sources.length) {
        return decryptData.result.sources;
    }
    if (decryptData.sources && decryptData.sources.length) {
        return decryptData.sources;
    }
    return [];
}
function avideasyExtractSubtitles(decryptData) {
    if (!decryptData || typeof decryptData !== 'object') {
        return [];
    }
    if (decryptData.result && decryptData.result.subtitles) {
        return decryptData.result.subtitles;
    }
    if (decryptData.subtitles) {
        return decryptData.subtitles;
    }
    return [];
}
function avideasyFetchServerSource(server, movieInfo, seed, headers) { return __awaiter(_this, void 0, void 0, function () {
    var sourceUrl, response, encryptedText, decryptBody, decryptData, sources, retrySeed, retryUrl, retryResponse, retryText, retryDecrypt, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceUrl = avideasyBuildSourceUrl(server.path, movieInfo, seed);
                console.log('[RN-Fetch][AVIDEASY-TRY] server=' + server.name + ' path=' + server.path);
                return [4, fetch(sourceUrl, { headers: headers, method: 'GET' })];
            case 1:
                response = _a.sent();
                return [4, response.text()];
            case 2:
                encryptedText = _a.sent();
                if (!avideasyIsEncryptedBlob(encryptedText)) {
                    console.log('[RN-Fetch][AVIDEASY-SKIP] server=' + server.name + ' status=' + response.status + ' len=' + (encryptedText ? encryptedText.length : 0));
                    return [2, null];
                }
                decryptBody = {
                    text: encryptedText,
                    id: String(movieInfo.tmdb_id),
                    seed: seed,
                };
                return [4, libs.request_post(AVIDEASY_DEC_URL, {
                        'content-type': 'application/json',
                        'user-agent': AVIDEASY_USER_AGENT,
                        referer: AVIDEASY_PLAYER_ORIGIN + '/',
                    }, decryptBody, false, false)];
            case 3:
                decryptData = _a.sent();
                sources = avideasyExtractSources(decryptData);
                if (sources.length) {
                    return [2, { sources: sources, subtitles: avideasyExtractSubtitles(decryptData) }];
                }
                console.log('[RN-Fetch][AVIDEASY-DECRYPT-EMPTY] server=' + server.name + ' retry=seed');
                _a.label = 4;
            case 4:
                _a.trys.push([4, 10, , 11]);
                return [4, avideasyFetchSeed(movieInfo.tmdb_id)];
            case 5:
                retrySeed = _a.sent();
                retryUrl = avideasyBuildSourceUrl(server.path, movieInfo, retrySeed);
                return [4, fetch(retryUrl, { headers: headers, method: 'GET' })];
            case 6:
                retryResponse = _a.sent();
                return [4, retryResponse.text()];
            case 7:
                retryText = _a.sent();
                if (!avideasyIsEncryptedBlob(retryText)) {
                    return [2, null];
                }
                return [4, libs.request_post(AVIDEASY_DEC_URL, {
                        'content-type': 'application/json',
                        'user-agent': AVIDEASY_USER_AGENT,
                        referer: AVIDEASY_PLAYER_ORIGIN + '/',
                    }, {
                        text: retryText,
                        id: String(movieInfo.tmdb_id),
                        seed: retrySeed,
                    }, false, false)];
            case 8:
                retryDecrypt = _a.sent();
                sources = avideasyExtractSources(retryDecrypt);
                if (!sources.length) {
                    console.log('[RN-Fetch][AVIDEASY-DECRYPT-EMPTY] server=' + server.name + ' retry=fail');
                    return [2, null];
                }
                return [2, { sources: sources, subtitles: avideasyExtractSubtitles(retryDecrypt) }];
            case 10:
                e_1 = _a.sent();
                return [2, null];
            case 11: return [2];
        }
    });
}); }
function avideasyCollectLinks(movieInfo) { return __awaiter(_this, void 0, void 0, function () {
    var headers, seed, okCount, rank, delivered, _i, AVIDEASY_SERVERS_1, server, payload, directQuality, tracks, _a, _b, itemDirect, _c, _d, itemSubtitle, lang, serverError_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                headers = avideasyBuildHeaders();
                return [4, avideasyFetchSeed(movieInfo.tmdb_id)];
            case 1:
                seed = _e.sent();
                console.log('[RN-Fetch][AVIDEASY-SEED] ok tmdb=' + movieInfo.tmdb_id);
                okCount = 0;
                rank = 0;
                delivered = [];
                _i = 0, AVIDEASY_SERVERS_1 = AVIDEASY_SERVERS;
                _e.label = 2;
            case 2:
                if (!(okCount < AVIDEASY_MAX_OK && _i < AVIDEASY_SERVERS_1.length)) return [3, 10];
                server = AVIDEASY_SERVERS_1[_i];
                if (server.moviesOnly && movieInfo.type == 'tv') {
                    return [3, 9];
                }
                _e.label = 3;
            case 3:
                _e.trys.push([3, 7, , 8]);
                if (_i > 0) {
                    return [4, avideasySleep(AVIDEASY_SERVER_DELAY_MS)];
                }
                case 4:
                if (_i > 0) {
                    _e.sent();
                }
                return [4, avideasyFetchServerSource(server, movieInfo, seed, headers)];
            case 5:
                payload = _e.sent();
                if (!payload || !payload.sources || !payload.sources.length) {
                    return [3, 8];
                }
                directQuality = [];
                tracks = [];
                for (_a = 0, _b = payload.sources; _a < _b.length; _a++) {
                    itemDirect = _b[_a];
                    if (!itemDirect || !itemDirect.url) {
                        continue;
                    }
                    directQuality.push({
                        file: itemDirect.url,
                        quality: avideasyParseQuality(itemDirect.quality),
                    });
                }
                if (payload.subtitles && payload.subtitles.length) {
                    for (_c = 0, _d = payload.subtitles; _c < _d.length; _c++) {
                        itemSubtitle = _d[_c];
                        if (!itemSubtitle || !itemSubtitle.url) {
                            continue;
                        }
                        lang = itemSubtitle.language || itemSubtitle.lang || 'Unknown';
                        tracks.push({
                            file: itemSubtitle.url,
                            kind: 'captions',
                            label: lang,
                        });
                    }
                }
                if (!directQuality.length) {
                    return [3, 8];
                }
                directQuality = _.orderBy(directQuality, ['quality'], ['desc']);
                rank += 1;
                okCount += 1;
                console.log('[RN-Fetch][AVIDEASY-OK] server=' + server.name + ' sources=' + directQuality.length + ' rank=' + rank);
                delivered.push({
                    file: directQuality[0].file,
                    host: server.name,
                    rank: rank,
                    tracks: tracks,
                    directQuality: directQuality,
                    headers: headers,
                });
                return [4, avideasyFetchSeed(movieInfo.tmdb_id)];
            case 6:
                seed = _e.sent();
                return [3, 8];
            case 7:
                serverError_1 = _e.sent();
                console.log('[RN-Fetch][AVIDEASY-SERVER-ERR] server=' + server.name + ' err=' + String(serverError_1 && serverError_1.message ? serverError_1.message : serverError_1));
                return [3, 8];
            case 8: return [3, 9];
            case 9:
                _i++;
                return [3, 2];
            case 10: return [2, delivered];
        }
    });
}); }
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var runKey, cached, inflight, items, fatalError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[RN-Fetch][AVIDEASY-VERSION] ' + AVIDEASY_VERSION + ' tmdb=' + movieInfo.tmdb_id + ' type=' + movieInfo.type);
                if (!movieInfo || !movieInfo.tmdb_id || !movieInfo.title) {
                    console.log('[RN-Fetch][AVIDEASY-SKIP] missing tmdb/title');
                    return [2];
                }
                runKey = avideasyRunKey(movieInfo);
                cached = avideasyGetCacheEntry(runKey);
                if (cached && cached.items.length) {
                    console.log('[RN-Fetch][AVIDEASY-CACHE] hit count=' + cached.items.length);
                    avideasyDeliverCached(cached.items, callback);
                    return [2];
                }
                if (!libs.__avideasyInflight) {
                    libs.__avideasyInflight = {};
                }
                if (!libs.__avideasyInflight[runKey]) {
                    libs.__avideasyInflight[runKey] = avideasyCollectLinks(movieInfo);
                }
                else {
                    console.log('[RN-Fetch][AVIDEASY-WAIT] ' + runKey);
                }
                inflight = libs.__avideasyInflight[runKey];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, inflight];
            case 2:
                items = _a.sent();
                if (items.length) {
                    avideasySetCacheEntry(runKey, items);
                    avideasyDeliverCached(items, callback);
                }
                else {
                    console.log('[RN-Fetch][AVIDEASY-MISS] no sources tmdb=' + movieInfo.tmdb_id);
                }
                return [3, 4];
            case 3:
                fatalError_1 = _a.sent();
                console.log('[RN-Fetch][AVIDEASY-ERROR] ' + String(fatalError_1 && fatalError_1.message ? fatalError_1.message : fatalError_1));
                return [3, 4];
            case 4:
                if (libs.__avideasyInflight && libs.__avideasyInflight[runKey] === inflight) {
                    delete libs.__avideasyInflight[runKey];
                }
                return [2];
        }
    });
}); };
