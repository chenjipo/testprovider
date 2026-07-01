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
var QHEXA_DOMAIN = 'https://theemoviedb.hexa.su';
var QHEXA_ENC_TOKEN_URL = 'https://enc-dec.app/api/enc-hexa';
var QHEXA_DEC_URL = 'https://enc-dec.app/api/dec-hexa';
var QHEXA_REFERER = 'https://hexa.su/';
var QHEXA_PROVIDER = 'QHexaWatch';
var QHEXA_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';
var QHEXA_CAP_CACHE_MS = 50 * 60 * 1000;
var QHEXA_TOKEN_RETRY_MAX = 4;
var QHEXA_TOKEN_RETRY_MS = 3000;
var QHEXA_TMDB_API_KEYS = libs.TMDB_API_KEYS || [
    '4e44c9029b1270a41c75c666510b46f5',
    '4219e299c89411838049ab0dab19ebd5',
];
function qhexaFetchTmdbFind(imdbId, apiKey) {
    var findUrl = 'https://api.themoviedb.org/3/find/' + encodeURIComponent(imdbId) + '?external_source=imdb_id&api_key=' + encodeURIComponent(apiKey);
    return libs.request_get(findUrl);
}
function qhexaListTmdbApiKeys() {
    return Promise.resolve(QHEXA_TMDB_API_KEYS.slice());
}
function qhexaSleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function qhexaGetRandomKey() {
    var out = '';
    for (var i = 0; i < 32; i++) {
        out += Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    }
    return out;
}
function qhexaBuildApiUrl(movieInfo, tmdbId) {
    var id = tmdbId !== undefined && tmdbId !== null && tmdbId !== '' ? tmdbId : movieInfo.tmdb_id;
    if (movieInfo.type == 'tv') {
        return QHEXA_DOMAIN + '/api/tmdb/tv/' + id + '/season/' + movieInfo.season + '/episode/' + movieInfo.episode + '/images';
    }
    return QHEXA_DOMAIN + '/api/tmdb/movie/' + id + '/images';
}
function qhexaNormalizeImdbNumeric(raw) {
    if (!raw) {
        return '';
    }
    return String(raw).replace(/^tt/i, '').trim();
}
function qhexaLooksLikeImdbNumeric(raw) {
    var value = qhexaNormalizeImdbNumeric(raw);
    if (!value || !/^\d+$/.test(value)) {
        return false;
    }
    if (value.length >= 7 && Number(value) >= 900000) {
        return true;
    }
    return false;
}
function qhexaNeedsTmdbResolve(movieInfo) {
    var rawTmdb = String(movieInfo && movieInfo.tmdb_id !== undefined && movieInfo.tmdb_id !== null ? movieInfo.tmdb_id : '');
    var imdbNumeric = qhexaNormalizeImdbNumeric(movieInfo && movieInfo.imdb_id ? movieInfo.imdb_id : '');
    if (!rawTmdb) {
        return imdbNumeric ? 'tt' + imdbNumeric : '';
    }
    if (/^tt/i.test(rawTmdb)) {
        return 'tt' + qhexaNormalizeImdbNumeric(rawTmdb);
    }
    if (imdbNumeric && rawTmdb === imdbNumeric) {
        return 'tt' + imdbNumeric;
    }
    if (!imdbNumeric && qhexaLooksLikeImdbNumeric(rawTmdb)) {
        return 'tt' + qhexaNormalizeImdbNumeric(rawTmdb);
    }
    return '';
}
function qhexaGetCachedTmdbId(cacheKey) {
    var cache = libs.__qhexaTmdbCache;
    if (cache && cache[cacheKey]) {
        return cache[cacheKey];
    }
    return '';
}
function qhexaSetCachedTmdbId(cacheKey, tmdbId) {
    if (!libs.__qhexaTmdbCache) {
        libs.__qhexaTmdbCache = {};
    }
    libs.__qhexaTmdbCache[cacheKey] = tmdbId;
}
function qhexaResolveTmdbId(movieInfo) { return __awaiter(_this, void 0, void 0, function () {
    var imdbId, cacheKey, cached, apiKeys, keyIndex, apiKey, findResult, resolved, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imdbId = qhexaNeedsTmdbResolve(movieInfo);
                if (!imdbId) {
                    return [2, String(movieInfo.tmdb_id || '')];
                }
                cacheKey = imdbId + '|' + String(movieInfo.type || 'movie');
                cached = qhexaGetCachedTmdbId(cacheKey);
                if (cached) {
                    console.log('[RN-Fetch][QHEXA-TMDB-RESOLVE] source=cache imdb=' + imdbId + ' tmdb=' + cached);
                    return [2, cached];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4, qhexaListTmdbApiKeys()];
            case 2:
                apiKeys = _a.sent();
                if (!apiKeys.length) {
                    console.log('[RN-Fetch][QHEXA-TMDB-RESOLVE] skip apikey-missing imdb=' + imdbId);
                    return [2, String(movieInfo.tmdb_id || '')];
                }
                keyIndex = 0;
                _a.label = 3;
            case 3:
                if (!(keyIndex < apiKeys.length)) return [3, 8];
                apiKey = apiKeys[keyIndex];
                console.log('[RN-Fetch][QHEXA-TMDB-KEY] try=' + (keyIndex + 1) + '/' + apiKeys.length);
                return [4, qhexaFetchTmdbFind(imdbId, apiKey)];
            case 4:
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
                if (!resolved) return [3, 6];
                qhexaSetCachedTmdbId(cacheKey, resolved);
                console.log('[RN-Fetch][QHEXA-TMDB-RESOLVE] imdb=' + imdbId + ' tmdb=' + resolved + ' key=' + (keyIndex + 1));
                return [2, resolved];
            case 6:
                keyIndex++;
                return [3, 3];
            case 8:
                console.log('[RN-Fetch][QHEXA-TMDB-RESOLVE] miss imdb=' + imdbId);
                return [2, String(movieInfo.tmdb_id || '')];
            case 9:
                e_1 = _a.sent();
                console.log('[RN-Fetch][QHEXA-TMDB-RESOLVE-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [2, String(movieInfo.tmdb_id || '')];
            case 10: return [2];
        }
    });
}); }
function qhexaIsValidCipherText(text) {
    if (!text || text.length < 20) {
        return false;
    }
    if (text.charAt(0) === '{' || text.charAt(0) === '[') {
        return false;
    }
    if (text.indexOf('<html') >= 0 || text.indexOf('<!DOCTYPE') >= 0) {
        return false;
    }
    return true;
}
function qhexaFetchCipherAndSources(urlData, capToken) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, headers, apiResponse, cipherText, decryptResponse, decryptJson, sources;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = qhexaGetRandomKey();
                headers = {
                    'user-agent': QHEXA_USER_AGENT,
                    Referer: QHEXA_REFERER,
                    Accept: 'text/plain',
                    'X-Api-Key': apiKey,
                    'X-Fingerprint-Lite': 'e9136c41504646444',
                    'x-cap-token': capToken,
                };
                return [4, fetch(urlData, {
                        method: 'GET',
                        headers: headers,
                    })];
            case 1:
                apiResponse = _a.sent();
                console.log('[RN-Fetch][QHEXA-CIPHER-HTTP] ' + apiResponse.status + ' ' + urlData);
                if (!apiResponse.ok) {
                    return [4, apiResponse.text().catch(function () { return ''; })];
                }
                return [3, 3];
            case 2:
                cipherText = _a.sent();
                console.log('[RN-Fetch][QHEXA-SKIP] cipher-http-' + apiResponse.status + ' body=' + String(cipherText).substring(0, 80));
                return [2, { sources: [], reason: 'cipher-http-' + apiResponse.status }];
            case 3: return [4, apiResponse.text()];
            case 4:
                cipherText = _a.sent();
                libs.log({ cipherLen: cipherText ? cipherText.length : 0, apiKey: apiKey, urlData: urlData }, QHEXA_PROVIDER, 'CIPHER');
                console.log('[RN-Fetch][QHEXA-CIPHER] len=' + (cipherText ? cipherText.length : 0));
                if (!qhexaIsValidCipherText(cipherText)) {
                    console.log('[RN-Fetch][QHEXA-SKIP] cipher-invalid body=' + String(cipherText).substring(0, 80));
                    return [2, { sources: [], reason: 'cipher-invalid' }];
                }
                return [4, fetch(QHEXA_DEC_URL, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            text: cipherText,
                            key: apiKey,
                        }),
                    })];
            case 5:
                decryptResponse = _a.sent();
                console.log('[RN-Fetch][QHEXA-DECRYPT-HTTP] ' + decryptResponse.status);
                if (!decryptResponse.ok) {
                    console.log('[RN-Fetch][QHEXA-SKIP] decrypt-http-' + decryptResponse.status);
                    return [2, { sources: [], reason: 'decrypt-http-' + decryptResponse.status }];
                }
                return [4, decryptResponse.json()];
            case 6:
                decryptJson = _a.sent();
                libs.log({ decryptJson: decryptJson }, QHEXA_PROVIDER, 'DECRYPT');
                sources = decryptJson && decryptJson.result && decryptJson.result.sources ? decryptJson.result.sources : [];
                console.log('[RN-Fetch][QHEXA-SOURCES] count=' + sources.length);
                if (!sources.length) {
                    console.log('[RN-Fetch][QHEXA-SKIP] sources-empty');
                    return [2, { sources: [], reason: 'sources-empty' }];
                }
                return [2, { sources: sources, reason: '' }];
        }
    });
}); }
function qhexaGetCachedToken() {
    var cache = libs.__qhexaCapCache;
    if (cache && cache.token && cache.expiresAt > Date.now()) {
        return cache.token;
    }
    return '';
}
function qhexaSetCachedToken(token) {
    libs.__qhexaCapCache = {
        token: token,
        expiresAt: Date.now() + QHEXA_CAP_CACHE_MS,
    };
}
function qhexaExtractTokenFromJson(json) {
    if (!json) {
        return '';
    }
    if (json.result && json.result.token) {
        return String(json.result.token);
    }
    if (json.token) {
        return String(json.token);
    }
    return '';
}
function qhexaFetchEncToken(method) {
    return fetch(QHEXA_ENC_TOKEN_URL, {
        method: method,
        headers: {
            'user-agent': QHEXA_USER_AGENT,
            'content-type': 'application/json',
        },
        body: method == 'POST' ? '{}' : undefined,
    }).then(function (response) {
        return response.json().then(function (json) {
            return {
                status: response.status,
                json: json,
            };
        }).catch(function () {
            return {
                status: response.status,
                json: null,
            };
        });
    });
}
function qhexaFetchCapToken() { return __awaiter(_this, void 0, void 0, function () {
    var cached, attempt, methodNames, methodIndex, methodName, result, capToken, lastError, lastHint;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = qhexaGetCachedToken();
                if (cached) {
                    console.log('[RN-Fetch][QHEXA-TOKEN] source=cache ' + cached.substring(0, 40) + '...');
                    return [2, { token: cached, source: 'cache' }];
                }
                if (!libs.__qhexaTokenPromise) {
                    libs.__qhexaTokenPromise = qhexaFetchCapTokenInner().finally(function () {
                        libs.__qhexaTokenPromise = null;
                    });
                }
                return [4, libs.__qhexaTokenPromise];
            case 1: return [2, _a.sent()];
        }
    });
}); }
function qhexaFetchCapTokenInner() { return __awaiter(_this, void 0, void 0, function () {
    var cached, attempt, methodNames, methodIndex, methodName, result, capToken, lastError, lastHint;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = qhexaGetCachedToken();
                if (cached) {
                    console.log('[RN-Fetch][QHEXA-TOKEN] source=cache ' + cached.substring(0, 40) + '...');
                    return [2, { token: cached, source: 'cache' }];
                }
                attempt = 0;
                lastError = '';
                lastHint = '';
                _a.label = 1;
            case 1:
                if (!(attempt < QHEXA_TOKEN_RETRY_MAX)) return [3, 10];
                attempt++;
                methodNames = ['GET', 'POST'];
                methodIndex = 0;
                _a.label = 2;
            case 2:
                if (!(methodIndex < methodNames.length)) return [3, 8];
                methodName = methodNames[methodIndex];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4, qhexaFetchEncToken(methodName)];
            case 4:
                result = _a.sent();
                console.log('[RN-Fetch][QHEXA-TOKEN-HTTP] ' + result.status + ' attempt=' + attempt + ' method=' + methodName);
                if (result.json && result.json.error) {
                    lastError = String(result.json.error);
                    console.log('[RN-Fetch][QHEXA-TOKEN-ERR] ' + lastError);
                }
                if (result.json && result.json.hint) {
                    lastHint = String(result.json.hint);
                    console.log('[RN-Fetch][QHEXA-TOKEN-HINT] ' + lastHint);
                }
                capToken = qhexaExtractTokenFromJson(result.json);
                if (result.status == 200 && capToken) {
                    qhexaSetCachedToken(capToken);
                    console.log('[RN-Fetch][QHEXA-TOKEN] source=enc-hexa ' + capToken.substring(0, 40) + '...');
                    return [2, { token: capToken, source: 'enc-hexa' }];
                }
                return [3, 6];
            case 5:
                _a.sent();
                console.log('[RN-Fetch][QHEXA-TOKEN-ERR] fetch-failed');
                return [3, 6];
            case 6:
                methodIndex++;
                return [3, 2];
            case 7: return [3, 10];
            case 8:
                if (!(attempt < QHEXA_TOKEN_RETRY_MAX)) return [3, 10];
                return [4, qhexaSleep(QHEXA_TOKEN_RETRY_MS)];
            case 9:
                _a.sent();
                return [3, 1];
            case 10:
                if (lastError) {
                    console.log('[RN-Fetch][QHEXA-SKIP] token-failed ' + lastError);
                }
                else {
                    console.log('[RN-Fetch][QHEXA-SKIP] token-empty');
                }
                if (lastHint) {
                    console.log('[RN-Fetch][QHEXA-SKIP-HINT] ' + lastHint);
                }
                return [2, { token: '', source: 'failed' }];
        }
    });
}); }
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var rawTmdb, tmdbId, urlData, tokenResult, capToken, fetchResult, sources, playHeaders, rank, _i, sources_1, item, serverName, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[RN-Fetch][QHEXA-VERSION] v4-tmdb-id-resolve');
                rawTmdb = movieInfo && movieInfo.tmdb_id !== undefined && movieInfo.tmdb_id !== null ? String(movieInfo.tmdb_id) : '';
                console.log('[RN-Fetch][QHEXA-TMDB] type=' + movieInfo.type + ' id=' + rawTmdb + ' imdb=' + String(movieInfo.imdb_id || '') + (movieInfo.type == 'tv' ? ' s' + movieInfo.season + 'e' + movieInfo.episode : ''));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4, qhexaResolveTmdbId(movieInfo)];
            case 2:
                tmdbId = _a.sent();
                if (tmdbId && rawTmdb && tmdbId !== rawTmdb) {
                    console.log('[RN-Fetch][QHEXA-TMDB-MAP] raw=' + rawTmdb + ' resolved=' + tmdbId);
                }
                urlData = qhexaBuildApiUrl(movieInfo, tmdbId);
                console.log('[RN-Fetch][QHEXA-API] ' + urlData);
                return [4, qhexaFetchCapToken()];
            case 3:
                tokenResult = _a.sent();
                capToken = tokenResult && tokenResult.token ? tokenResult.token : '';
                if (!capToken) {
                    return [2];
                }
                libs.log({ tokenSource: tokenResult.source, urlData: urlData, tmdbId: tmdbId }, QHEXA_PROVIDER, 'TOKEN');
                return [4, qhexaFetchCipherAndSources(urlData, capToken)];
            case 4:
                fetchResult = _a.sent();
                sources = fetchResult && fetchResult.sources ? fetchResult.sources : [];
                if (!sources.length) {
                    return [2];
                }
                playHeaders = {
                    Referer: QHEXA_REFERER,
                    Origin: 'https://hexa.su',
                    'user-agent': QHEXA_USER_AGENT,
                };
                rank = 1;
                _i = 0, sources_1 = sources;
                _a.label = 5;
            case 5:
                if (!(_i < sources_1.length)) return [3, 7];
                item = sources_1[_i];
                if (item && item.url) {
                    serverName = item.server ? String(item.server) : 'server' + rank;
                    libs.log({ server: serverName, file: item.url }, QHEXA_PROVIDER, 'FILE');
                    console.log('[RN-Fetch][QHEXA-PLAY] ' + serverName + ' ' + String(item.url).substring(0, 120));
                    libs.embed_callback(item.url, QHEXA_PROVIDER, QHEXA_PROVIDER + '-' + serverName, 'Hls', callback, rank, [], [{ file: item.url, quality: 1080 }], playHeaders, {
                        type: 'm3u8',
                    });
                    rank++;
                }
                _i++;
                return [3, 5];
            case 7: return [2, true];
            case 8:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, QHEXA_PROVIDER, 'ERROR');
                console.log('[RN-Fetch][QHEXA-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [3, 9];
            case 9: return [2, true];
        }
    });
}); };
