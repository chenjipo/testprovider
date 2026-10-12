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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
var OPENSUBS_VERSION = 'v4-tv-coerce';
function openSubsNormalizeImdb(raw) {
    if (!raw) {
        return '';
    }
    return String(raw).replace(/^tt/i, '').trim();
}
function openSubsMarkDone(totalEmit) {
    try {
        if (typeof libs !== 'undefined') {
            libs.__vodOpenSubsDone = true;
            libs.__vodOpenSubsEmit = Number(totalEmit) || 0;
        }
    }
    catch (_doneErr) { }
}
subs.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var PROVIDER, subLang, nameToId, preferred, seen, userLangKey, imdbId, tmdbId, apiKeys, ki, apiKey, extUrl, extData, totalEmit, wantSeason, wantEpisode, _i, preferred_1, item, urlLang, dataLang, ranked, ri, itemLang, lang, season, episode, row, filterSkip, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                PROVIDER = "OpenSubtitles";
                console.log('[RN-Fetch][OPENSUBS-VERSION] ' + OPENSUBS_VERSION);
                try {
                    if (typeof libs !== 'undefined') {
                        libs.__vodOpenSubsCache = [];
                        libs.__vodOpenSubsVersion = OPENSUBS_VERSION;
                        libs.__vodOpenSubsDone = false;
                        libs.__vodOpenSubsEmit = 0;
                    }
                }
                catch (_cacheInitErr) { }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                imdbId = openSubsNormalizeImdb(movieInfo && movieInfo.imdb_id);
                tmdbId = movieInfo && movieInfo.tmdb_id !== undefined && movieInfo.tmdb_id !== null
                    ? String(movieInfo.tmdb_id).trim()
                    : '';
                if (!(!imdbId && tmdbId && !/^tt/i.test(tmdbId))) return [3, 5];
                apiKeys = (typeof libs !== 'undefined' && libs.TMDB_API_KEYS) || [
                    '3161de04ca660985f0b42e883eb49fef',
                    '4e44c9029b1270a41c75c666510b46f5',
                ];
                ki = 0;
                _b.label = 2;
            case 2:
                if (!(ki < apiKeys.length && !imdbId)) return [3, 5];
                apiKey = apiKeys[ki];
                extUrl = 'https://api.themoviedb.org/3/'
                    + ((movieInfo && movieInfo.type == 'tv') ? 'tv' : 'movie')
                    + '/' + encodeURIComponent(tmdbId)
                    + '/external_ids?api_key=' + encodeURIComponent(apiKey);
                return [4, libs.request_get(extUrl, {
                        accept: 'application/json',
                    }, false, true, 1)];
            case 3:
                extData = _b.sent();
                if (typeof extData === 'string' && extData) {
                    try {
                        extData = JSON.parse(extData);
                    }
                    catch (_parseExt) {
                        extData = null;
                    }
                }
                imdbId = openSubsNormalizeImdb(extData && extData.imdb_id);
                if (imdbId) {
                    console.log('[RN-Fetch][OPENSUBS] imdb-from-tmdb tmdb=' + tmdbId + ' imdb=' + imdbId);
                }
                _b.label = 4;
            case 4:
                ki++;
                return [3, 2];
            case 5:
                if (!imdbId) {
                    console.log('[RN-Fetch][OPENSUBS] skip no-imdb tmdb=' + tmdbId
                        + ' rawImdb=' + String((movieInfo && movieInfo.imdb_id) || ''));
                    openSubsMarkDone(0);
                    return [2, true];
                }
                subLang = {
                    eng: "English",
                    spa: "Spanish",
                    fre: "French",
                    ger: "German",
                    ita: "Italian",
                    por: "Portuguese",
                    rus: "Russian",
                    chi: "Chinese",
                    jpn: "Japanese",
                    kor: "Korean",
                    ara: "Arabic",
                    hin: "Hindi",
                    dut: "Dutch",
                    swe: "Swedish",
                    pol: "Polish",
                    tur: "Turkish",
                    dan: "Danish",
                    nor: "Norwegian",
                    fin: "Finnish",
                    vie: "Vietnamese",
                    ind: "Indonesian",
                };
                nameToId = {
                    english: "eng",
                    arabic: "ara",
                    spanish: "spa",
                    french: "fre",
                    vietnamese: "vie",
                    italian: "ita",
                    portuguese: "por",
                    chinese: "chi",
                    korean: "kor",
                    hindi: "hin",
                    dutch: "dut",
                    swedish: "swe",
                    polish: "pol",
                    turkish: "tur",
                    indonesian: "ind",
                };
                // Formal myprovider floods 15 langs x many zips → App never starts dl.opensubtitles download/toast.
                // Emit at most 1 zip per lang, max 2 langs total, finish fast.
                preferred = [];
                seen = {};
                userLangKey = movieInfo.lang ? String(movieInfo.lang).toLowerCase() : "";
                if (userLangKey && nameToId[userLangKey] && !seen[nameToId[userLangKey]]) {
                    seen[nameToId[userLangKey]] = true;
                    preferred.push({ name: movieInfo.lang, id: nameToId[userLangKey] });
                }
                if (!seen.eng) {
                    seen.eng = true;
                    preferred.push({ name: "English", id: "eng" });
                }
                if (!seen.chi && preferred.length < 2) {
                    seen.chi = true;
                    preferred.push({ name: "Chinese", id: "chi" });
                }
                totalEmit = 0;
                wantSeason = Number(movieInfo && movieInfo.season);
                wantEpisode = Number(movieInfo && movieInfo.episode);
                console.log('[RN-Fetch][OPENSUBS] start imdb=' + imdbId
                    + ' langs=' + preferred.length
                    + ' type=' + String((movieInfo && movieInfo.type) || '')
                    + ' s=' + String(movieInfo && movieInfo.season)
                    + ' e=' + String(movieInfo && movieInfo.episode)
                    + ' wantS=' + wantSeason + ' wantE=' + wantEpisode);
                _i = 0, preferred_1 = preferred;
                _b.label = 6;
            case 6:
                if (!(_i < preferred_1.length)) return [3, 9];
                if (totalEmit >= 2) {
                    return [3, 9];
                }
                item = preferred_1[_i];
                urlLang = "https://rest.opensubtitles.org/search/imdbid-".concat(imdbId, "/sublanguageid-").concat(item.id);
                filterSkip = 0;
                return [4, libs.request_get(urlLang, {
                        "x-user-agent": "VLSub 0.10.2",
                        "User-Agent": "VLSub 0.10.2",
                        accept: "application/json",
                    }, false, true, 1)];
            case 7:
                dataLang = _b.sent();
                if (typeof dataLang === 'string' && dataLang) {
                    try {
                        dataLang = JSON.parse(dataLang);
                    }
                    catch (_parseLang) {
                        dataLang = null;
                    }
                }
                if (!Array.isArray(dataLang) || !dataLang.length) {
                    console.log('[RN-Fetch][OPENSUBS] empty lang=' + item.id
                        + ' typeof=' + (dataLang === null || dataLang === undefined ? 'null' : typeof dataLang));
                    return [3, 8];
                }
                ranked = dataLang.slice().sort(function (a, b) {
                    return Number((b && b.SubDownloadsCnt) || 0) - Number((a && a.SubDownloadsCnt) || 0);
                });
                for (ri = 0; ri < ranked.length; ri++) {
                    itemLang = ranked[ri];
                    if (!itemLang || !itemLang.ZipDownloadLink || !itemLang.SubLanguageID) {
                        continue;
                    }
                    lang = String(itemLang.SubLanguageID).toLowerCase();
                    if (movieInfo.type == "tv") {
                        season = Number(itemLang.SeriesSeason);
                        episode = Number(itemLang.SeriesEpisode);
                        // App often passes season/episode as strings; strict !== used to drop every TV hit.
                        if (!isFinite(wantSeason) || !isFinite(wantEpisode)
                            || wantSeason !== season || wantEpisode !== episode) {
                            filterSkip += 1;
                            continue;
                        }
                    }
                    if (!subLang[lang]) {
                        continue;
                    }
                    row = {
                        file: itemLang.ZipDownloadLink,
                        kind: "Captions",
                        label: subLang[lang],
                        type: "zip",
                        provider: PROVIDER,
                        headers: {
                            "x-user-agent": "VLSub 0.10.2",
                            "User-Agent": "VLSub 0.10.2",
                        },
                    };
                    try {
                        if (typeof libs !== 'undefined') {
                            libs.__vodOpenSubsCache = libs.__vodOpenSubsCache || [];
                            libs.__vodOpenSubsCache.push(row);
                        }
                    }
                    catch (_cachePushErr) { }
                    callback(row);
                    totalEmit += 1;
                    console.log('[RN-Fetch][OPENSUBS] emit lang=' + lang
                        + ' dl=' + String(itemLang.SubDownloadsCnt || 0)
                        + ' cache=' + String((typeof libs !== 'undefined' && libs.__vodOpenSubsCache) ? libs.__vodOpenSubsCache.length : 0)
                        + ' file=' + String(itemLang.ZipDownloadLink).substring(0, 90));
                    break;
                }
                if (!totalEmit && filterSkip) {
                    console.log('[RN-Fetch][OPENSUBS] filter-skip lang=' + item.id
                        + ' n=' + filterSkip + ' wantS=' + wantSeason + ' wantE=' + wantEpisode);
                }
                _b.label = 8;
            case 8:
                _i++;
                return [3, 6];
            case 9:
                console.log('[RN-Fetch][OPENSUBS] done emit=' + totalEmit
                    + ' cache=' + String((typeof libs !== 'undefined' && libs.__vodOpenSubsCache) ? libs.__vodOpenSubsCache.length : 0));
                openSubsMarkDone(totalEmit);
                return [3, 11];
            case 10:
                e_1 = _b.sent();
                console.log('[RN-Fetch][OPENSUBS-ERR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                openSubsMarkDone(0);
                libs.log({ e: e_1 }, PROVIDER, "ERROR");
                return [3, 11];
            case 11: return [2, true];
        }
    });
}); };
