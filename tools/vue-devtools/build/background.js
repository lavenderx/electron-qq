!function (e) {
  function o(t) {
    if (n[t])return n[t].exports;
    var s = n[t] = {exports: {}, id: t, loaded: !1};
    return e[t].call(s.exports, s, s.exports, o), s.loaded = !0, s.exports
  }

  var n = {};
  return o.m = e, o.c = n, o.p = "", o(0)
}([function (e, o) {
  "use strict";
  function n(e) {
    return +e + "" === e
  }

  function t(e) {
    chrome.tabs.executeScript(e, {file: "/build/proxy.js"}, function (o) {
      o ? console.log("injected proxy to tab " + e) : c[e].devtools.postMessage("proxy-fail")
    })
  }

  function s(e, o, n) {
    function t(o) {
      return "log" === o.event ? console.log("tab " + e, o.payload) : (console.log("devtools -> backend", o), void n.postMessage(o))
    }

    function s(n) {
      return "log" === n.event ? console.log("tab " + e, n.payload) : (console.log("backend -> devtools", n), void o.postMessage(n))
    }

    function d() {
      console.log("tab " + e + " disconnected."), o.onMessage.removeListener(t), n.onMessage.removeListener(s), o.disconnect(), n.disconnect(), c[e] = null
    }

    o.onMessage.addListener(t), n.onMessage.addListener(s), o.onDisconnect.addListener(d), n.onDisconnect.addListener(d), console.log("tab " + e + " connected.")
  }

  var c = {};
  chrome.runtime.onConnect.addListener(function (e) {
    var o = void 0, d = void 0;
    n(e.name) ? (o = e.name, d = "devtools", t(+e.name)) : (o = e.sender.tab.id, d = "backend"), c[o] || (c[o] = {
      devtools: null,
      backend: null
    }), c[o][d] = e, c[o].devtools && c[o].backend && s(o, c[o].devtools, c[o].backend)
  })
}]);
