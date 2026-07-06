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
var QHEXA_CAP_PAGE = 'https://hexa.su/';
var QHEXA_CAP_ENDPOINT = 'https://cap.hexa.su/15d2cf0395/';
var QHEXA_CAP_WIDGET_CDN = [
    'https://raw.githubusercontent.com/chenjipo/testprovider/main/dist/hosts/cap-widget.min.js',
    'https://cdn.jsdelivr.net/npm/@cap.js/widget@0.1.44/cap.min.js',
    'https://unpkg.com/@cap.js/widget@0.1.44/cap.min.js',
];
function buildQhexaCapPageUrl() {
    return QHEXA_CAP_PAGE + '?_cap=' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
}
function buildQhexaCapPingScript(phase) {
    return "(function(){try{window.ReactNativeWebView.postMessage(JSON.stringify({step:'qhexa-cap-ping',phase:'" + phase + "',href:String(location.href||''),ready:String(document.readyState||'')}));}catch(e){try{window.ReactNativeWebView.postMessage(JSON.stringify({step:'qhexa-cap-err',msg:'ping-'+String(e)}));}catch(_e){}}})();true;";
}
function buildQhexaCapBootScript() {
    var cdnList = JSON.stringify(QHEXA_CAP_WIDGET_CDN);
    return "(function(){if(window.__qhexaCapBooted)return;window.__qhexaCapBooted=1;var done=0,tries=0,maxTries=120,ENDPOINT='" + QHEXA_CAP_ENDPOINT + "',CDN=" + cdnList + ",cdnIdx=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function onToken(token){if(done||!token)return;done=1;pm({step:'qhexa-cap-token',token:String(token)});}function mount(){if(done)return;if(!window.customElements||!customElements.get('cap-widget')){pm({step:'qhexa-cap-err',msg:'widget-undefined'});return;}var el=document.createElement('cap-widget');el.setAttribute('data-cap-api-endpoint',ENDPOINT);el.setAttribute('data-cap-i18n-initial-state','Verify');el.setAttribute('data-cap-worker-count','4');el.style.cssText='position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0.01;overflow:hidden;';(document.body||document.documentElement).appendChild(el);el.addEventListener('solve',function(e){var t=e&&e.detail&&e.detail.token;onToken(t);});el.addEventListener('error',function(e){var msg=(e&&e.detail&&e.detail.message)?String(e.detail.message):'cap-error';pm({step:'qhexa-cap-err',msg:msg});});pm({step:'qhexa-cap-mounted'});}function loadWidget(){if(done)return;if(customElements.get('cap-widget')){mount();return;}if(cdnIdx>=CDN.length){pm({step:'qhexa-cap-err',msg:'widget-load-failed'});return;}var s=document.createElement('script');s.src=CDN[cdnIdx];s.async=true;s.onload=function(){setTimeout(mount,300);};s.onerror=function(){cdnIdx++;loadWidget();};(document.head||document.documentElement).appendChild(s);}function boot(){pm({step:'qhexa-cap-boot',href:String(location.href||''),ready:String(document.readyState||'')});loadWidget();}function ensureBody(){if(document.body){boot();return true;}return false;}if(!ensureBody()){var iv=setInterval(function(){tries++;if(ensureBody()||done||tries>=maxTries){clearInterval(iv);if(!done&&tries>=maxTries){pm({step:'qhexa-cap-err',msg:'body-timeout'});}}},250);}})();true;";
}
hosts['qhexa-cap'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var pageUrl, headers, beforeLoadScript, afterLoadScript;
    return __generator(this, function (_a) {
        pageUrl = (config && config.pageUrl) ? config.pageUrl : buildQhexaCapPageUrl();
        headers = {
            Referer: QHEXA_CAP_PAGE,
            Origin: 'https://hexa.su',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        };
        beforeLoadScript = buildQhexaCapPingScript('before');
        afterLoadScript = buildQhexaCapPingScript('after') + buildQhexaCapBootScript();
        console.log('[RN-Fetch][QHEXA-CAP-WV] start url=' + pageUrl);
        try {
            callback({
                callback: {
                    provider: provider,
                    host: 'qhexa-cap',
                    url: pageUrl,
                    headers: headers,
                    callback: callback,
                    userAgent: headers['user-agent'],
                    beforeLoadScript: beforeLoadScript,
                    script: afterLoadScript,
                    metadata: {
                        pageUrl: pageUrl,
                        url_webview: pageUrl,
                        movieInfo: movieInfo,
                    },
                },
            });
            console.log('[RN-Fetch][QHEXA-CAP-WV] dispatched host=qhexa-cap');
        }
        catch (e) {
            libs.log({ e: e }, 'qhexa-cap', 'ERROR');
            console.log('[RN-Fetch][QHEXA-CAP-WV-ERR] ' + String(e && e.message ? e.message : e));
        }
        return [2];
    });
}); };
