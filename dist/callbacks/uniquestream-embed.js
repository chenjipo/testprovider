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
function getUniqueStreamState() {
    if (!libs.__uniquestreamState) {
        libs.__uniquestreamState = { played: {}, embedDone: {} };
    }
    return libs.__uniquestreamState;
}
function buildHlsRefererHeaders() {
    return {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
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
function isMediacacheUrl(url) {
    return !!(url && (url.indexOf('mediacache.cc') >= 0 || url.indexOf('hls.uniquestream.net') >= 0));
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
function finishEmbed(playUrl, provider, callback, qualities, headerDirect, metadata) {
    var state = getUniqueStreamState();
    var sorted = _.orderBy(qualities || [], ['quality'], ['desc']);
    if (!sorted.length) {
        sorted = [{ file: playUrl, quality: 1080 }];
    }
    var playFile = playUrl;
    var playKey = playKeyFromUrl(playFile) || String(playFile).substring(0, 160);
    if (state.played[playKey]) {
        return;
    }
    if (!isMediacacheUrl(playFile)) {
        console.log('[RN-Fetch][UNIQUESTREAM-PLAY] skip non-mediacache url=' + String(playFile).substring(0, 100));
        return;
    }
    state.played[playKey] = true;
    console.log('[RN-Fetch][UNIQUESTREAM-PLAY] url=' + String(playFile).substring(0, 140) + ' qualities=' + sorted.length);
    libs.embed_callback(playFile, provider, provider, 'Hls', callback, 1, [], sorted, headerDirect, {
        type: 'm3u8',
    });
}
function processMediacacheMaster(playlistUrl, provider, callback, metadata) { return __awaiter(_this, void 0, void 0, function () {
    var rawUrl, masterUrl, headers, masterBody, qualities, sorted, probeIdx, probeCandidate, probeBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rawUrl = String(playlistUrl);
                masterUrl = normalizeMediacachePlaylistUrl(rawUrl);
                headers = buildHlsRefererHeaders();
                return [4, libs.request_get(masterUrl, headers)];
            case 1:
                masterBody = _a.sent();
                if (!isValidM3u8Body(masterBody)) {
                    if (masterUrl === rawUrl) {
                        return [2];
                    }
                    masterUrl = rawUrl;
                    return [4, libs.request_get(masterUrl, headers)];
                }
                return [3, 2];
            case 2:
                if (!isValidM3u8Body(masterBody)) {
                    masterBody = _a.sent();
                }
                if (!isValidM3u8Body(masterBody)) {
                    console.log('[RN-Fetch][UNIQUESTREAM-PROBE] master fail prev=' + String(masterBody || '').substring(0, 80));
                    return [2];
                }
                qualities = parseMasterQualities(masterBody, masterUrl);
                if (qualities.length > 1) {
                    sorted = _.orderBy(qualities, ['quality'], ['desc']);
                    probeIdx = 0;
                    return [3, 3];
                }
                finishEmbed(masterUrl, provider, callback, [{ file: masterUrl, quality: 1080 }], headers, metadata);
                return [2];
            case 3:
                if (!(probeIdx < sorted.length)) {
                    finishEmbed(masterUrl, provider, callback, sorted, headers, metadata);
                    return [2];
                }
                probeCandidate = sorted[probeIdx];
                return [4, libs.request_get(probeCandidate.file, headers)];
            case 4:
                probeBody = _a.sent();
                if (isValidM3u8Body(probeBody)) {
                    console.log('[RN-Fetch][UNIQUESTREAM-PROBE] ok master quality=' + probeCandidate.quality);
                    finishEmbed(masterUrl, provider, callback, sorted, headers, metadata);
                    return [2];
                }
                probeIdx++;
                return [3, 3];
        }
    });
}); }
callbacksEmbed['uniquestream-embed'] = function (dataCallback, provider, host, callback, metadata) { return __awaiter(_this, void 0, void 0, function () {
    var data, masterUrl, dedupeKey, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!dataCallback) {
                    return [2];
                }
                data = JSON.parse(dataCallback);
                if (data.step && data.step.indexOf('us-') === 0 && data.step !== 'us-url') {
                    console.log('[RN-Fetch][UNIQUESTREAM-EMBED-STEP] ' + data.step + (data.url ? ' url=' + String(data.url).substring(0, 120) : '') + (data.preview ? ' prev=' + data.preview : ''));
                    return [2];
                }
                if (data.responseURL || data.responseText || data.status) {
                    return [2];
                }
                if (data.step === 'us-url' && data.url) {
                    masterUrl = normalizeMediacachePlaylistUrl(String(data.url));
                    if (!isMediacacheUrl(masterUrl)) {
                        return [2];
                    }
                    dedupeKey = playKeyFromUrl(masterUrl);
                    if (getUniqueStreamState().embedDone[dedupeKey]) {
                        return [2];
                    }
                    getUniqueStreamState().embedDone[dedupeKey] = true;
                    console.log('[RN-Fetch][UNIQUESTREAM-URL] source=' + (data.source || '') + ' url=' + masterUrl.substring(0, 140));
                    return [4, processMediacacheMaster(masterUrl, provider, callback, metadata)];
                }
                return [3, 2];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [3, 4];
            case 3:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, provider, 'UNIQUESTREAM EMBED CB ERR');
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
