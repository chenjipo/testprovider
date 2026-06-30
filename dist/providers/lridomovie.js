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
var PROVIDER = 'LRIDOMOVIE';
var DOMAIN = 'https://ridomovies.is';
var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
function buildSiteHeaders(referer) {
    return {
        'user-agent': USER_AGENT,
        referer: referer || DOMAIN + '/',
        origin: DOMAIN,
        Accept: '*/*',
    };
}
function decodeHtmlEntities(text) {
    if (!text) {
        return '';
    }
    return String(text)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}
function extractIframeUrl(embedHtml) {
    var decoded = decodeHtmlEntities(embedHtml);
    var match = decoded.match(/src\s*=\s*["']([^"']+)/i);
    if (!match) {
        return '';
    }
    var iframeUrl = match[1];
    if (iframeUrl.indexOf('//') === 0) {
        return 'https:' + iframeUrl;
    }
    if (iframeUrl.indexOf('/') === 0) {
        return DOMAIN + iframeUrl;
    }
    return iframeUrl;
}
function extractPlayerEmbed(html) {
    if (!html) {
        return '';
    }
    var match = html.match(/id\s*=\s*["']player-cover["'][^>]*data-embed\s*=\s*["']([^"']+)/i);
    if (match) {
        return decodeHtmlEntities(match[1]);
    }
    match = html.match(/data-embed\s*=\s*["']([^"']+)["'][^>]*id\s*=\s*["']player-cover["']/i);
    if (match) {
        return decodeHtmlEntities(match[1]);
    }
    match = html.match(/data-embed\s*=\s*["']([^"']+)["']/i);
    if (match) {
        return decodeHtmlEntities(match[1]);
    }
    match = html.match(/<iframe[^>]+src\s*=\s*["']([^"']+)["']/i);
    if (match) {
        return '<iframe src="' + decodeHtmlEntities(match[1]) + '"></iframe>';
    }
    return '';
}
function extractStreamFromText(text) {
    if (!text) {
        return '';
    }
    var match = text.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
    if (match) {
        return match[0].replace(/\\/g, '');
    }
    match = text.match(/let\s+url\s*=\s*['"]([^'"]+)/i);
    if (match && match[1].indexOf('http') === 0) {
        return match[1];
    }
    return '';
}
function resolveCloseloadHandler(iframeUrl) {
    var hostKey = libs.url_get_host(iframeUrl);
    if (hosts && hosts[hostKey]) {
        return hosts[hostKey];
    }
    if (hosts && hosts['closeload'] && iframeUrl.indexOf('closeload') != -1) {
        return hosts['closeload'];
    }
    return null;
}
function lridomovieSleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function lridomovieBuildSlugFallback(movieInfo) {
    return libs.url_slug_search(movieInfo, '-');
}
function lridomovieFetchSearch(url, headers, attempt) {
    return __awaiter(_this, void 0, void 0, function () {
        var response, text, json, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    return [4, fetch(url, {
                            method: 'GET',
                            headers: headers,
                        })];
                case 1:
                    response = _a.sent();
                    console.log('[RN-Fetch][RIDO-SEARCH-HTTP] attempt=' + attempt + ' status=' + response.status);
                    if (!response.ok) {
                        if (attempt < 3) {
                            return [4, lridomovieSleep(800 * attempt)];
                        }
                        return [2, null];
                    }
                    return [4, response.text()];
                case 2:
                    text = _a.sent();
                    if (!text || text.indexOf('<html') >= 0 || text.indexOf('Just a moment') >= 0) {
                        console.log('[RN-Fetch][RIDO-SEARCH-BLOCK] cf-challenge');
                        if (attempt < 3) {
                            return [4, lridomovieSleep(800 * attempt)];
                        }
                        return [2, null];
                    }
                    try {
                        json = JSON.parse(text);
                    }
                    catch (parseError) {
                        console.log('[RN-Fetch][RIDO-SEARCH-BLOCK] json-parse-failed');
                        if (attempt < 3) {
                            return [4, lridomovieSleep(800 * attempt)];
                        }
                        return [2, null];
                    }
                    return [2, json];
                case 3:
                    _a.sent();
                    return [2, lridomovieFetchSearch(url, headers, attempt + 1)];
                case 4:
                    e_2 = _a.sent();
                    if (!(attempt < 3)) return [3, 6];
                    return [4, lridomovieSleep(800 * attempt)];
                case 5:
                    _a.sent();
                    return [2, lridomovieFetchSearch(url, headers, attempt + 1)];
                case 6: return [2, null];
            }
        });
    });
}
function lridomovieResolveSlug(movieInfo, parseSearch) {
    var slugDetail = '';
    var titleSlug = lridomovieBuildSlugFallback(movieInfo);
    var _i, _a, item;
    if (parseSearch && parseSearch.data && parseSearch.data.length) {
        for (_i = 0, _a = parseSearch.data; _i < _a.length; _i++) {
            item = _a[_i];
            if (String(item.tmdb_id) == String(movieInfo.tmdb_id)) {
                slugDetail = item.slug;
                break;
            }
        }
        if (!slugDetail) {
            for (_i = 0, _a = parseSearch.data; _i < _a.length; _i++) {
                item = _a[_i];
                if (item.slug && String(item.slug).indexOf(titleSlug) === 0) {
                    slugDetail = item.slug;
                    console.log('[RN-Fetch][RIDO-SLUG] title-prefix-match ' + slugDetail);
                    break;
                }
            }
        }
        if (!slugDetail && parseSearch.data[0] && parseSearch.data[0].slug) {
            slugDetail = parseSearch.data[0].slug;
            console.log('[RN-Fetch][RIDO-SLUG] first-result-fallback ' + slugDetail);
        }
    }
    if (!slugDetail) {
        slugDetail = titleSlug;
        console.log('[RN-Fetch][RIDO-SLUG] direct-fallback ' + slugDetail);
    }
    return slugDetail;
}
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var headers, slugDetail, url, parseSearch, detailUrl, pageHtml, pageStream, iframe, iframeUrl, streamHeaders, closeloadHandler, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('[RN-Fetch][RIDO-VERSION] v6-rn-no-cheerio');
                headers = buildSiteHeaders(DOMAIN + '/');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                url = DOMAIN + '/api/search?q=' + encodeURIComponent(libs.url_slug_search(movieInfo, ' '));
                console.log('[RN-Fetch][RIDO-SEARCH] ' + url);
                return [4, lridomovieFetchSearch(url, headers, 1)];
            case 2:
                parseSearch = _b.sent();
                libs.log({ parseSearch: parseSearch }, PROVIDER, 'PARSE SEARCH');
                slugDetail = lridomovieResolveSlug(movieInfo, parseSearch);
                libs.log({ slugDetail: slugDetail }, PROVIDER, 'SLUG_DETAIL');
                if (!slugDetail) {
                    console.log('[RN-Fetch][RIDO-SKIP] slug-not-found');
                    return [2];
                }
                detailUrl = DOMAIN + '/movie/' + slugDetail;
                if (movieInfo.type == 'tv') {
                    detailUrl = DOMAIN + '/tv/' + slugDetail + '/season-' + movieInfo.season + '/episode-' + movieInfo.episode;
                }
                console.log('[RN-Fetch][RIDO-PAGE] ' + detailUrl);
                return [4, fetch(detailUrl, {
                        headers: buildSiteHeaders(detailUrl + '/'),
                        method: 'GET',
                    })];
            case 3:
                pageHtml = _b.sent();
                return [4, pageHtml.text()];
            case 4:
                pageHtml = _b.sent();
                pageStream = extractStreamFromText(pageHtml);
                if (pageStream) {
                    console.log('[RN-Fetch][RIDO-DIRECT] page m3u8');
                    streamHeaders = buildSiteHeaders(detailUrl + '/');
                    libs.embed_callback(pageStream, PROVIDER, PROVIDER, 'Hls', callback, 0, [], [{ file: pageStream, quality: 1080 }], streamHeaders, { type: 'm3u8' });
                    return [2, true];
                }
                iframe = extractPlayerEmbed(pageHtml);
                libs.log({ iframe: iframe }, PROVIDER, 'IFRAME HTML');
                if (!iframe) {
                    console.log('[RN-Fetch][RIDO-SKIP] embed-empty');
                    return [2];
                }
                iframeUrl = extractIframeUrl(iframe);
                libs.log({ iframeUrl: iframeUrl }, PROVIDER, 'IFRAME URL');
                if (!iframeUrl) {
                    console.log('[RN-Fetch][RIDO-SKIP] iframe-parse-failed');
                    return [2];
                }
                if (iframeUrl.indexOf('.m3u8') != -1) {
                    streamHeaders = buildSiteHeaders(detailUrl + '/');
                    libs.embed_callback(iframeUrl, PROVIDER, PROVIDER, 'Hls', callback, 0, [], [{ file: iframeUrl, quality: 1080 }], streamHeaders, { type: 'm3u8' });
                    return [2, true];
                }
                streamHeaders = buildSiteHeaders(detailUrl + '/');
                closeloadHandler = resolveCloseloadHandler(iframeUrl);
                console.log('[RN-Fetch][RIDO-REDIRECT] host=' + libs.url_get_host(iframeUrl) + ' handler=' + (closeloadHandler ? 'closeload' : 'embed_redirect'));
                if (closeloadHandler) {
                    return [4, closeloadHandler(iframeUrl, movieInfo, PROVIDER, {
                            subs: [],
                            pageReferer: detailUrl + '/',
                            streamHeaders: streamHeaders,
                        }, callback)];
                }
                return [4, libs.embed_redirect(iframeUrl, '', movieInfo, PROVIDER, callback, PROVIDER, [], {}, streamHeaders)];
            case 5:
                _b.sent();
                return [3, 7];
            case 6:
                e_1 = _b.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                console.log('[RN-Fetch][RIDO-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [3, 7];
            case 7: return [2, true];
        }
    });
}); };
