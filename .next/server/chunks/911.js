"use strict";
exports.id = 911;
exports.ids = [911];
exports.modules = {

/***/ 2473:
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * react.shared-subset.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var m = Object.assign, n = {
    current: null
};
function p() {
    return new Map;
}
if ("function" === typeof fetch) {
    var q = fetch, r = function(a, b) {
        var d = n.current;
        if (!d || b && b.signal && b.signal !== d.getCacheSignal()) return q(a, b);
        if ("string" !== typeof a || b) {
            var c = "string" === typeof a || a instanceof URL ? new Request(a, b) : a;
            if ("GET" !== c.method && "HEAD" !== c.method || c.keepalive) return q(a, b);
            var e = JSON.stringify([
                c.method,
                Array.from(c.headers.entries()),
                c.mode,
                c.redirect,
                c.credentials,
                c.referrer,
                c.referrerPolicy,
                c.integrity
            ]);
            c = c.url;
        } else e = '["GET",[],null,"follow",null,null,null,null]', c = a;
        var f = d.getCacheForType(p);
        d = f.get(c);
        if (void 0 === d) a = q(a, b), f.set(c, [
            e,
            a
        ]);
        else {
            c = 0;
            for(f = d.length; c < f; c += 2){
                var h = d[c + 1];
                if (d[c] === e) return a = h, a.then(function(g) {
                    return g.clone();
                });
            }
            a = q(a, b);
            d.push(e, a);
        }
        return a.then(function(g) {
            return g.clone();
        });
    };
    m(r, q);
    try {
        fetch = r;
    } catch (a) {
        try {
            globalThis.fetch = r;
        } catch (b) {
            console.warn("React was unable to patch the fetch() function in this environment. Suspensey APIs might not work correctly as a result.");
        }
    }
}
var t = Symbol.for("react.element"), u = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), z = Symbol.for("react.server_context"), A = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), C = Symbol.for("react.memo"), aa = Symbol.for("react.lazy"), D = Symbol.for("react.default_value"), E = Symbol.iterator;
function ba(a) {
    if (null === a || "object" !== typeof a) return null;
    a = E && a[E] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
function F(a) {
    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 1; d < arguments.length; d++)b += "&args[]=" + encodeURIComponent(arguments[d]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var G = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, H = {};
function I(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
I.prototype.isReactComponent = {};
I.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(F(85));
    this.updater.enqueueSetState(this, a, b, "setState");
};
I.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function J() {}
J.prototype = I.prototype;
function K(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
var L = K.prototype = new J;
L.constructor = K;
m(L, I.prototype);
L.isPureReactComponent = !0;
var M = Array.isArray, N = Object.prototype.hasOwnProperty, O = {
    current: null
}, P = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ca(a, b) {
    return {
        $$typeof: t,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function Q(a) {
    return "object" === typeof a && null !== a && a.$$typeof === t;
}
function escape(a) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a.replace(/[=:]/g, function(d) {
        return b[d];
    });
}
var R = /\/+/g;
function S(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function T(a, b, d, c, e) {
    var f = typeof a;
    if ("undefined" === f || "boolean" === f) a = null;
    var h = !1;
    if (null === a) h = !0;
    else switch(f){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a.$$typeof){
                case t:
                case u:
                    h = !0;
            }
    }
    if (h) return h = a, e = e(h), a = "" === c ? "." + S(h, 0) : c, M(e) ? (d = "", null != a && (d = a.replace(R, "$&/") + "/"), T(e, b, d, "", function(l) {
        return l;
    })) : null != e && (Q(e) && (e = ca(e, d + (!e.key || h && h.key === e.key ? "" : ("" + e.key).replace(R, "$&/") + "/") + a)), b.push(e)), 1;
    h = 0;
    c = "" === c ? "." : c + ":";
    if (M(a)) for(var g = 0; g < a.length; g++){
        f = a[g];
        var k = c + S(f, g);
        h += T(f, b, d, k, e);
    }
    else if (k = ba(a), "function" === typeof k) for(a = k.call(a), g = 0; !(f = a.next()).done;)f = f.value, k = c + S(f, g++), h += T(f, b, d, k, e);
    else if ("object" === f) throw b = String(a), Error(F(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
    return h;
}
function U(a, b, d) {
    if (null == a) return a;
    var c = [], e = 0;
    T(a, c, "", "", function(f) {
        return b.call(d, f, e++);
    });
    return c;
}
function da(a) {
    if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(d) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = d;
        }, function(d) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = d;
        });
        -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
}
function ea() {
    return new WeakMap;
}
function V() {
    return {
        s: 0,
        v: void 0,
        o: null,
        p: null
    };
}
var W = {
    current: null
}, X = {
    transition: null
}, Y = {
    ReactCurrentDispatcher: W,
    ReactCurrentCache: n,
    ReactCurrentBatchConfig: X,
    ReactCurrentOwner: O,
    ContextRegistry: {}
}, Z = Y.ContextRegistry;
exports.Children = {
    map: U,
    forEach: function(a, b, d) {
        U(a, function() {
            b.apply(this, arguments);
        }, d);
    },
    count: function(a) {
        var b = 0;
        U(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a) {
        return U(a, function(b) {
            return b;
        }) || [];
    },
    only: function(a) {
        if (!Q(a)) throw Error(F(143));
        return a;
    }
};
exports.Fragment = v;
exports.Profiler = x;
exports.StrictMode = w;
exports.Suspense = B;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y;
exports.cache = function(a) {
    return function() {
        var b = n.current;
        if (!b) return a.apply(null, arguments);
        var d = b.getCacheForType(ea);
        b = d.get(a);
        void 0 === b && (b = V(), d.set(a, b));
        d = 0;
        for(var c = arguments.length; d < c; d++){
            var e = arguments[d];
            if ("function" === typeof e || "object" === typeof e && null !== e) {
                var f = b.o;
                null === f && (b.o = f = new WeakMap);
                b = f.get(e);
                void 0 === b && (b = V(), f.set(e, b));
            } else f = b.p, null === f && (b.p = f = new Map), b = f.get(e), void 0 === b && (b = V(), f.set(e, b));
        }
        if (1 === b.s) return b.v;
        if (2 === b.s) throw b.v;
        try {
            var h = a.apply(null, arguments);
            d = b;
            d.s = 1;
            return d.v = h;
        } catch (g) {
            throw h = b, h.s = 2, h.v = g, g;
        }
    };
};
exports.cloneElement = function(a, b, d) {
    if (null === a || void 0 === a) throw Error(F(267, a));
    var c = m({}, a.props), e = a.key, f = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (f = b.ref, h = O.current);
        void 0 !== b.key && (e = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(k in b)N.call(b, k) && !P.hasOwnProperty(k) && (c[k] = void 0 === b[k] && void 0 !== g ? g[k] : b[k]);
    }
    var k = arguments.length - 2;
    if (1 === k) c.children = d;
    else if (1 < k) {
        g = Array(k);
        for(var l = 0; l < k; l++)g[l] = arguments[l + 2];
        c.children = g;
    }
    return {
        $$typeof: t,
        type: a.type,
        key: e,
        ref: f,
        props: c,
        _owner: h
    };
};
exports.createElement = function(a, b, d) {
    var c, e = {}, f = null, h = null;
    if (null != b) for(c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (f = "" + b.key), b)N.call(b, c) && !P.hasOwnProperty(c) && (e[c] = b[c]);
    var g = arguments.length - 2;
    if (1 === g) e.children = d;
    else if (1 < g) {
        for(var k = Array(g), l = 0; l < g; l++)k[l] = arguments[l + 2];
        e.children = k;
    }
    if (a && a.defaultProps) for(c in g = a.defaultProps, g)void 0 === e[c] && (e[c] = g[c]);
    return {
        $$typeof: t,
        type: a,
        key: f,
        ref: h,
        props: e,
        _owner: O.current
    };
};
exports.createRef = function() {
    return {
        current: null
    };
};
exports.createServerContext = function(a, b) {
    var d = !0;
    if (!Z[a]) {
        d = !1;
        var c = {
            $$typeof: z,
            _currentValue: b,
            _currentValue2: b,
            _defaultValue: b,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _globalName: a
        };
        c.Provider = {
            $$typeof: y,
            _context: c
        };
        Z[a] = c;
    }
    c = Z[a];
    if (c._defaultValue === D) c._defaultValue = b, c._currentValue === D && (c._currentValue = b), c._currentValue2 === D && (c._currentValue2 = b);
    else if (d) throw Error(F(429, a));
    return c;
};
exports.forwardRef = function(a) {
    return {
        $$typeof: A,
        render: a
    };
};
exports.isValidElement = Q;
exports.lazy = function(a) {
    return {
        $$typeof: aa,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: da
    };
};
exports.memo = function(a, b) {
    return {
        $$typeof: C,
        type: a,
        compare: void 0 === b ? null : b
    };
};
exports.startTransition = function(a) {
    var b = X.transition;
    X.transition = {};
    try {
        a();
    } finally{
        X.transition = b;
    }
};
exports.use = function(a) {
    return W.current.use(a);
};
exports.useCallback = function(a, b) {
    return W.current.useCallback(a, b);
};
exports.useContext = function(a) {
    return W.current.useContext(a);
};
exports.useDebugValue = function() {};
exports.useId = function() {
    return W.current.useId();
};
exports.useMemo = function(a, b) {
    return W.current.useMemo(a, b);
};
exports.version = "18.3.0-canary-16d053d59-20230506";


/***/ }),

/***/ 8033:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (true) {
    module.exports = __webpack_require__(2473);
} else {}


/***/ }),

