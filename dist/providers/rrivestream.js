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
var VERSION = 'v1-scrapper';
var SCRAPPER_ORIGIN = 'https://scrapper.rivestream.app';
var SITE_ORIGIN = 'https://www.rivestream.app';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
var PREFERRED_SERVICES = ['apogee', 'vanguard', 'zephyr', 'primevids', 'citadel', 'apollo', 'asiacloud'];
var MAX_DELIVER = 4;
var TMDB_API_KEYS = libs.TMDB_API_KEYS || [
    '4e44c9029b1270a41c75c666510b46f5',
    '4219e299c89411838049ab0dab19ebd5',
];
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
    try {
        var parsed = new URL(String(fileUrl || ''));
        var embedded = parsed.searchParams.get('headers');
        if (embedded) {
            var decoded = JSON.parse(embedded);
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
        if (parsed.host.indexOf('valhallastream.com') >= 0) {
            headers.origin = 'https://proxy.valhallastream.com';
            headers.Origin = headers.origin;
            headers.referer = 'https://proxy.valhallastream.com/';
            headers.Referer = headers.referer;
        }
    }
    catch (e) {
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
                        console.log('[RN-Fetch][RRIVE-TMDB] source=cache imdb=' + imdbId + ' tmdb=' + cached);
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
                        console.log('[RN-Fetch][RRIVE-TMDB] imdb=' + imdbId + ' tmdb=' + resolved);
                        return [2, resolved];
                    }
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log('[RN-Fetch][RRIVE-TMDB-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                    return [3, 5];
                case 5:
                    keyIndex++;
                    return [3, 1];
                case 6:
                    console.log('[RN-Fetch][RRIVE-TMDB] miss imdb=' + imdbId);
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
function rriveBuildProviderUrl(movieInfo, tmdbId, service) {
    var id = String(tmdbId || '').trim();
    if (!id || !service) {
        return '';
    }
    var url = SCRAPPER_ORIGIN + '/api/provider?provider=' + encodeURIComponent(service) + '&id=' + encodeURIComponent(id);
    if (movieInfo.type == 'tv') {
        var season = movieInfo.season || 1;
        var episode = movieInfo.episode || 1;
        url += '&season=' + encodeURIComponent(String(season)) + '&episode=' + encodeURIComponent(String(episode));
    }
    if (service === 'primevids' || service === 'citadel') {
        url += '&cb=' + String(Math.floor(Date.now() / 3000000));
    }
    return url;
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
        out.push({
            file: file,
            quality: rriveParseQuality(item.quality || item.source || ''),
            label: String(item.source || item.quality || service),
            service: service,
            format: String(item.format || 'hls').toLowerCase(),
        });
    }
    return out;
}
function rriveFetchService(movieInfo, tmdbId, service) {
    return __awaiter(_this, void 0, void 0, function () {
        var url, payload, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = rriveBuildProviderUrl(movieInfo, tmdbId, service);
                    if (!url) {
                        return [2, []];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, libs.request_get(url, rriveBuildApiHeaders(), false, true, 2)];
                case 2:
                    payload = _a.sent();
                    if (!payload || typeof payload === 'string') {
                        if (typeof payload === 'string' && payload) {
                            try {
                                payload = JSON.parse(payload);
                            }
                            catch (parseError) {
                                return [2, []];
                            }
                        }
                        else {
                            return [2, []];
                        }
                    }
                    return [2, rriveExtractSources(payload, service)];
                case 3:
                    e_2 = _a.sent();
                    console.log('[RN-Fetch][RRIVE-SVC-ERR] service=' + service + ' ' + String(e_2 && e_2.message ? e_2.message : e_2));
                    return [2, []];
                case 4: return [2];
            }
        });
    });
}
function rrivePickBestSource(sources) {
    if (!sources || !sources.length) {
        return null;
    }
    var best = sources[0];
    for (var i = 1; i < sources.length; i++) {
        if (sources[i].quality > best.quality) {
            best = sources[i];
        }
    }
    return best;
}
function rriveDeliver(playable, rank, callback) {
    var headers = rriveBuildPlayHeaders(playable.file);
    var streamType = playable.format === 'mp4' ? 'mp4' : 'm3u8';
    console.log('[RN-Fetch][RRIVE-PLAY] rank=' + rank + ' service=' + playable.service + ' q=' + playable.quality + ' label=' + playable.label + ' file=' + playable.file.substring(0, 140));
    libs.embed_callback(playable.file, PROVIDER, PROVIDER, 'Hls', callback, rank, [], [{ file: playable.file, quality: playable.quality }], headers, { type: streamType });
}
source.getResource = function (movieInfo, config, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var tmdbId, delivered, seen, serviceIndex, service, sources, best, rank, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('[RN-Fetch][RRIVE-VERSION] ' + VERSION);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4, rriveResolveTmdbId(movieInfo)];
                case 2:
                    tmdbId = _a.sent();
                    if (!tmdbId) {
                        console.log('[RN-Fetch][RRIVE-SKIP] tmdb-missing');
                        return [2];
                    }
                    console.log('[RN-Fetch][RRIVE-START] tmdb=' + tmdbId + ' type=' + String(movieInfo.type || 'movie'));
                    delivered = 0;
                    seen = {};
                    serviceIndex = 0;
                    _a.label = 3;
                case 3:
                    if (!(serviceIndex < PREFERRED_SERVICES.length && delivered < MAX_DELIVER)) return [3, 6];
                    service = PREFERRED_SERVICES[serviceIndex];
                    return [4, rriveFetchService(movieInfo, tmdbId, service)];
                case 4:
                    sources = _a.sent();
                    best = rrivePickBestSource(sources);
                    if (best && !seen[best.file]) {
                        seen[best.file] = true;
                        rank = delivered === 0 ? 0 : delivered;
                        rriveDeliver(best, rank, callback);
                        delivered++;
                    }
                    _a.label = 5;
                case 5:
                    serviceIndex++;
                    return [3, 3];
                case 6:
                    if (!delivered) {
                        console.log('[RN-Fetch][RRIVE-SKIP] no-stream tmdb=' + tmdbId);
                        return [2];
                    }
                    console.log('[RN-Fetch][RRIVE-DONE] delivered=' + delivered);
                    return [2, true];
                case 7:
                    e_3 = _a.sent();
                    libs.log({ e: e_3 }, PROVIDER, 'ERROR');
                    console.log('[RN-Fetch][RRIVE-ERROR] ' + String(e_3 && e_3.message ? e_3.message : e_3));
                    return [2];
                case 8: return [2];
            }
        });
    });
};
