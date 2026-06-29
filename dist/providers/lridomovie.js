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
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var headers, slugDetail, url, parseSearch, _i, _a, item, detailUrl, parseDetail, iframe, iframeUrl, streamHeaders, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('[RN-Fetch][RIDO-VERSION] v2');
                headers = buildSiteHeaders(DOMAIN + '/');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                slugDetail = '';
                url = DOMAIN + '/api/search?q=' + encodeURIComponent(libs.url_slug_search(movieInfo, ' '));
                console.log('[RN-Fetch][RIDO-SEARCH] ' + url);
                return [4, libs.request_get(url, headers)];
            case 2:
                parseSearch = _b.sent();
                libs.log({ parseSearch: parseSearch }, PROVIDER, 'PARSE SEARCH');
                if (!parseSearch || !parseSearch.data || !parseSearch.data.length) {
                    console.log('[RN-Fetch][RIDO-SKIP] search-empty');
                    return [2];
                }
                for (_i = 0, _a = parseSearch.data; _i < _a.length; _i++) {
                    item = _a[_i];
                    if (String(item.tmdb_id) == String(movieInfo.tmdb_id)) {
                        slugDetail = item.slug;
                        break;
                    }
                }
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
                return [4, libs.request_get(detailUrl, buildSiteHeaders(detailUrl + '/'), true)];
            case 3:
                parseDetail = _b.sent();
                iframe = parseDetail('#player-cover').attr('data-embed');
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
                console.log('[RN-Fetch][RIDO-REDIRECT] host=' + libs.url_get_host(iframeUrl));
                return [4, libs.embed_redirect(iframeUrl, '', movieInfo, PROVIDER, callback, PROVIDER, [], {}, streamHeaders)];
            case 4:
                _b.sent();
                return [3, 6];
            case 5:
                e_1 = _b.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                console.log('[RN-Fetch][RIDO-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [3, 6];
            case 6: return [2, true];
        }
    });
}); };
