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
function buildYesmoviesEmbedScript(mid, eid, sv) {
    var sMid = escJs(mid);
    var sEid = escJs(eid);
    var sSv = escJs(sv);
    return "(function(){var mid='" + sMid + "',eid='" + sEid + "',sv='" + sSv + "',done=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function wait(fn,left){if(done)return;if(fn()){fn.call(null,true);return;}if(left<=0){pm({step:'yes-timeout'});return;}setTimeout(function(){wait(fn,left-1);},500);}function hookPloyanNet(){if(window.__yesPlyHooked)return;window.__yesPlyHooked=1;var fo=fetch;fetch=function(a,b){b=b||{};b.credentials='include';return fo(a,b).then(function(r){var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(s.indexOf('/get/')>=0||s.indexOf('.m3u8')>=0||s.indexOf('/hls/')>=0){r.clone().text().then(function(t){if(r.status===200&&t.charAt(0)==='{'){done=1;}pm({status:r.status,responseURL:s,responseText:t,source:'yes-hook'});}).catch(function(){});}return r;});};var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){this._yesUrl=u;return xo.apply(this,arguments);};var xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){var x=this;x.withCredentials=true;x.addEventListener('load',function(){var u=x._yesUrl||x.responseURL||'';if(u.indexOf('/get/')>=0||u.indexOf('.m3u8')>=0||u.indexOf('/hls/')>=0){if(x.status===200&&(x.responseText||'').charAt(0)==='{'){done=1;}pm({status:x.status,responseURL:u,responseText:x.responseText||'',source:'yes-xhr'});}});return xs.apply(x,arguments);};}function fullscreenEmbed(){var ce=document.getElementById('content-embed'),fr=document.getElementById('iframe-embed');if(ce){ce.style.display='block';ce.style.position='fixed';ce.style.top='0';ce.style.left='0';ce.style.width='100%';ce.style.height='100%';ce.style.zIndex='99999';ce.style.background='#000';}if(fr){fr.style.width='100%';fr.style.height='100%';fr.style.border='0';}}async function playEmbed(){try{pm({step:'yes-play-start'});var pa=document.getElementById('player-area');if(pa&&window.jQuery){try{jQuery('#player-area').collapse('show');}catch(e){}}var mp=document.getElementById('media-player');if(mp){mp.style.display='none';}if(typeof setSRC!=='function'){pm({step:'yes-no-setsrc'});return;}await setSRC(sv,mid,eid);await new Promise(function(r){setTimeout(r,1500);});var fr=document.getElementById('iframe-embed'),src=fr&&fr.src?fr.src:'';pm({step:'yes-iframe',src:src});if(!src||src.indexOf('ployan')<0){pm({step:'yes-iframe-miss'});return;}fullscreenEmbed();if(src.indexOf(location.origin)<0){pm({step:'yes-goto-ployan',src:src});hookPloyanNet();setTimeout(function(){if(!done){window.location.href=src;}},800);return;}pm({step:'yes-ready'});}catch(e){pm({error:String(e),step:'yes-err'});}}if(location.hostname.indexOf('ployan')>=0){pm({step:'yes-on-ployan'});hookPloyanNet();return;}wait(function(){return typeof setSRC==='function'&&!!document.getElementById('iframe-embed');},40);setTimeout(function(){playEmbed();},1200);})();";
}
hosts['yesmovies-embed'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, detailUrl, mid, eid, sv, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        HOST = 'yesmovies-embed';
        detailUrl = (config && config.detailUrl) ? config.detailUrl : String(url || '');
        mid = (config && config.mid) ? config.mid : '';
        eid = (config && config.eid) ? config.eid : '1';
        sv = (config && config.sv) ? config.sv : '1';
        headers = {
            'Referer': detailUrl,
            'Origin': 'https://ww.yesmovies.ag',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildYesmoviesEmbedScript(mid, eid, sv);
        console.log('[RN-Fetch][YESMOVIES-EMBED-HOST] ' + detailUrl.substring(0, 100));
        try {
            callback({
                callback: {
                    provider: provider,
                    host: HOST,
                    url: detailUrl,
                    headers: headers,
                    callback: callback,
                    userAgent: headers['user-agent'],
                    beforeLoadScript: beforeLoadScript,
                    metadata: {
                        detailUrl: detailUrl,
                        mid: mid,
                        eid: eid,
                        sv: sv,
                        url_webview: detailUrl,
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
