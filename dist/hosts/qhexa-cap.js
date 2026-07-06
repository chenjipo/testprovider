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
function buildQhexaCapWebviewScript() {
  return "(function(){var done=0,ENDPOINT='" + QHEXA_CAP_ENDPOINT + "';function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function onToken(token){if(done||!token)return;done=1;pm({step:'qhexa-cap-token',token:String(token)});}function mount(){if(done)return;var el=document.createElement('cap-widget');el.setAttribute('data-cap-api-endpoint',ENDPOINT);el.setAttribute('data-cap-i18n-initial-state','Verify');el.style.cssText='position:fixed;left:-9999px;top:-9999px;opacity:0.01;pointer-events:none;';document.body.appendChild(el);el.addEventListener('solve',function(e){var t=e&&e.detail&&e.detail.token;onToken(t);});el.addEventListener('error',function(e){var msg=(e&&e.detail&&e.detail.message)?String(e.detail.message):'cap-error';pm({step:'qhexa-cap-err',msg:msg});});pm({step:'qhexa-cap-mounted'});}function boot(){if(customElements.get('cap-widget')){mount();return;}var s=document.createElement('script');s.type='module';s.src='https://cdn.jsdelivr.net/npm/@cap.js/widget@0.1.44/cap.min.js';s.onload=function(){setTimeout(mount,400);};s.onerror=function(){pm({step:'qhexa-cap-err',msg:'widget-load-failed'});};document.head.appendChild(s);}pm({step:'qhexa-cap-boot',href:location.href});if(document.body){boot();}else{document.addEventListener('DOMContentLoaded',boot);}})();";
}
hosts['qhexa-cap'] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var pageUrl, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        pageUrl = (config && config.pageUrl) ? config.pageUrl : QHEXA_CAP_PAGE;
        headers = {
            Referer: QHEXA_CAP_PAGE,
            Origin: 'https://hexa.su',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        };
        beforeLoadScript = buildQhexaCapWebviewScript();
        console.log('[RN-Fetch][QHEXA-CAP-WV] start');
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
                    metadata: {
                        pageUrl: pageUrl,
                        url_webview: pageUrl,
                        movieInfo: movieInfo,
                    },
                },
            });
        }
        catch (e) {
            libs.log({ e: e }, 'qhexa-cap', 'ERROR');
        }
        return [2];
    });
}); };
