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
var PROVIDER = 'Fawesome';
var SITE = 'https://fawesome.tv';
var API_BASE = 'https://rapi.ifood.tv/recipes.php';
var APP_ID = '9';
var SITE_ID = '236';
var AUTH_TOKEN = '1217575';
var USER_AGENT = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36';
function ffawesomeBuildHeaders() {
    return {
        'user-agent': USER_AGENT,
        Accept: 'application/json,text/plain,*/*',
        referer: SITE + '/',
        Referer: SITE + '/',
        origin: SITE,
        Origin: SITE,
    };
}
function ffawesomeBuildPlayHeaders() {
    return {
        'user-agent': USER_AGENT,
        referer: SITE + '/',
        Referer: SITE + '/',
        origin: SITE,
        Origin: SITE,
        Accept: '*/*',
    };
}
function ffawesomeApiUrl(params) {
    var query = [];
    var key;
    for (key in params) {
        if (!Object.prototype.hasOwnProperty.call(params, key)) {
            continue;
        }
        if (params[key] === undefined || params[key] === null || params[key] === '') {
            continue;
        }
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(params[key])));
    }
    return API_BASE + '?' + query.join('&');
}
function ffawesomeNormalizeTitle(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function ffawesomeHasDrm(item) {
    if (!item) {
        return true;
    }
    var drm = item.drm;
    if (drm === true || drm === 1 || drm === '1') {
        return true;
    }
    if (typeof drm === 'string' && drm && drm !== '0' && drm.toLowerCase() !== 'false') {
        return true;
    }
    return false;
}
function ffawesomePickPlayUrl(item) {
    if (!item || ffawesomeHasDrm(item)) {
        return '';
    }
    var hls = String(item.video_hls_url || '').trim();
    if (hls.indexOf('http') === 0) {
        return hls;
    }
    var mp4 = String(item.video_url || item.video_flv_url || '').trim();
    if (mp4.indexOf('http') === 0) {
        return mp4;
    }
    return '';
}
function ffawesomePlayType(url) {
    var text = String(url || '').toLowerCase();
    if (text.indexOf('.m3u8') >= 0) {
        return 'm3u8';
    }
    if (text.indexOf('.mp4') >= 0) {
        return 'mp4';
    }
    return 'm3u8';
}
function ffawesomeCollectPosts(payload) {
    var out = [];
    function walk(node, depth) {
        if (!node || depth > 8) {
            return;
        }
        if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
                walk(node[i], depth + 1);
            }
            return;
        }
        if (typeof node !== 'object') {
            return;
        }
        var title = node.title ? String(node.title) : '';
        var nodeId = node.node_id !== undefined && node.node_id !== null ? String(node.node_id) : '';
        var playUrl = ffawesomePickPlayUrl(node);
        if (title && (playUrl || node.type === 'post' || node.feed_type === 'video')) {
            out.push(node);
        }
        var keys = Object.keys(node);
        for (var k = 0; k < keys.length; k++) {
            var val = node[keys[k]];
            if (val && typeof val === 'object') {
                walk(val, depth + 1);
            }
        }
    }
    walk(payload, 0);
    return out;
}
function ffawesomeScoreItem(item, movieInfo) {
    var want = ffawesomeNormalizeTitle(movieInfo.title);
    var got = ffawesomeNormalizeTitle(item.title);
    if (!want || !got) {
        return -1;
    }
    var score = 0;
    if (got === want) {
        score += 100;
    }
    else if (got.indexOf(want) >= 0 || want.indexOf(got) >= 0) {
        score += 60;
    }
    else {
        var wantParts = want.split(' ');
        var hit = 0;
        for (var i = 0; i < wantParts.length; i++) {
            if (wantParts[i].length > 2 && got.indexOf(wantParts[i]) >= 0) {
                hit++;
            }
        }
        if (!hit) {
            return -1;
        }
        score += hit * 8;
    }
    if (movieInfo.year) {
        var year = String(movieInfo.year);
        var blob = String(item.date || '') + ' ' + String(item.year || '') + ' ' + String(item.release_year || '');
        if (blob.indexOf(year) >= 0) {
            score += 25;
        }
    }
    if (ffawesomePickPlayUrl(item)) {
        score += 15;
    }
    if (ffawesomeHasDrm(item)) {
        score -= 80;
    }
    if (String(item.type || '') === 'post') {
        score += 5;
    }
    return score;
}
function ffawesomeFetchJson(url) {
    return fetch(url, {
        method: 'GET',
        headers: ffawesomeBuildHeaders(),
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
function ffawesomeSearch(movieInfo) {
    return __awaiter(_this, void 0, void 0, function () {
        var queries, best, bestScore, qi, query, url, result, posts, pi, item, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queries = [];
                    if (movieInfo.title) {
                        queries.push(String(movieInfo.title));
                        if (movieInfo.year) {
                            queries.push(String(movieInfo.title) + ' ' + String(movieInfo.year));
                        }
                    }
                    best = null;
                    bestScore = -1;
                    qi = 0;
                    _a.label = 1;
                case 1:
                    if (!(qi < queries.length)) return [3, 4];
                    query = queries[qi];
                    url = ffawesomeApiUrl({
                        searchType: 'search',
                        keys: query,
                        'start-index': 0,
                        'max-results': 12,
                        gridstyle: 'flat-movie',
                        platform_id: AUTH_TOKEN,
                        appId: APP_ID,
                        siteId: SITE_ID,
                        'auth-token': AUTH_TOKEN,
                    });
                    console.log('[RN-Fetch][FAWESOME-SEARCH] ' + query);
                    return [4, ffawesomeFetchJson(url)];
                case 2:
                    result = _a.sent();
                    if (!result.json || result.json.status !== 'ok') {
                        console.log('[RN-Fetch][FAWESOME-SEARCH-FAIL] status=' + result.status);
                        return [3, 3];
                    }
                    posts = ffawesomeCollectPosts(result.json.results || result.json);
                    for (pi = 0; pi < posts.length; pi++) {
                        item = posts[pi];
                        score = ffawesomeScoreItem(item, movieInfo);
                        if (score > bestScore) {
                            bestScore = score;
                            best = item;
                        }
                    }
                    if (bestScore >= 100) {
                        return [2, best];
                    }
                    _a.label = 3;
                case 3:
                    qi++;
                    return [3, 1];
                case 4:
                    if (!best || bestScore < 40) {
                        return [2, null];
                    }
                    console.log('[RN-Fetch][FAWESOME-MATCH] score=' + bestScore + ' title=' + String(best.title || '') + ' node=' + String(best.node_id || ''));
                    return [2, best];
            }
        });
    });
}
function ffawesomeFetchNode(nodeId) {
    return __awaiter(_this, void 0, void 0, function () {
        var url, result, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!nodeId) {
                        return [2, null];
                    }
                    url = ffawesomeApiUrl({
                        searchType: 'nodeid',
                        'start-index': 0,
                        'max-results': 1,
                        gridstyle: 'flat-movie',
                        platform_id: AUTH_TOKEN,
                        appId: APP_ID,
                        siteId: SITE_ID,
                        'auth-token': AUTH_TOKEN,
                        dltype: 1,
                        nid: nodeId,
                    });
                    console.log('[RN-Fetch][FAWESOME-NODE] ' + nodeId);
                    return [4, ffawesomeFetchJson(url)];
                case 1:
                    result = _a.sent();
                    if (!result.json || result.json.status !== 'ok') {
                        console.log('[RN-Fetch][FAWESOME-NODE-FAIL] status=' + result.status);
                        return [2, null];
                    }
                    posts = ffawesomeCollectPosts(result.json.results || result.json);
                    return [2, posts.length ? posts[0] : null];
            }
        });
    });
}
function ffawesomeDeliver(item, callback, rank) {
    var playUrl = ffawesomePickPlayUrl(item);
    if (!playUrl) {
        return false;
    }
    var playType = ffawesomePlayType(playUrl);
    var quality = playType === 'm3u8' ? 'Hls' : '';
    console.log('[RN-Fetch][FAWESOME-PLAY] type=' + playType + ' ' + playUrl.substring(0, 140));
    libs.embed_callback(playUrl, PROVIDER, PROVIDER, quality, callback, rank || 0, [], [{ file: playUrl, quality: 1080 }], ffawesomeBuildPlayHeaders(), {
        type: playType,
    });
    return true;
}
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var matched, detail, playItem, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[RN-Fetch][FAWESOME-VERSION] v1-direct-api');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!movieInfo || !movieInfo.title) {
                    console.log('[RN-Fetch][FAWESOME-SKIP] movieinfo-empty');
                    return [2];
                }
                if (movieInfo.type === 'tv') {
                    // Show listoflist episode resolve is unreliable; only direct post streams for now.
                    console.log('[RN-Fetch][FAWESOME-SKIP] tv-not-supported-yet');
                    return [2];
                }
                return [4, ffawesomeSearch(movieInfo)];
            case 2:
                matched = _a.sent();
                if (!matched) {
                    console.log('[RN-Fetch][FAWESOME-SKIP] no-match');
                    return [2];
                }
                detail = null;
                if (!matched.node_id) return [3, 4];
                return [4, ffawesomeFetchNode(matched.node_id)];
            case 3:
                detail = _a.sent();
                _a.label = 4;
            case 4:
                playItem = detail || matched;
                if (ffawesomeHasDrm(playItem)) {
                    console.log('[RN-Fetch][FAWESOME-SKIP] drm-protected node=' + String(playItem.node_id || ''));
                    return [2];
                }
                if (!ffawesomeDeliver(playItem, callback, 1)) {
                    console.log('[RN-Fetch][FAWESOME-SKIP] playurl-empty');
                    return [2];
                }
                return [2, true];
            case 5:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                console.log('[RN-Fetch][FAWESOME-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [2];
            case 6: return [2];
        }
    });
}); };
