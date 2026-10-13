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
var SUBSOURCE_VERSION = 'v1-fix-eng-chi';
// api.subsource.net works (search + zip download). Limit eng/chi to avoid flood.
// Chinese API keys: chinese_bg_code / big_5_code / chinese_cantonese.
console.log('[RN-Fetch][SUBSOURCE-LOADED] ' + SUBSOURCE_VERSION);
function subSourceResolveLabel(lang) {
    var key = String(lang || '').toLowerCase();
    var map = {
        english: 'English',
        chinese_bg_code: 'Chinese',
        big_5_code: 'Chinese',
        chinese_cantonese: 'Chinese',
        arabic: 'Arabic',
        vietnamese: 'Vietnamese',
        indonesian: 'Indonesian',
        french: 'French',
        spanish: 'Spanish',
        portuguese: 'Portuguese',
        brazilian_portuguese: 'Portuguese',
        russian: 'Russian',
        rusian: 'Russian',
        korean: 'Korean',
        japanese: 'Japanese',
        thai: 'Thai',
        turkish: 'Turkish',
        italian: 'Italian',
        german: 'German',
        polish: 'Polish',
        dutch: 'Dutch',
        swedish: 'Swedish',
        hebrew: 'Hebrew',
        greek: 'Greek',
        ukrainian: 'Ukrainian',
    };
    return map[key] || '';
}
function subSourceIsPreferred(lang) {
    var key = String(lang || '').toLowerCase();
    return key === 'english'
        || key === 'chinese_bg_code'
        || key === 'big_5_code'
        || key === 'chinese_cantonese';
}
function subSourcePickCandidates(list, maxPerLabel) {
    var buckets = {};
    var out = [];
    if (!Array.isArray(list)) {
        return out;
    }
    var ranked = list.slice().sort(function (a, b) {
        return Number((b && b.id) || 0) - Number((a && a.id) || 0);
    });
    for (var i = 0; i < ranked.length; i++) {
        var item = ranked[i];
        if (!item || !item.link || !subSourceIsPreferred(item.language)) {
            continue;
        }
        var label = subSourceResolveLabel(item.language);
        if (!label) {
            continue;
        }
        if (!buckets[label]) {
            buckets[label] = 0;
        }
        if (buckets[label] >= maxPerLabel) {
            continue;
        }
        buckets[label] += 1;
        out.push({ item: item, label: label });
    }
    return out;
}
subs.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var PROVIDER, DOMAIN, slug, url, subsData, candidates, ci, row, item, label, link, subLinksData, downloadToken, downloadTokenLink, emitCount, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                PROVIDER = 'SubSource';
                DOMAIN = 'https://api.subsource.net';
                console.log('[RN-Fetch][SUBSOURCE-VERSION] ' + SUBSOURCE_VERSION);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                if (!movieInfo || !movieInfo.year) {
                    console.log('[RN-Fetch][SUBSOURCE] skip no-year');
                    return [2, true];
                }
                slug = libs.url_slug_search
                    ? libs.url_slug_search(movieInfo, '-')
                    : String(movieInfo.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                if (!slug) {
                    console.log('[RN-Fetch][SUBSOURCE] skip no-slug');
                    return [2, true];
                }
                url = DOMAIN + '/v1/subtitles/' + slug + '-' + movieInfo.year;
                if (movieInfo.type == 'tv') {
                    url += '/season-' + movieInfo.season;
                }
                console.log('[RN-Fetch][SUBSOURCE] search ' + url);
                return [4, libs.request_get(url, {}, false)];
            case 2:
                subsData = _b.sent();
                if (!subsData || !Array.isArray(subsData.subtitles) || !subsData.subtitles.length) {
                    console.log('[RN-Fetch][SUBSOURCE] empty');
                    return [2, true];
                }
                candidates = subSourcePickCandidates(subsData.subtitles, 2);
                console.log('[RN-Fetch][SUBSOURCE] pick n=' + candidates.length
                    + ' from=' + subsData.subtitles.length);
                ci = 0;
                emitCount = 0;
                _b.label = 3;
            case 3:
                if (!(ci < candidates.length)) return [3, 6];
                row = candidates[ci];
                item = row.item;
                label = row.label;
                link = DOMAIN + '/v1/subtitle/' + item.link;
                return [4, libs.request_get(link, {}, false)];
            case 4:
                subLinksData = _b.sent();
                downloadToken = subLinksData
                    && subLinksData.subtitle
                    && subLinksData.subtitle.download_token;
                if (!downloadToken) {
                    console.log('[RN-Fetch][SUBSOURCE] no-token lang=' + String(item.language || ''));
                    return [3, 5];
                }
                downloadTokenLink = DOMAIN + '/v1/subtitle/download/' + downloadToken;
                emitCount += 1;
                console.log('[RN-Fetch][SUBSOURCE] emit label=' + label
                    + ' lang=' + String(item.language || '')
                    + ' file=' + downloadTokenLink.substring(0, 90));
                callback({
                    file: downloadTokenLink,
                    kind: 'Captions',
                    label: label,
                    type: 'zip',
                    provider: PROVIDER,
                });
                _b.label = 5;
            case 5:
                ci++;
                return [3, 3];
            case 6:
                console.log('[RN-Fetch][SUBSOURCE] done emit=' + emitCount);
                return [3, 8];
            case 7:
                e_1 = _b.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                console.log('[RN-Fetch][SUBSOURCE] error ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [3, 8];
            case 8: return [2, true];
        }
    });
}); };
