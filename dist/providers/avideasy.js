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
var AVIDEASY_VERSION = 'v7-live-deliver';
var AVIDEASY_SEED_URL = 'https://api.wingsdatabase.com/seed';
var AVIDEASY_API_BASE = 'https://api.wingsdatabase.com';
var AVIDEASY_DEC_URL = 'https://enc-dec.app/api/dec-videasy';
var AVIDEASY_PLAYER_ORIGIN = 'https://player.videasy.to';
var AVIDEASY_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36';
var AVIDEASY_CACHE_MS = 300000;
var AVIDEASY_SERVER_DELAY_MS = 500;
var AVIDEASY_SEED_GAP_MS = 1200;
var AVIDEASY_FETCH_TIMEOUT_MS = 22000;
var AVIDEASY_DECRYPT_RETRY_MS = 700;
var AVIDEASY_API_RETRY_MS = 900;
var AVIDEASY_MAX_OK = 3;
var AVIDEASY_SERVERS = [
    { name: 'Cypher', path: 'downloader2' },
    { name: 'Neon', path: 'neon2' },
    { name: 'Sage', path: 'ym' },
    { name: 'Yoru', path: 'cdn', moviesOnly: true },
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
function avideasyGetGlobalRoot() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return {};
}
function avideasyGetState() {
    var root = avideasyGetGlobalRoot();
    if (!root.__avideasyState) {
        root.__avideasyState = {
            cache: {},
            inflight: {},
            delivered: {},
            seedMutex: Promise.resolve(),
            decryptMutex: Promise.resolve(),
            lastSeedAt: 0,
        };
    }
    return root.__avideasyState;
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
    var state = avideasyGetState();
    var entry = state.cache[runKey];
    if (!entry || Date.now() - entry.at > AVIDEASY_CACHE_MS) {
        return null;
    }
    return entry;
}
function avideasySetCacheEntry(runKey, items) {
    var state = avideasyGetState();
    state.cache[runKey] = {
        at: Date.now(),
        items: items,
    };
    if (typeof libs !== 'undefined' && libs) {
        libs.__avideasyCache = state.cache;
    }
}
function avideasyDisplayName(rank) {
    return rank ? 'Server V' + rank : 'Server V';
}
function avideasyDeliverCached(items, callback, runKey) {
    var state = avideasyGetState();
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var deliverKey = (runKey || 'global') + '|' + item.rank;
        if (state.delivered[deliverKey]) {
            continue;
        }
        state.delivered[deliverKey] = true;
        var label = avideasyDisplayName(item.rank);
        console.log('[RN-Fetch][AVIDEASY-DELIVER] rank=' + item.rank + ' host=' + item.host + ' label=' + label);
        libs.embed_callback(item.file, AVIDEASY_PROVIDER, item.host, 'Hls', callback, item.rank, item.tracks, item.directQuality, item.headers, {
            type: 'm3u8',
            provider: label,
            source: 'V-' + item.rank,
        });
    }
}
function avideasyFetchText(url, headers) {
    var timeout = new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('fetch-timeout'));
        }, AVIDEASY_FETCH_TIMEOUT_MS);
    });
    return Promise.race([
        fetch(url, { headers: headers, method: 'GET' }).then(function (response) {
            return response.text().then(function (text) {
                return { status: response.status, text: text };
            });
        }),
        timeout,
    ]);
}
function avideasyFetchSeedRaw(tmdbId, attempt) {
    return avideasyFetchText(AVIDEASY_SEED_URL + '?mediaId=' + encodeURIComponent(String(tmdbId)), avideasyBuildHeaders()).then(function (result) {
        var data = null;
        try {
            data = JSON.parse(result.text);
        }
        catch (parseError) {
            data = null;
        }
        if (result.status === 429 && attempt < 2) {
            console.log('[RN-Fetch][AVIDEASY-SEED-429] retry=' + (attempt + 1));
            return avideasySleep(1800 * (attempt + 1)).then(function () {
                return avideasyFetchSeedRaw(tmdbId, attempt + 1);
            });
        }
        if (!data || !data.seed) {
            throw new Error('seed-missing status=' + result.status);
        }
        libs.__avideasyLastSeedAt = Date.now();
        avideasyGetState().lastSeedAt = libs.__avideasyLastSeedAt;
        return String(data.seed);
    });
}
function avideasyFetchSeed(tmdbId) {
    var state = avideasyGetState();
    var waitMs = Math.max(0, AVIDEASY_SEED_GAP_MS - (Date.now() - (state.lastSeedAt || 0)));
    var chain = state.seedMutex.then(function () {
        if (waitMs > 0) {
            return avideasySleep(waitMs);
        }
        return null;
    }).then(function () {
        return avideasyFetchSeedRaw(tmdbId, 0);
    });
    state.seedMutex = chain.catch(function () { });
    return chain;
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
function avideasyDecryptBlob(movieInfo, encryptedText, seed) {
    var state = avideasyGetState();
    var work = state.decryptMutex.then(function () {
        var timeout = new Promise(function (_, reject) {
            setTimeout(function () {
                reject(new Error('decrypt-timeout'));
            }, AVIDEASY_FETCH_TIMEOUT_MS);
        });
        return Promise.race([
            fetch(AVIDEASY_DEC_URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'user-agent': AVIDEASY_USER_AGENT,
                    referer: AVIDEASY_PLAYER_ORIGIN + '/',
                },
                body: JSON.stringify({
                    text: encryptedText,
                    id: String(movieInfo.tmdb_id),
                    seed: seed,
                }),
            }).then(function (response) {
                return response.json().then(function (data) {
                    if (!response.ok) {
                        throw new Error('decrypt-http-' + response.status);
                    }
                    return data;
                });
            }),
            timeout,
        ]).catch(function (err) {
            console.log('[RN-Fetch][AVIDEASY-DECRYPT-ERR] ' + String(err && err.message ? err.message : err));
            return '';
        });
    });
    state.decryptMutex = work.catch(function () { });
    return work;
}
function avideasyDecryptWithRetry(movieInfo, encryptedText, seed, serverName) { return __awaiter(_this, void 0, void 0, function () {
    var decryptData, sources, retryData, retrySources;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, avideasyDecryptBlob(movieInfo, encryptedText, seed)];
            case 1:
                decryptData = _a.sent();
                sources = avideasyExtractSources(decryptData);
                if (sources.length) {
                    return [2, decryptData];
                }
                console.log('[RN-Fetch][AVIDEASY-DECRYPT-RETRY] server=' + serverName);
                return [4, avideasySleep(AVIDEASY_DECRYPT_RETRY_MS)];
            case 2:
                _a.sent();
                return [4, avideasyDecryptBlob(movieInfo, encryptedText, seed)];
            case 3:
                retryData = _a.sent();
                retrySources = avideasyExtractSources(retryData);
                if (!retrySources.length) {
                    console.log('[RN-Fetch][AVIDEASY-DECRYPT-EMPTY] server=' + serverName);
                    return [2, null];
                }
                return [2, retryData];
        }
    });
}); }
function avideasyFetchServerSource(server, movieInfo, seed, headers, attempt) {
    if (attempt === void 0) { attempt = 0; }
    return __awaiter(_this, void 0, void 0, function () {
        var sourceUrl, result, decryptData, sources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('[RN-Fetch][AVIDEASY-TRY] server=' + server.name + ' path=' + server.path + (attempt ? ' retry=' + attempt : ''));
                    sourceUrl = avideasyBuildSourceUrl(server.path, movieInfo, seed);
                    return [4, avideasyFetchText(sourceUrl, headers)];
                case 1:
                    result = _a.sent();
                    if (!avideasyIsEncryptedBlob(result.text)) {
                        if (attempt < 1 && (result.status === 429 || result.status === 500 || result.status === 503)) {
                            console.log('[RN-Fetch][AVIDEASY-API-RETRY] server=' + server.name + ' status=' + result.status);
                            return [4, avideasySleep(AVIDEASY_API_RETRY_MS)];
                        }
                        else {
                            console.log('[RN-Fetch][AVIDEASY-SKIP] server=' + server.name + ' status=' + result.status + ' len=' + (result.text ? result.text.length : 0));
                            return [2, null];
                        }
                    }
                    else {
                        return [3, 3];
                    }
                case 2:
                    _a.sent();
                    return [2, avideasyFetchServerSource(server, movieInfo, seed, headers, attempt + 1)];
                case 3:
                    console.log('[RN-Fetch][AVIDEASY-BLOB] server=' + server.name + ' len=' + result.text.length);
                    return [4, avideasyDecryptWithRetry(movieInfo, result.text, seed, server.name)];
                case 4:
                    decryptData = _a.sent();
                    if (!decryptData) {
                        return [2, null];
                    }
                    sources = avideasyExtractSources(decryptData);
                    if (!sources.length) {
                        console.log('[RN-Fetch][AVIDEASY-DECRYPT-EMPTY] server=' + server.name);
                        return [2, null];
                    }
                    return [2, { sources: sources, subtitles: avideasyExtractSubtitles(decryptData) }];
            }
        });
    });
}
function avideasyCollectLinks(movieInfo, liveCallback, runKey) { return __awaiter(_this, void 0, void 0, function () {
    var runKey, cached, headers, seed, okCount, rank, delivered, _i, AVIDEASY_SERVERS_1, server, payload, directQuality, tracks, _a, _b, itemDirect, _c, _d, itemSubtitle, lang, serverError_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                runKey = avideasyRunKey(movieInfo);
                cached = avideasyGetCacheEntry(runKey);
                if (cached && cached.items.length) {
                    console.log('[RN-Fetch][AVIDEASY-COLLECT-SKIP] cache count=' + cached.items.length);
                    return [2, cached.items];
                }
                headers = avideasyBuildHeaders();
                console.log('[RN-Fetch][AVIDEASY-COLLECT] start tmdb=' + movieInfo.tmdb_id);
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
                if (!(okCount < AVIDEASY_MAX_OK && _i < AVIDEASY_SERVERS_1.length)) return [3, 9];
                server = AVIDEASY_SERVERS_1[_i];
                if (server.moviesOnly && movieInfo.type == 'tv') {
                    return [3, 8];
                }
                _e.label = 3;
            case 3:
                _e.trys.push([3, 7, , 8]);
                if (!(_i > 0)) return [3, 5];
                return [4, avideasySleep(AVIDEASY_SERVER_DELAY_MS)];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                return [4, avideasyFetchServerSource(server, movieInfo, seed, headers)];
            case 6:
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
                var deliveredItem = {
                    file: directQuality[0].file,
                    host: server.name,
                    rank: rank,
                    tracks: tracks,
                    directQuality: directQuality,
                    headers: headers,
                };
                delivered.push(deliveredItem);
                if (liveCallback) {
                    avideasyDeliverCached([deliveredItem], liveCallback, runKey);
                }
                return [3, 8];
            case 7:
                serverError_1 = _e.sent();
                console.log('[RN-Fetch][AVIDEASY-SERVER-ERR] server=' + server.name + ' err=' + String(serverError_1 && serverError_1.message ? serverError_1.message : serverError_1));
                return [3, 8];
            case 8:
                _i++;
                return [3, 2];
            case 9:
                console.log('[RN-Fetch][AVIDEASY-COLLECT] done count=' + delivered.length);
                return [2, delivered];
        }
    });
}); }
function avideasyEnsureInflight(runKey, movieInfo, callback) {
    var state = avideasyGetState();
    if (state.inflight[runKey]) {
        console.log('[RN-Fetch][AVIDEASY-WAIT] ' + runKey);
        return state.inflight[runKey];
    }
    var task = Promise.resolve().then(function () {
        return avideasyCollectLinks(movieInfo, callback, runKey);
    }).then(function (items) {
        if (items.length) {
            avideasySetCacheEntry(runKey, items);
        }
        return items;
    }).catch(function (err) {
        console.log('[RN-Fetch][AVIDEASY-ERROR] ' + String(err && err.message ? err.message : err));
        return [];
    }).finally(function () {
        setTimeout(function () {
            if (state.inflight[runKey] === task) {
                delete state.inflight[runKey];
            }
        }, AVIDEASY_CACHE_MS);
    });
    state.inflight[runKey] = task;
    if (typeof libs !== 'undefined' && libs) {
        libs.__avideasyInflight = state.inflight;
    }
    return task;
}
source.getResource = function (movieInfo, config, callback) {
    console.log('[RN-Fetch][AVIDEASY-VERSION] ' + AVIDEASY_VERSION + ' tmdb=' + movieInfo.tmdb_id + ' type=' + movieInfo.type);
    if (!movieInfo || !movieInfo.tmdb_id || !movieInfo.title) {
        console.log('[RN-Fetch][AVIDEASY-SKIP] missing tmdb/title');
        return Promise.resolve();
    }
    var runKey = avideasyRunKey(movieInfo);
    var cached = avideasyGetCacheEntry(runKey);
    if (cached && cached.items.length) {
        console.log('[RN-Fetch][AVIDEASY-CACHE] hit count=' + cached.items.length);
        avideasyDeliverCached(cached.items, callback, runKey);
        return Promise.resolve();
    }
    return avideasyEnsureInflight(runKey, movieInfo, callback).then(function (items) {
        if (!items.length) {
            var lateCache = avideasyGetCacheEntry(runKey);
            if (lateCache && lateCache.items.length) {
                console.log('[RN-Fetch][AVIDEASY-CACHE-LATE] count=' + lateCache.items.length);
                avideasyDeliverCached(lateCache.items, callback, runKey);
                return;
            }
            console.log('[RN-Fetch][AVIDEASY-MISS] no sources tmdb=' + movieInfo.tmdb_id);
            return;
        }
        avideasyDeliverCached(items, callback, runKey);
    });
};
