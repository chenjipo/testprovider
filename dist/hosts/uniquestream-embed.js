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
function buildUniqueStreamEmbedScript() {
    return "(function(){var done=0,bestScore=0;function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}function scoreUrl(u){u=String(u||'');if(!u||u.indexOf('http')!==0)return 0;var s=0;if(u.indexOf('master.m3u8')>=0)s+=100;if(u.indexOf('/master.m3u8')>=0)s+=50;if(u.indexOf('storrrrrrm.site')>=0)s+=45;if(u.indexOf('hellstorm.lol')>=0)s+=40;if(u.indexOf('workers.dev')>=0)s+=35;if(u.indexOf('mediacache.cc')>=0||u.indexOf('hls.uniquestream.net')>=0)s+=30;if(u.indexOf('.m3u8')>=0)s+=20;if(u.indexOf('master.txt')>=0)s+=15;return s;}function isPlayable(u){return scoreUrl(u)>0;}function toMaster(u){u=String(u||'');if(u.indexOf('/video.m3u8')>=0)return u.replace('/video.m3u8','/master.m3u8');return u;}function postUrl(u,src){if(!u)return;u=toMaster(String(u));var sc=scoreUrl(u);if(!sc)return;if(done&&sc<=bestScore)return;bestScore=sc;done=1;pm({step:'us-url',url:u,source:src||'scan'});}function findUrlsInText(text,src){if(!text||done)return;var re=/https?:\\/\\/[^\\s\"'<>\\\\]+(?:master\\.m3u8|\\.m3u8|master\\.txt|hellstorm\\.lol\\/playlist\\/[^\\s\"'<>\\\\]+|storrrrrrm\\.site\\/stream\\/[^\\s\"'<>\\\\]+)/gi,m,urls=[];while((m=re.exec(text))!==null)urls.push(m[0]);var re2=/https?:[^\"'\\\\s<>]+(?:\\.m3u8|master\\.txt)[^\"'\\\\s<>]*/gi;while((m=re2.exec(text))!==null)urls.push(m[0]);urls.sort(function(a,b){return scoreUrl(b)-scoreUrl(a);});for(var i=0;i<urls.length;i++){if(isPlayable(urls[i])){postUrl(urls[i],src||'scan-m3u8');return;}}}function scanLetUrl(){if(done)return;var html=document.documentElement?document.documentElement.innerHTML:'';var m=html.match(/let\\s+url\\s*=\\s*['\"]([^'\"]+)/i);if(m&&m[1])postUrl(m[1],'scan-let');findUrlsInText(html,'scan-html');}function loadIframeSrc(src,srcTag){if(done||!src)return;if(src.indexOf('//')===0)src='https:'+src;fetch(src,{credentials:'include'}).then(function(r){return r.text();}).then(function(html){var m=html.match(/let\\s+url\\s*=\\s*['\"]([^'\"]+)/i);if(m&&m[1])postUrl(m[1],srcTag||'iframe');findUrlsInText(html,srcTag||'iframe');scanLetUrl();}).catch(function(){});}function clickServerBtn(){var btn=document.querySelector('.server-btn[data-num=\"1\"]')||document.querySelector('.server-btn')||document.querySelector('[data-num=\"1\"].server-btn');if(btn){try{btn.click();pm({step:'us-click'});}catch(e){}}}function runPageAjax(){if(done||!window.uniquestreamPlayer)return false;var p=window.uniquestreamPlayer;if(!p.nonce||!p.postId)return false;var type=location.pathname.indexOf('/episodes/')>=0?'tv':'mv';var body='action=uniquestream_player_ajax&nonce='+encodeURIComponent(p.nonce)+'&post='+encodeURIComponent(String(p.postId))+'&type='+encodeURIComponent(type)+'&nume=1';fetch(p.ajaxUrl||'/wp-admin/admin-ajax.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest'},body:body,credentials:'include'}).then(function(r){return r.text();}).then(function(t){pm({step:'us-ajax',preview:String(t||'').substring(0,80)});findUrlsInText(t,'ajax-resp');if(!t||String(t).trim()==='-1'||String(t).trim()==='0')return;try{var j=JSON.parse(t);var embed=j.embed_url||'';findUrlsInText(embed,'ajax-embed');var m=embed.match(/src=[\"']([^\"']+)/i);if(m&&m[1])loadIframeSrc(m[1],'page-ajax');}catch(e){}}).catch(function(err){pm({step:'us-ajax-err',preview:String(err&&err.message?err.message:err)});});return true;}function whenPlayerReady(fn){var n=0;var iv=setInterval(function(){if(done){clearInterval(iv);return;}if(window.uniquestreamPlayer&&window.uniquestreamPlayer.nonce&&window.uniquestreamPlayer.postId){clearInterval(iv);fn();return;}n++;if(n>120)clearInterval(iv);},250);}function hookNet(){if(window.__usHooked)return;window.__usHooked=1;pm({step:'us-hook-ready'});var fo=fetch;fetch=function(a,b){return fo(a,b).then(function(r){var s=typeof a==='string'?a:(a&&a.url?a.url:'');if(!done&&isPlayable(s))postUrl(toMaster(s),'fetch-req');if(!done){r.clone().text().then(function(t){findUrlsInText(t,'fetch-body');}).catch(function(){});}return r;});};var xo=XMLHttpRequest.prototype.open,xs=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(m,u){this.__usUrl=u;return xo.apply(this,arguments);};XMLHttpRequest.prototype.send=function(){this.addEventListener('load',function(){if(!done&&this.responseText)findUrlsInText(this.responseText,'xhr');});return xs.apply(this,arguments);};}hookNet();pm({step:'us-boot',href:location.href});if(location.hostname.indexOf('hls.uniquestream.net')>=0){scanLetUrl();}else if(location.hostname.indexOf('uniquestream.net')>=0){whenPlayerReady(function(){clickServerBtn();runPageAjax();var r=0;var ar=setInterval(function(){if(done||r>8){clearInterval(ar);return;}runPageAjax();r++;},1500);});}else{scanLetUrl();}var n=0;var iv=setInterval(function(){scanLetUrl();n++;if(done||n>80)clearInterval(iv);},500);})();";
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
        beforeLoadScript = buildUniqueStreamEmbedScript();
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
