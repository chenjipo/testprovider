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
function escJs(value) {
    return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
function buildVidlinkEmbedScript(tmdbId, isTv, season, episode) {
    var sTmdb = escJs(tmdbId);
    var sSeason = escJs(season);
    var sEpisode = escJs(episode);
    var tvFlag = isTv ? '1' : '0';
    return "(function(){var tmdb='" + sTmdb + "',isTv=" + tvFlag + ",season='" + sSeason + "',episode='" + sEpisode + "',done=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function isApi(u){return u&&String(u).indexOf('/api/b/')>=0;}function isDbg(u){u=String(u||'');return u.indexOf('/api/b/')>=0||u.indexOf('fu.wasm')>=0||u.indexOf('script.js')>=0;}function markApi(m){if(m&&m.status===200&&m.responseText&&m.responseText.charAt(0)==='{'){done=1;}}function probeHls(pl){try{var pj=JSON.parse(pl);var u=pj.stream&&pj.stream.playlist;if(!u||u.indexOf('playlist.m3u8')<0)return;var hu=u.replace('/playlist.m3u8','/1080/index.m3u8');fetch(hu,{credentials:'include'}).then(function(r){return r.text();}).then(function(bt){pm({step:'vl-hls',url:hu,ok:bt&&bt.indexOf('#EXTM3U')===0?1:0,preview:String(bt||'').substring(0,100)});}).catch(function(e){pm({step:'vl-hls',url:hu,ok:0,error:String(e)});});}catch(e2){}}function hookNet(){if(window.__vlHooked)return;window.__vlHooked=1;pm({step:'vl-hook-ready'});var fo=fetch;fetch=function(a,b){b=b||{};var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(isDbg(s)){pm({step:'vl-fetch',url:s});}return fo(a,b).then(function(r){if(isApi(s)){r.clone().text().then(function(t){var m={status:r.status,responseURL:s,responseText:t,source:'vl-hook'};markApi(m);pm(m);probeHls(t);}).catch(function(){});}return r;});};var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){this._vlUrl=u;if(isDbg(u)){pm({step:'vl-xhr-open',url:String(u)});}return xo.apply(this,arguments);};var xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){var x=this;x.addEventListener('load',function(){var u=x._vlUrl||x.responseURL||'';if(isApi(u)){var t=x.responseText||'';var m={status:x.status,responseURL:u,responseText:t,source:'vl-xhr'};markApi(m);pm(m);probeHls(t);}});return xs.apply(x,arguments);};}function callApi(token){if(!token||done)return;var api=isTv?('/api/b/tv/'+token+'/'+season+'/'+episode+'?multiLang=0'):('/api/b/movie/'+token+'?multiLang=0');pm({step:'vl-api-url',url:api});fetch(api,{credentials:'include'}).then(function(r){return r.text().then(function(t){var m={status:r.status,responseURL:location.origin+api,responseText:t,source:'vl-manual'};markApi(m);pm(m);probeHls(t);});}).catch(function(e){pm({step:'vl-api-err',error:String(e)});});}function waitAdv(left){if(done)return;if(typeof window.getAdv==='function'){pm({step:'vl-getadv-ready'});try{var token=window.getAdv(String(tmdb));pm({step:'vl-getadv-token',token:token||''});if(token){callApi(token);}else{pm({step:'vl-getadv-null'});}}catch(e){pm({step:'vl-getadv-err',error:String(e)});}return;}if(left<=0){pm({step:'vl-getadv-timeout',getAdv:typeof window.getAdv,sodium:typeof window.sodium});return;}setTimeout(function(){waitAdv(left-1);},500);}hookNet();pm({step:'vl-boot',tmdb:tmdb,isTv:isTv});setTimeout(function(){waitAdv(80);},1500);})();";
}
hosts['vidlink-embed'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, embedUrl, headers, beforeLoadScript, tmdbId, isTv, season, episode;
    return __generator(this, function (_a) {
        HOST = 'vidlink-embed';
        embedUrl = (config && config.embedUrl) ? config.embedUrl : String(url || '');
        tmdbId = (movieInfo && movieInfo.tmdb_id) ? String(movieInfo.tmdb_id) : '';
        isTv = !!(movieInfo && movieInfo.type == 'tv');
        season = (movieInfo && movieInfo.season) ? String(movieInfo.season) : '1';
        episode = (movieInfo && movieInfo.episode) ? String(movieInfo.episode) : '1';
        headers = {
            'Referer': 'https://vidlink.pro/',
            'Origin': 'https://vidlink.pro',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildVidlinkEmbedScript(tmdbId, isTv, season, episode);
        console.log('[RN-Fetch][VIDLINK-EMBED-HOST] ' + embedUrl.substring(0, 120));
        try {
            callback({
                callback: {
                    provider: provider,
                    host: HOST,
                    url: embedUrl,
                    headers: headers,
                    callback: callback,
                    userAgent: headers['user-agent'],
                    beforeLoadScript: beforeLoadScript,
                    metadata: {
                        embedUrl: embedUrl,
                        url_webview: embedUrl,
                        movieInfo: movieInfo,
                        tmdbId: tmdbId,
                        season: season,
                        episode: episode
                    }
                }
            });
        }
        catch (e) {
            libs.log({ e: e }, HOST, 'ERROR');
        }
        return [2];
    });
}); };
