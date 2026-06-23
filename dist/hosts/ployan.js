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
function buildPloyanInjectScript(urix, mid, eid, sv, yesReferer) {
    var sMid = escJs(mid);
    var sEid = escJs(eid);
    var sSv = escJs(sv);
    var sUrix = escJs(urix);
    var sRef = escJs(yesReferer);
    return "(function(){var mid='" + sMid + "',ei='" + sEid + "',sv='" + sSv + "',u='" + sUrix + "',yesRef='" + sRef + "',got=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function hx(b){return Array.from(new Uint8Array(b)).map(function(x){return('0'+x.toString(16)).slice(-2)}).join('')}function hookFetch(){if(window.__plyHooked)return;window.__plyHooked=1;var fo=fetch;fetch=function(a,b){b=b||{};b.credentials=b.credentials||'include';return fo(a,b).then(function(r){var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(s.indexOf('/get/')>=0||s.indexOf('.m3u8')>=0||s.indexOf('/hls/')>=0){r.clone().text().then(function(t){pm({status:r.status,responseURL:s,responseText:t,source:'hook'});}).catch(function(){});}return r;});};var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(){this.withCredentials=true;this.addEventListener('load',function(){pm({status:this.status,responseURL:this.responseURL,responseText:this.responseText||'',source:'xhr'});});return xo.apply(this,arguments);};}async function ne(loc,plain){var enc=new TextEncoder(),pw=enc.encode(loc),pb=await crypto.subtle.importKey('raw',pw,'PBKDF2',false,['deriveKey']),salt=crypto.getRandomValues(new Uint8Array(8)),ak=await crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:1000,hash:'SHA-256'},pb,{name:'AES-GCM',length:256},false,['encrypt']),iv=crypto.getRandomValues(new Uint8Array(12)),ct=await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},ak,enc.encode(plain));return hx(salt)+'-'+hx(iv)+'-'+hx(new Uint8Array(ct))}async function runGet(){if(got)return;try{var tr=await fetch('/cdn-cgi/trace',{credentials:'include'}).then(function(r){return r.text()}),loc=(tr.match(/loc=([A-Z]+)/)||[, 'US'])[1];if(u){try{await fetch('/watch/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({v:u}),credentials:'include'});}catch(e){}}if(typeof setSRC==='function'&&typeof plyURL!=='undefined'){pm({step:'call-setSRC'});await setSRC(sv,mid,ei);return;}var ts=Math.floor(Date.now()/1000),plain=mid+'+'+ei+'+'+sv+'+'+ts,hash=await ne(loc,plain),getUrl='/get/'+hash,r=await fetch(getUrl,{credentials:'include'}),t=await r.text();got=1;pm({status:r.status,responseURL:location.origin+getUrl,responseText:t,source:'inject'})}catch(e){pm({error:String(e),source:'inject'})}}function onPloyan(){hookFetch();if(u){try{if(!location.hash||location.hash.length<3){history.replaceState(null,'',location.pathname+location.search+'#'+u);}}catch(e){}}var start=function(){setTimeout(runGet,2500);};if(document.readyState==='complete'){start();}else{window.addEventListener('load',start);}}function onYesmovies(){pm({step:'warm-yesmovies'});hookFetch();var tries=0,timer=setInterval(function(){tries++;if(typeof setSRC==='function'&&typeof plyURL!=='undefined'){clearInterval(timer);setSRC(sv,mid,ei).catch(function(e){pm({error:String(e),source:'setSRC'})});}else if(tries>40){clearInterval(timer);var watch=atob(plyURL||'');if(watch){location.replace(watch+'/watch/?v'+sv+ei+(u?'#'+u:''));}}},500);}if(location.hostname.indexOf('yesmovies')>=0){onYesmovies();}else{onPloyan();}})();";
}
hosts["ployan"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, urix, mid, eid, sv, yesReferer, loadUrl, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        HOST = 'ployan';
        urix = (config && config.urix) ? config.urix : '';
        mid = (config && config.mid) ? config.mid : '';
        eid = (config && config.eid) ? config.eid : '';
        sv = (config && config.sv) ? config.sv : '1';
        yesReferer = (config && config.yesReferer) ? config.yesReferer : 'https://ww.yesmovies.ag/';
        loadUrl = (config && config.yesDetailUrl) ? config.yesDetailUrl : String(url || '').split('#')[0];
        headers = {
            'Referer': yesReferer,
            'Origin': 'https://ww.yesmovies.ag',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildPloyanInjectScript(urix, mid, eid, sv, yesReferer);
        console.log('[RN-Fetch][PLOYAN-HOST] ' + loadUrl.substring(0, 100) + ' mid=' + mid);
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