/***/ 2144:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;
(()=>{
    var i = {
        412: function(i, s) {
            /*!@license
 * UAParser.js v0.7.28
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */ (function(e, o) {
                "use strict";
                var r = "0.7.28", a = "", n = "?", t = "function", l = "undefined", w = "object", d = "string", b = "major", u = "model", c = "name", m = "type", p = "vendor", f = "version", h = "architecture", g = "console", v = "mobile", x = "tablet", k = "smarttv", _ = "wearable", y = "embedded", S = 255;
                var E = {
                    extend: function(i, s) {
                        var e = {};
                        for(var o in i){
                            if (s[o] && s[o].length % 2 === 0) {
                                e[o] = s[o].concat(i[o]);
                            } else {
                                e[o] = i[o];
                            }
                        }
                        return e;
                    },
                    has: function(i, s) {
                        return typeof i === d ? s.toLowerCase().indexOf(i.toLowerCase()) !== -1 : false;
                    },
                    lowerize: function(i) {
                        return i.toLowerCase();
                    },
                    major: function(i) {
                        return typeof i === d ? i.replace(/[^\d\.]/g, "").split(".")[0] : o;
                    },
                    trim: function(i, s) {
                        i = i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                        return typeof s === l ? i : i.substring(0, S);
                    }
                };
                var A = {
                    rgx: function(i, s) {
                        var e = 0, r, a, n, l, d, b;
                        while(e < s.length && !d){
                            var u = s[e], c = s[e + 1];
                            r = a = 0;
                            while(r < u.length && !d){
                                d = u[r++].exec(i);
                                if (!!d) {
                                    for(n = 0; n < c.length; n++){
                                        b = d[++a];
                                        l = c[n];
                                        if (typeof l === w && l.length > 0) {
                                            if (l.length == 2) {
                                                if (typeof l[1] == t) {
                                                    this[l[0]] = l[1].call(this, b);
                                                } else {
                                                    this[l[0]] = l[1];
                                                }
                                            } else if (l.length == 3) {
                                                if (typeof l[1] === t && !(l[1].exec && l[1].test)) {
                                                    this[l[0]] = b ? l[1].call(this, b, l[2]) : o;
                                                } else {
                                                    this[l[0]] = b ? b.replace(l[1], l[2]) : o;
                                                }
                                            } else if (l.length == 4) {
                                                this[l[0]] = b ? l[3].call(this, b.replace(l[1], l[2])) : o;
                                            }
                                        } else {
                                            this[l] = b ? b : o;
                                        }
                                    }
                                }
                            }
                            e += 2;
                        }
                    },
                    str: function(i, s) {
                        for(var e in s){
                            if (typeof s[e] === w && s[e].length > 0) {
                                for(var r = 0; r < s[e].length; r++){
                                    if (E.has(s[e][r], i)) {
                                        return e === n ? o : e;
                                    }
                                }
                            } else if (E.has(s[e], i)) {
                                return e === n ? o : e;
                            }
                        }
                        return i;
                    }
                };
                var N = {
                    browser: {
                        oldSafari: {
                            version: {
                                "1.0": "/8",
                                1.2: "/1",
                                1.3: "/3",
                                "2.0": "/412",
                                "2.0.2": "/416",
                                "2.0.3": "/417",
                                "2.0.4": "/419",
                                "?": "/"
                            }
                        },
                        oldEdge: {
                            version: {
                                .1: "12.",
                                21: "13.",
                                31: "14.",
                                39: "15.",
                                41: "16.",
                                42: "17.",
                                44: "18."
                            }
                        }
                    },
                    os: {
                        windows: {
                            version: {
                                ME: "4.90",
                                "NT 3.11": "NT3.51",
                                "NT 4.0": "NT4.0",
                                2e3: "NT 5.0",
                                XP: [
                                    "NT 5.1",
                                    "NT 5.2"
                                ],
                                Vista: "NT 6.0",
                                7: "NT 6.1",
                                8: "NT 6.2",
                                8.1: "NT 6.3",
                                10: [
                                    "NT 6.4",
                                    "NT 10.0"
                                ],
                                RT: "ARM"
                            }
                        }
                    }
                };
                var T = {
                    browser: [
                        [
                            /\b(?:crmo|crios)\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Chrome"
                            ]
                        ],
                        [
                            /edg(?:e|ios|a)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Edge"
                            ]
                        ],
                        [
                            /(opera\smini)\/([\w\.-]+)/i,
                            /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,
                            /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /opios[\/\s]+([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera Mini"
                            ]
                        ],
                        [
                            /\sopr\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera"
                            ]
                        ],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/\s]?([\w\.]+)/i,
                            /(?:ms|\()(ie)\s([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
                            /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,
                            /(weibo)__([\d\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "UCBrowser"
                            ]
                        ],
                        [
                            /(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i
                        ],
                        [
                            f,
                            [
                                c,
                                "WeChat(Win) Desktop"
                            ]
                        ],
                        [
                            /micromessenger\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "WeChat"
                            ]
                        ],
                        [
                            /konqueror\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Konqueror"
                            ]
                        ],
                        [
                            /trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i
                        ],
                        [
                            f,
                            [
                                c,
                                "IE"
                            ]
                        ],
                        [
                            /yabrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Yandex"
                            ]
                        ],
                        [
                            /(avast|avg)\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                /(.+)/,
                                "$1 Secure Browser"
                            ],
                            f
                        ],
                        [
                            /focus\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Firefox Focus"
                            ]
                        ],
                        [
                            /opt\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera Touch"
                            ]
                        ],
                        [
                            /coc_coc_browser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Coc Coc"
                            ]
                        ],
                        [
                            /dolfin\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Dolphin"
                            ]
                        ],
                        [
                            /coast\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Opera Coast"
                            ]
                        ],
                        [
                            /xiaomi\/miuibrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "MIUI Browser"
                            ]
                        ],
                        [
                            /fxios\/([\w\.-]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Firefox"
                            ]
                        ],
                        [
                            /(qihu|qhbrowser|qihoobrowser|360browser)/i
                        ],
                        [
                            [
                                c,
                                "360 Browser"
                            ]
                        ],
                        [
                            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                /(.+)/,
                                "$1 Browser"
                            ],
                            f
                        ],
                        [
                            /(comodo_dragon)\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            f
                        ],
                        [
                            /\s(electron)\/([\w\.]+)\ssafari/i,
                            /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(MetaSr)[\/\s]?([\w\.]+)/i,
                            /(LBBROWSER)/i
                        ],
                        [
                            c
                        ],
                        [
                            /;fbav\/([\w\.]+);/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Facebook"
                            ]
                        ],
                        [
                            /FBAN\/FBIOS|FB_IAB\/FB4A/i
                        ],
                        [
                            [
                                c,
                                "Facebook"
                            ]
                        ],
                        [
                            /safari\s(line)\/([\w\.]+)/i,
                            /\b(line)\/([\w\.]+)\/iab/i,
                            /(chromium|instagram)[\/\s]([\w\.-]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /\bgsa\/([\w\.]+)\s.*safari\//i
                        ],
                        [
                            f,
                            [
                                c,
                                "GSA"
                            ]
                        ],
                        [
                            /headlesschrome(?:\/([\w\.]+)|\s)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Chrome Headless"
                            ]
                        ],
                        [
                            /\swv\).+(chrome)\/([\w\.]+)/i
                        ],
                        [
                            [
                                c,
                                "Chrome WebView"
                            ],
                            f
                        ],
                        [
                            /droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Android Browser"
                            ]
                        ],
                        [
                            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Mobile Safari"
                            ]
                        ],
                        [
                            /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i
                        ],
                        [
                            f,
                            c
                        ],
                        [
                            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i
                        ],
                        [
                            c,
                            [
                                f,
                                A.str,
                                N.browser.oldSafari.version
                            ]
                        ],
                        [
                            /(webkit|khtml)\/([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(navigator|netscape)\/([\w\.-]+)/i
                        ],
                        [
                            [
                                c,
                                "Netscape"
                            ],
                            f
                        ],
                        [
                            /ile\svr;\srv:([\w\.]+)\).+firefox/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Firefox Reality"
                            ]
                        ],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                            /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,
                            /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                            /(links)\s\(([\w\.]+)/i,
                            /(gobrowser)\/?([\w\.]*)/i,
                            /(ice\s?browser)\/v?([\w\._]+)/i,
                            /(mosaic)[\/\s]([\w\.]+)/i
                        ],
                        [
                            c,
                            f
                        ]
                    ],
                    cpu: [
                        [
                            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "amd64"
                            ]
                        ],
                        [
                            /(ia32(?=;))/i
                        ],
                        [
                            [
                                h,
                                E.lowerize
                            ]
                        ],
                        [
                            /((?:i[346]|x)86)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "ia32"
                            ]
                        ],
                        [
                            /\b(aarch64|armv?8e?l?)\b/i
                        ],
                        [
                            [
                                h,
                                "arm64"
                            ]
                        ],
                        [
                            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                        ],
                        [
                            [
                                h,
                                "armhf"
                            ]
                        ],
                        [
                            /windows\s(ce|mobile);\sppc;/i
                        ],
                        [
                            [
                                h,
                                "arm"
                            ]
                        ],
                        [
                            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i
                        ],
                        [
                            [
                                h,
                                /ower/,
                                "",
                                E.lowerize
                            ]
                        ],
                        [
                            /(sun4\w)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "sparc"
                            ]
                        ],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                        ],
                        [
                            [
                                h,
                                E.lowerize
                            ]
                        ]
                    ],
                    device: [
                        [
                            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Samsung"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,
                            /\ssamsung[\s-]([\w-]+)/i,
                            /sec-(sgh\w+)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Samsung"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\((ip(?:hone|od)[\s\w]*);/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Apple"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\((ipad);[\w\s\),;-]+apple/i,
                            /applecoremedia\/[\w\.]+\s\((ipad)/i,
                            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Apple"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Huawei"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /d\/huawei([\w\s-]+)[;\)]/i,
                            /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,
                            /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Huawei"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\b(poco[\s\w]+)(?:\sbuild|\))/i,
                            /\b;\s(\w+)\sbuild\/hm\1/i,
                            /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,
                            /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,
                            /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                "Xiaomi"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                "Xiaomi"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /;\s(\w+)\sbuild.+\soppo/i,
                            /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i
                        ],
                        [
                            u,
                            [
                                p,
                                "OPPO"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\svivo\s(\w+)(?:\sbuild|\))/i,
                            /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Vivo"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(rmx[12]\d{3})(?:\sbuild|;)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Realme"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,
                            /\smot(?:orola)?[\s-](\w*)/i,
                            /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Motorola"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
                        ],
                        [
                            u,
                            [
                                p,
                                "Motorola"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "LG"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(lm-?f100[nv]?|nexus\s[45])/i,
                            /lg[e;\s\/-]+((?!browser|netcast)\w+)/i,
                            /\blg(\-?[\d\w]+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "LG"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(ideatab[\w\-\s]+)/i,
                            /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Lenovo"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(?:maemo|nokia).*(n900|lumia\s\d+)/i,
                            /nokia[\s_-]?([\w\.-]*)/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                "Nokia"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid.+;\s(pixel\sc)[\s)]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Sony"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /sony\stablet\s[ps]\sbuild\//i,
                            /(?:sony)?sgp\w+(?:\sbuild\/|\))/i
                        ],
                        [
                            [
                                u,
                                "Xperia Tablet"
                            ],
                            [
                                p,
                                "Sony"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(kb2005|in20[12]5|be20[12][59])\b/i,
                            /\ba000(1)\sbuild/i,
                            /\boneplus\s(a\d{4})[\s)]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "OnePlus"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(alexa)webm/i,
                            /(kf[a-z]{2}wi)(\sbuild\/|\))/i,
                            /(kf[a-z]+)(\sbuild\/|\)).+silk\//i
                        ],
                        [
                            u,
                            [
                                p,
                                "Amazon"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i
                        ],
                        [
                            [
                                u,
                                "Fire Phone"
                            ],
                            [
                                p,
                                "Amazon"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\((playbook);[\w\s\),;-]+(rim)/i
                        ],
                        [
                            u,
                            p,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /((?:bb[a-f]|st[hv])100-\d)/i,
                            /\(bb10;\s(\w+)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "BlackBerry"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ASUS"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ASUS"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(nexus\s9)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "HTC"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,
                            /(zte)-(\w*)/i,
                            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                        ],
                        [
                            p,
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Acer"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid.+;\s(m[1-5]\snote)\sbuild/i,
                            /\bmz-([\w-]{2,})/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Meizu"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                            /(hp)\s([\w\s]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft);\s(lumia[\s\w]+)/i,
                            /(lenovo)[_\s-]?([\w-]+)/i,
                            /linux;.+(jolla);/i,
                            /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(archos)\s(gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /\s(nook)[\w\s]+build\/(\w+)/i,
                            /(dell)\s(strea[kpr\s\d]*[\dko])/i,
                            /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,
                            /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,
                            /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,
                            /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(surface\sduo)\s/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Microsoft"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(fp\du?)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Fairphone"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(u304aa)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "AT&T"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /sie-(\w*)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Siemens"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(rct\w+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "RCA"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/\s](venue[\d\s]{2,7})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Dell"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Verizon"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Barnes & Noble"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s(tm\d{3}\w+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "NuVision"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /;\s(k88)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ZTE"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /;\s(nx\d{3}j)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "ZTE"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(gen\d{3})\sbuild.*49h/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Swiss"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(zur\d{3})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Swiss"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?((zeki)?tb.*\b)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zeki"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s([yr]\d{2})\sbuild/i,
                            /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i
                        ],
                        [
                            [
                                p,
                                "Dragon Touch"
                            ],
                            u,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(ns-?\w{0,9})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Insignia"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "NextBook"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i
                        ],
                        [
                            [
                                p,
                                "Voice"
                            ],
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i
                        ],
                        [
                            [
                                p,
                                "LvTel"
                            ],
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /;\s(ph-1)\s/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Essential"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Envizen"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "MachSpeed"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /[;\/]\s?tu_(1491)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Rotor"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(shield[\w\s]+)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Nvidia"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /(sprint)\s(\w+)/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /(kin\.[onetw]{3})/i
                        ],
                        [
                            [
                                u,
                                /\./g,
                                " "
                            ],
                            [
                                p,
                                "Microsoft"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zebra"
                            ],
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zebra"
                            ],
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /\s(ouya)\s/i,
                            /(nintendo)\s([wids3utch]+)/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /droid.+;\s(shield)\sbuild/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Nvidia"
                            ],
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /(playstation\s[345portablevi]+)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Sony"
                            ],
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Microsoft"
                            ],
                            [
                                m,
                                g
                            ]
                        ],
                        [
                            /smart-tv.+(samsung)/i
                        ],
                        [
                            p,
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /hbbtv.+maple;(\d+)/i
                        ],
                        [
                            [
                                u,
                                /^/,
                                "SmartTV"
                            ],
                            [
                                p,
                                "Samsung"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i
                        ],
                        [
                            [
                                p,
                                "LG"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /(apple)\s?tv/i
                        ],
                        [
                            p,
                            [
                                u,
                                "Apple TV"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /crkey/i
                        ],
                        [
                            [
                                u,
                                "Chromecast"
                            ],
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /droid.+aft([\w])(\sbuild\/|\))/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Amazon"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /\(dtv[\);].+(aquos)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Sharp"
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i
                        ],
                        [
                            [
                                p,
                                E.trim
                            ],
                            [
                                u,
                                E.trim
                            ],
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i
                        ],
                        [
                            [
                                m,
                                k
                            ]
                        ],
                        [
                            /((pebble))app\/[\d\.]+\s/i
                        ],
                        [
                            p,
                            u,
                            [
                                m,
                                _
                            ]
                        ],
                        [
                            /droid.+;\s(glass)\s\d/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Google"
                            ],
                            [
                                m,
                                _
                            ]
                        ],
                        [
                            /droid\s[\d\.]+;\s(wt63?0{2,3})\)/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Zebra"
                            ],
                            [
                                m,
                                _
                            ]
                        ],
                        [
                            /(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i
                        ],
                        [
                            p,
                            [
                                m,
                                y
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i
                        ],
                        [
                            u,
                            [
                                m,
                                v
                            ]
                        ],
                        [
                            /droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i
                        ],
                        [
                            u,
                            [
                                m,
                                x
                            ]
                        ],
                        [
                            /\s(tablet|tab)[;\/]/i,
                            /\s(mobile)(?:[;\/]|\ssafari)/i
                        ],
                        [
                            [
                                m,
                                E.lowerize
                            ]
                        ],
                        [
                            /(android[\w\.\s\-]{0,9});.+build/i
                        ],
                        [
                            u,
                            [
                                p,
                                "Generic"
                            ]
                        ],
                        [
                            /(phone)/i
                        ],
                        [
                            [
                                m,
                                v
                            ]
                        ]
                    ],
                    engine: [
                        [
                            /windows.+\sedge\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "EdgeHTML"
                            ]
                        ],
                        [
                            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Blink"
                            ]
                        ],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                            /(icab)[\/\s]([23]\.[\d\.]+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /rv\:([\w\.]{1,9})\b.+(gecko)/i
                        ],
                        [
                            f,
                            c
                        ]
                    ],
                    os: [
                        [
                            /microsoft\s(windows)\s(vista|xp)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(windows)\snt\s6\.2;\s(arm)/i,
                            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
                            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i
                        ],
                        [
                            c,
                            [
                                f,
                                A.str,
                                N.os.windows.version
                            ]
                        ],
                        [
                            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
                        ],
                        [
                            [
                                c,
                                "Windows"
                            ],
                            [
                                f,
                                A.str,
                                N.os.windows.version
                            ]
                        ],
                        [
                            /ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
                            /cfnetwork\/.+darwin/i
                        ],
                        [
                            [
                                f,
                                /_/g,
                                "."
                            ],
                            [
                                c,
                                "iOS"
                            ]
                        ],
                        [
                            /(mac\sos\sx)\s?([\w\s\.]*)/i,
                            /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i
                        ],
                        [
                            [
                                c,
                                "Mac OS"
                            ],
                            [
                                f,
                                /_/g,
                                "."
                            ]
                        ],
                        [
                            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/\s]([\w\.]+)/i,
                            /\((series40);/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /\(bb(10);/i
                        ],
                        [
                            f,
                            [
                                c,
                                "BlackBerry"
                            ]
                        ],
                        [
                            /(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Symbian"
                            ]
                        ],
                        [
                            /mozilla.+\(mobile;.+gecko.+firefox/i
                        ],
                        [
                            [
                                c,
                                "Firefox OS"
                            ]
                        ],
                        [
                            /web0s;.+rt(tv)/i,
                            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "webOS"
                            ]
                        ],
                        [
                            /crkey\/([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                c,
                                "Chromecast"
                            ]
                        ],
                        [
                            /(cros)\s[\w]+\s([\w\.]+\w)/i
                        ],
                        [
                            [
                                c,
                                "Chromium OS"
                            ],
                            f
                        ],
                        [
                            /(nintendo|playstation)\s([wids345portablevuch]+)/i,
                            /(xbox);\s+xbox\s([^\);]+)/i,
                            /(mint)[\/\s\(\)]?(\w*)/i,
                            /(mageia|vectorlinux)[;\s]/i,
                            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,
                            /(hurd|linux)\s?([\w\.]*)/i,
                            /(gnu)\s?([\w\.]*)/i,
                            /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku)\s(\w+)/i
                        ],
                        [
                            c,
                            f
                        ],
                        [
                            /(sunos)\s?([\w\.\d]*)/i
                        ],
                        [
                            [
                                c,
                                "Solaris"
                            ],
                            f
                        ],
                        [
                            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
                            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
                            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                            /(unix)\s?([\w\.]*)/i
                        ],
                        [
                            c,
                            f
                        ]
                    ]
                };
                var UAParser = function(i, s) {
                    if (typeof i === "object") {
                        s = i;
                        i = o;
                    }
                    if (!(this instanceof UAParser)) {
                        return new UAParser(i, s).getResult();
                    }
                    var r = i || (typeof e !== "undefined" && e.navigator && e.navigator.userAgent ? e.navigator.userAgent : a);
                    var n = s ? E.extend(T, s) : T;
                    this.getBrowser = function() {
                        var i = {
                            name: o,
                            version: o
                        };
                        A.rgx.call(i, r, n.browser);
                        i.major = E.major(i.version);
                        return i;
                    };
                    this.getCPU = function() {
                        var i = {
                            architecture: o
                        };
                        A.rgx.call(i, r, n.cpu);
                        return i;
                    };
                    this.getDevice = function() {
                        var i = {
                            vendor: o,
                            model: o,
                            type: o
                        };
                        A.rgx.call(i, r, n.device);
                        return i;
                    };
                    this.getEngine = function() {
                        var i = {
                            name: o,
                            version: o
                        };
                        A.rgx.call(i, r, n.engine);
                        return i;
                    };
                    this.getOS = function() {
                        var i = {
                            name: o,
                            version: o
                        };
                        A.rgx.call(i, r, n.os);
                        return i;
                    };
                    this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        };
                    };
                    this.getUA = function() {
                        return r;
                    };
                    this.setUA = function(i) {
                        r = typeof i === d && i.length > S ? E.trim(i, S) : i;
                        return this;
                    };
                    this.setUA(r);
                    return this;
                };
                UAParser.VERSION = r;
                UAParser.BROWSER = {
                    NAME: c,
                    MAJOR: b,
                    VERSION: f
                };
                UAParser.CPU = {
                    ARCHITECTURE: h
                };
                UAParser.DEVICE = {
                    MODEL: u,
                    VENDOR: p,
                    TYPE: m,
                    CONSOLE: g,
                    MOBILE: v,
                    SMARTTV: k,
                    TABLET: x,
                    WEARABLE: _,
                    EMBEDDED: y
                };
                UAParser.ENGINE = {
                    NAME: c,
                    VERSION: f
                };
                UAParser.OS = {
                    NAME: c,
                    VERSION: f
                };
                if (typeof s !== l) {
                    if ("object" !== l && i.exports) {
                        s = i.exports = UAParser;
                    }
                    s.UAParser = UAParser;
                } else {
                    if (true) {
                        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                            return UAParser;
                        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {}
                }
                var z = typeof e !== "undefined" && (e.jQuery || e.Zepto);
                if (z && !z.ua) {
                    var O = new UAParser;
                    z.ua = O.getResult();
                    z.ua.get = function() {
                        return O.getUA();
                    };
                    z.ua.set = function(i) {
                        O.setUA(i);
                        var s = O.getResult();
                        for(var e in s){
                            z.ua[e] = s[e];
                        }
                    };
                }
            })( false ? 0 : this);
        }
    };
    var s = {};
    function __nccwpck_require__(e) {
        var o = s[e];
        if (o !== undefined) {
            return o.exports;
        }
        var r = s[e] = {
            exports: {}
        };
        var a = true;
        try {
            i[e].call(r.exports, r, r.exports, __nccwpck_require__);
            a = false;
        } finally{
            if (a) delete s[e];
        }
        return r.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = __nccwpck_require__(412);
    module.exports = e;
})();


