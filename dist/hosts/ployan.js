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
/**
 * 1) Start on yesmovies detail so ployan gets a real document.referrer
 * 2) Hop to ployan#urix
 * 3) Hide ReactNativeWebView from page anti-bot; keep private postMessage ref
 * 4) Passive-hook /get/ (+ capture PBKDF2 pwd for diagnostics)
 */
function buildPloyanInjectScript(urix, mid, eid, sv, yesLoc, ployanTarget, yesReferer) {
    var sUrix = escJs(urix);
    var sMid = escJs(mid);
    var sEid = escJs(eid);
    var sSv = escJs(sv);
    var sYesLoc = escJs(yesLoc || 'US');
    var sTarget = escJs(ployanTarget || '');
    var sRef = escJs(yesReferer || 'https://ww2.yesmovies.ag/');
    return "(function(){var u='" + sUrix + "',yl='" + sYesLoc + "',mid='" + sMid + "',eid='" + sEid + "',sv='" + sSv + "',target='" + sTarget + "',yref='" + sRef + "',done=0,pwdCap='',RN=null;try{RN=window.ReactNativeWebView||null;if(RN){try{Object.defineProperty(window,'ReactNativeWebView',{get:function(){return undefined;},set:function(){},configurable:true});}catch(eHide){try{delete window.ReactNativeWebView;}catch(eDel){}}}}catch(eRn){}function pm(m){try{if(RN&&RN.postMessage){RN.postMessage(JSON.stringify(m));}else if(window.ReactNativeWebView&&window.ReactNativeWebView.postMessage){window.ReactNativeWebView.postMessage(JSON.stringify(m));}}catch(e){}}try{pm({step:'inject-boot',host:location.hostname,path:location.pathname,urixLen:(u||'').length,hasTarget:!!target});}catch(e0){}if(location.hostname.indexOf('ployan')<0){if(target){pm({step:'referrer-hop',to:target.substring(0,120)});try{location.replace(target);}catch(eHop){try{location.href=target;}catch(eHop2){pm({step:'hop-err',error:String(eHop2)});}}return;}try{Object.defineProperty(document,'referrer',{configurable:true,get:function(){return yref;}});}catch(eRef){}try{Object.defineProperty(navigator,'webdriver',{configurable:true,get:function(){return false;}});}catch(eWd){}function markDone(m){if(m&&m.status===200&&m.responseText&&m.responseText.charAt(0)==='{'){done=1;}}function hookCrypto(){try{if(!crypto||!crypto.subtle||window.__plyCryptoHooked)return;window.__plyCryptoHooked=1;var oi=crypto.subtle.importKey.bind(crypto.subtle);crypto.subtle.importKey=function(format,keyData,alg,ext,usages){try{var name=typeof alg==='string'?alg:(alg&&alg.name)||'';if(name==='PBKDF2'||(usages&&usages.indexOf&&usages.indexOf('deriveKey')>=0)){var prev='';try{prev=new TextDecoder().decode(keyData instanceof ArrayBuffer?new Uint8Array(keyData):keyData);}catch(eDec){prev='';}if(prev&&prev.length<=32){pwdCap=prev;pm({step:'pbkdf2-pwd',pwd:prev});}}catch(eCap){}return oi(format,keyData,alg,ext,usages);};}catch(eC){pm({step:'crypto-hook-err',error:String(eC)});}}function hookNet(){if(window.__plyHooked)return;window.__plyHooked=1;pm({step:'hook-ready',urixLen:(u||'').length,hashLen:(location.hash||'').length,referrer:(document.referrer||'').substring(0,80)});var fo=window.fetch;if(typeof fo==='function'){window.fetch=function(a,b){var s=typeof a==='string'?a:(a&&a.url?a.url:'');return fo.apply(this,arguments).then(function(r){if(String(s).indexOf('/get/')>=0){try{r.clone().text().then(function(t){var m={status:r.status,responseURL:String(s).indexOf('http')===0?s:(location.origin+s),responseText:t,source:'hook'};markDone(m);pm(m);if(done){pm({step:'get-ok',src:'hook'});}}).catch(function(){});}catch(e1){}}return r;});};}try{var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u2){this._plyUrl=u2;return xo.apply(this,arguments);};var xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){var x=this;x.addEventListener('load',function(){var u2=x._plyUrl||x.responseURL||'';if(String(u2).indexOf('/get/')>=0){var m={status:x.status,responseURL:String(u2).indexOf('http')===0?u2:(location.origin+u2),responseText:x.responseText||'',source:'xhr'};markDone(m);pm(m);if(done){pm({step:'get-ok',src:'xhr'});}}});return xs.apply(x,arguments);};}catch(e2){pm({step:'hook-xhr-err',error:String(e2)});}}function diag(ms){try{var body=(document.body&&document.body.innerText||'').replace(/\\s+/g,' ').substring(0,120);pm({step:'diag',ms:ms,title:document.title||'',body:body,pwd:pwdCap||'',done:done});}catch(eD){}}try{if(u&&(!location.hash||location.hash.length<3)){history.replaceState(null,'',location.pathname+location.search+'#'+u);pm({step:'hash-set',len:u.length});}else if(location.hash&&location.hash.length>2){pm({step:'hash-ok',len:location.hash.length});}else{pm({step:'urix-missing'});}}catch(e){pm({step:'hash-err',error:String(e)});}try{hookCrypto();}catch(e3){}try{hookNet();}catch(e4){pm({step:'hook-err',error:String(e4)});}pm({step:'native-wait'});var checks=[1500,4000,8000,15000];for(var i=0;i<checks.length;i++){(function(ms){setTimeout(function(){if(!done){pm({step:'native-pending',ms:ms});diag(ms);}},ms);})(checks[i]);}setTimeout(function(){if(!done){pm({step:'native-timeout'});diag(20000);}},20000);})();";
}
hosts["ployan"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, urix, mid, eid, sv, yesLoc, yesReferer, watchBase, ployanTarget, hopUrl, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        HOST = 'ployan';
        urix = (config && config.urix) ? config.urix : '';
        mid = (config && config.mid) ? config.mid : '';
        eid = (config && config.eid) ? config.eid : '';
        sv = (config && config.sv) ? config.sv : '1';
        yesLoc = (config && config.yesLoc) ? config.yesLoc : 'US';
        yesReferer = (config && config.yesReferer) ? config.yesReferer : 'https://ww2.yesmovies.ag/';
        watchBase = (config && config.watchUrl) ? config.watchUrl : String(url || '').split('#')[0];
        ployanTarget = watchBase;
        if (urix) {
            ployanTarget = watchBase + '#' + urix;
        }
        // Start on yesmovies detail so the subsequent hop gives ployan a real document.referrer.
        hopUrl = yesReferer;
        if (!hopUrl || hopUrl.indexOf('yesmovies') < 0) {
            hopUrl = 'https://ww2.yesmovies.ag/';
        }
        headers = {
            'Referer': 'https://ww2.yesmovies.ag/',
            'Origin': 'https://ww2.yesmovies.ag',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildPloyanInjectScript(urix, mid, eid, sv, yesLoc, ployanTarget, yesReferer);
        console.log('[RN-Fetch][PLOYAN-HOST] v7-referrer-hop hop=' + hopUrl.substring(0, 80) + ' → ' + ployanTarget.substring(0, 100) + ' urixLen=' + String(urix || '').length);
        try {
            callback({
                callback: {
                    provider: provider,
                    host: HOST,
                    url: hopUrl,
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
                        ployanTarget: ployanTarget,
                        url_webview: ployanTarget,
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
