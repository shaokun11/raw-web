var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (q) {
  var x = 0;
  return function () {
    return x < q.length ? {done: !1, value: q[x++]} : {done: !0};
  };
};
$jscomp.arrayIterator = function (q) {
  return {next: $jscomp.arrayIteratorImpl(q)};
};
$jscomp.makeIterator = function (q) {
  var x = "undefined" != typeof Symbol && Symbol.iterator && q[Symbol.iterator];
  return x ? x.call(q) : $jscomp.arrayIterator(q);
};
(function () {
  function q(x, n, A) {
    function m(r, y) {
      if (!n[r]) {
        if (!x[r]) {
          var E = "function" == typeof require && require;
          if (!y && E) return E(r, !0);
          if (h) return h(r, !0);
          y = Error("Cannot find module '" + r + "'");
          throw y.code = "MODULE_NOT_FOUND", y;
        }
        y = n[r] = {exports: {}};
        x[r][0].call(y.exports, function (C) {
          return m(x[r][1][C] || C);
        }, y, y.exports, q, x, n, A);
      }
      return n[r].exports;
    }

    for (var h = "function" == typeof require && require, D = 0; D < A.length; D++) m(A[D]);
    return m;
  }

  return q;
})()({
  1: [function (q, x, n) {
    var A = q("path-to-regexp").pathToRegexp;
    q =
      function (m) {
        var h = this;
        this.currentHash = "/";
        this.routes = {};
        this.NFoundCallbak = m;
        window.addEventListener("load", function () {
          h._refresh();
        }, !1);
        window.addEventListener("hashchange", function () {
          h._refresh();
        });
      };
    q.prototype.route = function (m, h) {
      m = A(m, [], {sensitive: !0, strict: !0});
      this.routes[m] = h;
    };
    q.prototype._refresh = function () {
      this.currentHash = location.hash.slice(1) || "/";
      for (var m = $jscomp.makeIterator(Object.keys(this.routes)), h = m.next(); !h.done; h = m.next()) if (h = h.value, eval(h).test(this.currentHash)) {
        this.routes[h](this.currentHash);
        return;
      }
      this.NFoundCallbak && this.NFoundCallbak(this.currentHash);
    };
    q.prototype.switchRouter = function (m, h) {
      m = void 0 === m ? "main" : m;
      h = void 0 === h ? "" : h;
      m = m ? "#/" + m : "";
      h && (m = m + "/" + h);
      h = document.createElement("a");
      h.setAttribute("href", m);
      h.setAttribute("target", "_self");
      h.setAttribute("id", "router_id_x");
      h.click();
    };
    window.VueRouter = q;
  }, {"path-to-regexp": 2}], 2: [function (q, x, n) {
    function A(a) {
      for (var e = [], b = 0; b < a.length;) {
        var d = a[b];
        if ("*" === d || "+" === d || "?" === d) e.push({type: "MODIFIER", index: b, value: a[b++]}); else if ("\\" ===
          d) e.push({type: "ESCAPED_CHAR", index: b++, value: a[b++]}); else if ("{" === d) e.push({
          type: "OPEN",
          index: b,
          value: a[b++]
        }); else if ("}" === d) e.push({type: "CLOSE", index: b, value: a[b++]}); else if (":" === d) {
          var g = "";
          for (d = b + 1; d < a.length;) {
            var f = a.charCodeAt(d);
            if (48 <= f && 57 >= f || 65 <= f && 90 >= f || 97 <= f && 122 >= f || 95 === f) g += a[d++]; else break;
          }
          if (!g) throw new TypeError("Missing parameter name at " + b);
          e.push({type: "NAME", index: b, value: g});
          b = d;
        } else if ("(" === d) {
          g = 1;
          f = "";
          d = b + 1;
          if ("?" === a[d]) throw new TypeError("Pattern cannot start with \"?\" at " +
            d);
          for (; d < a.length;) if ("\\" === a[d]) f += a[d++] + a[d++]; else {
            if (")" === a[d]) {
              if (g--, 0 === g) {
                d++;
                break;
              }
            } else if ("(" === a[d] && (g++, "?" !== a[d + 1])) throw new TypeError("Capturing groups are not allowed at " + d);
            f += a[d++];
          }
          if (g) throw new TypeError("Unbalanced pattern at " + b);
          if (!f) throw new TypeError("Missing pattern at " + b);
          e.push({type: "PATTERN", index: b, value: f});
          b = d;
        } else e.push({type: "CHAR", index: b, value: a[b++]});
      }
      e.push({type: "END", index: b, value: ""});
      return e;
    }

    function m(a, e) {
      void 0 === e && (e = {});
      var b = A(a);
      a = e.prefixes;
      a = void 0 === a ? "./" : a;
      e = "[^" + r(e.delimiter || "/#?") + "]+?";
      for (var d = [], g = 0, f = 0, u = "", k = function (B) {
        if (f < b.length && b[f].type === B) return b[f++].value;
      }, v = function (B) {
        var z = k(B);
        if (void 0 !== z) return z;
        z = b[f];
        throw new TypeError("Unexpected " + z.type + " at " + z.index + ", expected " + B);
      }, t = function () {
        for (var B = "", z; z = k("CHAR") || k("ESCAPED_CHAR");) B += z;
        return B;
      }; f < b.length;) {
        var c = k("CHAR"), l = k("NAME"), p = k("PATTERN");
        if (l || p) c = c || "", -1 === a.indexOf(c) && (u += c, c = ""), u && (d.push(u), u = ""), d.push({
          name: l || g++, prefix: c,
          suffix: "", pattern: p || e, modifier: k("MODIFIER") || ""
        }); else if (c = c || k("ESCAPED_CHAR")) u += c; else if (u && (d.push(u), u = ""), k("OPEN")) {
          c = t();
          l = k("NAME") || "";
          p = k("PATTERN") || "";
          var w = t();
          v("CLOSE");
          d.push({
            name: l || (p ? g++ : ""),
            pattern: l && !p ? e : p,
            prefix: c,
            suffix: w,
            modifier: k("MODIFIER") || ""
          });
        } else v("END");
      }
      return d;
    }

    function h(a, e) {
      void 0 === e && (e = {});
      var b = e && e.sensitive ? "" : "i", d = e.encode, g = void 0 === d ? function (k) {
        return k;
      } : d;
      e = e.validate;
      var f = void 0 === e ? !0 : e, u = a.map(function (k) {
        if ("object" === typeof k) return new RegExp("^(?:" +
          k.pattern + ")$", b);
      });
      return function (k) {
        for (var v = "", t = 0; t < a.length; t++) {
          var c = a[t];
          if ("string" === typeof c) v += c; else {
            var l = k ? k[c.name] : void 0, p = "?" === c.modifier || "*" === c.modifier,
              w = "*" === c.modifier || "+" === c.modifier;
            if (Array.isArray(l)) {
              if (!w) throw new TypeError("Expected \"" + c.name + "\" to not repeat, but got an array");
              if (0 === l.length) {
                if (p) continue;
                throw new TypeError("Expected \"" + c.name + "\" to not be empty");
              }
              for (p = 0; p < l.length; p++) {
                w = g(l[p], c);
                if (f && !u[t].test(w)) throw new TypeError("Expected all \"" +
                  c.name + "\" to match \"" + c.pattern + "\", but got \"" + w + "\"");
                v += c.prefix + w + c.suffix;
              }
            } else if ("string" === typeof l || "number" === typeof l) {
              w = g(String(l), c);
              if (f && !u[t].test(w)) throw new TypeError("Expected \"" + c.name + "\" to match \"" + c.pattern + "\", but got \"" + w + "\"");
              v += c.prefix + w + c.suffix;
            } else if (!p) throw new TypeError("Expected \"" + c.name + "\" to be " + (w ? "an array" : "a string"));
          }
        }
        return v;
      };
    }

    function D(a, e, b) {
      void 0 === b && (b = {});
      b = b.decode;
      var d = void 0 === b ? function (g) {
        return g;
      } : b;
      return function (g) {
        var f = a.exec(g);
        if (!f) return !1;
        g = f[0];
        for (var u = f.index, k = Object.create(null), v = function (c) {
          if (void 0 === f[c]) return "continue";
          var l = e[c - 1];
          k[l.name] = "*" === l.modifier || "+" === l.modifier ? f[c].split(l.prefix + l.suffix).map(function (p) {
            return d(p, l);
          }) : d(f[c], l);
        }, t = 1; t < f.length; t++) v(t);
        return {path: g, index: u, params: k};
      };
    }

    function r(a) {
      return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }

    function y(a, e, b) {
      a = a.map(function (d) {
        return C(d, e, b).source;
      });
      return new RegExp("(?:" + a.join("|") + ")", b && b.sensitive ? "" : "i");
    }

    function E(a, e, b) {
      void 0 ===
      b && (b = {});
      var d = b.strict;
      d = void 0 === d ? !1 : d;
      var g = b.start, f = void 0 === g ? !0 : g;
      g = b.end;
      var u = void 0 === g ? !0 : g;
      g = b.encode;
      var k = void 0 === g ? function (w) {
        return w;
      } : g;
      g = "[" + r(b.endsWith || "") + "]|$";
      var v = "[" + r(b.delimiter || "/#?") + "]";
      f = f ? "^" : "";
      for (var t = 0; t < a.length; t++) {
        var c = a[t];
        if ("string" === typeof c) f += r(k(c)); else {
          var l = r(k(c.prefix)), p = r(k(c.suffix));
          c.pattern ? (e && e.push(c), f = l || p ? "+" === c.modifier || "*" === c.modifier ? f + ("(?:" + l + "((?:" + c.pattern + ")(?:" + p + l + "(?:" + c.pattern + "))*)" + p + ")" + ("*" === c.modifier ?
            "?" : "")) : f + ("(?:" + l + "(" + c.pattern + ")" + p + ")" + c.modifier) : f + ("(" + c.pattern + ")" + c.modifier)) : f += "(?:" + l + p + ")" + c.modifier;
        }
      }
      u ? (d || (f += v + "?"), f += b.endsWith ? "(?=" + g + ")" : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < v.indexOf(a[a.length - 1]) : void 0 === a, d || (f += "(?:" + v + "(?=" + g + "))?"), a || (f += "(?=" + v + "|" + g + ")"));
      return new RegExp(f, b && b.sensitive ? "" : "i");
    }

    function C(a, e, b) {
      if (a instanceof RegExp) {
        if (e) {
          b = /\((?:\?<(.*?)>)?(?!\?)/g;
          for (var d = 0, g = b.exec(a.source); g;) e.push({
            name: g[1] || d++, prefix: "", suffix: "", modifier: "",
            pattern: ""
          }), g = b.exec(a.source);
        }
        return a;
      }
      return Array.isArray(a) ? y(a, e, b) : E(m(a, b), e, b);
    }

    Object.defineProperty(n, "__esModule", {value: !0});
    n.pathToRegexp = n.tokensToRegexp = n.regexpToFunction = n.match = n.tokensToFunction = n.compile = n.parse = void 0;
    n.parse = m;
    n.compile = function (a, e) {
      return h(m(a, e), e);
    };
    n.tokensToFunction = h;
    n.match = function (a, e) {
      var b = [];
      a = C(a, b, e);
      return D(a, b, e);
    };
    n.regexpToFunction = D;
    n.tokensToRegexp = E;
    n.pathToRegexp = C;
  }, {}]
}, {}, [1]);