/***/ }),

/***/ 4561:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PageSignatureError: function() {
        return PageSignatureError;
    },
    RemovedPageError: function() {
        return RemovedPageError;
    },
    RemovedUAError: function() {
        return RemovedUAError;
    }
});
class PageSignatureError extends Error {
    constructor({ page  }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map


/***/ }),

/***/ 7606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "E", ({
    enumerable: true,
    get: function() {
        return ImageResponse;
    }
}));
class ImageResponse {
    constructor(...args){
        // @ts-expect-error - process.turbopack is a custom property
        if (process.turbopack) {
            // TODO(sokra) enable this again when turbopack supports wasm
            throw new Error("Turbopack doesn't support ImageResponse currently");
        } else {
            const readable = new ReadableStream({
                async start (controller) {
                    const OGImageResponse = // as the auto resolving is not working
                    (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 4021))).ImageResponse;
                    const imageResponse = new OGImageResponse(...args);
                    if (!imageResponse.body) {
                        return controller.close();
                    }
                    const reader = imageResponse.body.getReader();
                    while(true){
                        const { done , value  } = await reader.read();
                        if (done) {
                            return controller.close();
                        }
                        controller.enqueue(value);
                    }
                }
            });
            const options = args[1] || {};
            return new Response(readable, {
                headers: {
                    "content-type": "image/png",
                    "cache-control":  false ? 0 : "public, immutable, no-transform, max-age=31536000",
                    ...options.headers
                },
                status: options.status,
                statusText: options.statusText
            });
        }
    }
} //# sourceMappingURL=image-response.js.map


