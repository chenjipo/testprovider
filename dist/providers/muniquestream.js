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
        while (_) try {
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
var PROVIDER = 'MUniqueStream';
var DOMAIN = 'https://uniquestream.net';
var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';
function getUniqueStreamState() {
    if (!libs.__uniquestreamState) {
        libs.__uniquestreamState = { played: {}, embedDone: {} };
    }
    return libs.__uniquestreamState;
}
function buildPageUrl(movieInfo) {
    if (movieInfo.type == 'tv') {
        return DOMAIN + '/episodes/' + libs.url_slug_search(movieInfo) + '-' + movieInfo.year + '-season-' + movieInfo.season + '-episode-' + movieInfo.episode;
    }
    return DOMAIN + '/movies/' + libs.url_slug_search(movieInfo) + '-' + movieInfo.year;
}
function normalizeIframeUrl(iframeUrl) {
    if (!iframeUrl) {
        return '';
    }
    if (iframeUrl.indexOf('//') === 0) {
        return 'https:' + iframeUrl;
    }
    if (iframeUrl.indexOf('/') === 0) {
        return DOMAIN + iframeUrl;
    }
    return iframeUrl;
}
function parseIframeFromEmbedResponse(parseEmbed) {
    var iframeData = parseEmbed && parseEmbed.embed_url ? parseEmbed.embed_url : '';
    var iframeMatch = iframeData.match(/src="([^"]+)/i);
    return normalizeIframeUrl(iframeMatch ? iframeMatch[1] : '');
}
function extractLetUrlFromHtml(text) {
    var match = text.match(/let\s+url\s*=\s*['"]([^'"]+)/i);
    return match ? match[1] : '';
}
function buildHlsRefererHeaders() {
    return {
        'user-agent': USER_AGENT,
        'referer': 'https://hls.uniquestream.net/',
        'origin': 'https://hls.uniquestream.net',
        'Referer': 'https://hls.uniquestream.net/',
        'Origin': 'https://hls.uniquestream.net',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
    };
}
function isValidM3u8Body(text) {
    return !!(text && String(text).trim().indexOf('#EXTM3U') === 0);
}
function isMediacacheUrl(url) {
    return !!(url && (url.indexOf('mediacache.cc') >= 0 || url.indexOf('hls.uniquestream.net') >= 0));
}
function resolveM3u8Url(baseUrl, relativeUrl) {
    if (!relativeUrl) {
        return '';
    }
    var file = relativeUrl.trim();
    if (file.indexOf('http://') === 0 || file.indexOf('https://') === 0) {
        return file;
    }
    var base = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
    if (file.charAt(0) === '/') {
        var match = baseUrl.match(/^(https?:\/\/[^/]+)/);
        return match ? match[1] + file : file;
    }
    return base + file;
}
function parseMasterQualities(masterText, masterUrl) {
    var lines = String(masterText || '').split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('#EXT-X-STREAM-INF:') !== 0) {
            continue;
        }
        var resolutionMatch = lines[i].match(/RESOLUTION=(\d+)x(\d+)/i);
        var bandwidthMatch = lines[i].match(/BANDWIDTH=(\d+)/i);
        var nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
        if (!nextLine || nextLine.charAt(0) === '#') {
            continue;
        }
        var quality = resolutionMatch ? parseInt(resolutionMatch[2], 10) : (bandwidthMatch ? Math.round(parseInt(bandwidthMatch[1], 10) / 1000) : 720);
        result.push({
            file: resolveM3u8Url(masterUrl, nextLine),
            quality: quality,
        });
        i++;
    }
    return result;
}
function playKeyFromUrl(file) {
    if (!file) {
        return '';
    }
    var qIdx = file.indexOf('?');
    return qIdx >= 0 ? file.substring(0, qIdx) : file;
}
function normalizeMediacachePlaylistUrl(url) {
    if (!url) {
        return '';
    }
    var file = String(url);
    if (file.indexOf('/video.m3u8') >= 0) {
        return file.replace('/video.m3u8', '/master.m3u8');
    }
    return file;
}
function deliverUniqueStreamLink(playUrl, callback, sorted, headerDirect) {
    var state = getUniqueStreamState();
    var playKey = playKeyFromUrl(playUrl) || String(playUrl).substring(0, 160);
    if (state.played[playKey]) {
        return;
    }
    state.played[playKey] = true;
    var playFile = sorted.length ? sorted[0].file : playUrl;
    console.log('[RN-Fetch][UNIQUESTREAM-PLAY] url=' + String(playFile).substring(0, 140) + ' qualities=' + sorted.length);
    libs.embed_callback(playFile, PROVIDER, PROVIDER, 'Hls', callback, 0, [], sorted, headerDirect, {
        type: 'm3u8',
    });
}
function finishUniqueStreamProviderEmbed(playUrl, callback, qualities, headerDirect, metadata) {
    var sorted = _.orderBy(qualities || [], ['quality'], ['desc']);
    if (!sorted.length) {
        sorted = [{ file: playUrl, quality: 1080 }];
    }
    if (!isMediacacheUrl(playUrl)) {
        console.log('[RN-Fetch][UNIQUESTREAM-PLAY] skip non-mediacache url=' + String(playUrl).substring(0, 100));
        return;
    }
    deliverUniqueStreamLink(playUrl, callback, sorted, headerDirect);
}
function probeAndEmbedPlaylist(playlistUrl, callback, metadata) { return __awaiter(_this, void 0, void 0, function () {
    var headers, masterBody, qualities, sorted, probeIdx, probeCandidate, probeBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                headers = buildHlsRefererHeaders();
                return [4, libs.request_get(playlistUrl, headers)];
            case 1:
                masterBody = _a.sent();
                if (!isValidM3u8Body(masterBody)) {
                    return [2, false];
                }
                qualities = parseMasterQualities(masterBody, playlistUrl);
                if (qualities.length > 1) {
                    sorted = _.orderBy(qualities, ['quality'], ['desc']);
                    probeIdx = 0;
                    return [3, 2];
                }
                finishUniqueStreamProviderEmbed(playlistUrl, callback, [{ file: playlistUrl, quality: 1080 }], headers, metadata);
                return [2, true];
            case 2:
                if (!(probeIdx < sorted.length)) {
                    finishUniqueStreamProviderEmbed(playlistUrl, callback, sorted, headers, metadata);
                    return [2, true];
                }
                probeCandidate = sorted[probeIdx];
                return [4, libs.request_get(probeCandidate.file, headers)];
            case 3:
                probeBody = _a.sent();
                if (isValidM3u8Body(probeBody)) {
                    console.log('[RN-Fetch][UNIQUESTREAM-PROBE] ok master quality=' + probeCandidate.quality);
                    finishUniqueStreamProviderEmbed(playlistUrl, callback, sorted, headers, metadata);
                    return [2, true];
                }
                probeIdx++;
                return [3, 2];
        }
    });
}); }
function embedMediacacheMaster(playlistUrl, callback, metadata) { return __awaiter(_this, void 0, void 0, function () {
    var rawUrl, masterUrl, dedupeKey, ok;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isMediacacheUrl(playlistUrl)) {
                    console.log('[RN-Fetch][UNIQUESTREAM-PROBE] reject url=' + String(playlistUrl).substring(0, 100));
                    return [2];
                }
                rawUrl = String(playlistUrl);
                masterUrl = normalizeMediacachePlaylistUrl(rawUrl);
                dedupeKey = playKeyFromUrl(masterUrl) || playKeyFromUrl(rawUrl);
                if (getUniqueStreamState().embedDone[dedupeKey]) {
                    return [2];
                }
                getUniqueStreamState().embedDone[dedupeKey] = true;
                console.log('[RN-Fetch][UNIQUESTREAM-PREFETCH] raw=' + rawUrl.substring(0, 80) + ' master=' + masterUrl.substring(0, 80));
                return [4, probeAndEmbedPlaylist(masterUrl, callback, metadata)];
            case 1:
                ok = _a.sent();
                if (ok || masterUrl === rawUrl) {
                    return [2];
                }
                console.log('[RN-Fetch][UNIQUESTREAM-PROBE] master miss, retry raw');
                return [4, probeAndEmbedPlaylist(rawUrl, callback, metadata)];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); }
