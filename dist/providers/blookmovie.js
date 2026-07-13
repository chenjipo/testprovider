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
var PROVIDER = 'BlookMovie';
var DOMAIN = 'https://www.lookmovie2.to';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
function buildSiteHeaders(referer, csrf) {
    var headers = {
        'user-agent': USER_AGENT,
        referer: referer || DOMAIN + '/',
        Referer: referer || DOMAIN + '/',
        origin: DOMAIN,
        Origin: DOMAIN,
        Accept: 'text/html,application/json,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'x-requested-with': 'XMLHttpRequest',
    };
    if (csrf) {
        headers['x-csrf-token'] = csrf;
    }
    return headers;
}
function lookmovieSlugifyTitle(title) {
    return String(title || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function lookmovieNormalizeImdbId(imdbId) {
    if (!imdbId) {
        return '';
    }
    return String(imdbId).replace(/^tt/i, '');
}
function lookmovieFetchText(url, referer, csrf) {
    return fetch(url, {
        method: 'GET',
        headers: buildSiteHeaders(referer, csrf),
    }).then(function (response) {
        return response.text();
    });
}
function lookmovieFetchJson(url, referer, csrf) {
    return fetch(url, {
        method: 'GET',
        headers: buildSiteHeaders(referer, csrf),
    }).then(function (response) {
        return response.json();
    });
}
function lookmovieParseCsrf(html) {
    return (html.match(/name="csrf-token"\s+content="([^"]+)"/) || [])[1] || '';
}
function lookmovieParseStorageBlock(html, varName) {
    var re = new RegExp("window\\['" + varName + "'\\]\\s*=\\s*\\{([\\s\\S]*?)\\};");
    var m = html.match(re);
    if (!m) {
        return null;
    }
    var block = m[1];
    function pick(patterns) {
        for (var i = 0; i < patterns.length; i++) {
            var hit = block.match(patterns[i]);
            if (hit) {
                return hit[1];
            }
        }
        return '';
    }
    return {
        id_movie: pick([/id_movie:\s*(\d+)/]),
        id_show: pick([/id_show:\s*(\d+)/]),
        id_episode: pick([/id_episode:\s*(\d+)/]),
        hash: pick([/hash:\s*"([^"]+)"/]),
        expires: pick([/expires:\s*(\d+)/]),
        title: pick([/title:\s*'([^']*)'/, /title:\s*"([^"]*)"/]),
    };
}
function lookmovieParseSeasonsMap(html) {
    var m = html.match(/window\.seasons\s*=\s*'(\{[\s\S]*?\})';/) || html.match(/window\.seasons\s*=\s*(\{[\s\S]*?\});/);
    if (!m) {
        return null;
    }
    try {
        return JSON.parse(m[1].replace(/\\"/g, '"'));
    }
    catch (e1) {
        try {
            return JSON.parse(m[1]);
        }
        catch (e2) {
            return null;
        }
    }
}
function lookmovieResolveEpisodeId(seasonsMap, season, episode) {
    if (!seasonsMap) {
        return '';
    }
    var seasonNode = seasonsMap[String(season)];
    if (!seasonNode || !seasonNode.episodes) {
        return '';
    }
    var epNode = seasonNode.episodes[String(episode)];
    if (!epNode) {
        return '';
    }
    return String(epNode.id_episode || epNode.id || '');
}
function lookmovieNormalizeSearchRows(json, mediaType) {
    var rows = json.result || [];
    if (!Array.isArray(rows)) {
        return [];
    }
    return rows.map(function (row) {
        return {
            title: row.title || '',
            slug: row.slug || '',
            year: Number(row.year || 0),
            isShow: !!row.id_show,
            isMovie: !!row.id_movie,
            type: row.id_show ? 'show' : (row.id_movie ? 'movie' : mediaType || ''),
        };
    }).filter(function (row) {
        return row.slug && row.title;
    });
}
function lookmovieScoreSearchRow(row, movieInfo) {
    var wantTitle = lookmovieSlugifyTitle(movieInfo.title);
    var gotTitle = lookmovieSlugifyTitle(row.title);
    var score = 0;
    if (gotTitle === wantTitle) {
        score += 100;
    }
    else if (gotTitle.indexOf(wantTitle) === 0) {
        score += 70;
    }
    else if (gotTitle.indexOf(wantTitle) >= 0) {
        score += 40;
    }
    if (movieInfo.year && row.year === Number(movieInfo.year)) {
        score += 50;
    }
    if (movieInfo.type === 'tv' && row.isShow) {
        score += 25;
    }
    if (movieInfo.type === 'movie' && row.isMovie) {
        score += 25;
    }
    if (movieInfo.type === 'tv' && /movie/i.test(row.title) && gotTitle !== wantTitle) {
        score -= 60;
    }
    return score;
}
function lookmoviePickSearchRow(rows, movieInfo) {
    if (!rows.length) {
        return null;
    }
    var best = rows[0];
    var bestScore = lookmovieScoreSearchRow(best, movieInfo);
    for (var i = 1; i < rows.length; i++) {
        var score = lookmovieScoreSearchRow(rows[i], movieInfo);
        if (score > bestScore) {
            best = rows[i];
            bestScore = score;
        }
    }
    return best;
}
function lookmovieBuildSlugCandidates(movieInfo) {
    var title = lookmovieSlugifyTitle(movieInfo.title);
    var year = movieInfo.year || '';
    var imdb = lookmovieNormalizeImdbId(movieInfo.imdb_id);
    var tmdb = movieInfo.tmdb_id || '';
    var list = [];
    if (imdb && title && year) {
        list.push(imdb + '-' + title + '-' + year);
    }
    if (tmdb && title && year) {
        list.push(tmdb + '-' + title + '-' + year);
    }
    if (title && year) {
        list.push(title + '-' + year);
    }
    return list;
}
function lookmovieBuildTracks(subtitles) {
    var tracks = [];
    var i;
    var item;
    if (!subtitles || !subtitles.length) {
        return tracks;
    }
    for (i = 0; i < subtitles.length; i++) {
        item = subtitles[i];
        if (!item || !item.file) {
            continue;
        }
        tracks.push({
            file: item.file.indexOf('http') === 0 ? item.file : DOMAIN + item.file,
            label: item.language || item.label || 'sub',
            kind: item.kind || 'captions',
        });
    }
    return tracks;
}
function lookmovieBuildDirectQuality(streams) {
    var sortDirect = [];
    var directIndex;
    var sizeQuality;
    var preferOrder = ['1080p', '1080', '720p', '720', '480p', '480'];
    var pi;
    if (!streams) {
        return sortDirect;
    }
    for (pi = 0; pi < preferOrder.length; pi++) {
        if (streams[preferOrder[pi]]) {
            sizeQuality = preferOrder[pi].match(/([0-9]+)/i);
            sortDirect.push({
                quality: sizeQuality ? Number(sizeQuality[1]) : preferOrder[pi],
                file: streams[preferOrder[pi]],
            });
        }
    }
    for (directIndex in streams) {
        if (directIndex === 'auto' || !streams[directIndex]) {
            continue;
        }
        if (preferOrder.indexOf(directIndex) >= 0) {
            continue;
        }
        sizeQuality = directIndex.match(/([0-9]+)/i);
        sizeQuality = sizeQuality ? Number(sizeQuality[1]) : directIndex;
        sortDirect.push({
            quality: sizeQuality,
            file: streams[directIndex],
        });
    }
    if (typeof _ !== 'undefined' && _.orderBy) {
        return _.orderBy(sortDirect, ['quality'], ['desc']);
    }
    sortDirect.sort(function (a, b) {
        return Number(b.quality) - Number(a.quality);
    });
    return sortDirect;
}
function lookmovieBuildDisplayQuality(sortDirect) {
    if (!sortDirect.length) {
        return [];
    }
    return [{ file: sortDirect[0].file, quality: 1080 }];
}
function lookmovieResolveSlug(movieInfo) {
    return __awaiter(_this, void 0, void 0, function () {
        var searchPath, queries, qi, urlSearch, searchJson, rows, picked, slug, candidates, ci, typePath, viewUrl, viewHtml, playUrl, playHtml, hasId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchPath = movieInfo.type === 'tv' ? '/api/v1/shows/do-search?q=' : '/api/v1/movies/do-search?q=';
                    queries = [movieInfo.title];
                    if (movieInfo.year) {
                        queries.push(movieInfo.title + ' ' + movieInfo.year);
                    }
                    qi = 0;
                    _a.label = 1;
                case 1:
                    if (!(qi < queries.length)) return [3, 4];
                    urlSearch = DOMAIN + searchPath + encodeURIComponent(queries[qi]);
                    console.log('[RN-Fetch][BLOOKMOVIE-SEARCH] ' + urlSearch);
                    return [4, lookmovieFetchJson(urlSearch, DOMAIN + '/', '')];
                case 2:
                    searchJson = _a.sent();
                    rows = lookmovieNormalizeSearchRows(searchJson, movieInfo.type);
                    picked = lookmoviePickSearchRow(rows, movieInfo);
                    if (picked && picked.slug) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SLUG] search ' + picked.slug + ' title=' + picked.title);
                        return [2, picked.slug];
                    }
                    _a.label = 3;
                case 3:
                    qi++;
                    return [3, 1];
                case 4:
                    candidates = lookmovieBuildSlugCandidates(movieInfo);
                    typePath = movieInfo.type === 'tv' ? 'shows' : 'movies';
                    ci = 0;
                    _a.label = 5;
                case 5:
                    if (!(ci < candidates.length)) return [3, 10];
                    viewUrl = DOMAIN + '/' + typePath + '/view/' + candidates[ci];
                    return [4, lookmovieFetchText(viewUrl, DOMAIN + '/', '')];
                case 6:
                    viewHtml = _a.sent();
                    hasId = movieInfo.type === 'tv'
                        ? viewHtml.indexOf('id_show') >= 0
                        : viewHtml.indexOf('id_movie') >= 0 || viewHtml.indexOf('movie_storage') >= 0;
                    if (!(viewHtml && hasId)) return [3, 7];
                    console.log('[RN-Fetch][BLOOKMOVIE-SLUG] guess-view ' + candidates[ci]);
                    return [2, candidates[ci]];
                case 7:
                    playUrl = DOMAIN + '/' + typePath + '/play/' + candidates[ci];
                    return [4, lookmovieFetchText(playUrl, DOMAIN + '/', '')];
                case 8:
                    playHtml = _a.sent();
                    if (playHtml && (playHtml.indexOf('movie_storage') >= 0 || playHtml.indexOf('show_storage') >= 0 || playHtml.indexOf('window.seasons') >= 0)) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SLUG] guess-play ' + candidates[ci]);
                        return [2, candidates[ci]];
                    }
                    _a.label = 9;
                case 9:
                    ci++;
                    return [3, 5];
                case 10: return [2, ''];
            }
        });
    });
}
function lookmovieFetchMovieAccess(slug, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var playUrl, pageHtml, csrf, storage, accessUrl, accessJson, sortDirect, streamHeaders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playUrl = DOMAIN + '/movies/play/' + slug;
                    console.log('[RN-Fetch][BLOOKMOVIE-PAGE] ' + playUrl);
                    return [4, lookmovieFetchText(playUrl, DOMAIN + '/', '')];
                case 1:
                    pageHtml = _a.sent();
                    csrf = lookmovieParseCsrf(pageHtml);
                    storage = lookmovieParseStorageBlock(pageHtml, 'movie_storage');
                    if (!storage || !storage.id_movie || !storage.hash || !storage.expires) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SKIP] movie-storage-miss');
                        return [2, false];
                    }
                    accessUrl = DOMAIN + '/api/v1/security/movie-access?id_movie=' + storage.id_movie
                        + '&hash=' + encodeURIComponent(storage.hash)
                        + '&expires=' + storage.expires;
                    console.log('[RN-Fetch][BLOOKMOVIE-ACCESS] ' + accessUrl);
                    return [4, lookmovieFetchJson(accessUrl, playUrl, csrf)];
                case 2:
                    accessJson = _a.sent();
                    if (!accessJson || !accessJson.success || !accessJson.streams) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SKIP] movie-access-fail reason=' + (accessJson && accessJson.reason ? accessJson.reason : 'none'));
                        return [2, false];
                    }
                    sortDirect = lookmovieBuildDirectQuality(accessJson.streams);
                    if (!sortDirect.length) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SKIP] movie-stream-empty');
                        return [2, false];
                    }
                    streamHeaders = buildSiteHeaders(playUrl);
                    libs.log({ slug: slug, storage: storage, sortDirect: sortDirect }, PROVIDER, 'MOVIE STREAM');
                    console.log('[RN-Fetch][BLOOKMOVIE-PLAY] api=' + sortDirect.map(function (item) { return item.quality; }).join('/') + ' display=1080');
                    libs.embed_callback(sortDirect[0].file, PROVIDER, PROVIDER, 'Hls', callback, 0, lookmovieBuildTracks(accessJson.subtitles), lookmovieBuildDisplayQuality(sortDirect), streamHeaders, { type: 'm3u8' });
                    return [2, true];
            }
        });
    });
}
function lookmovieFetchEpisodeAccess(slug, season, episode, callback) {
    return __awaiter(_this, void 0, void 0, function () {
        var epUrl, pageHtml, csrf, showStorage, seasonsMap, idEpisode, accessUrl, accessJson, sortDirect, streamHeaders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    epUrl = DOMAIN + '/shows/play/' + slug;
                    console.log('[RN-Fetch][BLOOKMOVIE-PAGE] ' + epUrl);
                    return [4, lookmovieFetchText(epUrl, DOMAIN + '/shows', '')];
                case 1:
                    pageHtml = _a.sent();
                    csrf = lookmovieParseCsrf(pageHtml);
                    showStorage = lookmovieParseStorageBlock(pageHtml, 'show_storage');
                    seasonsMap = lookmovieParseSeasonsMap(pageHtml);
                    idEpisode = lookmovieResolveEpisodeId(seasonsMap, season, episode);
                    if (!idEpisode) {
                        idEpisode = (pageHtml.match(/id_episode:\s*(\d+)/) || pageHtml.match(/currentEpisodeID\s*=\s*(\d+)/) || [])[1] || '';
                    }
                    if (!idEpisode) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SKIP] episode-id-miss s' + season + 'e' + episode);
                        return [2, false];
                    }
                    accessUrl = DOMAIN + '/api/v1/security/episode-access?id_episode=' + encodeURIComponent(idEpisode);
                    if (showStorage && showStorage.hash) {
                        accessUrl += '&hash=' + encodeURIComponent(showStorage.hash);
                    }
                    if (showStorage && showStorage.expires) {
                        accessUrl += '&expires=' + showStorage.expires;
                    }
                    console.log('[RN-Fetch][BLOOKMOVIE-ACCESS] ' + accessUrl);
                    return [4, lookmovieFetchJson(accessUrl, epUrl, csrf)];
                case 2:
                    accessJson = _a.sent();
                    if (!accessJson || !accessJson.streams) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SKIP] episode-access-fail');
                        return [2, false];
                    }
                    sortDirect = lookmovieBuildDirectQuality(accessJson.streams);
                    if (!sortDirect.length) {
                        console.log('[RN-Fetch][BLOOKMOVIE-SKIP] episode-stream-empty');
                        return [2, false];
                    }
                    streamHeaders = buildSiteHeaders(epUrl);
                    libs.log({ slug: slug, idEpisode: idEpisode, sortDirect: sortDirect }, PROVIDER, 'EPISODE STREAM');
                    console.log('[RN-Fetch][BLOOKMOVIE-PLAY] s' + season + 'e' + episode + ' api=' + sortDirect.map(function (item) { return item.quality; }).join('/') + ' display=1080');
                    libs.embed_callback(sortDirect[0].file, PROVIDER, PROVIDER, 'Hls', callback, 0, lookmovieBuildTracks(accessJson.subtitles), lookmovieBuildDisplayQuality(sortDirect), streamHeaders, { type: 'm3u8' });
                    return [2, true];
            }
        });
    });
}
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var slug, ok, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[RN-Fetch][BLOOKMOVIE-VERSION] v3-rn-display-1080');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4, lookmovieFetchText(DOMAIN + '/', DOMAIN + '/', '')];
            case 2:
                _a.sent();
                return [4, lookmovieResolveSlug(movieInfo)];
            case 3:
                slug = _a.sent();
                if (!slug) {
                    console.log('[RN-Fetch][BLOOKMOVIE-SKIP] slug-not-found');
                    return [2];
                }
                if (!(movieInfo.type === 'tv')) return [3, 5];
                return [4, lookmovieFetchEpisodeAccess(slug, movieInfo.season || 1, movieInfo.episode || 1, callback)];
            case 4:
                ok = _a.sent();
                return [3, 7];
            case 5: return [4, lookmovieFetchMovieAccess(slug, callback)];
            case 6:
                ok = _a.sent();
                return [3, 7];
            case 7:
                if (!ok) {
                    console.log('[RN-Fetch][BLOOKMOVIE-MISS] slug=' + slug);
                }
                return [2, !!ok];
            case 8:
                e_1 = _a.sent();
                libs.log({ e: e_1 }, PROVIDER, 'ERROR');
                console.log('[RN-Fetch][BLOOKMOVIE-ERROR] ' + String(e_1 && e_1.message ? e_1.message : e_1));
                return [2];
        }
    });
}); };