/***/ }),

/***/ 2851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERNALS: function() {
        return INTERNALS;
    },
    NextRequest: function() {
        return NextRequest;
    }
});
const _nexturl = __webpack_require__(5400);
const _utils = __webpack_require__(9628);
const _error = __webpack_require__(4561);
const _cookies = __webpack_require__(3168);
const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        (0, _utils.validateURL)(url);
        super(url, init);
        const nextUrl = new _nexturl.NextURL(url, {
            headers: (0, _utils.toNodeHeaders)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _cookies.RequestCookies(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error.RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error.RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map


/***/ }),

/***/ 1096:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "x", ({
    enumerable: true,
    get: function() {
        return NextResponse;
    }
}));
const _nexturl = __webpack_require__(5400);
const _utils = __webpack_require__(9628);
const _cookies = __webpack_require__(3168);
const INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[INTERNALS] = {
            cookies: new _cookies.ResponseCookies(this.headers),
            url: init.url ? new _nexturl.NextURL(init.url, {
                headers: (0, _utils.toNodeHeaders)(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        // @ts-expect-error This is not in lib/dom right now, and we can't augment it.
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", (0, _utils.validateURL)(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", (0, _utils.validateURL)(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map


/***/ }),

/***/ 4722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isBot: function() {
        return isBot;
    },
    userAgentFromString: function() {
        return userAgentFromString;
    },
    userAgent: function() {
        return userAgent;
    }
});
const _uaparserjs = /*#__PURE__*/ _interop_require_default(__webpack_require__(2144));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...(0, _uaparserjs.default)(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers  }) {
    return userAgentFromString(headers.get("user-agent") || undefined);
} //# sourceMappingURL=user-agent.js.map


