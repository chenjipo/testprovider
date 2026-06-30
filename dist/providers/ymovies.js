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
var PROVIDER = 'YMovies';
var DOMAIN = 'https://ww.ymovies.vip';
var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
function buildSiteHeaders(referer) {
    return {
        'user-agent': USER_AGENT,
        referer: referer || DOMAIN + '/',
        origin: DOMAIN,
        Accept: 'text/html,application/json,*/*',
        'x-requested-with': 'XMLHttpRequest',
    };
}
function normalizeDetailUrl(href) {
    if (!href) {
        return '';
    }
    if (href.indexOf('http') === 0) {
        return href;
    }
    if (href.indexOf('/') === 0) {
        return DOMAIN + href;
    }
    return DOMAIN + '/' + href;
}
function extractFilmId(linkDetail) {
    var path = String(linkDetail).replace(/\/+$/, '');
    var slug = path.split('/').pop() || '';
    var parts = slug.split('-');
    return parts[parts.length - 1] || '';
}
function fetchHtml(url, referer) {
    return fetch(url, {
        headers: buildSiteHeaders(referer),
        method: 'GET',
    }).then(function (response) {
        return response.text();
    });
}
function fetchJson(url, referer) {
    return fetch(url, {
        headers: buildSiteHeaders(referer),
        method: 'GET',
    }).then(function (response) {
        return response.json();
    });
}
function parseAttrFromTag(tag, attrName) {
    var pattern = new RegExp(attrName + '\\s*=\\s*["\']([^"\']+)', 'i');
    var match = tag.match(pattern);
    return match ? match[1] : '';
}
function parseServerTokens(html) {
    var tokens = [];
    var source = html || '';
    var tagRegex = /<a\b[^>]*class="[^"]*link-item[^"]*"[^>]*>/gi;
    var tagMatch;
    while ((tagMatch = tagRegex.exec(source)) !== null) {
        var tag = tagMatch[0];
        var dataId = parseAttrFromTag(tag, 'data-id');
        var dataName = parseAttrFromTag(tag, 'data-name');
        if (!dataId || !dataName) {
            continue;
        }
        var exists = false;
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].id === dataId && tokens[i].name === dataName) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            tokens.push({
                id: dataId,
                name: dataName,
            });
        }
    }
    return tokens;
}
function ymoviesSleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function ymoviesGetGlobalRoot() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return {};
}
function ymoviesIsCryptoLib(lib) {
    return !!(lib && lib.AES && lib.enc && lib.enc.Base64 && lib.lib);
}
function ymoviesSaveCrypto(lib) {
    if (!ymoviesIsCryptoLib(lib)) {
        return;
    }
    if (typeof libs !== 'undefined' && libs) {
        libs.__fstreamCrypto = lib;
    }
    ymoviesGetGlobalRoot().__fstreamCrypto = lib;
}
function ymoviesLoadCryptoFromCache() {
    if (typeof libs !== 'undefined' && libs && ymoviesIsCryptoLib(libs.__fstreamCrypto)) {
        return libs.__fstreamCrypto;
    }
    var root = ymoviesGetGlobalRoot();
    if (ymoviesIsCryptoLib(root.__fstreamCrypto)) {
        ymoviesSaveCrypto(root.__fstreamCrypto);
        console.log('[RN-Fetch][YMOVIES-CRYPTO] global-cache');
        return root.__fstreamCrypto;
    }
    return null;
}
function ymoviesResolveGlobalCrypto() {
    var root = ymoviesGetGlobalRoot();
    var candidates = [];
    if (typeof cryptoS !== 'undefined') {
        candidates.push(cryptoS);
    }
    if (root.cryptoS) {
        candidates.push(root.cryptoS);
    }
    if (typeof CryptoJS !== 'undefined') {
        candidates.push(CryptoJS);
    }
    if (root.CryptoJS) {
        candidates.push(root.CryptoJS);
    }
    for (var i = 0; i < candidates.length; i++) {
        if (ymoviesIsCryptoLib(candidates[i])) {
            return candidates[i];
        }
    }
    return null;
}
function ymoviesEnsureRnCryptoPolyfill() {
    var root = ymoviesGetGlobalRoot();
    if (root.crypto && typeof root.crypto.getRandomValues === 'function') {
        return;
    }
    var polyfill = {
        getRandomValues: function (arr) {
            for (var i = 0; i < arr.length; i++) {
                arr[i] = Math.floor(Math.random() * 256);
            }
            return arr;
        },
    };
    root.crypto = polyfill;
    if (typeof global !== 'undefined' && !global.crypto) {
        global.crypto = polyfill;
    }
}
function ymoviesPatchCryptoJsRandom(lib) {
    if (!lib || !lib.lib || !lib.lib.WordArray) {
        return;
    }
    lib.lib.WordArray.random = function (nBytes) {
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
            words.push((Math.random() * 0x100000000) | 0);
        }
        return lib.lib.WordArray.create(words, nBytes);
    };
    if (lib.lib.SecureRandom && lib.lib.SecureRandom.prototype) {
        lib.lib.SecureRandom.prototype.nextBytes = function (words) {
            for (var i = 0; i < words.length; i += 4) {
                words[i] = (Math.random() * 0x100000000) | 0;
            }
        };
    }
}
function ymoviesEnsureCrypto() {
    return __awaiter(_this, void 0, void 0, function () {
        var cached, lib, code, loadErr_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cached = ymoviesLoadCryptoFromCache();
                    if (cached) {
                        return [2, cached];
                    }
                    lib = ymoviesResolveGlobalCrypto();
                    if (lib) {
                        ymoviesSaveCrypto(lib);
                        console.log('[RN-Fetch][YMOVIES-CRYPTO] global-ok');
                        return [2, lib];
                    }
                    ymoviesEnsureRnCryptoPolyfill();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetch('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js').then(function (response) {
                            return response.text();
                        })];
                case 2:
                    code = _a.sent();
                    if (code && code.length > 1000) {
                        eval(code);
                        if (typeof CryptoJS !== 'undefined' && ymoviesIsCryptoLib(CryptoJS)) {
                            ymoviesPatchCryptoJsRandom(CryptoJS);
                            ymoviesSaveCrypto(CryptoJS);
                            console.log('[RN-Fetch][YMOVIES-CRYPTO] cdn-patched');
                            return [2, CryptoJS];
                        }
                    }
                    return [3, 4];
                case 3:
                    loadErr_1 = _a.sent();
                    console.log('[RN-Fetch][YMOVIES-CRYPTO-ERR] ' + String(loadErr_1 && loadErr_1.message ? loadErr_1.message : loadErr_1));
                    return [3, 4];
                case 4:
                    console.log('[RN-Fetch][YMOVIES-SKIP] crypto-unavailable');
                    return [2, null];
            }
        });
    });
}
function ymoviesEnsureFstreamHandler() {
    return __awaiter(_this, void 0, void 0, function () {
        var attempt, code, loadErr_1, cryptoReady;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ymoviesEnsureCrypto()];
                case 1:
                    cryptoReady = _a.sent();
                    if (!cryptoReady) {
                        return [2, null];
                    }
                    if (hosts && hosts['fstream365']) {
                        return [2, hosts['fstream365']];
                    }
                    attempt = 0;
                    _a.label = 1;
                case 1:
                    if (!(attempt < 8)) return [3, 7];
                    attempt++;
                    if (hosts && hosts['fstream365']) {
                        return [2, hosts['fstream365']];
                    }
                    if (!(attempt === 1)) return [3, 3];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, fetch('https://raw.githubusercontent.com/chenjipo/myprovider/main/dist/hosts/fstream365.js').then(function (response) {
                            return response.text();
                        })];
                case 3:
                    code = _a.sent();
                    if (code && code.indexOf('hosts["fstream365"]') != -1) {
                        eval(code);
                        console.log('[RN-Fetch][YMOVIES-HOST] fstream365 loaded eval=yes');
                    }
                    return [3, 5];
                case 4:
                    loadErr_1 = _a.sent();
                    console.log('[RN-Fetch][YMOVIES-HOST-ERR] ' + String(loadErr_1 && loadErr_1.message ? loadErr_1.message : loadErr_1));
                    return [3, 5];
                case 5: return [4, ymoviesSleep(250)];
                case 6:
                    _a.sent();
                    return [3, 1];
                case 7:
                    if (hosts && hosts['fstream365']) {
                        return [2, hosts['fstream365']];
                    }
                    console.log('[RN-Fetch][YMOVIES-SKIP] fstream365-host-missing');
                    return [2, null];
            }
        });
    });
}
function ymoviesRedirectEmbed(embedUrl, movieInfo, linkDetail, streamHeaders, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ymoviesEnsureFstreamHandler()];
                case 1:
                    handler = _a.sent();
                    if (!handler) return [3, 3];
                    console.log('[RN-Fetch][YMOVIES-REDIRECT] host=fstream365 handler=direct');
                    return [4, handler(embedUrl, movieInfo, PROVIDER, {
                            subs: [],
                            options: { link_detail: linkDetail },
                        }, callback)];
                case 2:
                    _a.sent();
                    return [2];
                case 3:
                    console.log('[RN-Fetch][YMOVIES-REDIRECT] host=fstream365 handler=embed_redirect');
                    return [4, libs.embed_redirect(embedUrl, '', movieInfo, PROVIDER, callback, PROVIDER, [], { link_detail: linkDetail }, streamHeaders)];
                case 4:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function resolveYmoviesDetailLink(searchHtml, movieInfo) {
    var linkDetail = '';
    var itemRegex = /<div\b[^>]*class="[^"]*ml-item[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi;
    var itemMatch;
    while ((itemMatch = itemRegex.exec(searchHtml)) !== null) {
        var block = itemMatch[0];
        var titleMatch = block.match(/class="[^"]*mi-name[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i);
        var hrefMatch = block.match(/class="[^"]*mi-name[^"]*"[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"/i);
        var yearMatch = block.match(/class="[^"]*mi-meta[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i);
        var typeMatch = block.match(/class="[^"]*mim-type[^"]*"[^>]*>([^<]+)</i);
        var title = titleMatch ? titleMatch[1].trim() : '';
        var href = hrefMatch ? hrefMatch[1].trim() : '';
        var year = yearMatch ? yearMatch[1].trim() : '';
        var type = typeMatch ? typeMatch[1].trim().toLowerCase() : '';
        if (!title || !href || !type || linkDetail) {
            continue;
        }
        if (!libs.string_matching_title(movieInfo, title, false)) {
            continue;
        }
        if (movieInfo.type == 'movie' && type == 'movie' && String(movieInfo.year) == String(year)) {
            linkDetail = normalizeDetailUrl(href);
        }
        if (movieInfo.type == 'tv' && type == 'tv') {
            linkDetail = normalizeDetailUrl(href);
        }
    }
    return linkDetail;
}
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var urlSearch, searchHtml, linkDetail, filmId, hrefEpisode, dataEpisode, tokens_2, streamHeaders, _i, tokens_1, item, urlEmbed, dataEmbed, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[RN-Fetch][YMOVIES-VERSION] v6-rn-crypto-global');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                urlSearch = DOMAIN + '/movie/search/' + libs.url_slug_search(movieInfo, '+');
                console.log('[RN-Fetch][YMOVIES-SEARCH] ' + urlSearch);
                return [4, fetchHtml(urlSearch)];
            case 2:
                searchHtml = _a.sent();
                if (!searchHtml) {
                    console.log('[RN-Fetch][YMOVIES-SKIP] search-empty');
                    return [2];
                }
                linkDetail = resolveYmoviesDetailLink(searchHtml, movieInfo);
                libs.log({ linkDetail: linkDetail }, PROVIDER, 'LINK DETAIL');
                console.log('[RN-Fetch][YMOVIES-DETAIL] ' + (linkDetail || 'none'));
                if (!linkDetail) {
                    console.log('[RN-Fetch][YMOVIES-SKIP] no-match');
                    return [2];
                }
                filmId = extractFilmId(linkDetail);
                libs.log({ filmId: filmId }, PROVIDER, 'FILM ID');
                console.log('[RN-Fetch][YMOVIES-ID] ' + filmId);
                if (!filmId) {
                    console.log('[RN-Fetch][YMOVIES-SKIP] no-id');
                    return [2];
                }
                hrefEpisode = '';
                if (movieInfo.type == 'movie') {
                    hrefEpisode = DOMAIN + '/ajax/movie/episode/servers/' + filmId + '_1_full';
                }
                else {
                    hrefEpisode = DOMAIN + '/ajax/movie/episode/servers/' + filmId + '_' + movieInfo.season + '_' + movieInfo.episode;
                }
                console.log('[RN-Fetch][YMOVIES-SERVERS] ' + hrefEpisode);
                return [4, fetchJson(hrefEpisode, linkDetail)];
            case 3:
                dataEpisode = _a.sent();
                libs.log({ dataEpisode: dataEpisode }, PROVIDER, 'DATA EPISODE');
                if (!dataEpisode || !dataEpisode.status || !dataEpisode.html) {
                    console.log('[RN-Fetch][YMOVIES-SKIP] servers-empty');
                    return [2];
                }
                tokens_2 = parseServerTokens(dataEpisode.html);
                libs.log({ tokens: tokens_2 }, PROVIDER, 'TOKENS');
                console.log('[RN-Fetch][YMOVIES-TOKENS] count=' + tokens_2.length);
                if (!tokens_2.length) {
                    console.log('[RN-Fetch][YMOVIES-SKIP] no-servers');
                    return [2];
                }
                streamHeaders = {
                    referer: linkDetail,
                    'user-agent': USER_AGENT,
                };
                _i = 0, tokens_1 = tokens_2;
                _a.label = 4;
            case 4:
                if (!(_i < tokens_1.length)) return [3, 8];
                item = tokens_1[_i];
                urlEmbed = DOMAIN + '/ajax/movie/episode/server/sources/' + item.id + '_' + item.name;
                console.log('[RN-Fetch][YMOVIES-SOURCE] ' + item.name);
                return [4, fetchJson(urlEmbed, linkDetail)];
            case 5:
                dataEmbed = _a.sent();
                if (!dataEmbed || !dataEmbed.status || !dataEmbed.src) {
                    return [3, 7];
                }
                console.log('[RN-Fetch][YMOVIES-EMBED] ' + String(dataEmbed.src).substring(0, 120));
                return [4, ymoviesRedirectEmbed(dataEmbed.src, movieInfo, linkDetail, streamHeaders, callback)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3, 4];
            case 8: return [3, 10];
            case 9:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                console.log('[RN-Fetch][YMOVIES-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [3, 10];
            case 10: return [2, true];
        }
    });
}); };
