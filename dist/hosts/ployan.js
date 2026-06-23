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
function buildPloyanInjectScript(urix, mid, eid, sv, yesLoc) {
    var sMid = escJs(mid);
    var sEid = escJs(eid);
    var sSv = escJs(sv);
    var sUrix = escJs(urix);
    var sYesLoc = escJs(yesLoc || 'US');
    return "(function(){var u='" + sUrix + "',yl='" + sYesLoc + "',done=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}function hx(b){return Array.from(new Uint8Array(b)).map(function(x){return('0'+x.toString(16)).slice(-2);}).join('');}function b64dec(s){s=String(s||'').replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return s;}function b642bytes(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0);});}async function decox(uri,pwd){var inner=b64dec(uri),raw=b642bytes(inner),iv=raw.slice(0,12),ct=raw.slice(12),pw=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pwd)),key=await crypto.subtle.importKey('raw',pw,'AES-GCM',false,['decrypt']),pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:iv},key,ct);return new TextDecoder().decode(pt);}async function ne(loc,plain){var enc=new TextEncoder(),pb=enc.encode(plain),salt=crypto.getRandomValues(new Uint8Array(8)),imp=await crypto.subtle.importKey('raw',enc.encode(loc),'PBKDF2',false,['deriveKey']),ak=await crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:1000,hash:'SHA-256'},imp,{name:'AES-GCM',length:256},false,['encrypt']),iv=crypto.getRandomValues(new Uint8Array(12)),ct=await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},ak,pb);return hx(salt)+'-'+hx(iv)+'-'+hx(new Uint8Array(ct));}function hookNet(){if(window.__plyHooked)return;window.__plyHooked=1;pm({step:'hook-ready'});var fo=fetch;fetch=function(a,b){b=b||{};b.credentials='include';return fo(a,b).then(function(r){var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(s.indexOf('/get/')>=0||s.indexOf('.m3u8')>=0||s.indexOf('/hls/')>=0){r.clone().text().then(function(t){pm({status:r.status,responseURL:s,responseText:t,source:'hook'});}).catch(function(){});}return r;});};var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){this._plyUrl=u;return xo.apply(this,arguments);};var xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){var x=this;x.withCredentials=true;x.addEventListener('load',function(){var u=x._plyUrl||x.responseURL||'';if(u.indexOf('/get/')>=0||u.indexOf('.m3u8')>=0||u.indexOf('/hls/')>=0){pm({status:x.status,responseURL:u,responseText:x.responseText||'',source:'xhr'});}});return xs.apply(x,arguments);};}async function runPlay(){if(done||!u)return;try{pm({step:'play-start'});await sleep(2500);var tr=await fetch('/cdn-cgi/trace',{credentials:'include'}).then(function(r){return r.text();});var loc=(tr.match(/loc=([A-Z]+)/)||[,yl||'US'])[1];pm({step:'trace-loc',loc:loc});var ux=(location.hash&&location.hash.length>2)?location.hash.slice(1):u,plain='',parts=[],tried=[loc,yl,'US'],ti;for(ti=0;ti<tried.length;ti++){if(!tried[ti])continue;try{plain=await decox(ux,tried[ti]);pm({step:'decox-ok',loc:tried[ti],plain:plain});break;}catch(e){pm({step:'decox-fail',loc:tried[ti],error:String(e)});}}if(!plain){pm({step:'decox-abort'});return;}parts=plain.split('+');if(parts.length<3){pm({step:'decox-bad',plain:plain});return;}var ts=Math.floor(Date.now()/1000),plain2=parts[0]+'+'+parts[1]+'+'+parts[2]+'+'+ts,hash=await ne(loc,plain2),getUrl='/get/'+hash;pm({step:'get-req',plain:plain2});var r=await fetch(getUrl,{credentials:'include'}),t=await r.text();done=1;pm({status:r.status,responseURL:location.origin+getUrl,responseText:t,source:'inject'});}catch(e){pm({error:String(e),source:'inject'});}}if(u){try{if(!location.hash||location.hash.length<3){history.replaceState(null,'',location.pathname+location.search+'#'+u);pm({step:'hash-set',len:u.length});}else{pm({step:'hash-ok',len:location.hash.length});}}catch(e){pm({step:'hash-err',error:String(e)});}}hookNet();if(document.readyState==='complete'){runPlay();}else{window.addEventListener('load',function(){runPlay();});}})();";
}
hosts["ployan"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, urix, mid, eid, sv, yesLoc, yesReferer, watchBase, loadUrl, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        HOST = 'ployan';
        urix = (config && config.urix) ? config.urix : '';
        mid = (config && config.mid) ? config.mid : '';
        eid = (config && config.eid) ? config.eid : '';
        sv = (config && config.sv) ? config.sv : '1';
        yesLoc = (config && config.yesLoc) ? config.yesLoc : 'US';
        yesReferer = (config && config.yesReferer) ? config.yesReferer : 'https://ww.yesmovies.ag/';
        watchBase = (config && config.watchUrl) ? config.watchUrl : String(url || '').split('#')[0];
        loadUrl = watchBase;
        if (urix) {
            loadUrl = watchBase + '#' + urix;
        }
        headers = {
            'Referer': yesReferer,
            'Origin': 'https://ww.yesmovies.ag',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildPloyanInjectScript(urix, mid, eid, sv, yesLoc);
        console.log('[RN-Fetch][PLOYAN-HOST] ' + loadUrl.substring(0, 120));
        try {
            callback({
                callback: {
                    provider: provider,
                    host: HOST,
                    url: loadUrl,
                    headers: headers,
                    callback: callback,
                    userAgent: headers['user-agent'],
                    beforeLoadScript: beforeLoadScript,
                    metadata: {
                        urix: urix,
                        mid: mid,
                        eid: eid,
                        sv: sv,
                        yesReferer: yesReferer,
                        yesLoc: yesLoc,
                        url_webview: loadUrl,
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
