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
 * Passive inject only:
 * - ensure #urix is present
 * - hook fetch/XHR /get/ and postMessage JSON success
 * - do NOT synthesize /get/ hash (PBKDF2 password is NOT CF loc; handmade hashes always 404)
 * - do NOT patch DOMContentLoaded / block HLS before native /get/ succeeds
 */
function buildPloyanInjectScript(urix, mid, eid, sv, yesLoc) {
    var sUrix = escJs(urix);
    var sMid = escJs(mid);
    var sEid = escJs(eid);
    var sSv = escJs(sv);
    var sYesLoc = escJs(yesLoc || 'US');
    return "(function(){var u='" + sUrix + "',yl='" + sYesLoc + "',mid='" + sMid + "',eid='" + sEid + "',sv='" + sSv + "',done=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}try{pm({step:'inject-boot',urixLen:(u||'').length});}catch(e0){}function markDone(m){if(m&&m.status===200&&m.responseText&&m.responseText.charAt(0)==='{'){done=1;}}function hookNet(){if(window.__plyHooked)return;window.__plyHooked=1;pm({step:'hook-ready',urixLen:(u||'').length,hashLen:(location.hash||'').length});var fo=window.fetch;if(typeof fo==='function'){window.fetch=function(a,b){var s=typeof a==='string'?a:(a&&a.url?a.url:'');return fo.apply(this,arguments).then(function(r){if(String(s).indexOf('/get/')>=0){try{r.clone().text().then(function(t){var m={status:r.status,responseURL:String(s).indexOf('http')===0?s:(location.origin+s),responseText:t,source:'hook'};markDone(m);pm(m);if(done){pm({step:'get-ok',src:'hook'});}}).catch(function(){});}catch(e1){}}return r;});};}try{var xo=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u2){this._plyUrl=u2;return xo.apply(this,arguments);};var xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){var x=this;x.addEventListener('load',function(){var u2=x._plyUrl||x.responseURL||'';if(String(u2).indexOf('/get/')>=0){var m={status:x.status,responseURL:String(u2).indexOf('http')===0?u2:(location.origin+u2),responseText:x.responseText||'',source:'xhr'};markDone(m);pm(m);if(done){pm({step:'get-ok',src:'xhr'});}}});return xs.apply(x,arguments);};}catch(e2){pm({step:'hook-xhr-err',error:String(e2)});}}try{if(u&&(!location.hash||location.hash.length<3)){history.replaceState(null,'',location.pathname+location.search+'#'+u);pm({step:'hash-set',len:u.length});}else if(location.hash&&location.hash.length>2){pm({step:'hash-ok',len:location.hash.length});}else{pm({step:'urix-missing'});}}catch(e){pm({step:'hash-err',error:String(e)});}try{hookNet();}catch(e3){pm({step:'hook-err',error:String(e3)});}pm({step:'native-wait'});var checks=[1500,4000,8000,15000];for(var i=0;i<checks.length;i++){(function(ms){setTimeout(function(){if(!done){pm({step:'native-pending',ms:ms});}},ms);})(checks[i]);}setTimeout(function(){if(!done){pm({step:'native-timeout'});}},20000);})();";
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
        yesReferer = (config && config.yesReferer) ? config.yesReferer : 'https://ww2.yesmovies.ag/';
        watchBase = (config && config.watchUrl) ? config.watchUrl : String(url || '').split('#')[0];
        loadUrl = watchBase;
        if (urix) {
            loadUrl = watchBase + '#' + urix;
        }
        headers = {
            'Referer': yesReferer,
            'Origin': 'https://ww2.yesmovies.ag',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        };
        beforeLoadScript = buildPloyanInjectScript(urix, mid, eid, sv, yesLoc);
        console.log('[RN-Fetch][PLOYAN-HOST] v6-prefetch-urix ' + loadUrl.substring(0, 120) + ' urixLen=' + String(urix || '').length);
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
