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
var AVIDEASY_VERSION = 'v2-wings-seed';
var AVIDEASY_SEED_URL = 'https://api.wingsdatabase.com/seed';
var AVIDEASY_API_BASE = 'https://api.wingsdatabase.com';
var AVIDEASY_DEC_URL = 'https://enc-dec.app/api/dec-videasy';
var AVIDEASY_PLAYER_ORIGIN = 'https://player.videasy.to';
var AVIDEASY_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36';
var AVIDEASY_SERVERS = [
    { name: 'Yoru', path: 'cdn', moviesOnly: true },
    { name: 'Neon', path: 'neon2' },
    { name: 'Sage', path: 'ym' },
    { name: 'Cypher', path: 'downloader2' },
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
    var quality = rawQuality;
    var match = String(quality || '').match(/([0-9]+)/i);
    return match ? Number(match[1]) : 1080;
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
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var headers, seed, rank, _i, AVIDEASY_SERVERS_1, server, sourceUrl, response, encryptedText, decryptBody, decryptData, directQuality, tracks, _a, _b, itemDirect, _c, _d, itemSubtitle, lang, serverError_1, fatalError_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                console.log('[RN-Fetch][AVIDEASY-VERSION] ' + AVIDEASY_VERSION + ' tmdb=' + movieInfo.tmdb_id + ' type=' + movieInfo.type);
                if (!movieInfo || !movieInfo.tmdb_id || !movieInfo.title) {
                    console.log('[RN-Fetch][AVIDEASY-SKIP] missing tmdb/title');
                    return [2];
                }
                headers = avideasyBuildHeaders();
                _e.label = 1;
            case 1:
                _e.trys.push([1, 14, , 15]);
                return [4, avideasyFetchSeed(movieInfo.tmdb_id)];
            case 2:
                seed = _e.sent();
                console.log('[RN-Fetch][AVIDEASY-SEED] ok tmdb=' + movieInfo.tmdb_id);
                rank = 0;
                _i = 0, AVIDEASY_SERVERS_1 = AVIDEASY_SERVERS;
                _e.label = 3;
            case 3:
                if (!(_i < AVIDEASY_SERVERS_1.length)) return [3, 13];
                server = AVIDEASY_SERVERS_1[_i];
                if (server.moviesOnly && movieInfo.type == 'tv') {
                    return [3, 12];
                }
                _e.label = 4;
            case 4:
                _e.trys.push([4, 10, , 11]);
                sourceUrl = avideasyBuildSourceUrl(server.path, movieInfo, seed);
                console.log('[RN-Fetch][AVIDEASY-TRY] server=' + server.name + ' path=' + server.path);
                return [4, fetch(sourceUrl, { headers: headers, method: 'GET' })];
            case 5:
                response = _e.sent();
                return [4, response.text()];
            case 6:
                encryptedText = _e.sent();
                if (!avideasyIsEncryptedBlob(encryptedText)) {
                    console.log('[RN-Fetch][AVIDEASY-SKIP] server=' + server.name + ' status=' + response.status + ' len=' + (encryptedText ? encryptedText.length : 0));
                    return [3, 11];
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
                    }, decryptBody)];
            case 7:
                decryptData = _e.sent();
                if (!decryptData || !decryptData.result || !decryptData.result.sources || !decryptData.result.sources.length) {
                    console.log('[RN-Fetch][AVIDEASY-DECRYPT-EMPTY] server=' + server.name);
                    return [3, 11];
                }
                directQuality = [];
                tracks = [];
                for (_a = 0, _b = decryptData.result.sources; _a < _b.length; _a++) {
                    itemDirect = _b[_a];
                    if (!itemDirect || !itemDirect.url) {
                        continue;
                    }
                    directQuality.push({
                        file: itemDirect.url,
                        quality: avideasyParseQuality(itemDirect.quality),
                    });
                }
                if (decryptData.result.subtitles && decryptData.result.subtitles.length) {
                    for (_c = 0, _d = decryptData.result.subtitles; _c < _d.length; _c++) {
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
                    return [3, 11];
                }
                directQuality = _.orderBy(directQuality, ['quality'], ['desc']);
                rank += 1;
                console.log('[RN-Fetch][AVIDEASY-OK] server=' + server.name + ' sources=' + directQuality.length + ' rank=' + rank);
                libs.embed_callback(directQuality[0].file, AVIDEASY_PROVIDER, server.name, 'Hls', callback, rank, tracks, directQuality, headers);
                return [3, 11];
            case 10:
                serverError_1 = _e.sent();
                console.log('[RN-Fetch][AVIDEASY-SERVER-ERR] server=' + server.name + ' err=' + String(serverError_1 && serverError_1.message ? serverError_1.message : serverError_1));
                return [3, 11];
            case 11: return [3, 12];
            case 12:
                _i++;
                return [3, 3];
            case 13: return [3, 15];
            case 14:
                fatalError_1 = _e.sent();
                console.log('[RN-Fetch][AVIDEASY-ERROR] ' + String(fatalError_1 && fatalError_1.message ? fatalError_1.message : fatalError_1));
                return [3, 15];
            case 15: return [2];
        }
    });
}); };
