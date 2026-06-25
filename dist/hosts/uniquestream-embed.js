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
function buildUniqueStreamEmbedScript(pageReferer) {
    var sRef = escJs(pageReferer || 'https://uniquestream.net/');
    return "(function(){var done=0,pageRef='" + sRef + "';function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function isApi(u){u=String(u||'');return u.indexOf('/api/b/')>=0;}function scanLetUrl(){if(done)return;var html=document.documentElement?document.documentElement.innerHTML:'';var m=html.match(/let\\s+url\\s*=\\s*['\"]([^'\"]+)/i);if(m&&m[1]){done=1;pm({step:'us-url',url:m[1],source:'scan'});}}function probeHls(pl){try{var pj=JSON.parse(pl);var u=pj.stream&&pj.stream.playlist;if(!u||u.indexOf('playlist.m3u8')<0)return;var hu=u.replace('/playlist.m3u8','/1080/index.m3u8');fetch(hu,{credentials:'include'}).then(function(r){return r.text();}).then(function(bt){pm({step:'vl-hls',url:hu,ok:bt&&bt.indexOf('#EXTM3U')===0?1:0,preview:String(bt||'').substring(0,100)});}).catch(function(e){pm({step:'vl-hls',url:hu,ok:0,error:String(e)});});}catch(e2){}}function hookNet(){if(window.__usHooked)return;window.__usHooked=1;pm({step:'us-hook-ready'});var fo=fetch;fetch=function(a,b){b=b||{};var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(s.indexOf('.m3u8')>=0||s.indexOf('mediacache')>=0||isApi(s)){pm({step:'us-fetch',url:s});}return fo(a,b).then(function(r){if(isApi(s)){r.clone().text().then(function(t){pm({status:r.status,responseURL:s,responseText:t,source:'us-hook'});probeHls(t);}).catch(function(){});}else if(s.indexOf('.m3u8')>=0){r.clone().text().then(function(t){if(t&&t.indexOf('#EXTM3U')===0&&!done){done=1;pm({step:'us-url',url:s,source:'fetch-m3u8'});}}).catch(function(){});}return r;});};var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){this._usUrl=u;return xo.apply(this,arguments);};var xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){var x=this;x.addEventListener('load',function(){var u=x._usUrl||x.responseURL||'';if(isApi(u)){var t=x.responseText||'';pm({status:x.status,responseURL:u,responseText:t,source:'us-xhr'});probeHls(t);}else if(u.indexOf('.m3u8')>=0){var t2=x.responseText||'';if(t2.indexOf('#EXTM3U')===0&&!done){done=1;pm({step:'us-url',url:u,source:'xhr-m3u8'});}}});return xs.apply(x,arguments);};}hookNet();pm({step:'us-boot',href:location.href});scanLetUrl();var n=0;var iv=setInterval(function(){scanLetUrl();n++;if(done||n>50)clearInterval(iv);},400);})();";
}
hosts['uniquestream-embed'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, embedUrl, pageReferer, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        HOST = 'uniquestream-embed';
        embedUrl = (config && config.embedUrl) ? config.embedUrl : String(url || '');
        pageReferer = (config && config.pageReferer) ? config.pageReferer : 'https://uniquestream.net/';
        headers = {
            'Referer': pageReferer,
            'Origin': 'https://uniquestream.net',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildUniqueStreamEmbedScript(pageReferer);
        console.log('[RN-Fetch][UNIQUESTREAM-EMBED-HOST] ' + embedUrl.substring(0, 140));
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
                        pageReferer: pageReferer,
                        movieInfo: movieInfo
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