/***/ }),

/***/ 9628:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fromNodeHeaders: function() {
        return fromNodeHeaders;
    },
    splitCookiesString: function() {
        return splitCookiesString;
    },
    toNodeHeaders: function() {
        return toNodeHeaders;
    },
    validateURL: function() {
        return validateURL;
    }
});
function fromNodeHeaders(object) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(object)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
function toNodeHeaders(headers) {
    const result = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                result[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}
function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 1372:
/***/ ((module, exports, __webpack_require__) => {


const serverExports = {
    NextRequest: (__webpack_require__(2851).NextRequest),
    NextResponse: (__webpack_require__(1096)/* .NextResponse */ .x),
    ImageResponse: (__webpack_require__(7606)/* .ImageResponse */ .E),
    userAgentFromString: (__webpack_require__(4722).userAgentFromString),
    userAgent: (__webpack_require__(4722).userAgent)
};
if (typeof URLPattern !== "undefined") {
    // eslint-disable-next-line no-undef
    serverExports.URLPattern = URLPattern;
}
// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = serverExports;
// make import { xxx } from 'next/server' work
exports.NextRequest = serverExports.NextRequest;
exports.NextResponse = serverExports.NextResponse;
exports.ImageResponse = serverExports.ImageResponse;
exports.userAgentFromString = serverExports.userAgentFromString;
exports.userAgent = serverExports.userAgent;
exports.URLPattern = serverExports.URLPattern;


/***/ }),

/***/ 6452:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var e, t = "colors", r = "sizes", n = "space", i = {
    gap: n,
    gridGap: n,
    columnGap: n,
    gridColumnGap: n,
    rowGap: n,
    gridRowGap: n,
    inset: n,
    insetBlock: n,
    insetBlockEnd: n,
    insetBlockStart: n,
    insetInline: n,
    insetInlineEnd: n,
    insetInlineStart: n,
    margin: n,
    marginTop: n,
    marginRight: n,
    marginBottom: n,
    marginLeft: n,
    marginBlock: n,
    marginBlockEnd: n,
    marginBlockStart: n,
    marginInline: n,
    marginInlineEnd: n,
    marginInlineStart: n,
    padding: n,
    paddingTop: n,
    paddingRight: n,
    paddingBottom: n,
    paddingLeft: n,
    paddingBlock: n,
    paddingBlockEnd: n,
    paddingBlockStart: n,
    paddingInline: n,
    paddingInlineEnd: n,
    paddingInlineStart: n,
    top: n,
    right: n,
    bottom: n,
    left: n,
    scrollMargin: n,
    scrollMarginTop: n,
    scrollMarginRight: n,
    scrollMarginBottom: n,
    scrollMarginLeft: n,
    scrollMarginX: n,
    scrollMarginY: n,
    scrollMarginBlock: n,
    scrollMarginBlockEnd: n,
    scrollMarginBlockStart: n,
    scrollMarginInline: n,
    scrollMarginInlineEnd: n,
    scrollMarginInlineStart: n,
    scrollPadding: n,
    scrollPaddingTop: n,
    scrollPaddingRight: n,
    scrollPaddingBottom: n,
    scrollPaddingLeft: n,
    scrollPaddingX: n,
    scrollPaddingY: n,
    scrollPaddingBlock: n,
    scrollPaddingBlockEnd: n,
    scrollPaddingBlockStart: n,
    scrollPaddingInline: n,
    scrollPaddingInlineEnd: n,
    scrollPaddingInlineStart: n,
    fontSize: "fontSizes",
    background: t,
    backgroundColor: t,
    backgroundImage: t,
    borderImage: t,
    border: t,
    borderBlock: t,
    borderBlockEnd: t,
    borderBlockStart: t,
    borderBottom: t,
    borderBottomColor: t,
    borderColor: t,
    borderInline: t,
    borderInlineEnd: t,
    borderInlineStart: t,
    borderLeft: t,
    borderLeftColor: t,
    borderRight: t,
    borderRightColor: t,
    borderTop: t,
    borderTopColor: t,
    caretColor: t,
    color: t,
    columnRuleColor: t,
    fill: t,
    outline: t,
    outlineColor: t,
    stroke: t,
    textDecorationColor: t,
    fontFamily: "fonts",
    fontWeight: "fontWeights",
    lineHeight: "lineHeights",
    letterSpacing: "letterSpacings",
    blockSize: r,
    minBlockSize: r,
    maxBlockSize: r,
    inlineSize: r,
    minInlineSize: r,
    maxInlineSize: r,
    width: r,
    minWidth: r,
    maxWidth: r,
    height: r,
    minHeight: r,
    maxHeight: r,
    flexBasis: r,
    gridTemplateColumns: r,
    gridTemplateRows: r,
    borderWidth: "borderWidths",
    borderTopWidth: "borderWidths",
    borderRightWidth: "borderWidths",
    borderBottomWidth: "borderWidths",
    borderLeftWidth: "borderWidths",
    borderStyle: "borderStyles",
    borderTopStyle: "borderStyles",
    borderRightStyle: "borderStyles",
    borderBottomStyle: "borderStyles",
    borderLeftStyle: "borderStyles",
    borderRadius: "radii",
    borderTopLeftRadius: "radii",
    borderTopRightRadius: "radii",
    borderBottomRightRadius: "radii",
    borderBottomLeftRadius: "radii",
    boxShadow: "shadows",
    textShadow: "shadows",
    transition: "transitions",
    zIndex: "zIndices"
}, o = (e, t)=>"function" == typeof t ? {
        "()": Function.prototype.toString.call(t)
    } : t, l = ()=>{
    const e = Object.create(null);
    return (t, r, ...n)=>{
        const i = ((e)=>JSON.stringify(e, o))(t);
        return i in e ? e[i] : e[i] = r(t, ...n);
    };
}, s = Symbol.for("sxs.internal"), a = (e, t)=>Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)), c = (e)=>{
    for(const t in e)return !0;
    return !1;
}, { hasOwnProperty: d  } = Object.prototype, g = (e)=>e.includes("-") ? e : e.replace(/[A-Z]/g, (e)=>"-" + e.toLowerCase()), p = /\s+(?![^()]*\))/, u = (e)=>(t)=>e(..."string" == typeof t ? String(t).split(p) : [
            t
        ]), h = {
    appearance: (e)=>({
            WebkitAppearance: e,
            appearance: e
        }),
    backfaceVisibility: (e)=>({
            WebkitBackfaceVisibility: e,
            backfaceVisibility: e
        }),
    backdropFilter: (e)=>({
            WebkitBackdropFilter: e,
            backdropFilter: e
        }),
    backgroundClip: (e)=>({
            WebkitBackgroundClip: e,
            backgroundClip: e
        }),
    boxDecorationBreak: (e)=>({
            WebkitBoxDecorationBreak: e,
            boxDecorationBreak: e
        }),
    clipPath: (e)=>({
            WebkitClipPath: e,
            clipPath: e
        }),
    content: (e)=>({
            content: e.includes('"') || e.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e) ? e : `"${e}"`
        }),
    hyphens: (e)=>({
            WebkitHyphens: e,
            hyphens: e
        }),
    maskImage: (e)=>({
            WebkitMaskImage: e,
            maskImage: e
        }),
    maskSize: (e)=>({
            WebkitMaskSize: e,
            maskSize: e
        }),
    tabSize: (e)=>({
            MozTabSize: e,
            tabSize: e
        }),
    textSizeAdjust: (e)=>({
            WebkitTextSizeAdjust: e,
            textSizeAdjust: e
        }),
    userSelect: (e)=>({
            WebkitUserSelect: e,
            userSelect: e
        }),
    marginBlock: u((e, t)=>({
            marginBlockStart: e,
            marginBlockEnd: t || e
        })),
    marginInline: u((e, t)=>({
            marginInlineStart: e,
            marginInlineEnd: t || e
        })),
    maxSize: u((e, t)=>({
            maxBlockSize: e,
            maxInlineSize: t || e
        })),
    minSize: u((e, t)=>({
            minBlockSize: e,
            minInlineSize: t || e
        })),
    paddingBlock: u((e, t)=>({
            paddingBlockStart: e,
            paddingBlockEnd: t || e
        })),
    paddingInline: u((e, t)=>({
            paddingInlineStart: e,
            paddingInlineEnd: t || e
        }))
}, f = /([\d.]+)([^]*)/, m = (e, t)=>e.length ? e.reduce((e, r)=>(e.push(...t.map((e)=>e.includes("&") ? e.replace(/&/g, /[ +>|~]/.test(r) && /&.*&/.test(e) ? `:is(${r})` : r) : r + " " + e)), e), []) : t, b = (e, t)=>e in S && "string" == typeof t ? t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, (t, r, n, i)=>r + ("stretch" === n ? `-moz-available${i};${g(e)}:${r}-webkit-fill-available` : `-moz-fit-content${i};${g(e)}:${r}fit-content`) + i) : String(t), S = {
    blockSize: 1,
    height: 1,
    inlineSize: 1,
    maxBlockSize: 1,
    maxHeight: 1,
    maxInlineSize: 1,
    maxWidth: 1,
    minBlockSize: 1,
    minHeight: 1,
    minInlineSize: 1,
    minWidth: 1,
    width: 1
}, y = (e)=>e ? e + "-" : "", k = (e, t, r)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, (e, n, i, o, l)=>"$" == o == !!i ? e : (n || "--" == o ? "calc(" : "") + "var(--" + ("$" === o ? y(t) + (l.includes("$") ? "" : y(r)) + l.replace(/\$/g, "-") : l) + ")" + (n || "--" == o ? "*" + (n || "") + (i || "1") + ")" : "")), B = /\s*,\s*(?![^()]*\))/, $ = Object.prototype.toString, x = (e, t, r, n, i)=>{
    let o, l, s;
    const a = (e, t, r)=>{
        let c, d;
        const p = (e)=>{
            for(c in e){
                const x = 64 === c.charCodeAt(0), z = x && Array.isArray(e[c]) ? e[c] : [
                    e[c]
                ];
                for (d of z){
                    const e = /[A-Z]/.test(S = c) ? S : S.replace(/-[^]/g, (e)=>e[1].toUpperCase()), z = "object" == typeof d && d && d.toString === $ && (!n.utils[e] || !t.length);
                    if (e in n.utils && !z) {
                        const t = n.utils[e];
                        if (t !== l) {
                            l = t, p(t(d)), l = null;
                            continue;
                        }
                    } else if (e in h) {
                        const t = h[e];
                        if (t !== s) {
                            s = t, p(t(d)), s = null;
                            continue;
                        }
                    }
                    if (x && (u = c.slice(1) in n.media ? "@media " + n.media[c.slice(1)] : c, c = u.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, (e, t, r, n, i, o)=>{
                        const l = f.test(t), s = .0625 * (l ? -1 : 1), [a, c] = l ? [
                            n,
                            t
                        ] : [
                            t,
                            n
                        ];
                        return "(" + ("=" === r[0] ? "" : ">" === r[0] === l ? "max-" : "min-") + a + ":" + ("=" !== r[0] && 1 === r.length ? c.replace(f, (e, t, n)=>Number(t) + s * (">" === r ? 1 : -1) + n) : c) + (i ? ") and (" + (">" === i[0] ? "min-" : "max-") + a + ":" + (1 === i.length ? o.replace(f, (e, t, r)=>Number(t) + s * (">" === i ? -1 : 1) + r) : o) : "") + ")";
                    })), z) {
                        const e = x ? r.concat(c) : [
                            ...r
                        ], n = x ? [
                            ...t
                        ] : m(t, c.split(B));
                        void 0 !== o && i(I(...o)), o = void 0, a(d, n, e);
                    } else void 0 === o && (o = [
                        [],
                        t,
                        r
                    ]), c = x || 36 !== c.charCodeAt(0) ? c : `--${y(n.prefix)}${c.slice(1).replace(/\$/g, "-")}`, d = z ? d : "number" == typeof d ? d && e in R ? String(d) + "px" : String(d) : k(b(e, null == d ? "" : d), n.prefix, n.themeMap[e]), o[0].push(`${x ? `${c} ` : `${g(c)}:`}${d}`);
                }
            }
            var u, S;
        };
        p(e), void 0 !== o && i(I(...o)), o = void 0;
    };
    a(e, t, r);
}, I = (e, t, r)=>`${r.map((e)=>`${e}{`).join("")}${t.length ? `${t.join(",")}{` : ""}${e.join(";")}${t.length ? "}" : ""}${Array(r.length ? r.length + 1 : 0).join("}")}`, R = {
    animationDelay: 1,
    animationDuration: 1,
    backgroundSize: 1,
    blockSize: 1,
    border: 1,
    borderBlock: 1,
    borderBlockEnd: 1,
    borderBlockEndWidth: 1,
    borderBlockStart: 1,
    borderBlockStartWidth: 1,
    borderBlockWidth: 1,
    borderBottom: 1,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomWidth: 1,
    borderEndEndRadius: 1,
    borderEndStartRadius: 1,
    borderInlineEnd: 1,
    borderInlineEndWidth: 1,
    borderInlineStart: 1,
    borderInlineStartWidth: 1,
    borderInlineWidth: 1,
    borderLeft: 1,
    borderLeftWidth: 1,
    borderRadius: 1,
    borderRight: 1,
    borderRightWidth: 1,
    borderSpacing: 1,
    borderStartEndRadius: 1,
    borderStartStartRadius: 1,
    borderTop: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderTopWidth: 1,
    borderWidth: 1,
    bottom: 1,
    columnGap: 1,
    columnRule: 1,
    columnRuleWidth: 1,
    columnWidth: 1,
    containIntrinsicSize: 1,
    flexBasis: 1,
    fontSize: 1,
    gap: 1,
    gridAutoColumns: 1,
    gridAutoRows: 1,
    gridTemplateColumns: 1,
    gridTemplateRows: 1,
    height: 1,
    inlineSize: 1,
    inset: 1,
    insetBlock: 1,
    insetBlockEnd: 1,
    insetBlockStart: 1,
    insetInline: 1,
    insetInlineEnd: 1,
    insetInlineStart: 1,
    left: 1,
    letterSpacing: 1,
    margin: 1,
    marginBlock: 1,
    marginBlockEnd: 1,
    marginBlockStart: 1,
    marginBottom: 1,
    marginInline: 1,
    marginInlineEnd: 1,
    marginInlineStart: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
    maxBlockSize: 1,
    maxHeight: 1,
    maxInlineSize: 1,
    maxWidth: 1,
    minBlockSize: 1,
    minHeight: 1,
    minInlineSize: 1,
    minWidth: 1,
    offsetDistance: 1,
    offsetRotate: 1,
    outline: 1,
    outlineOffset: 1,
    outlineWidth: 1,
    overflowClipMargin: 1,
    padding: 1,
    paddingBlock: 1,
    paddingBlockEnd: 1,
    paddingBlockStart: 1,
    paddingBottom: 1,
    paddingInline: 1,
    paddingInlineEnd: 1,
    paddingInlineStart: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 1,
    perspective: 1,
    right: 1,
    rowGap: 1,
    scrollMargin: 1,
    scrollMarginBlock: 1,
    scrollMarginBlockEnd: 1,
    scrollMarginBlockStart: 1,
    scrollMarginBottom: 1,
    scrollMarginInline: 1,
    scrollMarginInlineEnd: 1,
    scrollMarginInlineStart: 1,
    scrollMarginLeft: 1,
    scrollMarginRight: 1,
    scrollMarginTop: 1,
    scrollPadding: 1,
    scrollPaddingBlock: 1,
    scrollPaddingBlockEnd: 1,
    scrollPaddingBlockStart: 1,
    scrollPaddingBottom: 1,
    scrollPaddingInline: 1,
    scrollPaddingInlineEnd: 1,
    scrollPaddingInlineStart: 1,
    scrollPaddingLeft: 1,
    scrollPaddingRight: 1,
    scrollPaddingTop: 1,
    shapeMargin: 1,
    textDecoration: 1,
    textDecorationThickness: 1,
    textIndent: 1,
    textUnderlineOffset: 1,
    top: 1,
    transitionDelay: 1,
    transitionDuration: 1,
    verticalAlign: 1,
    width: 1,
    wordSpacing: 1
}, z = (e)=>String.fromCharCode(e + (e > 25 ? 39 : 97)), W = (e)=>((e)=>{
        let t, r = "";
        for(t = Math.abs(e); t > 52; t = t / 52 | 0)r = z(t % 52) + r;
        return z(t % 52) + r;
    })(((e, t)=>{
        let r = t.length;
        for(; r;)e = 33 * e ^ t.charCodeAt(--r);
        return e;
    })(5381, JSON.stringify(e)) >>> 0), j = [
    "themed",
    "global",
    "styled",
    "onevar",
    "resonevar",
    "allvar",
    "inline"
], E = (e)=>{
    if (e.href && !e.href.startsWith(location.origin)) return !1;
    try {
        return !!e.cssRules;
    } catch (e) {
        return !1;
    }
}, T = (e)=>{
    let t;
    const r = ()=>{
        const { cssRules: e  } = t.sheet;
        return [].map.call(e, (r, n)=>{
            const { cssText: i  } = r;
            let o = "";
            if (i.startsWith("--sxs")) return "";
            if (e[n - 1] && (o = e[n - 1].cssText).startsWith("--sxs")) {
                if (!r.cssRules.length) return "";
                for(const e in t.rules)if (t.rules[e].group === r) return `--sxs{--sxs:${[
                    ...t.rules[e].cache
                ].join(" ")}}${i}`;
                return r.cssRules.length ? `${o}${i}` : "";
            }
            return i;
        }).join("");
    }, n = ()=>{
        if (t) {
            const { rules: e , sheet: r  } = t;
            if (!r.deleteRule) {
                for(; 3 === Object(Object(r.cssRules)[0]).type;)r.cssRules.splice(0, 1);
                r.cssRules = [];
            }
            for(const t in e)delete e[t];
        }
        const i = Object(e).styleSheets || [];
        for (const e of i)if (E(e)) {
            for(let i = 0, o = e.cssRules; o[i]; ++i){
                const l = Object(o[i]);
                if (1 !== l.type) continue;
                const s = Object(o[i + 1]);
                if (4 !== s.type) continue;
                ++i;
                const { cssText: a  } = l;
                if (!a.startsWith("--sxs")) continue;
                const c = a.slice(14, -3).trim().split(/\s+/), d = j[c[0]];
                d && (t || (t = {
                    sheet: e,
                    reset: n,
                    rules: {},
                    toString: r
                }), t.rules[d] = {
                    group: s,
                    index: i,
                    cache: new Set(c)
                });
            }
            if (t) break;
        }
        if (!t) {
            const i = (e, t)=>({
                    type: t,
                    cssRules: [],
                    insertRule (e, t) {
                        this.cssRules.splice(t, 0, i(e, {
                            import: 3,
                            undefined: 1
                        }[(e.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
                    },
                    get cssText () {
                        return "@media{}" === e ? `@media{${[].map.call(this.cssRules, (e)=>e.cssText).join("")}}` : e;
                    }
                });
            t = {
                sheet: e ? (e.head || e).appendChild(document.createElement("style")).sheet : i("", "text/css"),
                rules: {},
                reset: n,
                toString: r
            };
        }
        const { sheet: o , rules: l  } = t;
        for(let e = j.length - 1; e >= 0; --e){
            const t = j[e];
            if (!l[t]) {
                const r = j[e + 1], n = l[r] ? l[r].index : o.cssRules.length;
                o.insertRule("@media{}", n), o.insertRule(`--sxs{--sxs:${e}}`, n), l[t] = {
                    group: o.cssRules[n + 1],
                    index: n,
                    cache: new Set([
                        e
                    ])
                };
            }
            M(l[t]);
        }
    };
    return n(), t;
}, M = (e)=>{
    const t = e.group;
    let r = t.cssRules.length;
    e.apply = (e)=>{
        try {
            t.insertRule(e, r), ++r;
        } catch (e) {}
    };
}, v = Symbol(), w = l(), C = (e, t)=>w(e, ()=>(...r)=>{
            let n = {
                type: null,
                composers: new Set
            };
            for (const t of r)if (null != t) if (t[s]) {
                null == n.type && (n.type = t[s].type);
                for (const e of t[s].composers)n.composers.add(e);
            } else t.constructor !== Object || t.$$typeof ? null == n.type && (n.type = t) : n.composers.add(P(t, e));
            return null == n.type && (n.type = "span"), n.composers.size || n.composers.add([
                "PJLV",
                {},
                [],
                [],
                {},
                []
            ]), L(e, n, t);
        }), P = (e, t)=>{
    let { variants: r , compoundVariants: n , defaultVariants: i , ...o } = e;
    const l = `${y(t.prefix)}c-${W(o)}`, s = [], a = [], g = Object.create(null), p = [];
    for(const e in i)g[e] = String(i[e]);
    if ("object" == typeof r && r) for(const e in r){
        u = g, h = e, d.call(u, h) || (g[e] = "undefined");
        const t = r[e];
        for(const r in t){
            const n = {
                [e]: String(r)
            };
            "undefined" === String(r) && p.push(e);
            const i = t[r], o = [
                n,
                i,
                !c(i)
            ];
            s.push(o);
        }
    }
    var u, h;
    if ("object" == typeof n && n) for (const e of n){
        let { css: t , ...r } = e;
        t = "object" == typeof t && t || {};
        for(const e in r)r[e] = String(r[e]);
        const n = [
            r,
            t,
            !c(t)
        ];
        a.push(n);
    }
    return [
        l,
        o,
        s,
        a,
        g,
        p
    ];
}, L = (e, t, r)=>{
    const [n, i, o, l] = O(t.composers), c = "function" == typeof t.type || t.type.$$typeof ? ((e)=>{
        function t() {
            for(let r = 0; r < t[v].length; r++){
                const [n, i] = t[v][r];
                e.rules[n].apply(i);
            }
            return t[v] = [], null;
        }
        return t[v] = [], t.rules = {}, j.forEach((e)=>t.rules[e] = {
                apply: (r)=>t[v].push([
                        e,
                        r
                    ])
            }), t;
    })(r) : null, d = (c || r).rules, g = `.${n}${i.length > 1 ? `:where(.${i.slice(1).join(".")})` : ""}`, p = (s)=>{
        s = "object" == typeof s && s || N;
        const { css: a , ...p } = s, u = {};
        for(const e in o)if (delete p[e], e in s) {
            let t = s[e];
            "object" == typeof t && t ? u[e] = {
                "@initial": o[e],
                ...t
            } : (t = String(t), u[e] = "undefined" !== t || l.has(e) ? t : o[e]);
        } else u[e] = o[e];
        const h = new Set([
            ...i
        ]);
        for (const [n, i, o, l] of t.composers){
            r.rules.styled.cache.has(n) || (r.rules.styled.cache.add(n), x(i, [
                `.${n}`
            ], [], e, (e)=>{
                d.styled.apply(e);
            }));
            const t = A(o, u, e.media), s = A(l, u, e.media, !0);
            for (const i of t)if (void 0 !== i) for (const [t, o, l] of i){
                const i = `${n}-${W(o)}-${t}`;
                h.add(i);
                const s = (l ? r.rules.resonevar : r.rules.onevar).cache, a = l ? d.resonevar : d.onevar;
                s.has(i) || (s.add(i), x(o, [
                    `.${i}`
                ], [], e, (e)=>{
                    a.apply(e);
                }));
            }
            for (const t of s)if (void 0 !== t) for (const [i, o] of t){
                const t = `${n}-${W(o)}-${i}`;
                h.add(t), r.rules.allvar.cache.has(t) || (r.rules.allvar.cache.add(t), x(o, [
                    `.${t}`
                ], [], e, (e)=>{
                    d.allvar.apply(e);
                }));
            }
        }
        if ("object" == typeof a && a) {
            const t = `${n}-i${W(a)}-css`;
            h.add(t), r.rules.inline.cache.has(t) || (r.rules.inline.cache.add(t), x(a, [
                `.${t}`
            ], [], e, (e)=>{
                d.inline.apply(e);
            }));
        }
        for (const e of String(s.className || "").trim().split(/\s+/))e && h.add(e);
        const f = p.className = [
            ...h
        ].join(" ");
        return {
            type: t.type,
            className: f,
            selector: g,
            props: p,
            toString: ()=>f,
            deferredInjector: c
        };
    };
    return a(p, {
        className: n,
        selector: g,
        [s]: t,
        toString: ()=>(r.rules.styled.cache.has(n) || p(), n)
    });
}, O = (e)=>{
    let t = "";
    const r = [], n = {}, i = [];
    for (const [o, , , , l, s] of e){
        "" === t && (t = o), r.push(o), i.push(...s);
        for(const e in l){
            const t = l[e];
            (void 0 === n[e] || "undefined" !== t || s.includes(t)) && (n[e] = t);
        }
    }
    return [
        t,
        r,
        n,
        new Set(i)
    ];
}, A = (e, t, r, n)=>{
    const i = [];
    e: for (let [o, l, s] of e){
        if (s) continue;
        let e, a = 0, c = !1;
        for(e in o){
            const n = o[e];
            let i = t[e];
            if (i !== n) {
                if ("object" != typeof i || !i) continue e;
                {
                    let e, t, o = 0;
                    for(const l in i){
                        if (n === String(i[l])) {
                            if ("@initial" !== l) {
                                const e = l.slice(1);
                                (t = t || []).push(e in r ? r[e] : l.replace(/^@media ?/, "")), c = !0;
                            }
                            a += o, e = !0;
                        }
                        ++o;
                    }
                    if (t && t.length && (l = {
                        ["@media " + t.join(", ")]: l
                    }), !e) continue e;
                }
            }
        }
        (i[a] = i[a] || []).push([
            n ? "cv" : `${e}-${o[e]}`,
            l,
            c
        ]);
    }
    return i;
}, N = {}, D = l(), H = (e, t)=>D(e, ()=>(...r)=>{
            const n = ()=>{
                for (let n of r){
                    n = "object" == typeof n && n || {};
                    let r = W(n);
                    if (!t.rules.global.cache.has(r)) {
                        if (t.rules.global.cache.add(r), "@import" in n) {
                            let e = [].indexOf.call(t.sheet.cssRules, t.rules.themed.group) - 1;
                            for (let r of [].concat(n["@import"]))r = r.includes('"') || r.includes("'") ? r : `"${r}"`, t.sheet.insertRule(`@import ${r};`, e++);
                            delete n["@import"];
                        }
                        x(n, [], [], e, (e)=>{
                            t.rules.global.apply(e);
                        });
                    }
                }
                return "";
            };
            return a(n, {
                toString: n
            });
        }), V = l(), G = (e, t)=>V(e, ()=>(r)=>{
            const n = `${y(e.prefix)}k-${W(r)}`, i = ()=>{
                if (!t.rules.global.cache.has(n)) {
                    t.rules.global.cache.add(n);
                    const i = [];
                    x(r, [], [], e, (e)=>i.push(e));
                    const o = `@keyframes ${n}{${i.join("")}}`;
                    t.rules.global.apply(o);
                }
                return n;
            };
            return a(i, {
                get name () {
                    return i();
                },
                toString: i
            });
        }), F = class {
    constructor(e, t, r, n){
        this.token = null == e ? "" : String(e), this.value = null == t ? "" : String(t), this.scale = null == r ? "" : String(r), this.prefix = null == n ? "" : String(n);
    }
    get computedValue() {
        return "var(" + this.variable + ")";
    }
    get variable() {
        return "--" + y(this.prefix) + y(this.scale) + this.token;
    }
    toString() {
        return this.computedValue;
    }
}, J = l(), U = (e, t)=>J(e, ()=>(r, n)=>{
            n = "object" == typeof r && r || Object(n);
            const i = `.${r = (r = "string" == typeof r ? r : "") || `${y(e.prefix)}t-${W(n)}`}`, o = {}, l = [];
            for(const t in n){
                o[t] = {};
                for(const r in n[t]){
                    const i = `--${y(e.prefix)}${t}-${r}`, s = k(String(n[t][r]), e.prefix, t);
                    o[t][r] = new F(r, s, t, e.prefix), l.push(`${i}:${s}`);
                }
            }
            const s = ()=>{
                if (l.length && !t.rules.themed.cache.has(r)) {
                    t.rules.themed.cache.add(r);
                    const i = `${n === e.theme ? ":root," : ""}.${r}{${l.join(";")}}`;
                    t.rules.themed.apply(i);
                }
                return r;
            };
            return {
                ...o,
                get className () {
                    return s();
                },
                selector: i,
                toString: s
            };
        }), Z = l(), q = __webpack_require__(8033), X = l(), Y = (e)=>{
    const t = ((e)=>{
        let t = !1;
        const r = Z(e, (e)=>{
            t = !0;
            const r = "prefix" in (e = "object" == typeof e && e || {}) ? String(e.prefix) : "", n = "object" == typeof e.media && e.media || {}, o = "object" == typeof e.root ? e.root || null : globalThis.document || null, l = "object" == typeof e.theme && e.theme || {}, s = {
                prefix: r,
                media: n,
                theme: l,
                themeMap: "object" == typeof e.themeMap && e.themeMap || {
                    ...i
                },
                utils: "object" == typeof e.utils && e.utils || {}
            }, a = T(o), c = {
                css: C(s, a),
                globalCss: H(s, a),
                keyframes: G(s, a),
                createTheme: U(s, a),
                reset () {
                    a.reset(), c.theme.toString();
                },
                theme: {},
                sheet: a,
                config: s,
                prefix: r,
                getCssText: a.toString,
                toString: a.toString
            };
            return String(c.theme = c.createTheme(l)), c;
        });
        return t || r.reset(), r;
    })(e);
    return t.styled = ((e)=>{
        let { config: t , sheet: r  } = e;
        return X(t, ()=>{
            const e = C(t, r);
            return (...t)=>{
                const r = e(...t), n = r[s].type, i = q.forwardRef((e, t)=>{
                    const i = e && e.as || n, { props: o , deferredInjector: l  } = r(e);
                    return delete o.as, o.ref = t, l ? q.createElement(q.Fragment, null, q.createElement(i, o), q.createElement(l, null)) : q.createElement(i, o);
                });
                return i.className = r.className, i.displayName = `Styled.${n.displayName || n.name || n}`, i.selector = r.selector, i.toString = ()=>r.selector, i[s] = r[s], i;
            };
        });
    })(t), t;
}, K = ()=>e || (e = Y());
module.exports = {
    createStitches: Y,
    createTheme: (...e)=>K().createTheme(...e),
    css: (...e)=>K().css(...e),
    defaultThemeMap: i,
    globalCss: (...e)=>K().globalCss(...e),
    keyframes: (...e)=>K().keyframes(...e),
    styled: (...e)=>K().styled(...e)
}; //# sourceMappingUrl=index.map


/***/ })

};
;