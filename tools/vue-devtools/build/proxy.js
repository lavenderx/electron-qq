!function (e) {
  function n(o) {
    if (t[o])return t[o].exports;
    var s = t[o] = {exports: {}, id: o, loaded: !1};
    return e[o].call(s.exports, s, s.exports, n), s.loaded = !0, s.exports
  }

  var t = {};
  return n.m = e, n.c = t, n.p = "", n(0)
}([function (e, n) {
  "use strict";
  function t(e) {
    window.postMessage({source: "vue-devtools-proxy", payload: e}, "*")
  }

  function o(e) {
    e.data && "vue-devtools-backend" === e.data.source && a.postMessage(e.data.payload)
  }

  function s() {
    window.removeEventListener("message", o), t("shutdown")
  }

  var a = chrome.runtime.connect({name: "content-script"});
  a.onMessage.addListener(t), window.addEventListener("message", o), a.onDisconnect.addListener(s), t("init")
}]);
