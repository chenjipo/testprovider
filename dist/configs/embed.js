var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
libs.embed_redirect = function (embed_1, quality_1, movieInfo_1, provider_1, callback_1, host_1, subs_1) {
    var args_1 = [];
    for (var _i = 7; _i < arguments.length; _i++) {
        args_1[_i - 7] = arguments[_i];
    }
    return __awaiter(_this, __spreadArray([embed_1, quality_1, movieInfo_1, provider_1, callback_1, host_1, subs_1], args_1, true), void 0, function (embed, quality, movieInfo, provider, callback, host, subs, options, headers) {
        var hostname, headersData, contentLength;
        if (options === void 0) { options = {}; }
        if (headers === void 0) { headers = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!embed) {
                        return [2];
                    }
                    hostname = libs.url_get_host(embed);
                    libs.log({ hostname: hostname, embed: embed }, provider, 'EMBED HOST');
                    if (embed.indexOf('.m3u8') != -1 || embed.indexOf('.hls') != -1) {
                        libs.embed_callback(embed, provider, host ? host : hostname.toUpperCase(), 'Hls', callback, 1, subs, [], headers);
                        return [2];
                    }
                    if (!hostname) {
                        return [2];
                    }
                    if (quality) {
                        libs.embed_callback(embed, provider, host ? host : hostname.toUpperCase(), '', callback, 1, subs, [], headers);
                        return [2];
                    }
                    if (hosts && hosts[hostname]) {
                        hosts[hostname](embed, movieInfo, provider, {
                            subs: subs ? subs : [],
                            options: options,
                        }, callback);
                        return [2];
                    }
                    return [4, libs.request_head(embed, headers)];
                case 1:
                    headersData = _a.sent();
                    contentLength = headersData['content-length'];
                    libs.log({ contentLength: contentLength }, 'CONTENT_LENGTH');
                    if (contentLength > 100000000) {
                        libs.embed_callback(embed, provider, host ? host : hostname.toUpperCase(), '', callback, 1, subs, [], headers);
                    }
                    return [2];
            }
        });
    });
};
libs.embed_parse_source = function (html) {
    var source = html.match(/sources *\: *([^\]]+)/i);
    source = source ? source[1] + "]" : "[]";
    var parse = [];
    source = "parse = ".concat(source);
    eval(source);
    return parse;
};
if (!libs.__embedCallbackDeliver) {
    libs.__embedCallbackDeliver = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
        if (subs === void 0) { subs = []; }
        if (direct_quality === void 0) { direct_quality = []; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        var parseSubs = [];
        if (subs.length > 0) {
            for (var _i = 0, subs_1 = subs; _i < subs_1.length; _i++) {
                var item = subs_1[_i];
                var type = "office";
                if (item.file.indexOf(".srt") == -1 && item.file.indexOf(".vtt") == -1) {
                    type = "download";
                }
                if (item.file.indexOf("opensubtitles") != -1) {
                    continue;
                }
                parseSubs.push({
                    file: item.file,
                    kind: 'captions',
                    label: item.label,
                    type: type,
                });
            }
            console.log({ subs: subs }, "SUBDATAPARSE");
        }
        callback(__assign({ file: urlDirect, quality: quality, host: host, source: provider, provider: libs.string_provider(provider, rank), subs: parseSubs, direct_quality: direct_quality, headers: headers }, options));
    };
}
libs.__embedCallbackBaseDeliver = libs.__embedCallbackBaseDeliver || libs.__embedCallbackDeliver;
if (!libs.__embedCallbackCore) {
    libs.__embedCallbackCore = libs.__embedCallbackDeliver;
}
libs.__unwrapVodCallback = function (callback) {
    if (!callback) {
        return callback;
    }
    if (callback.__vodRawCallback) {
        return callback.__vodRawCallback;
    }
    return callback;
};
libs.__wrapVodLinkCallback = function (rawCallback) {
    if (!rawCallback) {
        return rawCallback;
    }
    if (rawCallback.__vodLinkWrapped) {
        return rawCallback;
    }
    var base = libs.__unwrapVodCallback(rawCallback);
    var wrapped = function (linkData) {
        if (!linkData || !linkData.file) {
            base(linkData);
            return;
        }
        if (libs.__vodBatchReleasing) {
            base(linkData);
            return;
        }
        var provider = libs.__resolveVodBatchProvider(linkData.file, linkData.source || linkData.provider, linkData.host);
        if (libs.__shouldBatchVodLinks && libs.__shouldBatchVodLinks() && libs.__isVodBatchProvider(provider) && libs.__isVodBatchStream(linkData.file, provider)) {
            console.log('[RN-Fetch][BATCH-CB-QUEUE] provider=' + provider);
            libs.embed_callback(linkData.file, provider, linkData.host || provider, linkData.quality || 'Hls', base, 0, linkData.subs || [], linkData.direct_quality || [], linkData.headers || {}, linkData);
            return;
        }
        console.log('[RN-Fetch][BATCH-CB-DIRECT] provider=' + provider);
        base(linkData);
    };
    wrapped.__vodLinkWrapped = true;
    wrapped.__vodRawCallback = base;
    return wrapped;
};
libs.__captureVodCallback = function (rawCallback) {
    return libs.__wrapVodLinkCallback(rawCallback);
};
libs.__deliverVodBatchLink = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
    if (subs === void 0) { subs = []; }
    if (direct_quality === void 0) { direct_quality = []; }
    if (headers === void 0) { headers = {}; }
    if (options === void 0) { options = {}; }
    provider = libs.__resolveVodBatchProvider(urlDirect, provider, host);
    host = host || provider;
    callback = libs.__unwrapVodCallback(callback);
    if (libs.__tryQueueVodBatch(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options)) {
        return true;
    }
    if (libs.__shouldBatchVodLinks() && libs.__isVodBatchProvider(provider) && libs.__isVodBatchStream(urlDirect, provider)) {
        if (libs.__batchHasProvider(provider)) {
            console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=' + provider);
            return true;
        }
        console.log('[RN-Fetch][BATCH-FORCE-QUEUE] provider=' + provider);
        libs.__pushVodBatchItem(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
        return true;
    }
    return false;
};
libs.__resolveVodBatchProvider = function (urlDirect, provider, host) {
    var p = String(provider || '').trim();
    var h = String(host || '').trim();
    if (p === 'MUniqueStream' || p === 'MVidlink' || p === 'IYesMovies') {
        return p;
    }
    if (p === 'vidlink-embed' || h === 'vidlink-embed' || p === 'Vidlink' || h === 'vidlink.pro') {
        return 'MVidlink';
    }
    if (p === 'uniquestream-embed' || h === 'uniquestream-embed') {
        return 'MUniqueStream';
    }
    if (p === 'yesmovies-embed' || h === 'yesmovies-embed' || p === 'ployan' || h === 'ployan') {
        return 'IYesMovies';
    }
    var url = String(urlDirect || '');
    if (url.indexOf('vodvidl.site') >= 0) {
        return 'MVidlink';
    }
    if (url.indexOf('mediacache.cc') >= 0 || url.indexOf('uniquestream') >= 0) {
        return 'MUniqueStream';
    }
    if (url.indexOf('ployan.me') >= 0) {
        return 'IYesMovies';
    }
    return p;
};
libs.__markVidlinkDelivered = function (urlDirect) {
    if (!libs.__vidlinkDelivered) {
        libs.__vidlinkDelivered = {};
    }
    var stormKey = libs.__vodStormKey(urlDirect);
    if (stormKey) {
        libs.__vidlinkDelivered[stormKey] = true;
    }
    return stormKey;
};
libs.__isVidlinkDuplicate = function (urlDirect) {
    if (!libs.__vidlinkDelivered) {
        return false;
    }
    var stormKey = libs.__vodStormKey(urlDirect);
    return !!(stormKey && libs.__vidlinkDelivered[stormKey]);
};
libs.__tryQueueVodBatch = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
    if (libs.__vodBatchReleasing) {
        return false;
    }
    provider = libs.__resolveVodBatchProvider(urlDirect, provider, host);
    host = host || provider;
    var isVodStream = libs.__isVodBatchStream(urlDirect, provider);
    if (!libs.__shouldBatchVodLinks() || !libs.__isVodBatchProvider(provider) || !isVodStream) {
        return false;
    }
    if (libs.__batchHasProvider(provider)) {
        console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=' + provider);
        return true;
    }
    if (provider === 'MVidlink' && libs.__isVidlinkDuplicate(urlDirect)) {
        console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=MVidlink');
        return true;
    }
    if (provider === 'MVidlink') {
        libs.__markVidlinkDelivered(urlDirect);
    }
    libs.__pushVodBatchItem(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
    return true;
};
if (!libs.__vodBatchItems) {
    libs.__vodBatchItems = [];
}
libs.__vodStormKey = function (url) {
    if (!url) {
        return '';
    }
    var text = String(url);
    var match = text.match(/\/proxy\/[^/]+\/([a-f0-9]{32,})/i);
    if (match) {
        return match[1];
    }
    var qIdx = text.indexOf('?');
    return qIdx >= 0 ? text.substring(0, qIdx) : text;
};
libs.__isVodBatchProvider = function (provider) {
    return provider === 'MUniqueStream' || provider === 'MVidlink' || provider === 'IYesMovies';
};
libs.__isVodBatchStream = function (urlDirect, provider) {
    if (!urlDirect) {
        return false;
    }
    var url = String(urlDirect);
    if (url.indexOf('.m3u8') >= 0 || url.indexOf('.hls') >= 0) {
        return true;
    }
    if (provider === 'MVidlink' && url.indexOf('vodvidl.site') >= 0) {
        return true;
    }
    if (provider === 'MUniqueStream' && (url.indexOf('mediacache.cc') >= 0 || url.indexOf('uniquestream') >= 0)) {
        return true;
    }
    if (provider === 'IYesMovies' && url.indexOf('ployan.me') >= 0) {
        return true;
    }
    if (url.indexOf('vodvidl.site') >= 0) {
        return true;
    }
    if (url.indexOf('mediacache.cc') >= 0) {
        return true;
    }
    if (url.indexOf('ployan.me') >= 0) {
        return true;
    }
    return false;
};
libs.__batchHasProvider = function (provider) {
    var items = libs.__vodBatchItems;
    for (var i = 0; i < items.length; i++) {
        if (items[i][1] === provider) {
            return true;
        }
    }
    return false;
};
libs.__vodBatchSessionMs = 180000;
libs.__vodBatchResetMs = 185000;
libs.beginVodLinkSession = function () {
    var now = Date.now();
    var pending = libs.__vodBatchItems ? libs.__vodBatchItems.length : 0;
    var stale = libs.__vodBatchStartMs && now - libs.__vodBatchStartMs > libs.__vodBatchResetMs;
    if (libs.__vodBatchReleased || !libs.__vodBatchStartMs || (stale && !pending)) {
        libs.__vodBatchStartMs = now;
        libs.__vodBatchReleased = false;
        libs.__vodBatchItems = [];
        libs.__vidlinkDelivered = {};
        console.log('[RN-Fetch][BATCH-SESSION] start');
    }
    libs.__embedWebviewSlot.multiSourceBatch = true;
    libs.__ensureBatchPoller();
};
libs.__ensureBatchPoller = function () {
    if (libs.__vodBatchPoller) {
        return;
    }
    libs.__vodBatchPoller = setInterval(function () {
        if (libs.__vodBatchItems && libs.__vodBatchItems.length && libs.__shouldBatchVodLinks()) {
            libs.__tryReleaseLinkBatch();
        }
    }, 2000);
};
libs.__isVodSessionOpen = function () {
    if (!libs.__vodBatchStartMs || libs.__vodBatchReleased) {
        return false;
    }
    return Date.now() - libs.__vodBatchStartMs < libs.__vodBatchSessionMs;
};
libs.__shouldBatchVodLinks = function () {
    if (libs.__vodBatchReleased) {
        return false;
    }
    var slot = libs.__embedWebviewSlot || {};
    if (slot.multiSourceBatch && libs.__vodBatchStartMs) {
        return true;
    }
    return libs.__isVodSessionOpen();
};
libs.__releaseLinkBatch = function () {
    var items = libs.__vodBatchItems || [];
    if (!items.length) {
        return;
    }
    libs.__vodBatchItems = [];
    libs.__vodBatchReleased = true;
    if (libs.__vodBatchTimer) {
        clearTimeout(libs.__vodBatchTimer);
        libs.__vodBatchTimer = null;
    }
    if (libs.__vodBatchReleaseTimer) {
        clearTimeout(libs.__vodBatchReleaseTimer);
        libs.__vodBatchReleaseTimer = null;
    }
    console.log('[RN-Fetch][BATCH-RELEASE] count=' + items.length);
    libs.__vodBatchReleasing = true;
    if (libs.__embedWebviewSlot) {
        libs.__embedWebviewSlot.multiSourceBatch = false;
    }
    for (var i = 0; i < items.length; i++) {
        libs.__embedCallbackDeliver.apply(libs, items[i]);
    }
    libs.__vodBatchReleasing = false;
};
libs.__tryReleaseLinkBatch = function () {
    var items = libs.__vodBatchItems || [];
    var slot = libs.__embedWebviewSlot || {};
    var elapsed = libs.__vodBatchStartMs ? Date.now() - libs.__vodBatchStartMs : 0;
    var webviewIdle = !slot.pumping && (!slot.queue || !slot.queue.length);
    if (!items.length) {
        if (libs.__shouldBatchVodLinks() && !webviewIdle && elapsed < 28000) {
            if (libs.__vodBatchReleaseTimer) {
                clearTimeout(libs.__vodBatchReleaseTimer);
            }
            libs.__vodBatchReleaseTimer = setTimeout(function () {
                libs.__tryReleaseLinkBatch();
            }, 800);
        }
        return;
    }
    var canRelease = false;
    if (items.length >= 2 && elapsed >= 6000) {
        canRelease = true;
    }
    else if (items.length >= 1 && webviewIdle && elapsed >= 8000) {
        canRelease = true;
    }
    else if (items.length >= 1 && elapsed >= 28000) {
        canRelease = true;
    }
    else if (webviewIdle && items.length >= 1) {
        canRelease = true;
    }
    if (canRelease) {
        console.log('[RN-Fetch][BATCH-READY] idle=' + (webviewIdle ? 1 : 0) + ' elapsed=' + elapsed + 'ms queued=' + items.length);
        libs.__releaseLinkBatch();
        return;
    }
    if (libs.__vodBatchReleaseTimer) {
        clearTimeout(libs.__vodBatchReleaseTimer);
    }
    libs.__vodBatchReleaseTimer = setTimeout(function () {
        libs.__tryReleaseLinkBatch();
    }, 800);
};
libs.__scheduleBatchRelease = function () {
    if (libs.__vodBatchTimer) {
        clearTimeout(libs.__vodBatchTimer);
    }
    libs.__vodBatchTimer = setTimeout(function () {
        libs.__tryReleaseLinkBatch();
    }, 600);
};
libs.__pushVodBatchItem = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
    callback = libs.__unwrapVodCallback(callback);
    if (provider === 'MVidlink') {
        libs.__markVidlinkDelivered(urlDirect);
    }
    libs.__vodBatchItems.push([urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options]);
    console.log('[RN-Fetch][BATCH-QUEUE] provider=' + provider + ' total=' + libs.__vodBatchItems.length);
    libs.__scheduleBatchRelease();
    libs.__tryReleaseLinkBatch();
};
libs.embed_callback = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
    if (subs === void 0) { subs = []; }
    if (direct_quality === void 0) { direct_quality = []; }
    if (headers === void 0) { headers = {}; }
    if (options === void 0) { options = {}; }
    callback = libs.__unwrapVodCallback(callback);
    var rawProvider = provider;
    provider = libs.__resolveVodBatchProvider(urlDirect, provider, host);
    host = host || provider;
    if (rawProvider !== provider) {
        console.log('[RN-Fetch][BATCH-PROVIDER] raw=' + rawProvider + ' resolved=' + provider);
    }
    if (libs.__tryQueueVodBatch(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options)) {
        return;
    }
    var isVodStream = libs.__isVodBatchStream(urlDirect, provider);
    if (libs.__isVodBatchProvider(provider) && isVodStream && libs.__shouldBatchVodLinks()) {
        if (libs.__batchHasProvider(provider)) {
            console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=' + provider);
            return;
        }
        if (provider === 'MVidlink' && libs.__isVidlinkDuplicate(urlDirect)) {
            console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=MVidlink');
            return;
        }
        console.log('[RN-Fetch][BATCH-FORCE-QUEUE] provider=' + provider);
        libs.__pushVodBatchItem(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
        return;
    }
    if (libs.__isVodBatchProvider(provider) && isVodStream) {
        var lateMs = libs.__vodBatchStartMs ? Date.now() - libs.__vodBatchStartMs : 0;
        if (libs.__vodBatchReleased && lateMs > 0 && lateMs < libs.__vodBatchSessionMs) {
            if (provider === 'MVidlink' && libs.__isVidlinkDuplicate(urlDirect)) {
                console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=MVidlink');
                return;
            }
            if (provider === 'MVidlink') {
                libs.__markVidlinkDelivered(urlDirect);
            }
            console.log('[RN-Fetch][BATCH-LATE-ADD] provider=' + provider + ' elapsed=' + lateMs + 'ms');
            libs.__embedCallbackDeliver(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
            return;
        }
        if (provider === 'MVidlink' && libs.__isVidlinkDuplicate(urlDirect)) {
            console.log('[RN-Fetch][BATCH-SKIP-DUP] provider=MVidlink');
            return;
        }
        if (provider === 'MVidlink') {
            libs.__markVidlinkDelivered(urlDirect);
        }
        console.log('[RN-Fetch][BATCH-DIRECT] provider=' + provider + ' batch=' + (libs.__shouldBatchVodLinks() ? 1 : 0) + ' stream=' + (isVodStream ? 1 : 0));
    }
    libs.__embedCallbackDeliver(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
};
libs.__embedCallbackCore = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
    if (subs === void 0) { subs = []; }
    if (direct_quality === void 0) { direct_quality = []; }
    if (headers === void 0) { headers = {}; }
    if (options === void 0) { options = {}; }
    return libs.embed_callback(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
};
libs.__installVodBatchDeliverWrap = function () {
    var inner = libs.__embedCallbackBaseDeliver;
    if (!inner) {
        return;
    }
    libs.__embedCallbackDeliver = function (urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options) {
        if (subs === void 0) { subs = []; }
        if (direct_quality === void 0) { direct_quality = []; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = {}; }
        callback = libs.__unwrapVodCallback(callback);
        if (libs.__deliverVodBatchLink(urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options)) {
            return;
        }
        provider = libs.__resolveVodBatchProvider(urlDirect, provider, host);
        host = host || provider;
        return inner.call(libs, urlDirect, provider, host, quality, callback, rank, subs, direct_quality, headers, options);
    };
    libs.__embedCallbackDeliver.__vodBatchWrapV12 = true;
    libs.__embedCallbackDeliver.__vodBatchWrapInner = inner;
};
libs.__installVodBatchDeliverWrap();
console.log('[RN-Fetch][EMBED-CFG] batch-v12');
if (libs.__vodBatchItems.length) {
    console.log('[RN-Fetch][BATCH-RESUME] pending=' + libs.__vodBatchItems.length);
    libs.__scheduleBatchRelease();
    libs.__ensureBatchPoller();
}
libs.parse_size = function (file, provider, host, type, callback, rank, tracks) { return __awaiter(_this, void 0, void 0, function () {
    var directSizes, patternSize, directQuality, _i, patternSize_1, patternItem, sizeQuality;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, libs.request_get(file, {})];
            case 1:
                directSizes = _a.sent();
                patternSize = directSizes.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig);
                if (!patternSize) {
                    libs.embed_callback(file, provider, host, item.type, callback, ++rank, tracks);
                    return [2];
                }
                directQuality = [];
                libs.log({ patternSize: patternSize }, provider, 'PATTERN SIZE');
                for (_i = 0, patternSize_1 = patternSize; _i < patternSize_1.length; _i++) {
                    patternItem = patternSize_1[_i];
                    sizeQuality = patternItem.match(/\/([0-9]+)\//i);
                    sizeQuality = sizeQuality ? sizeQuality[1] : 'HD';
                    directQuality.push({
                        file: patternItem,
                        quality: sizeQuality
                    });
                }
                libs.log({ directQuality: directQuality }, provider, 'DIRECT QUALITY');
                libs.embed_callback(file, provider, host, 'Hls', callback, ++rank, tracks, directQuality);
                return [2];
        }
    });
}); };
libs.__embedWebviewSlot = libs.__embedWebviewSlot || { busyUntil: 0, pumping: false, queue: [], multiSourceBatch: false };
libs.__embedWebviewOrder = { 'MVidlink': 0, 'IYesMovies': 1, 'MUniqueStream': 2 };
libs.scheduleEmbedWebview = function (provider, task, slotMs) {
    var slot = libs.__embedWebviewSlot;
    libs.beginVodLinkSession();
    var order = libs.__embedWebviewOrder[provider];
    if (typeof order !== 'number') {
        order = 99;
    }
    slot.queue.push({ provider: provider, task: task, order: order });
    slot.queue.sort(function (a, b) {
        if (a.order !== b.order) {
            return a.order - b.order;
        }
        return 0;
    });
    if (slot.pumping) {
        return;
    }
    slot.pumping = true;
    var holdMs = slotMs || 20000;
    function runNext() {
        if (!slot.queue.length) {
            slot.pumping = false;
            libs.__tryReleaseLinkBatch();
            return;
        }
        var now = Date.now();
        var waitMs = Math.max(0, slot.busyUntil - now);
        var item = slot.queue.shift();
        setTimeout(function () {
            console.log('[RN-Fetch][EMBED-SLOT] start provider=' + item.provider + ' wait=' + waitMs + 'ms queued=' + slot.queue.length);
            slot.busyUntil = Date.now() + holdMs;
            try {
                item.task();
            }
            catch (e) {
                console.log('[RN-Fetch][EMBED-SLOT] err provider=' + item.provider + ' ' + String(e && e.message ? e.message : e));
            }
            setTimeout(runNext, holdMs);
        }, waitMs);
    }
    runNext();
};
