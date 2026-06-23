// vod_debug_iyesmovies.js v4 - 专用于 IYesMovies / ployan 调试
// 用法: frida -U -f com.tv.hdobox -l vod_debug_iyesmovies.js --no-pause

function findNativeExport(moduleName, exportName) {
  try {
    if (typeof Module.getExportByName === "function") {
      return Module.getExportByName(moduleName, exportName);
    }
  } catch (e) { }
  try {
    var mod = Process.findModuleByName(moduleName);
    if (mod && typeof mod.findExportByName === "function") {
      return mod.findExportByName(exportName);
    }
  } catch (e2) { }
  return null;
}

function hookNativeLog() {
  var names = ["__android_log_write", "__android_log_buf_write"];
  var hooked = false;
  names.forEach(function (symName) {
    var sym = findNativeExport("liblog.so", symName);
    if (!sym) return;
    Interceptor.attach(sym, {
      onEnter: function (args) {
        var tag = "";
        var msg = "";
        try {
          tag = args[1].readCString() || "";
          msg = args[2].readCString() || "";
        } catch (e) {
          return;
        }
        if (!msg) return;
        var show = false;
        if (msg.indexOf("IYESDBG:") >= 0) show = true;
        if (msg.indexOf("PLOYAN") >= 0) show = true;
        if (msg.indexOf("IYesMovies") >= 0) show = true;
        if (tag.indexOf("ReactNativeJS") >= 0) show = true;
        if (tag.indexOf("Hermes") >= 0 && msg.indexOf("Error") >= 0) show = true;
        if (show) {
          console.log("[ALOG][" + tag + "] " + msg.substring(0, 3000));
        }
      }
    });
    console.log("[+] Native log hooked: " + symName);
    hooked = true;
  });
  if (!hooked) {
    console.log("[-] Native __android_log_write not found");
  }
}

Java.perform(function () {
  console.log("[*] VOD Debug IYesMovies v4 starting...");

  function tagForUrl(url) {
    var lower = (url || "").toLowerCase();
    if (lower.indexOf("yesmovies.ag") >= 0) return "[RN-Fetch][YESMOVIES]";
    if (lower.indexOf("ployan.me") >= 0) {
      if (lower.indexOf("/get/") >= 0) return "[RN-Fetch][PLOYAN-GET]";
      if (lower.indexOf("/cdn-cgi/trace") >= 0) return "[RN-Fetch][PLOYAN-TRACE]";
      if (lower.indexOf("/hls/") >= 0 || lower.indexOf("m3u8") >= 0) return "[RN-Fetch][PLOYAN-HLS]";
      return "[RN-Fetch][PLOYAN]";
    }
    return "[RN-Fetch]";
  }

  function shouldPrintJsLog(message) {
    if (!message) return false;
    if (message.indexOf("ReactNativeJS") >= 0) return true;
    if (message.indexOf("IYESDBG:") >= 0) return true;
    if (message.indexOf("PLOYAN") >= 0) return true;
    if (message.indexOf("IYesMovies") >= 0) return true;
    return false;
  }

  try {
    var NM = Java.use("com.facebook.react.modules.network.NetworkingModule");
    NM.sendRequest.implementation = function () {
      var method = arguments[0] ? arguments[0].toString() : "?";
      var url = arguments[1] ? arguments[1].toString() : "?";
      console.log(tagForUrl(url) + " " + method + " " + url);
      return this.sendRequest.apply(this, arguments);
    };
    console.log("[+] NetworkingModule.sendRequest hooked");
  } catch (e) {
    console.log("[-] NetworkingModule: " + e);
  }

  try {
    var ResponseBody = Java.use("okhttp3.ResponseBody");
    ResponseBody.string.implementation = function () {
      var body = this.string();
      if (body) {
        var preview = body.substring(0, Math.min(1200, body.length));
        if (body.indexOf("loc=") >= 0) {
          console.log("[RespBody][TRACE] " + preview.replace(/\n/g, "\\n"));
        }
        if (body.indexOf('"info"') >= 0 || body.indexOf('"code"') >= 0) {
          console.log("[RespBody][JSON] " + preview);
        }
      }
      return body;
    };
    console.log("[+] okhttp3.ResponseBody.string hooked");
  } catch (e) {
    console.log("[-] ResponseBody.string: " + e);
  }

  try {
    var RealCall = Java.use("okhttp3.internal.connection.RealCall");
    RealCall.execute.implementation = function () {
      var req = this.request();
      var url = req.url().toString();
      if (url.indexOf("ployan") >= 0 || url.indexOf("yesmovies") >= 0) {
        console.log("[OkHttp-sync] " + req.method() + " " + url);
      }
      return this.execute.apply(this, arguments);
    };
    console.log("[+] OkHttp RealCall.execute hooked");
  } catch (e) {
    try {
      var RealCallLegacy = Java.use("okhttp3.RealCall");
      RealCallLegacy.execute.implementation = function () {
        var req = this.request();
        var url = req.url().toString();
        if (url.indexOf("ployan") >= 0 || url.indexOf("yesmovies") >= 0) {
          console.log("[OkHttp-sync] " + req.method() + " " + url);
        }
        return this.execute.apply(this, arguments);
      };
      console.log("[+] OkHttp RealCall.execute hooked (legacy)");
    } catch (e2) {
      console.log("[-] RealCall.execute (optional): " + e2);
    }
  }

  try {
    var ExceptionsManagerModule = Java.use("com.facebook.react.modules.core.ExceptionsManagerModule");
    ExceptionsManagerModule.reportException.implementation = function (data) {
      console.log("[JS-EXCEPTION] " + data);
      return this.reportException(data);
    };
    console.log("[+] ExceptionsManagerModule hooked");
  } catch (e) {
    console.log("[-] ExceptionsManagerModule: " + e);
  }

  try {
    var Log = Java.use("android.util.Log");
    Log.println.overload("int", "java.lang.String", "java.lang.String").implementation = function (level, tag, msg) {
      var tagStr = tag ? tag.toString() : "";
      var message = msg ? msg.toString() : "";
      if (shouldPrintJsLog(message) || tagStr.indexOf("ReactNativeJS") >= 0) {
        console.log("[RN-JS][" + tagStr + "] " + message.substring(0, 3000));
      }
      return this.println(level, tag, msg);
    };
    console.log("[+] android.util.Log.println hooked");
  } catch (e) {
    console.log("[-] android.util.Log: " + e);
  }

  try {
    var AS = Java.use("com.reactnativecommunity.asyncstorage.AsyncStorageModule");
    AS.multiGet.implementation = function (keys, promise) {
      return this.multiGet(keys, promise);
    };
    console.log("[+] AsyncStorage hooked (quiet)");
  } catch (e) {
    console.log("[-] AsyncStorage: " + e);
  }

  console.log("[*] Java hooks ready.");
  console.log("[*] 播放后应看到:");
  console.log("    [RN-JS] [RN-Fetch][PLOYAN-VERSION] v6");
  console.log("    [RN-JS] [RN-Fetch][PLOYAN-LOC] loc=US via=axios");
  console.log("    [RN-JS] [RN-Fetch][PLOYAN-GET] ...");
});

hookNativeLog();