function fireEmbedHostFallback(iframeUrl, movieInfo, callback, pageReferer) {
    if (!(iframeUrl && hosts && hosts['uniquestream-embed'])) {
        return;
    }
    console.log('[RN-Fetch][UNIQUESTREAM-EMBED] queue webview fallback');
    libs.scheduleEmbedWebview(PROVIDER, function () {
        hosts['uniquestream-embed'](iframeUrl, movieInfo || {}, PROVIDER, {
            embedUrl: iframeUrl,
            pageReferer: pageReferer,
        }, callback);
    });
}
function tryRnPrefetchIframe(iframeUrl, pageReferer) { return __awaiter(_this, void 0, void 0, function () {
    var text, directUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                return [4, libs.request_get(iframeUrl, {
                        referer: pageReferer,
                        'user-agent': USER_AGENT,
                    }, false)];
            case 1:
                text = _a.sent();
                directUrl = extractLetUrlFromHtml(text);
                if (!directUrl) {
                    return [2, ''];
                }
                directUrl = normalizeMediacachePlaylistUrl(directUrl);
                console.log('[RN-Fetch][UNIQUESTREAM-PREFETCH] url=' + directUrl.substring(0, 140));
                return [2, directUrl];
        }
    });
}); }
function resolveUniqueStreamIframe(movieInfo) { return __awaiter(_this, void 0, void 0, function () {
    var urlSearch, headerCookie, cache, parseSearch, postID, scriptNonce, nonce, serverType, btnType, body, parseEmbed, iframeUrl, prefetchUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = buildPageUrl(movieInfo);
                return [4, fetch(DOMAIN + '/wp-content/plugins/litespeed-cache/guest.vary.php', {
                        headers: {
                            'user-agent': USER_AGENT,
                            Accept: '*/*',
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        method: 'POST',
                    })];
            case 1:
                _a.sent();
                return [4, libs.cookies_get(DOMAIN + '/wp-content/plugins/litespeed-cache/guest.vary.php')];
            case 2:
                headerCookie = _a.sent();
                cache = headerCookie && headerCookie['_lscache_vary'] ? headerCookie['_lscache_vary']['value'] || '' : '';
                if (!cache) {
                    libs.log({ headerCookie: headerCookie }, PROVIDER, 'COOKIE EMPTY');
                    return [2, null];
                }
                libs.log({ urlSearch: urlSearch }, PROVIDER, 'URL SEARCH');
                return [4, libs.request_get(urlSearch, {
                        'user-agent': USER_AGENT,
                        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        Cookie: '_lscache_vary=' + cache + ';',
                    }, true)];
            case 3:
                parseSearch = _a.sent();
                postID = parseSearch('.server-btn').first().attr('data-post');
                serverType = movieInfo.type == 'tv' ? 'tv' : 'mv';
                btnType = parseSearch('.server-btn').first().attr('data-type');
                if (btnType && (movieInfo.type != 'tv' || btnType == 'tv')) {
                    serverType = btnType;
                }
                scriptNonce = parseSearch('#uniquestream-player-js-extra').text();
                nonce = scriptNonce.match(/"nonce"\s*:\s*"([^"]+)/i);
                nonce = nonce ? nonce[1] : '';
                libs.log({ postID: postID, nonce: nonce, serverType: serverType }, PROVIDER, 'PAGE META');
                if (!postID || !nonce) {
                    return [2, null];
                }
                body = qs.stringify({
                    action: 'uniquestream_player_ajax',
                    nonce: nonce,
                    post: postID,
                    type: serverType,
                    nume: 1,
                });
                return [4, libs.request_post(DOMAIN + '/wp-admin/admin-ajax.php', {
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        referer: urlSearch,
                        origin: DOMAIN,
                        'X-Requested-With': 'XMLHttpRequest',
                        'user-agent': USER_AGENT,
                        Cookie: '_lscache_vary=' + cache + ';',
                    }, body, false)];
            case 4:
                parseEmbed = _a.sent();
                libs.log({ parseEmbed: parseEmbed }, PROVIDER, 'EMBED INFO');
                iframeUrl = parseIframeFromEmbedResponse(parseEmbed);
                if (!iframeUrl) {
                    return [2, null];
                }
                libs.log({ iframeUrl: iframeUrl }, PROVIDER, 'IFRAME URL');
                return [4, tryRnPrefetchIframe(iframeUrl, urlSearch + '/')];
            case 5:
                prefetchUrl = _a.sent();
                return [2, {
                        iframeUrl: iframeUrl,
                        pageReferer: urlSearch + '/',
                        prefetchUrl: prefetchUrl,
                    }];
        }
    });
}); }
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var resolved, prefetchUrl, iframeUrl, pageReferer, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                libs.beginVodLinkSession();
                console.log('[RN-Fetch][UNIQUESTREAM-VERSION] v13');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, resolveUniqueStreamIframe(movieInfo)];
            case 2:
                resolved = _a.sent();
                if (!resolved || !resolved.iframeUrl) {
                    return [2];
                }
                iframeUrl = resolved.iframeUrl;
                pageReferer = resolved.pageReferer;
                prefetchUrl = resolved.prefetchUrl;
                if (!prefetchUrl) {
                    fireEmbedHostFallback(iframeUrl, movieInfo, callback, pageReferer);
                    return [2, true];
                }
                console.log('[RN-Fetch][UNIQUESTREAM-URL] source=rn-prefetch url=' + prefetchUrl.substring(0, 140));
                return [4, embedMediacacheMaster(prefetchUrl, callback, {})];
            case 3:
                _a.sent();
                if (!Object.keys(getUniqueStreamState().embedDone || {}).length && !Object.keys(getUniqueStreamState().played || {}).length) {
                    fireEmbedHostFallback(iframeUrl, movieInfo, callback, pageReferer);
                }
                return [2, true];
            case 5:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                return [2];
        }
    });
}); };
