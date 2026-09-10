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
 * Keep ReactNativeWebView visible (hiding it broke postMessage in App).
 * Passive /get/ hook; force /get/ only after native attempt stalls.
 * /get/ PBKDF2 password is "player" (not CF loc — loc is UriX only).
 */
function buildPloyanInjectScript(urix, mid, eid, sv, yesLoc, yesReferer) {
    var sUrix = escJs(urix);
    var sMid = escJs(mid);
    var sEid = escJs(eid);
    var sSv = escJs(sv);
    var sYesLoc = escJs(yesLoc || 'US');
    var sRef = escJs(yesReferer || 'https://ww2.yesmovies.ag/');
    return [
        "(function(){",
        "var u='" + sUrix + "',yl='" + sYesLoc + "',mid='" + sMid + "',eid='" + sEid + "',sv='" + sSv + "',yref='" + sRef + "',",
        "done=0,pwdCap='',dead=0,titleOk=0,forcing=0,nativeGetAt=0,forceTried=0,shellNudge=0;",
        "function pm(m){try{window.ReactNativeWebView.postMessage(JSON.stringify(m));}catch(e){}}",
        "try{pm({step:'inject-boot',host:location.hostname,path:location.pathname,urixLen:(u||'').length});}catch(e0){}",
        "try{Object.defineProperty(document,'referrer',{configurable:true,get:function(){return yref;}});}catch(eRef){}",
        "try{Object.defineProperty(navigator,'webdriver',{configurable:true,get:function(){return false;}});}catch(eWd){}",
        "function markDone(m){if(m&&m.status===200&&m.responseText&&m.responseText.charAt(0)==='{'){try{var j=JSON.parse(m.responseText);if(j&&j.code===200&&j.info){done=1;}}catch(eJ){}}}",
        "function checkDead(){try{var t=(document.title||'')+' '+(document.body&&document.body.innerText||'');if(/404|unavailable|not found|oops/i.test(t)&&!/^\\d+-\\d+/.test(document.title||'')){if(!dead){dead=1;pm({step:'page-404',title:(document.title||'').substring(0,80),body:t.replace(/\\s+/g,' ').substring(0,140)});}}}catch(eZ){}}",
        "function checkTitle(){try{var t=String(document.title||'');if(/^\\d+-\\d+/.test(t)){if(!titleOk){titleOk=1;pm({step:'title-ok',title:t.substring(0,40)});setTimeout(function(){maybeForce('title');},2800);}return true;}}catch(eT){}return false;}",
        "function nudgeShell(){try{if(done||dead||titleOk||shellNudge)return;if(/^\\d+-\\d+/.test(String(document.title||'')))return;shellNudge=1;if(u){history.replaceState(null,'',location.pathname+location.search+'#'+u);}pm({step:'shell-nudge',title:(document.title||'').substring(0,60)});try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(eH){try{window.dispatchEvent(new Event('hashchange'));}catch(eH2){}}}catch(eN){}}",
        "function toHex(buf){return Array.from(new Uint8Array(buf)).map(function(b){return('0'+b.toString(16)).slice(-2);}).join('');}",
        "function makeGetHash(pwd){return crypto.subtle.importKey('raw',new TextEncoder().encode(String(pwd||'player')),'PBKDF2',false,['deriveKey']).then(function(base){var salt=crypto.getRandomValues(new Uint8Array(8));var iv=crypto.getRandomValues(new Uint8Array(12));var ts=Math.floor(Date.now()/1000);var plain=String(mid)+'+'+String(eid)+'+'+String(sv)+'+'+ts;return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:1000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt']).then(function(key){return crypto.subtle.encrypt({name:'AES-GCM',iv:iv},key,new TextEncoder().encode(plain)).then(function(ct){return toHex(salt)+'-'+toHex(iv)+'-'+toHex(ct);});});});}",
        "function fetchGet(hash){",
        "  var fo=window.__plyFetchOrig||fetch;",
        "  var ctrl=null,timer=null;",
        "  try{if(typeof AbortController!=='undefined'){ctrl=new AbortController();timer=setTimeout(function(){try{ctrl.abort();}catch(eA){}},8000);}}catch(eAc){}",
        "  var opts={credentials:'include',headers:{'Accept':'application/json, text/plain, */*','Referer':location.href}};",
        "  if(ctrl)opts.signal=ctrl.signal;",
        "  return fo('/get/'+hash,opts).then(function(r){",
        "    return r.text().then(function(t){if(timer)clearTimeout(timer);return {status:r.status,responseURL:location.origin+'/get/'+hash,responseText:t,source:'force'};});",
        "  }).catch(function(e){if(timer)clearTimeout(timer);throw e;});",
        "}",
        "function maybeForce(tag){",
        "  if(done||dead)return;",
        "  var age=nativeGetAt?(Date.now()-nativeGetAt):99999;",
        "  if(nativeGetAt&&age<3500){pm({step:'force-wait-native',src:tag||'',age:age});setTimeout(function(){maybeForce(tag||'retry');},3600-age);return;}",
        "  forceGet(tag);",
        "}",
        "function forceGet(tag){",
        "  if(done||dead||forcing)return;",
        "  if(!crypto||!crypto.subtle){pm({step:'force-get-skip',reason:'no-subtle'});return;}",
        "  forcing=1;forceTried=1;",
        "  var pwds=[];function addPwd(p){p=String(p||'');if(p&&pwds.indexOf(p)<0)pwds.push(p);}",
        "  addPwd('player');addPwd(pwdCap);",
        "  pm({step:'force-get-start',src:tag||'',pwds:pwds.join(',')});",
        "  var i=0;",
        "  function next(){",
        "    if(done||dead||i>=pwds.length){forcing=0;if(!done)pm({step:'force-get-miss',tried:pwds.join(',')});return;}",
        "    var pwd=pwds[i++];",
        "    makeGetHash(pwd).then(function(h){",
        "      pm({step:'force-get',pwd:pwd,hashLen:h.length,src:tag||''});",
        "      return fetchGet(h).then(function(m){",
        "        markDone(m);",
        "        pm({step:'force-get-resp',pwd:pwd,status:m.status,body:(m.responseText||'').substring(0,120),src:tag||''});",
        "        pm(m);",
        "        if(done){pm({step:'get-ok',src:'force-'+pwd});forcing=0;return;}",
        "        next();",
        "      });",
        "    }).catch(function(e){pm({step:'force-get-err',pwd:pwd,error:String(e&&e.name?e.name:e).substring(0,80)});next();});",
        "  }",
        "  next();",
        "}",
        "function hookCrypto(){try{if(!crypto||!crypto.subtle)return;if(!window.__plyCryptoOrig){window.__plyCryptoOrig=crypto.subtle.importKey.bind(crypto.subtle);}crypto.subtle.importKey=function(format,keyData,alg,ext,usages){try{var name=typeof alg==='string'?alg:(alg&&alg.name)||'';if(name==='PBKDF2'){var prev='';try{prev=new TextDecoder().decode(keyData instanceof ArrayBuffer?new Uint8Array(keyData):keyData);}catch(eDec){prev='';}if(prev&&prev.length<=64){pwdCap=prev;pm({step:'pbkdf2-pwd',pwd:prev});}}}catch(eCap){}return window.__plyCryptoOrig(format,keyData,alg,ext,usages);};}catch(eC){}}",
        "function hookNet(){",
        "  var reentry=!!window.__plyHooked;window.__plyHooked=1;",
        "  pm({step:'hook-ready',urixLen:(u||'').length,hashLen:(location.hash||'').length,referrer:(document.referrer||'').substring(0,80),mode:reentry?'reentry':undefined});",
        "  if(!window.__plyFetchOrig&&typeof window.fetch==='function'){window.__plyFetchOrig=window.fetch.bind(window);}",
        "  var fo=window.__plyFetchOrig||window.fetch;",
        "  if(typeof fo==='function'){",
        "    window.fetch=function(a,b){",
        "      var s=typeof a==='string'?a:(a&&a.url?a.url:'');",
        "      b=b||{};",
        "      if(String(s).indexOf('/get/')>=0){try{b=Object.assign({},b,{credentials:'include'});}catch(eCred){}nativeGetAt=Date.now();pm({step:'net-url',url:String(s).substring(0,120)});}",
        "      else if(String(s).indexOf('/hls/')>=0){pm({step:'net-url',url:String(s).substring(0,120)});}",
        "      return fo.call(this,a,b).then(function(r){",
        "        if(String(s).indexOf('/get/')>=0){",
        "          try{r.clone().text().then(function(t){",
        "            var m={status:r.status,responseURL:String(s).indexOf('http')===0?s:(location.origin+s),responseText:t,source:'hook'};",
        "            markDone(m);",
        "            pm({step:'hook-get-resp',status:m.status,body:(t||'').substring(0,120)});",
        "            pm(m);",
        "            if(done){pm({step:'get-ok',src:'hook'});}",
        "            else if(!forceTried){setTimeout(function(){maybeForce('after-hook');},500);}",
        "          }).catch(function(eH){pm({step:'hook-get-err',error:String(eH).substring(0,80)});});}catch(e1){}",
        "        }",
        "        return r;",
        "      });",
        "    };",
        "  }",
        "  try{",
        "    if(!window.__plyXhrOpenOrig){window.__plyXhrOpenOrig=XMLHttpRequest.prototype.open;window.__plyXhrSendOrig=XMLHttpRequest.prototype.send;}",
        "    XMLHttpRequest.prototype.open=function(m,u2){this._plyUrl=u2;return window.__plyXhrOpenOrig.apply(this,arguments);};",
        "    XMLHttpRequest.prototype.send=function(){",
        "      var x=this;try{x.withCredentials=true;}catch(eWc){}",
        "      x.addEventListener('load',function(){",
        "        var u2=x._plyUrl||x.responseURL||'';",
        "        if(String(u2).indexOf('/get/')>=0){",
        "          nativeGetAt=Date.now();",
        "          var m={status:x.status,responseURL:String(u2).indexOf('http')===0?u2:(location.origin+u2),responseText:x.responseText||'',source:'xhr'};",
        "          markDone(m);pm({step:'xhr-get-resp',status:m.status,body:(m.responseText||'').substring(0,120)});pm(m);",
        "          if(done){pm({step:'get-ok',src:'xhr'});}",
        "        }",
        "      });",
        "      return window.__plyXhrSendOrig.apply(x,arguments);",
        "    };",
        "  }catch(e2){pm({step:'hook-xhr-err',error:String(e2)});}",
        "}",
        "function kickPlay(tag){",
        "  try{",
        "    if(done||dead)return;checkDead();checkTitle();if(dead)return;",
        "    var clicked=0;",
        "    var el=document.querySelector('.jw-icon-display')||document.querySelector('button[aria-label=\"Play\"]')||document.querySelector('video');",
        "    if(el){try{el.click();clicked=1;}catch(eClick){}}",
        "    try{if(window.jwplayer){var p=jwplayer();if(p&&p.play){p.play();clicked=1;}}}catch(eJw){}",
        "    pm({step:'kick-play',src:tag||'',title:(document.title||'').substring(0,60),clicked:clicked});",
        "    if(titleOk&&!done)maybeForce('kick-'+tag);",
        "  }catch(eK){}",
        "}",
        "function diag(ms){",
        "  try{",
        "    checkDead();checkTitle();",
        "    var body=(document.body&&document.body.innerText||'').replace(/\\s+/g,' ').substring(0,120);",
        "    pm({step:'diag',ms:ms,title:document.title||'',body:body,pwd:pwdCap||'',done:done,dead:dead,titleOk:titleOk});",
        "    if(titleOk&&!done&&ms>=3000)maybeForce('diag-'+ms);",
        "  }catch(eD){}",
        "}",
        "try{if(u&&(!location.hash||location.hash.length<3)){history.replaceState(null,'',location.pathname+location.search+'#'+u);pm({step:'hash-set',len:u.length});}else if(location.hash&&location.hash.length>2){pm({step:'hash-ok',len:location.hash.length});}else{pm({step:'urix-missing'});}}catch(e){pm({step:'hash-err',error:String(e)});}",
        "try{hookCrypto();}catch(e3){}",
        "try{hookNet();}catch(e4){pm({step:'hook-err',error:String(e4)});}",
        "pm({step:'native-wait'});",
        "try{new MutationObserver(function(){checkTitle();}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});}catch(eMo){}",
        "setTimeout(function(){if(!done&&!dead&&!titleOk){nudgeShell();}},2500);",
        "setTimeout(function(){if(!done&&!dead&&!titleOk){pm({step:'shell-stuck',title:(document.title||'').substring(0,60)});}},4500);",
        "[800,1200,3000,7000,12000].forEach(function(ms){setTimeout(function(){if(!done)kickPlay('t'+ms);},ms);});",
        "[1500,2000,5000,10000,18000].forEach(function(ms){setTimeout(function(){if(!done){pm({step:'native-pending',ms:ms});diag(ms);}},ms);});",
        "setTimeout(function(){if(!done){pm({step:'native-timeout'});diag(25000);}},25000);",
        "})();true;"
    ].join('');
}
hosts["ployan"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var HOST, urix, mid, eid, sv, yesLoc, yesReferer, watchBase, loadUrl, headers, beforeLoadScript;
    return __generator(this, function (_a) {
        HOST = 'ployan-embed';
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
        beforeLoadScript = buildPloyanInjectScript(urix, mid, eid, sv, yesLoc, yesReferer);
        console.log('[RN-Fetch][PLOYAN-HOST] v16-stable-i url=' + loadUrl.substring(0, 120) + ' urixLen=' + String(urix || '').length);
        try {
            callback({
                callback: {
                    provider: provider,
                    // *-embed host naming matches App's post-load script injection path (like closeload-embed).
                    host: HOST,
                    url: loadUrl,
                    headers: headers,
                    callback: callback,
                    userAgent: headers['user-agent'],
                    beforeLoadScript: beforeLoadScript,
                    script: beforeLoadScript,
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
hosts["ployan-embed"] = hosts["ployan"];
