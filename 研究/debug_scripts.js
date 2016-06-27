function make_event_emitter(e) {
	console.log("fidder.js 测试");
    function t(e) {
        return e._listeners || (e._listeners = {})
    }
    _.assign(e, {
        on: function(e, r) {
            var n = t(this),
            o = n[e];
            o || (o = n[e] = []),
            o.push(r)
        },
        off: function(e, r) {
            var n = t(this),
            o = n[e];
            o && (n[e] = _.without(o, r))
        },
        emit: function(e) {
            var r = t(this),
            n = r[e];
            if (n) {
                var o = Array.prototype.slice.call(arguments, 1);
                n.forEach(function(e) {
                    e.apply(null, o)
                })
            }
        }
    })
} (function() {
    function e(e, t, r) {
        for (var n = (r || 0) - 1, o = e ? e.length: 0; ++n < o;) if (e[n] === t) return n;
        return - 1
    }
    function t(t, r) {
        var n = typeof r;
        if (t = t.cache, "boolean" == n || null == r) return t[r] ? 0 : -1;
        "number" != n && "string" != n && (n = "object");
        var o = "number" == n ? r: d + r;
        return t = (t = t[n]) && t[o],
        "object" == n ? t && e(t, r) > -1 ? 0 : -1 : t ? 0 : -1
    }
    function r(e) {
        var t = this.cache,
        r = typeof e;
        if ("boolean" == r || null == e) t[e] = !0;
        else {
            "number" != r && "string" != r && (r = "object");
            var n = "number" == r ? e: d + e,
            o = t[r] || (t[r] = {});
            "object" == r ? (o[n] || (o[n] = [])).push(e) : o[n] = !0
        }
    }
    function n(e) {
        return e.charCodeAt(0)
    }
    function o(e, t) {
        for (var r = e.criteria,
        n = t.criteria,
        o = -1,
        a = r.length; ++o < a;) {
            var i = r[o],
            u = n[o];
            if (i !== u) {
                if (i > u || "undefined" == typeof i) return 1;
                if (u > i || "undefined" == typeof u) return - 1
            }
        }
        return e.index - t.index
    }
    function a(e) {
        var t = -1,
        n = e.length,
        o = e[0],
        a = e[n / 2 | 0],
        i = e[n - 1];
        if (o && "object" == typeof o && a && "object" == typeof a && i && "object" == typeof i) return ! 1;
        var u = c();
        u["false"] = u["null"] = u["true"] = u.undefined = !1;
        var l = c();
        for (l.array = e, l.cache = u, l.push = r; ++t < n;) l.push(e[t]);
        return l
    }
    function i(e) {
        return "\\" + H[e]
    }
    function u() {
        return g.pop() || []
    }
    function c() {
        return h.pop() || {
            array: null,
            cache: null,
            criteria: null,
            "false": !1,
            index: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            value: null
        }
    }
    function l(e) {
        e.length = 0,
        g.length < b && g.push(e)
    }
    function s(e) {
        var t = e.cache;
        t && s(t),
        e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null,
        h.length < b && h.push(e)
    }
    function f(e, t, r) {
        t || (t = 0),
        "undefined" == typeof r && (r = e ? e.length: 0);
        for (var n = -1,
        o = r - t || 0,
        a = Array(0 > o ? 0 : o); ++n < o;) a[n] = e[t + n];
        return a
    }
    function v(r) {
        function g(e) {
            return e && "object" == typeof e && !Qr(e) && kr.call(e, "__wrapped__") ? e: new h(e)
        }
        function h(e, t) {
            this.__chain__ = !!t,
            this.__wrapped__ = e
        }
        function b(e) {
            function t() {
                if (n) {
                    var e = f(n);
                    Gr.apply(e, arguments)
                }
                if (this instanceof t) {
                    var a = Y(r.prototype),
                    i = r.apply(a, e || arguments);
                    return De(i) ? i: a
                }
                return r.apply(o, e || arguments)
            }
            var r = e[0],
            n = e[2],
            o = e[4];
            return Kr(t, e),
            t
        }
        function H(e, t, r, n, o) {
            if (r) {
                var a = r(e);
                if ("undefined" != typeof a) return a
            }
            var i = De(e);
            if (!i) return e;
            var c = Mr.call(e);
            if (!q[c]) return e;
            var s = $r[c];
            switch (c) {
            case U:
            case N:
                return new s( + e);
            case W:
            case j:
                return new s(e);
            case C:
                return a = s(e.source, A.exec(e)),
                a.lastIndex = e.lastIndex,
                a
            }
            var v = Qr(e);
            if (t) {
                var p = !n;
                n || (n = u()),
                o || (o = u());
                for (var g = n.length; g--;) if (n[g] == e) return o[g];
                a = v ? s(e.length) : {}
            } else a = v ? f(e) : on({},
            e);
            return v && (kr.call(e, "index") && (a.index = e.index), kr.call(e, "input") && (a.input = e.input)),
            t ? (n.push(e), o.push(a), (v ? Ke: cn)(e,
            function(e, i) {
                a[i] = H(e, t, r, n, o)
            }), p && (l(n), l(o)), a) : a
        }
        function Y(e, t) {
            return De(e) ? Wr(e) : {}
        }
        function K(e, t, r) {
            if ("function" != typeof e) return Qt;
            if ("undefined" == typeof t || !("prototype" in e)) return e;
            var n = e.__bindData__;
            if ("undefined" == typeof n && (Yr.funcNames && (n = !e.name), n = n || !Yr.funcDecomp, !n)) {
                var o = Sr.call(e);
                Yr.funcNames || (n = !M.test(o)),
                n || (n = D.test(o), Kr(e, n))
            }
            if (n === !1 || n !== !0 && 1 & n[1]) return e;
            switch (r) {
            case 1:
                return function(r) {
                    return e.call(t, r)
                };
            case 2:
                return function(r, n) {
                    return e.call(t, r, n)
                };
            case 3:
                return function(r, n, o) {
                    return e.call(t, r, n, o)
                };
            case 4:
                return function(r, n, o, a) {
                    return e.call(t, r, n, o, a)
                }
            }
            return Gt(e, t)
        }
        function Q(e) {
            function t() {
                var e = c ? i: this;
                if (o) {
                    var g = f(o);
                    Gr.apply(g, arguments)
                }
                if ((a || s) && (g || (g = f(arguments)), a && Gr.apply(g, a), s && g.length < u)) return n |= 16,
                Q([r, v ? n: -4 & n, g, null, i, u]);
                if (g || (g = arguments), l && (r = e[p]), this instanceof t) {
                    e = Y(r.prototype);
                    var h = r.apply(e, g);
                    return De(h) ? h: e
                }
                return r.apply(e, g)
            }
            var r = e[0],
            n = e[1],
            o = e[2],
            a = e[3],
            i = e[4],
            u = e[5],
            c = 1 & n,
            l = 2 & n,
            s = 4 & n,
            v = 8 & n,
            p = r;
            return Kr(t, e),
            t
        }
        function Z(r, n) {
            var o = -1,
            i = ce(),
            u = r ? r.length: 0,
            c = u >= _ && i === e,
            l = [];
            if (c) {
                var f = a(n);
                f ? (i = t, n = f) : c = !1
            }
            for (; ++o < u;) {
                var v = r[o];
                i(n, v) < 0 && l.push(v)
            }
            return c && s(n),
            l
        }
        function ee(e, t, r, n) {
            for (var o = (n || 0) - 1, a = e ? e.length: 0, i = []; ++o < a;) {
                var u = e[o];
                if (u && "object" == typeof u && "number" == typeof u.length && (Qr(u) || ve(u))) {
                    t || (u = ee(u, t, r));
                    var c = -1,
                    l = u.length,
                    s = i.length;
                    for (i.length += l; ++c < l;) i[s++] = u[c]
                } else r || i.push(u)
            }
            return i
        }
        function te(e, t, r, n, o, a) {
            if (r) {
                var i = r(e, t);
                if ("undefined" != typeof i) return !! i
            }
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            var c = typeof e,
            s = typeof t;
            if (! (e !== e || e && z[c] || t && z[s])) return ! 1;
            if (null == e || null == t) return e === t;
            var f = Mr.call(e),
            v = Mr.call(t);
            if (f == G && (f = O), v == G && (v = O), f != v) return ! 1;
            switch (f) {
            case U:
            case N:
                return + e == +t;
            case W:
                return e != +e ? t != +t: 0 == e ? 1 / e == 1 / t: e == +t;
            case C:
            case j:
                return e == Tr(t)
            }
            var p = f == I;
            if (!p) {
                var g = kr.call(e, "__wrapped__"),
                h = kr.call(t, "__wrapped__");
                if (g || h) return te(g ? e.__wrapped__: e, h ? t.__wrapped__: t, r, n, o, a);
                if (f != O) return ! 1;
                var m = e.constructor,
                d = t.constructor;
                if (m != d && !(Le(m) && m instanceof m && Le(d) && d instanceof d) && "constructor" in e && "constructor" in t) return ! 1
            }
            var _ = !o;
            o || (o = u()),
            a || (a = u());
            for (var b = o.length; b--;) if (o[b] == e) return a[b] == t;
            var y = 0;
            if (i = !0, o.push(e), a.push(t), p) {
                if (b = e.length, y = t.length, i = y == b, i || n) for (; y--;) {
                    var T = b,
                    w = t[y];
                    if (n) for (; T--&&!(i = te(e[T], w, r, n, o, a)););
                    else if (! (i = te(e[y], w, r, n, o, a))) break
                }
            } else un(t,
            function(t, u, c) {
                return kr.call(c, u) ? (y++, i = kr.call(e, u) && te(e[u], t, r, n, o, a)) : void 0
            }),
            i && !n && un(e,
            function(e, t, r) {
                return kr.call(r, t) ? i = --y > -1 : void 0
            });
            return o.pop(),
            a.pop(),
            _ && (l(o), l(a)),
            i
        }
        function re(e, t, r, n, o) { (Qr(t) ? Ke: cn)(t,
            function(t, a) {
                var i, u, c = t,
                l = e[a];
                if (t && ((u = Qr(t)) || ln(t))) {
                    for (var s = n.length; s--;) if (i = n[s] == t) {
                        l = o[s];
                        break
                    }
                    if (!i) {
                        var f;
                        r && (c = r(l, t), (f = "undefined" != typeof c) && (l = c)),
                        f || (l = u ? Qr(l) ? l: [] : ln(l) ? l: {}),
                        n.push(t),
                        o.push(l),
                        f || re(l, t, r, n, o)
                    }
                } else r && (c = r(l, t), "undefined" == typeof c && (c = t)),
                "undefined" != typeof c && (l = c);
                e[a] = l
            })
        }
        function ne(e, t) {
            return e + Dr(Hr() * (t - e + 1))
        }
        function oe(r, n, o) {
            var i = -1,
            c = ce(),
            f = r ? r.length: 0,
            v = [],
            p = !n && f >= _ && c === e,
            g = o || p ? u() : v;
            if (p) {
                var h = a(g);
                c = t,
                g = h
            }
            for (; ++i < f;) {
                var m = r[i],
                d = o ? o(m, i, r) : m; (n ? !i || g[g.length - 1] !== d: c(g, d) < 0) && ((o || p) && g.push(d), v.push(m))
            }
            return p ? (l(g.array), s(g)) : o && l(g),
            v
        }
        function ae(e) {
            return function(t, r, n) {
                var o = {};
                r = g.createCallback(r, n, 3);
                var a = -1,
                i = t ? t.length: 0;
                if ("number" == typeof i) for (; ++a < i;) {
                    var u = t[a];
                    e(o, u, r(u, a, t), t)
                } else cn(t,
                function(t, n, a) {
                    e(o, t, r(t, n, a), a)
                });
                return o
            }
        }
        function ie(e, t, r, n, o, a) {
            var i = 1 & t,
            u = 2 & t,
            c = 4 & t,
            l = 16 & t,
            s = 32 & t;
            if (!u && !Le(e)) throw new wr;
            l && !r.length && (t &= -17, l = r = !1),
            s && !n.length && (t &= -33, s = n = !1);
            var v = e && e.__bindData__;
            if (v && v !== !0) return v = f(v),
            v[2] && (v[2] = f(v[2])),
            v[3] && (v[3] = f(v[3])),
            !i || 1 & v[1] || (v[4] = o),
            !i && 1 & v[1] && (t |= 8),
            !c || 4 & v[1] || (v[5] = a),
            l && Gr.apply(v[2] || (v[2] = []), r),
            s && Nr.apply(v[3] || (v[3] = []), n),
            v[1] |= t,
            ie.apply(null, v);
            var p = 1 == t || 17 === t ? b: Q;
            return p([e, t, r, n, o, a])
        }
        function ue(e) {
            return en[e]
        }
        function ce() {
            var t = (t = g.indexOf) === dt ? e: t;
            return t
        }
        function le(e) {
            return "function" == typeof e && Rr.test(e)
        }
        function se(e) {
            var t, r;
            return e && Mr.call(e) == O && (t = e.constructor, !Le(t) || t instanceof t) ? (un(e,
            function(e, t) {
                r = t
            }), "undefined" == typeof r || kr.call(e, r)) : !1
        }
        function fe(e) {
            return tn[e]
        }
        function ve(e) {
            return e && "object" == typeof e && "number" == typeof e.length && Mr.call(e) == G || !1
        }
        function pe(e, t, r, n) {
            return "boolean" != typeof t && null != t && (n = r, r = t, t = !1),
            H(e, t, "function" == typeof r && K(r, n, 1))
        }
        function ge(e, t, r) {
            return H(e, !0, "function" == typeof t && K(t, r, 1))
        }
        function he(e, t) {
            var r = Y(e);
            return t ? on(r, t) : r
        }
        function me(e, t, r) {
            var n;
            return t = g.createCallback(t, r, 3),
            cn(e,
            function(e, r, o) {
                return t(e, r, o) ? (n = r, !1) : void 0
            }),
            n
        }
        function de(e, t, r) {
            var n;
            return t = g.createCallback(t, r, 3),
            be(e,
            function(e, r, o) {
                return t(e, r, o) ? (n = r, !1) : void 0
            }),
            n
        }
        function _e(e, t, r) {
            var n = [];
            un(e,
            function(e, t) {
                n.push(t, e)
            });
            var o = n.length;
            for (t = K(t, r, 3); o--&&t(n[o--], n[o], e) !== !1;);
            return e
        }
        function be(e, t, r) {
            var n = Jr(e),
            o = n.length;
            for (t = K(t, r, 3); o--;) {
                var a = n[o];
                if (t(e[a], a, e) === !1) break
            }
            return e
        }
        function ye(e) {
            var t = [];
            return un(e,
            function(e, r) {
                Le(e) && t.push(r)
            }),
            t.sort()
        }
        function Te(e, t) {
            return e ? kr.call(e, t) : !1
        }
        function we(e) {
            for (var t = -1,
            r = Jr(e), n = r.length, o = {}; ++t < n;) {
                var a = r[t];
                o[e[a]] = a
            }
            return o
        }
        function Ee(e) {
            return e === !0 || e === !1 || e && "object" == typeof e && Mr.call(e) == U || !1
        }
        function xe(e) {
            return e && "object" == typeof e && Mr.call(e) == N || !1
        }
        function Ae(e) {
            return e && 1 === e.nodeType || !1
        }
        function Me(e) {
            var t = !0;
            if (!e) return t;
            var r = Mr.call(e),
            n = e.length;
            return r == I || r == j || r == G || r == O && "number" == typeof n && Le(e.splice) ? !n: (cn(e,
            function() {
                return t = !1
            }), t)
        }
        function Re(e, t, r, n) {
            return te(e, t, "function" == typeof r && K(r, n, 2))
        }
        function Pe(e) {
            return Cr(e) && !jr(parseFloat(e))
        }
        function Le(e) {
            return "function" == typeof e
        }
        function De(e) {
            return ! (!e || !z[typeof e])
        }
        function Se(e) {
            return ke(e) && e != +e
        }
        function Fe(e) {
            return null === e
        }
        function ke(e) {
            return "number" == typeof e || e && "object" == typeof e && Mr.call(e) == W || !1
        }
        function Ge(e) {
            return e && "object" == typeof e && Mr.call(e) == C || !1
        }
        function Ie(e) {
            return "string" == typeof e || e && "object" == typeof e && Mr.call(e) == j || !1
        }
        function Ue(e) {
            return "undefined" == typeof e
        }
        function Ne(e, t, r) {
            var n = {};
            return t = g.createCallback(t, r, 3),
            cn(e,
            function(e, r, o) {
                n[r] = t(e, r, o)
            }),
            n
        }
        function Be(e) {
            var t = arguments,
            r = 2;
            if (!De(e)) return e;
            if ("number" != typeof t[2] && (r = t.length), r > 3 && "function" == typeof t[r - 2]) var n = K(t[--r - 1], t[r--], 2);
            else r > 2 && "function" == typeof t[r - 1] && (n = t[--r]);
            for (var o = f(arguments, 1, r), a = -1, i = u(), c = u(); ++a < r;) re(e, o[a], n, i, c);
            return l(i),
            l(c),
            e
        }
        function We(e, t, r) {
            var n = {};
            if ("function" != typeof t) {
                var o = [];
                un(e,
                function(e, t) {
                    o.push(t)
                }),
                o = Z(o, ee(arguments, !0, !1, 1));
                for (var a = -1,
                i = o.length; ++a < i;) {
                    var u = o[a];
                    n[u] = e[u]
                }
            } else t = g.createCallback(t, r, 3),
            un(e,
            function(e, r, o) {
                t(e, r, o) || (n[r] = e)
            });
            return n
        }
        function Oe(e) {
            for (var t = -1,
            r = Jr(e), n = r.length, o = pr(n); ++t < n;) {
                var a = r[t];
                o[t] = [a, e[a]]
            }
            return o
        }
        function Ce(e, t, r) {
            var n = {};
            if ("function" != typeof t) for (var o = -1,
            a = ee(arguments, !0, !1, 1), i = De(e) ? a.length: 0; ++o < i;) {
                var u = a[o];
                u in e && (n[u] = e[u])
            } else t = g.createCallback(t, r, 3),
            un(e,
            function(e, r, o) {
                t(e, r, o) && (n[r] = e)
            });
            return n
        }
        function je(e, t, r, n) {
            var o = Qr(e);
            if (null == r) if (o) r = [];
            else {
                var a = e && e.constructor,
                i = a && a.prototype;
                r = Y(i)
            }
            return t && (t = g.createCallback(t, n, 4), (o ? Ke: cn)(e,
            function(e, n, o) {
                return t(r, e, n, o)
            })),
            r
        }
        function qe(e) {
            for (var t = -1,
            r = Jr(e), n = r.length, o = pr(n); ++t < n;) o[t] = e[r[t]];
            return o
        }
        function Ve(e) {
            for (var t = arguments,
            r = -1,
            n = ee(t, !0, !1, 1), o = t[2] && t[2][t[1]] === e ? 1 : n.length, a = pr(o); ++r < o;) a[r] = e[n[r]];
            return a
        }
        function Xe(e, t, r) {
            var n = -1,
            o = ce(),
            a = e ? e.length: 0,
            i = !1;
            return r = (0 > r ? Vr(0, a + r) : r) || 0,
            Qr(e) ? i = o(e, t, r) > -1 : "number" == typeof a ? i = (Ie(e) ? e.indexOf(t, r) : o(e, t, r)) > -1 : cn(e,
            function(e) {
                return++n >= r ? !(i = e === t) : void 0
            }),
            i
        }
        function ze(e, t, r) {
            var n = !0;
            t = g.createCallback(t, r, 3);
            var o = -1,
            a = e ? e.length: 0;
            if ("number" == typeof a) for (; ++o < a && (n = !!t(e[o], o, e)););
            else cn(e,
            function(e, r, o) {
                return n = !!t(e, r, o)
            });
            return n
        }
        function He(e, t, r) {
            var n = [];
            t = g.createCallback(t, r, 3);
            var o = -1,
            a = e ? e.length: 0;
            if ("number" == typeof a) for (; ++o < a;) {
                var i = e[o];
                t(i, o, e) && n.push(i)
            } else cn(e,
            function(e, r, o) {
                t(e, r, o) && n.push(e)
            });
            return n
        }
        function $e(e, t, r) {
            t = g.createCallback(t, r, 3);
            var n = -1,
            o = e ? e.length: 0;
            if ("number" != typeof o) {
                var a;
                return cn(e,
                function(e, r, n) {
                    return t(e, r, n) ? (a = e, !1) : void 0
                }),
                a
            }
            for (; ++n < o;) {
                var i = e[n];
                if (t(i, n, e)) return i
            }
        }
        function Ye(e, t, r) {
            var n;
            return t = g.createCallback(t, r, 3),
            Qe(e,
            function(e, r, o) {
                return t(e, r, o) ? (n = e, !1) : void 0
            }),
            n
        }
        function Ke(e, t, r) {
            var n = -1,
            o = e ? e.length: 0;
            if (t = t && "undefined" == typeof r ? t: K(t, r, 3), "number" == typeof o) for (; ++n < o && t(e[n], n, e) !== !1;);
            else cn(e, t);
            return e
        }
        function Qe(e, t, r) {
            var n = e ? e.length: 0;
            if (t = t && "undefined" == typeof r ? t: K(t, r, 3), "number" == typeof n) for (; n--&&t(e[n], n, e) !== !1;);
            else {
                var o = Jr(e);
                n = o.length,
                cn(e,
                function(e, r, a) {
                    return r = o ? o[--n] : --n,
                    t(a[r], r, a)
                })
            }
            return e
        }
        function Ze(e, t) {
            var r = f(arguments, 2),
            n = -1,
            o = "function" == typeof t,
            a = e ? e.length: 0,
            i = pr("number" == typeof a ? a: 0);
            return Ke(e,
            function(e) {
                i[++n] = (o ? t: e[t]).apply(e, r)
            }),
            i
        }
        function Je(e, t, r) {
            var n = -1,
            o = e ? e.length: 0;
            if (t = g.createCallback(t, r, 3), "number" == typeof o) for (var a = pr(o); ++n < o;) a[n] = t(e[n], n, e);
            else a = [],
            cn(e,
            function(e, r, o) {
                a[++n] = t(e, r, o)
            });
            return a
        }
        function et(e, t, r) {
            var o = -(1 / 0),
            a = o;
            if ("function" != typeof t && r && r[t] === e && (t = null), null == t && Qr(e)) for (var i = -1,
            u = e.length; ++i < u;) {
                var c = e[i];
                c > a && (a = c)
            } else t = null == t && Ie(e) ? n: g.createCallback(t, r, 3),
            Ke(e,
            function(e, r, n) {
                var i = t(e, r, n);
                i > o && (o = i, a = e)
            });
            return a
        }
        function tt(e, t, r) {
            var o = 1 / 0,
            a = o;
            if ("function" != typeof t && r && r[t] === e && (t = null), null == t && Qr(e)) for (var i = -1,
            u = e.length; ++i < u;) {
                var c = e[i];
                a > c && (a = c)
            } else t = null == t && Ie(e) ? n: g.createCallback(t, r, 3),
            Ke(e,
            function(e, r, n) {
                var i = t(e, r, n);
                o > i && (o = i, a = e)
            });
            return a
        }
        function rt(e, t, r, n) {
            if (!e) return r;
            var o = arguments.length < 3;
            t = g.createCallback(t, n, 4);
            var a = -1,
            i = e.length;
            if ("number" == typeof i) for (o && (r = e[++a]); ++a < i;) r = t(r, e[a], a, e);
            else cn(e,
            function(e, n, a) {
                r = o ? (o = !1, e) : t(r, e, n, a)
            });
            return r
        }
        function nt(e, t, r, n) {
            var o = arguments.length < 3;
            return t = g.createCallback(t, n, 4),
            Qe(e,
            function(e, n, a) {
                r = o ? (o = !1, e) : t(r, e, n, a)
            }),
            r
        }
        function ot(e, t, r) {
            return t = g.createCallback(t, r, 3),
            He(e,
            function(e, r, n) {
                return ! t(e, r, n)
            })
        }
        function at(e, t, r) {
            if (e && "number" != typeof e.length && (e = qe(e)), null == t || r) return e ? e[ne(0, e.length - 1)] : p;
            var n = it(e);
            return n.length = Xr(Vr(0, t), n.length),
            n
        }
        function it(e) {
            var t = -1,
            r = e ? e.length: 0,
            n = pr("number" == typeof r ? r: 0);
            return Ke(e,
            function(e) {
                var r = ne(0, ++t);
                n[t] = n[r],
                n[r] = e
            }),
            n
        }
        function ut(e) {
            var t = e ? e.length: 0;
            return "number" == typeof t ? t: Jr(e).length
        }
        function ct(e, t, r) {
            var n;
            t = g.createCallback(t, r, 3);
            var o = -1,
            a = e ? e.length: 0;
            if ("number" == typeof a) for (; ++o < a && !(n = t(e[o], o, e)););
            else cn(e,
            function(e, r, o) {
                return ! (n = t(e, r, o))
            });
            return !! n
        }
        function lt(e, t, r) {
            var n = -1,
            a = Qr(t),
            i = e ? e.length: 0,
            f = pr("number" == typeof i ? i: 0);
            for (a || (t = g.createCallback(t, r, 3)), Ke(e,
            function(e, r, o) {
                var i = f[++n] = c();
                a ? i.criteria = Je(t,
                function(t) {
                    return e[t]
                }) : (i.criteria = u())[0] = t(e, r, o),
                i.index = n,
                i.value = e
            }), i = f.length, f.sort(o); i--;) {
                var v = f[i];
                f[i] = v.value,
                a || l(v.criteria),
                s(v)
            }
            return f
        }
        function st(e) {
            return e && "number" == typeof e.length ? f(e) : qe(e)
        }
        function ft(e) {
            for (var t = -1,
            r = e ? e.length: 0, n = []; ++t < r;) {
                var o = e[t];
                o && n.push(o)
            }
            return n
        }
        function vt(e) {
            return Z(e, ee(arguments, !0, !0, 1))
        }
        function pt(e, t, r) {
            var n = -1,
            o = e ? e.length: 0;
            for (t = g.createCallback(t, r, 3); ++n < o;) if (t(e[n], n, e)) return n;
            return - 1
        }
        function gt(e, t, r) {
            var n = e ? e.length: 0;
            for (t = g.createCallback(t, r, 3); n--;) if (t(e[n], n, e)) return n;
            return - 1
        }
        function ht(e, t, r) {
            var n = 0,
            o = e ? e.length: 0;
            if ("number" != typeof t && null != t) {
                var a = -1;
                for (t = g.createCallback(t, r, 3); ++a < o && t(e[a], a, e);) n++
            } else if (n = t, null == n || r) return e ? e[0] : p;
            return f(e, 0, Xr(Vr(0, n), o))
        }
        function mt(e, t, r, n) {
            return "boolean" != typeof t && null != t && (n = r, r = "function" != typeof t && n && n[t] === e ? null: t, t = !1),
            null != r && (e = Je(e, r, n)),
            ee(e, t)
        }
        function dt(t, r, n) {
            if ("number" == typeof n) {
                var o = t ? t.length: 0;
                n = 0 > n ? Vr(0, o + n) : n || 0
            } else if (n) {
                var a = Mt(t, r);
                return t[a] === r ? a: -1
            }
            return e(t, r, n)
        }
        function _t(e, t, r) {
            var n = 0,
            o = e ? e.length: 0;
            if ("number" != typeof t && null != t) {
                var a = o;
                for (t = g.createCallback(t, r, 3); a--&&t(e[a], a, e);) n++
            } else n = null == t || r ? 1 : t || n;
            return f(e, 0, Xr(Vr(0, o - n), o))
        }
        function bt() {
            for (var r = [], n = -1, o = arguments.length, i = u(), c = ce(), f = c === e, v = u(); ++n < o;) {
                var p = arguments[n]; (Qr(p) || ve(p)) && (r.push(p), i.push(f && p.length >= _ && a(n ? r[n] : v)))
            }
            var g = r[0],
            h = -1,
            m = g ? g.length: 0,
            d = [];
            e: for (; ++h < m;) {
                var b = i[0];
                if (p = g[h], (b ? t(b, p) : c(v, p)) < 0) {
                    for (n = o, (b || v).push(p); --n;) if (b = i[n], (b ? t(b, p) : c(r[n], p)) < 0) continue e;
                    d.push(p)
                }
            }
            for (; o--;) b = i[o],
            b && s(b);
            return l(i),
            l(v),
            d
        }
        function yt(e, t, r) {
            var n = 0,
            o = e ? e.length: 0;
            if ("number" != typeof t && null != t) {
                var a = o;
                for (t = g.createCallback(t, r, 3); a--&&t(e[a], a, e);) n++
            } else if (n = t, null == n || r) return e ? e[o - 1] : p;
            return f(e, Vr(0, o - n))
        }
        function Tt(e, t, r) {
            var n = e ? e.length: 0;
            for ("number" == typeof r && (n = (0 > r ? Vr(0, n + r) : Xr(r, n - 1)) + 1); n--;) if (e[n] === t) return n;
            return - 1
        }
        function wt(e) {
            for (var t = arguments,
            r = 0,
            n = t.length,
            o = e ? e.length: 0; ++r < n;) for (var a = -1,
            i = t[r]; ++a < o;) e[a] === i && (Ur.call(e, a--, 1), o--);
            return e
        }
        function Et(e, t, r) {
            e = +e || 0,
            r = "number" == typeof r ? r: +r || 1,
            null == t && (t = e, e = 0);
            for (var n = -1,
            o = Vr(0, Pr((t - e) / (r || 1))), a = pr(o); ++n < o;) a[n] = e,
            e += r;
            return a
        }
        function xt(e, t, r) {
            var n = -1,
            o = e ? e.length: 0,
            a = [];
            for (t = g.createCallback(t, r, 3); ++n < o;) {
                var i = e[n];
                t(i, n, e) && (a.push(i), Ur.call(e, n--, 1), o--)
            }
            return a
        }
        function At(e, t, r) {
            if ("number" != typeof t && null != t) {
                var n = 0,
                o = -1,
                a = e ? e.length: 0;
                for (t = g.createCallback(t, r, 3); ++o < a && t(e[o], o, e);) n++
            } else n = null == t || r ? 1 : Vr(0, t);
            return f(e, n)
        }
        function Mt(e, t, r, n) {
            var o = 0,
            a = e ? e.length: o;
            for (r = r ? g.createCallback(r, n, 1) : Qt, t = r(t); a > o;) {
                var i = o + a >>> 1;
                r(e[i]) < t ? o = i + 1 : a = i
            }
            return o
        }
        function Rt() {
            return oe(ee(arguments, !0, !0))
        }
        function Pt(e, t, r, n) {
            return "boolean" != typeof t && null != t && (n = r, r = "function" != typeof t && n && n[t] === e ? null: t, t = !1),
            null != r && (r = g.createCallback(r, n, 3)),
            oe(e, t, r)
        }
        function Lt(e) {
            return Z(e, f(arguments, 1))
        }
        function Dt() {
            for (var e = -1,
            t = arguments.length; ++e < t;) {
                var r = arguments[e];
                if (Qr(r) || ve(r)) var n = n ? oe(Z(n, r).concat(Z(r, n))) : r
            }
            return n || []
        }
        function St() {
            for (var e = arguments.length > 1 ? arguments: arguments[0], t = -1, r = e ? et(pn(e, "length")) : 0, n = pr(0 > r ? 0 : r); ++t < r;) n[t] = pn(e, t);
            return n
        }
        function Ft(e, t) {
            var r = -1,
            n = e ? e.length: 0,
            o = {};
            for (t || !n || Qr(e[0]) || (t = []); ++r < n;) {
                var a = e[r];
                t ? o[a] = t[r] : a && (o[a[0]] = a[1])
            }
            return o
        }
        function kt(e, t) {
            if (!Le(t)) throw new wr;
            return function() {
                return--e < 1 ? t.apply(this, arguments) : void 0
            }
        }
        function Gt(e, t) {
            return arguments.length > 2 ? ie(e, 17, f(arguments, 2), null, t) : ie(e, 1, null, null, t)
        }
        function It(e) {
            for (var t = arguments.length > 1 ? ee(arguments, !0, !1, 1) : ye(e), r = -1, n = t.length; ++r < n;) {
                var o = t[r];
                e[o] = ie(e[o], 1, null, null, e)
            }
            return e
        }
        function Ut(e, t) {
            return arguments.length > 2 ? ie(t, 19, f(arguments, 2), null, e) : ie(t, 3, null, null, e)
        }
        function Nt() {
            for (var e = arguments,
            t = e.length; t--;) if (!Le(e[t])) throw new wr;
            return function() {
                for (var t = arguments,
                r = e.length; r--;) t = [e[r].apply(this, t)];
                return t[0]
            }
        }
        function Bt(e, t) {
            return t = "number" == typeof t ? t: +t || e.length,
            ie(e, 4, null, null, null, t)
        }
        function Wt(e, t, r) {
            var n, o, a, i, u, c, l, s = 0,
            f = !1,
            v = !0;
            if (!Le(e)) throw new wr;
            if (t = Vr(0, t) || 0, r === !0) {
                var g = !0;
                v = !1
            } else De(r) && (g = r.leading, f = "maxWait" in r && (Vr(t, r.maxWait) || 0), v = "trailing" in r ? r.trailing: v);
            var h = function() {
                var r = t - (hn() - i);
                if (0 >= r) {
                    o && Lr(o);
                    var f = l;
                    o = c = l = p,
                    f && (s = hn(), a = e.apply(u, n), c || o || (n = u = null))
                } else c = Ir(h, r)
            },
            m = function() {
                c && Lr(c),
                o = c = l = p,
                (v || f !== t) && (s = hn(), a = e.apply(u, n), c || o || (n = u = null))
            };
            return function() {
                if (n = arguments, i = hn(), u = this, l = v && (c || !g), f === !1) var r = g && !c;
                else {
                    o || g || (s = i);
                    var p = f - (i - s),
                    d = 0 >= p;
                    d ? (o && (o = Lr(o)), s = i, a = e.apply(u, n)) : o || (o = Ir(m, p))
                }
                return d && c ? c = Lr(c) : c || t === f || (c = Ir(h, t)),
                r && (d = !0, a = e.apply(u, n)),
                !d || c || o || (n = u = null),
                a
            }
        }
        function Ot(e) {
            if (!Le(e)) throw new wr;
            var t = f(arguments, 1);
            return Ir(function() {
                e.apply(p, t)
            },
            1)
        }
        function Ct(e, t) {
            if (!Le(e)) throw new wr;
            var r = f(arguments, 2);
            return Ir(function() {
                e.apply(p, r)
            },
            t)
        }
        function jt(e, t) {
            if (!Le(e)) throw new wr;
            var r = function() {
                var n = r.cache,
                o = t ? t.apply(this, arguments) : d + arguments[0];
                return kr.call(n, o) ? n[o] : n[o] = e.apply(this, arguments)
            };
            return r.cache = {},
            r
        }
        function qt(e) {
            var t, r;
            if (!Le(e)) throw new wr;
            return function() {
                return t ? r: (t = !0, r = e.apply(this, arguments), e = null, r)
            }
        }
        function Vt(e) {
            return ie(e, 16, f(arguments, 1))
        }
        function Xt(e) {
            return ie(e, 32, null, f(arguments, 1))
        }
        function zt(e, t, r) {
            var n = !0,
            o = !0;
            if (!Le(e)) throw new wr;
            return r === !1 ? n = !1 : De(r) && (n = "leading" in r ? r.leading: n, o = "trailing" in r ? r.trailing: o),
            V.leading = n,
            V.maxWait = t,
            V.trailing = o,
            Wt(e, t, V)
        }
        function Ht(e, t) {
            return ie(t, 16, [e])
        }
        function $t(e) {
            return function() {
                return e
            }
        }
        function Yt(e, t, r) {
            var n = typeof e;
            if (null == e || "function" == n) return K(e, t, r);
            if ("object" != n) return tr(e);
            var o = Jr(e),
            a = o[0],
            i = e[a];
            return 1 != o.length || i !== i || De(i) ?
            function(t) {
                for (var r = o.length,
                n = !1; r--&&(n = te(t[o[r]], e[o[r]], null, !0)););
                return n
            }: function(e) {
                var t = e[a];
                return i === t && (0 !== i || 1 / i == 1 / t)
            }
        }
        function Kt(e) {
            return null == e ? "": Tr(e).replace(nn, ue)
        }
        function Qt(e) {
            return e
        }
        function Zt(e, t, r) {
            var n = !0,
            o = t && ye(t);
            t && (r || o.length) || (null == r && (r = t), a = h, t = e, e = g, o = ye(t)),
            r === !1 ? n = !1 : De(r) && "chain" in r && (n = r.chain);
            var a = e,
            i = Le(a);
            Ke(o,
            function(r) {
                var o = e[r] = t[r];
                i && (a.prototype[r] = function() {
                    var t = this.__chain__,
                    r = this.__wrapped__,
                    i = [r];
                    Gr.apply(i, arguments);
                    var u = o.apply(e, i);
                    if (n || t) {
                        if (r === u && De(u)) return this;
                        u = new a(u),
                        u.__chain__ = t
                    }
                    return u
                })
            })
        }
        function Jt() {
            return r._ = Ar,
            this
        }
        function er() {}
        function tr(e) {
            return function(t) {
                return t[e]
            }
        }
        function rr(e, t, r) {
            var n = null == e,
            o = null == t;
            if (null == r && ("boolean" == typeof e && o ? (r = e, e = 1) : o || "boolean" != typeof t || (r = t, o = !0)), n && o && (t = 1), e = +e || 0, o ? (t = e, e = 0) : t = +t || 0, r || e % 1 || t % 1) {
                var a = Hr();
                return Xr(e + a * (t - e + parseFloat("1e-" + ((a + "").length - 1))), t)
            }
            return ne(e, t)
        }
        function nr(e, t) {
            if (e) {
                var r = e[t];
                return Le(r) ? e[t]() : r
            }
        }
        function or(e, t, r) {
            var n = g.templateSettings;
            e = Tr(e || ""),
            r = an({},
            r, n);
            var o, a = an({},
            r.imports, n.imports),
            u = Jr(a),
            c = qe(a),
            l = 0,
            s = r.interpolate || L,
            f = "__p += '",
            v = yr((r.escape || L).source + "|" + s.source + "|" + (s === R ? x: L).source + "|" + (r.evaluate || L).source + "|$", "g");
            e.replace(v,
            function(t, r, n, a, u, c) {
                return n || (n = a),
                f += e.slice(l, c).replace(S, i),
                r && (f += "' +\n__e(" + r + ") +\n'"),
                u && (o = !0, f += "';\n" + u + ";\n__p += '"),
                n && (f += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"),
                l = c + t.length,
                t
            }),
            f += "';\n";
            var h = r.variable,
            m = h;
            m || (h = "obj", f = "with (" + h + ") {\n" + f + "\n}\n"),
            f = (o ? f.replace(T, "") : f).replace(w, "$1").replace(E, "$1;"),
            f = "function(" + h + ") {\n" + (m ? "": h + " || (" + h + " = {});\n") + "var __t, __p = '', __e = _.escape" + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n": ";\n") + f + "return __p\n}";
            var d = "\n/*\n//# sourceURL=" + (r.sourceURL || "/lodash/template/source[" + k+++"]") + "\n*/";
            try {
                var _ = mr(u, "return " + f + d).apply(p, c)
            } catch(b) {
                throw b.source = f,
                b
            }
            return t ? _(t) : (_.source = f, _)
        }
        function ar(e, t, r) {
            e = (e = +e) > -1 ? e: 0;
            var n = -1,
            o = pr(e);
            for (t = K(t, r, 1); ++n < e;) o[n] = t(n);
            return o
        }
        function ir(e) {
            return null == e ? "": Tr(e).replace(rn, fe)
        }
        function ur(e) {
            var t = ++m;
            return Tr(null == e ? "": e) + t
        }
        function cr(e) {
            return e = new h(e),
            e.__chain__ = !0,
            e
        }
        function lr(e, t) {
            return t(e),
            e
        }
        function sr() {
            return this.__chain__ = !0,
            this
        }
        function fr() {
            return Tr(this.__wrapped__)
        }
        function vr() {
            return this.__wrapped__
        }
        r = r ? J.defaults($.Object(), r, J.pick($, F)) : $;
        var pr = r.Array,
        gr = r.Boolean,
        hr = r.Date,
        mr = r.Function,
        dr = r.Math,
        _r = r.Number,
        br = r.Object,
        yr = r.RegExp,
        Tr = r.String,
        wr = r.TypeError,
        Er = [],
        xr = br.prototype,
        Ar = r._,
        Mr = xr.toString,
        Rr = yr("^" + Tr(Mr).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
        Pr = dr.ceil,
        Lr = r.clearTimeout,
        Dr = dr.floor,
        Sr = mr.prototype.toString,
        Fr = le(Fr = br.getPrototypeOf) && Fr,
        kr = xr.hasOwnProperty,
        Gr = Er.push,
        Ir = r.setTimeout,
        Ur = Er.splice,
        Nr = Er.unshift,
        Br = function() {
            try {
                var e = {},
                t = le(t = br.defineProperty) && t,
                r = t(e, e, e) && t
            } catch(n) {}
            return r
        } (),
        Wr = le(Wr = br.create) && Wr,
        Or = le(Or = pr.isArray) && Or,
        Cr = r.isFinite,
        jr = r.isNaN,
        qr = le(qr = br.keys) && qr,
        Vr = dr.max,
        Xr = dr.min,
        zr = r.parseInt,
        Hr = dr.random,
        $r = {};
        $r[I] = pr,
        $r[U] = gr,
        $r[N] = hr,
        $r[B] = mr,
        $r[O] = br,
        $r[W] = _r,
        $r[C] = yr,
        $r[j] = Tr,
        h.prototype = g.prototype;
        var Yr = g.support = {};
        Yr.funcDecomp = !le(r.WinRTError) && D.test(v),
        Yr.funcNames = "string" == typeof mr.name,
        g.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: R,
            variable: "",
            imports: {
                _: g
            }
        },
        Wr || (Y = function() {
            function e() {}
            return function(t) {
                if (De(t)) {
                    e.prototype = t;
                    var n = new e;
                    e.prototype = null
                }
                return n || r.Object()
            }
        } ());
        var Kr = Br ?
        function(e, t) {
            X.value = t,
            Br(e, "__bindData__", X)
        }: er,
        Qr = Or ||
        function(e) {
            return e && "object" == typeof e && "number" == typeof e.length && Mr.call(e) == I || !1
        },
        Zr = function(e) {
            var t, r = e,
            n = [];
            if (!r) return n;
            if (!z[typeof e]) return n;
            for (t in r) kr.call(r, t) && n.push(t);
            return n
        },
        Jr = qr ?
        function(e) {
            return De(e) ? qr(e) : []
        }: Zr,
        en = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        tn = we(en),
        rn = yr("(" + Jr(tn).join("|") + ")", "g"),
        nn = yr("[" + Jr(en).join("") + "]", "g"),
        on = function(e, t, r) {
            var n, o = e,
            a = o;
            if (!o) return a;
            var i = arguments,
            u = 0,
            c = "number" == typeof r ? 2 : i.length;
            if (c > 3 && "function" == typeof i[c - 2]) var l = K(i[--c - 1], i[c--], 2);
            else c > 2 && "function" == typeof i[c - 1] && (l = i[--c]);
            for (; ++u < c;) if (o = i[u], o && z[typeof o]) for (var s = -1,
            f = z[typeof o] && Jr(o), v = f ? f.length: 0; ++s < v;) n = f[s],
            a[n] = l ? l(a[n], o[n]) : o[n];
            return a
        },
        an = function(e, t, r) {
            var n, o = e,
            a = o;
            if (!o) return a;
            for (var i = arguments,
            u = 0,
            c = "number" == typeof r ? 2 : i.length; ++u < c;) if (o = i[u], o && z[typeof o]) for (var l = -1,
            s = z[typeof o] && Jr(o), f = s ? s.length: 0; ++l < f;) n = s[l],
            "undefined" == typeof a[n] && (a[n] = o[n]);
            return a
        },
        un = function(e, t, r) {
            var n, o = e,
            a = o;
            if (!o) return a;
            if (!z[typeof o]) return a;
            t = t && "undefined" == typeof r ? t: K(t, r, 3);
            for (n in o) if (t(o[n], n, e) === !1) return a;
            return a
        },
        cn = function(e, t, r) {
            var n, o = e,
            a = o;
            if (!o) return a;
            if (!z[typeof o]) return a;
            t = t && "undefined" == typeof r ? t: K(t, r, 3);
            for (var i = -1,
            u = z[typeof o] && Jr(o), c = u ? u.length: 0; ++i < c;) if (n = u[i], t(o[n], n, e) === !1) return a;
            return a
        },
        ln = Fr ?
        function(e) {
            if (!e || Mr.call(e) != O) return ! 1;
            var t = e.valueOf,
            r = le(t) && (r = Fr(t)) && Fr(r);
            return r ? e == r || Fr(e) == r: se(e)
        }: se,
        sn = ae(function(e, t, r) {
            kr.call(e, r) ? e[r]++:e[r] = 1
        }),
        fn = ae(function(e, t, r) { (kr.call(e, r) ? e[r] : e[r] = []).push(t)
        }),
        vn = ae(function(e, t, r) {
            e[r] = t
        }),
        pn = Je,
        gn = He,
        hn = le(hn = hr.now) && hn ||
        function() {
            return (new hr).getTime()
        },
        mn = 8 == zr(y + "08") ? zr: function(e, t) {
            return zr(Ie(e) ? e.replace(P, "") : e, t || 0)
        };
        return g.after = kt,
        g.assign = on,
        g.at = Ve,
        g.bind = Gt,
        g.bindAll = It,
        g.bindKey = Ut,
        g.chain = cr,
        g.compact = ft,
        g.compose = Nt,
        g.constant = $t,
        g.countBy = sn,
        g.create = he,
        g.createCallback = Yt,
        g.curry = Bt,
        g.debounce = Wt,
        g.defaults = an,
        g.defer = Ot,
        g.delay = Ct,
        g.difference = vt,
        g.filter = He,
        g.flatten = mt,
        g.forEach = Ke,
        g.forEachRight = Qe,
        g.forIn = un,
        g.forInRight = _e,
        g.forOwn = cn,
        g.forOwnRight = be,
        g.functions = ye,
        g.groupBy = fn,
        g.indexBy = vn,
        g.initial = _t,
        g.intersection = bt,
        g.invert = we,
        g.invoke = Ze,
        g.keys = Jr,
        g.map = Je,
        g.mapValues = Ne,
        g.max = et,
        g.memoize = jt,
        g.merge = Be,
        g.min = tt,
        g.omit = We,
        g.once = qt,
        g.pairs = Oe,
        g.partial = Vt,
        g.partialRight = Xt,
        g.pick = Ce,
        g.pluck = pn,
        g.property = tr,
        g.pull = wt,
        g.range = Et,
        g.reject = ot,
        g.remove = xt,
        g.rest = At,
        g.shuffle = it,
        g.sortBy = lt,
        g.tap = lr,
        g.throttle = zt,
        g.times = ar,
        g.toArray = st,
        g.transform = je,
        g.union = Rt,
        g.uniq = Pt,
        g.values = qe,
        g.where = gn,
        g.without = Lt,
        g.wrap = Ht,
        g.xor = Dt,
        g.zip = St,
        g.zipObject = Ft,
        g.collect = Je,
        g.drop = At,
        g.each = Ke,
        g.eachRight = Qe,
        g.extend = on,
        g.methods = ye,
        g.object = Ft,
        g.select = He,
        g.tail = At,
        g.unique = Pt,
        g.unzip = St,
        Zt(g),
        g.clone = pe,
        g.cloneDeep = ge,
        g.contains = Xe,
        g.escape = Kt,
        g.every = ze,
        g.find = $e,
        g.findIndex = pt,
        g.findKey = me,
        g.findLast = Ye,
        g.findLastIndex = gt,
        g.findLastKey = de,
        g.has = Te,
        g.identity = Qt,
        g.indexOf = dt,
        g.isArguments = ve,
        g.isArray = Qr,
        g.isBoolean = Ee,
        g.isDate = xe,
        g.isElement = Ae,
        g.isEmpty = Me,
        g.isEqual = Re,
        g.isFinite = Pe,
        g.isFunction = Le,
        g.isNaN = Se,
        g.isNull = Fe,
        g.isNumber = ke,
        g.isObject = De,
        g.isPlainObject = ln,
        g.isRegExp = Ge,
        g.isString = Ie,
        g.isUndefined = Ue,
        g.lastIndexOf = Tt,
        g.mixin = Zt,
        g.noConflict = Jt,
        g.noop = er,
        g.now = hn,
        g.parseInt = mn,
        g.random = rr,
        g.reduce = rt,
        g.reduceRight = nt,
        g.result = nr,
        g.runInContext = v,
        g.size = ut,
        g.some = ct,
        g.sortedIndex = Mt,
        g.template = or,
        g.unescape = ir,
        g.uniqueId = ur,
        g.all = ze,
        g.any = ct,
        g.detect = $e,
        g.findWhere = $e,
        g.foldl = rt,
        g.foldr = nt,
        g.include = Xe,
        g.inject = rt,
        Zt(function() {
            var e = {};
            return cn(g,
            function(t, r) {
                g.prototype[r] || (e[r] = t)
            }),
            e
        } (), !1),
        g.first = ht,
        g.last = yt,
        g.sample = at,
        g.take = ht,
        g.head = ht,
        cn(g,
        function(e, t) {
            var r = "sample" !== t;
            g.prototype[t] || (g.prototype[t] = function(t, n) {
                var o = this.__chain__,
                a = e(this.__wrapped__, t, n);
                return o || null != t && (!n || r && "function" == typeof t) ? new h(a, o) : a
            })
        }),
        g.VERSION = "2.4.1",
        g.prototype.chain = sr,
        g.prototype.toString = fr,
        g.prototype.value = vr,
        g.prototype.valueOf = vr,
        Ke(["join", "pop", "shift"],
        function(e) {
            var t = Er[e];
            g.prototype[e] = function() {
                var e = this.__chain__,
                r = t.apply(this.__wrapped__, arguments);
                return e ? new h(r, e) : r
            }
        }),
        Ke(["push", "reverse", "sort", "unshift"],
        function(e) {
            var t = Er[e];
            g.prototype[e] = function() {
                return t.apply(this.__wrapped__, arguments),
                this
            }
        }),
        Ke(["concat", "slice", "splice"],
        function(e) {
            var t = Er[e];
            g.prototype[e] = function() {
                return new h(t.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),
        g
    }
    var p, g = [],
    h = [],
    m = 0,
    d = +new Date + "",
    _ = 75,
    b = 40,
    y = " 	\f \ufeff\n\r\u2028\u2029 ᠎             　",
    T = /\b__p \+= '';/g,
    w = /\b(__p \+=) '' \+/g,
    E = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
    x = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
    A = /\w*$/,
    M = /^\s*function[ \n\r\t]+\w/,
    R = /<%=([\s\S]+?)%>/g,
    P = RegExp("^[" + y + "]*0+(?=.$)"),
    L = /($^)/,
    D = /\bthis\b/,
    S = /['\n\r\t\u2028\u2029\\]/g,
    F = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"],
    k = 0,
    G = "[object Arguments]",
    I = "[object Array]",
    U = "[object Boolean]",
    N = "[object Date]",
    B = "[object Function]",
    W = "[object Number]",
    O = "[object Object]",
    C = "[object RegExp]",
    j = "[object String]",
    q = {};
    q[B] = !1,
    q[G] = q[I] = q[U] = q[N] = q[W] = q[O] = q[C] = q[j] = !0;
    var V = {
        leading: !1,
        maxWait: 0,
        trailing: !1
    },
    X = {
        configurable: !1,
        enumerable: !1,
        value: null,
        writable: !1
    },
    z = {
        "boolean": !1,
        "function": !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    },
    H = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    },
    $ = z[typeof window] && window || this,
    Y = z[typeof exports] && exports && !exports.nodeType && exports,
    K = z[typeof module] && module && !module.nodeType && module,
    Q = K && K.exports === Y && Y,
    Z = z[typeof global] && global; ! Z || Z.global !== Z && Z.window !== Z || ($ = Z);
    var J = v();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? ($._ = J, define(function() {
        return J
    })) : Y && K ? Q ? (K.exports = J)._ = J: Y._ = J: $._ = J
}).call(this),
function(e) {
    function t(e, t) {
        for (var r = e.length; r--;) if (e[r] === t) return r;
        return - 1
    }
    function r(e, t) {
        if (e.length != t.length) return ! 1;
        for (var r = 0; r < e.length; r++) if (e[r] !== t[r]) return ! 1;
        return ! 0
    }
    function n(e) {
        for (b in T) T[b] = e[R[b]]
    }
    function o(e) {
        var r, o, a, i, c, l;
        if (r = e.keyCode, -1 == t(M, r) && M.push(r), (93 == r || 224 == r) && (r = 91), r in T) {
            T[r] = !0;
            for (a in E) E[a] == r && (u[a] = !0)
        } else if (n(e), u.filter.call(this, e) && r in y) for (l = p(), i = 0; i < y[r].length; i++) if (o = y[r][i], o.scope == l || "all" == o.scope) {
            c = o.mods.length > 0;
            for (a in T)(!T[a] && t(o.mods, +a) > -1 || T[a] && -1 == t(o.mods, +a)) && (c = !1); (0 != o.mods.length || T[16] || T[18] || T[17] || T[91]) && !c || o.method(e, o) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0))
        }
    }
    function a(e) {
        var r, n = e.keyCode,
        o = t(M, n);
        if (o >= 0 && M.splice(o, 1), (93 == n || 224 == n) && (n = 91), n in T) {
            T[n] = !1;
            for (r in E) E[r] == n && (u[r] = !1)
        }
    }
    function i() {
        for (b in T) T[b] = !1;
        for (b in E) u[b] = !1
    }
    function u(e, t, r) {
        var n, o;
        n = h(e),
        void 0 === r && (r = t, t = "all");
        for (var a = 0; a < n.length; a++) o = [],
        e = n[a].split("+"),
        e.length > 1 && (o = m(e), e = [e[e.length - 1]]),
        e = e[0],
        e = A(e),
        e in y || (y[e] = []),
        y[e].push({
            shortcut: n[a],
            scope: t,
            method: r,
            key: n[a],
            mods: o
        })
    }
    function c(e, t) {
        var n, o, a, i, u, c = [];
        for (n = h(e), i = 0; i < n.length; i++) {
            if (o = n[i].split("+"), o.length > 1 && (c = m(o), e = o[o.length - 1]), e = A(e), void 0 === t && (t = p()), !y[e]) return;
            for (a in y[e]) u = y[e][a],
            u.scope === t && r(u.mods, c) && (y[e][a] = {})
        }
    }
    function l(e) {
        return "string" == typeof e && (e = A(e)),
        -1 != t(M, e)
    }
    function s() {
        return M.slice(0)
    }
    function f(e) {
        var t = (e.target || e.srcElement).tagName;
        return ! ("INPUT" == t || "SELECT" == t || "TEXTAREA" == t)
    }
    function v(e) {
        w = e || "all"
    }
    function p() {
        return w || "all"
    }
    function g(e) {
        var t, r, n;
        for (t in y) for (r = y[t], n = 0; n < r.length;) r[n].scope === e ? r.splice(n, 1) : n++
    }
    function h(e) {
        var t;
        return e = e.replace(/\s/g, ""),
        t = e.split(","),
        "" == t[t.length - 1] && (t[t.length - 2] += ","),
        t
    }
    function m(e) {
        for (var t = e.slice(0, e.length - 1), r = 0; r < t.length; r++) t[r] = E[t[r]];
        return t
    }
    function d(e, t, r) {
        e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t,
        function() {
            r(window.event)
        })
    }
    function _() {
        var t = e.key;
        return e.key = P,
        t
    }
    var b, y = {},
    T = {
        16 : !1,
        18 : !1,
        17 : !1,
        91 : !1
    },
    w = "all",
    E = {
        "⇧": 16,
        shift: 16,
        "⌥": 18,
        alt: 18,
        option: 18,
        "⌃": 17,
        ctrl: 17,
        control: 17,
        "⌘": 91,
        command: 91
    },
    x = {
        backspace: 8,
        tab: 9,
        clear: 12,
        enter: 13,
        "return": 13,
        esc: 27,
        escape: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        del: 46,
        "delete": 46,
        home: 36,
        end: 35,
        pageup: 33,
        pagedown: 34,
        ",": 188,
        ".": 190,
        "/": 191,
        "`": 192,
        "-": 189,
        "=": 187,
        ";": 186,
        "'": 222,
        "[": 219,
        "]": 221,
        "\\": 220
    },
    A = function(e) {
        return x[e] || e.toUpperCase().charCodeAt(0)
    },
    M = [];
    for (b = 1; 20 > b; b++) x["f" + b] = 111 + b;
    var R = {
        16 : "shiftKey",
        18 : "altKey",
        17 : "ctrlKey",
        91 : "metaKey"
    };
    for (b in E) u[b] = !1;
    d(document, "keydown",
    function(e) {
        o(e)
    }),
    d(document, "keyup", a),
    d(window, "focus", i);
    var P = e.key;
    e.key = u,
    e.key.setScope = v,
    e.key.getScope = p,
    e.key.deleteScope = g,
    e.key.filter = f,
    e.key.isPressed = l,
    e.key.getPressedKeyCodes = s,
    e.key.noConflict = _,
    e.key.unbind = c,
    "undefined" != typeof module && (module.exports = key)
} (this),
function(e) {
    "use strict";
    var t = {};
    "undefined" == typeof exports ? "function" == typeof define && "object" == typeof define.amd && define.amd ? (t.exports = {},
    define(function() {
        return t.exports
    })) : t.exports = "undefined" != typeof window ? window: e: t.exports = exports,
    function(e) {
        if (!t) var t = 1e-6;
        if (!r) var r = "undefined" != typeof Float32Array ? Float32Array: Array;
        if (!n) var n = Math.random;
        var o = {};
        o.setMatrixArrayType = function(e) {
            r = e
        },
        "undefined" != typeof e && (e.glMatrix = o);
        var a = Math.PI / 180;
        o.toRadian = function(e) {
            return e * a
        };
        var i = {};
        i.create = function() {
            var e = new r(2);
            return e[0] = 0,
            e[1] = 0,
            e
        },
        i.clone = function(e) {
            var t = new r(2);
            return t[0] = e[0],
            t[1] = e[1],
            t
        },
        i.fromValues = function(e, t) {
            var n = new r(2);
            return n[0] = e,
            n[1] = t,
            n
        },
        i.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e
        },
        i.set = function(e, t, r) {
            return e[0] = t,
            e[1] = r,
            e
        },
        i.add = function(e, t, r) {
            return e[0] = t[0] + r[0],
            e[1] = t[1] + r[1],
            e
        },
        i.subtract = function(e, t, r) {
            return e[0] = t[0] - r[0],
            e[1] = t[1] - r[1],
            e
        },
        i.sub = i.subtract,
        i.multiply = function(e, t, r) {
            return e[0] = t[0] * r[0],
            e[1] = t[1] * r[1],
            e
        },
        i.mul = i.multiply,
        i.divide = function(e, t, r) {
            return e[0] = t[0] / r[0],
            e[1] = t[1] / r[1],
            e
        },
        i.div = i.divide,
        i.min = function(e, t, r) {
            return e[0] = Math.min(t[0], r[0]),
            e[1] = Math.min(t[1], r[1]),
            e
        },
        i.max = function(e, t, r) {
            return e[0] = Math.max(t[0], r[0]),
            e[1] = Math.max(t[1], r[1]),
            e
        },
        i.scale = function(e, t, r) {
            return e[0] = t[0] * r,
            e[1] = t[1] * r,
            e
        },
        i.scaleAndAdd = function(e, t, r, n) {
            return e[0] = t[0] + r[0] * n,
            e[1] = t[1] + r[1] * n,
            e
        },
        i.distance = function(e, t) {
            var r = t[0] - e[0],
            n = t[1] - e[1];
            return Math.sqrt(r * r + n * n)
        },
        i.dist = i.distance,
        i.squaredDistance = function(e, t) {
            var r = t[0] - e[0],
            n = t[1] - e[1];
            return r * r + n * n
        },
        i.sqrDist = i.squaredDistance,
        i.length = function(e) {
            var t = e[0],
            r = e[1];
            return Math.sqrt(t * t + r * r)
        },
        i.len = i.length,
        i.squaredLength = function(e) {
            var t = e[0],
            r = e[1];
            return t * t + r * r
        },
        i.sqrLen = i.squaredLength,
        i.negate = function(e, t) {
            return e[0] = -t[0],
            e[1] = -t[1],
            e
        },
        i.inverse = function(e, t) {
            return e[0] = 1 / t[0],
            e[1] = 1 / t[1],
            e
        },
        i.normalize = function(e, t) {
            var r = t[0],
            n = t[1],
            o = r * r + n * n;
            return o > 0 && (o = 1 / Math.sqrt(o), e[0] = t[0] * o, e[1] = t[1] * o),
            e
        },
        i.dot = function(e, t) {
            return e[0] * t[0] + e[1] * t[1]
        },
        i.cross = function(e, t, r) {
            var n = t[0] * r[1] - t[1] * r[0];
            return e[0] = e[1] = 0,
            e[2] = n,
            e
        },
        i.lerp = function(e, t, r, n) {
            var o = t[0],
            a = t[1];
            return e[0] = o + n * (r[0] - o),
            e[1] = a + n * (r[1] - a),
            e
        },
        i.random = function(e, t) {
            t = t || 1;
            var r = 2 * n() * Math.PI;
            return e[0] = Math.cos(r) * t,
            e[1] = Math.sin(r) * t,
            e
        },
        i.transformMat2 = function(e, t, r) {
            var n = t[0],
            o = t[1];
            return e[0] = r[0] * n + r[2] * o,
            e[1] = r[1] * n + r[3] * o,
            e
        },
        i.transformMat2d = function(e, t, r) {
            var n = t[0],
            o = t[1];
            return e[0] = r[0] * n + r[2] * o + r[4],
            e[1] = r[1] * n + r[3] * o + r[5],
            e
        },
        i.transformMat3 = function(e, t, r) {
            var n = t[0],
            o = t[1];
            return e[0] = r[0] * n + r[3] * o + r[6],
            e[1] = r[1] * n + r[4] * o + r[7],
            e
        },
        i.transformMat4 = function(e, t, r) {
            var n = t[0],
            o = t[1];
            return e[0] = r[0] * n + r[4] * o + r[12],
            e[1] = r[1] * n + r[5] * o + r[13],
            e
        },
        i.forEach = function() {
            var e = i.create();
            return function(t, r, n, o, a, i) {
                var u, c;
                for (r || (r = 2), n || (n = 0), c = o ? Math.min(o * r + n, t.length) : t.length, u = n; c > u; u += r) e[0] = t[u],
                e[1] = t[u + 1],
                a(e, e, i),
                t[u] = e[0],
                t[u + 1] = e[1];
                return t
            }
        } (),
        i.str = function(e) {
            return "vec2(" + e[0] + ", " + e[1] + ")"
        },
        "undefined" != typeof e && (e.vec2 = i);
        var u = {};
        u.create = function() {
            var e = new r(3);
            return e[0] = 0,
            e[1] = 0,
            e[2] = 0,
            e
        },
        u.clone = function(e) {
            var t = new r(3);
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t
        },
        u.fromValues = function(e, t, n) {
            var o = new r(3);
            return o[0] = e,
            o[1] = t,
            o[2] = n,
            o
        },
        u.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e
        },
        u.set = function(e, t, r, n) {
            return e[0] = t,
            e[1] = r,
            e[2] = n,
            e
        },
        u.add = function(e, t, r) {
            return e[0] = t[0] + r[0],
            e[1] = t[1] + r[1],
            e[2] = t[2] + r[2],
            e
        },
        u.subtract = function(e, t, r) {
            return e[0] = t[0] - r[0],
            e[1] = t[1] - r[1],
            e[2] = t[2] - r[2],
            e
        },
        u.sub = u.subtract,
        u.multiply = function(e, t, r) {
            return e[0] = t[0] * r[0],
            e[1] = t[1] * r[1],
            e[2] = t[2] * r[2],
            e
        },
        u.mul = u.multiply,
        u.divide = function(e, t, r) {
            return e[0] = t[0] / r[0],
            e[1] = t[1] / r[1],
            e[2] = t[2] / r[2],
            e
        },
        u.div = u.divide,
        u.min = function(e, t, r) {
            return e[0] = Math.min(t[0], r[0]),
            e[1] = Math.min(t[1], r[1]),
            e[2] = Math.min(t[2], r[2]),
            e
        },
        u.max = function(e, t, r) {
            return e[0] = Math.max(t[0], r[0]),
            e[1] = Math.max(t[1], r[1]),
            e[2] = Math.max(t[2], r[2]),
            e
        },
        u.scale = function(e, t, r) {
            return e[0] = t[0] * r,
            e[1] = t[1] * r,
            e[2] = t[2] * r,
            e
        },
        u.scaleAndAdd = function(e, t, r, n) {
            return e[0] = t[0] + r[0] * n,
            e[1] = t[1] + r[1] * n,
            e[2] = t[2] + r[2] * n,
            e
        },
        u.distance = function(e, t) {
            var r = t[0] - e[0],
            n = t[1] - e[1],
            o = t[2] - e[2];
            return Math.sqrt(r * r + n * n + o * o)
        },
        u.dist = u.distance,
        u.squaredDistance = function(e, t) {
            var r = t[0] - e[0],
            n = t[1] - e[1],
            o = t[2] - e[2];
            return r * r + n * n + o * o
        },
        u.sqrDist = u.squaredDistance,
        u.length = function(e) {
            var t = e[0],
            r = e[1],
            n = e[2];
            return Math.sqrt(t * t + r * r + n * n)
        },
        u.len = u.length,
        u.squaredLength = function(e) {
            var t = e[0],
            r = e[1],
            n = e[2];
            return t * t + r * r + n * n
        },
        u.sqrLen = u.squaredLength,
        u.negate = function(e, t) {
            return e[0] = -t[0],
            e[1] = -t[1],
            e[2] = -t[2],
            e
        },
        u.inverse = function(e, t) {
            return e[0] = 1 / t[0],
            e[1] = 1 / t[1],
            e[2] = 1 / t[2],
            e
        },
        u.normalize = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = r * r + n * n + o * o;
            return a > 0 && (a = 1 / Math.sqrt(a), e[0] = t[0] * a, e[1] = t[1] * a, e[2] = t[2] * a),
            e
        },
        u.dot = function(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        },
        u.cross = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = r[0],
            u = r[1],
            c = r[2];
            return e[0] = o * c - a * u,
            e[1] = a * i - n * c,
            e[2] = n * u - o * i,
            e
        },
        u.lerp = function(e, t, r, n) {
            var o = t[0],
            a = t[1],
            i = t[2];
            return e[0] = o + n * (r[0] - o),
            e[1] = a + n * (r[1] - a),
            e[2] = i + n * (r[2] - i),
            e
        },
        u.random = function(e, t) {
            t = t || 1;
            var r = 2 * n() * Math.PI,
            o = 2 * n() - 1,
            a = Math.sqrt(1 - o * o) * t;
            return e[0] = Math.cos(r) * a,
            e[1] = Math.sin(r) * a,
            e[2] = o * t,
            e
        },
        u.transformMat4 = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = r[3] * n + r[7] * o + r[11] * a + r[15];
            return i = i || 1,
            e[0] = (r[0] * n + r[4] * o + r[8] * a + r[12]) / i,
            e[1] = (r[1] * n + r[5] * o + r[9] * a + r[13]) / i,
            e[2] = (r[2] * n + r[6] * o + r[10] * a + r[14]) / i,
            e
        },
        u.transformMat3 = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2];
            return e[0] = n * r[0] + o * r[3] + a * r[6],
            e[1] = n * r[1] + o * r[4] + a * r[7],
            e[2] = n * r[2] + o * r[5] + a * r[8],
            e
        },
        u.transformQuat = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = r[0],
            u = r[1],
            c = r[2],
            l = r[3],
            s = l * n + u * a - c * o,
            f = l * o + c * n - i * a,
            v = l * a + i * o - u * n,
            p = -i * n - u * o - c * a;
            return e[0] = s * l + p * -i + f * -c - v * -u,
            e[1] = f * l + p * -u + v * -i - s * -c,
            e[2] = v * l + p * -c + s * -u - f * -i,
            e
        },
        u.rotateX = function(e, t, r, n) {
            var o = [],
            a = [];
            return o[0] = t[0] - r[0],
            o[1] = t[1] - r[1],
            o[2] = t[2] - r[2],
            a[0] = o[0],
            a[1] = o[1] * Math.cos(n) - o[2] * Math.sin(n),
            a[2] = o[1] * Math.sin(n) + o[2] * Math.cos(n),
            e[0] = a[0] + r[0],
            e[1] = a[1] + r[1],
            e[2] = a[2] + r[2],
            e
        },
        u.rotateY = function(e, t, r, n) {
            var o = [],
            a = [];
            return o[0] = t[0] - r[0],
            o[1] = t[1] - r[1],
            o[2] = t[2] - r[2],
            a[0] = o[2] * Math.sin(n) + o[0] * Math.cos(n),
            a[1] = o[1],
            a[2] = o[2] * Math.cos(n) - o[0] * Math.sin(n),
            e[0] = a[0] + r[0],
            e[1] = a[1] + r[1],
            e[2] = a[2] + r[2],
            e
        },
        u.rotateZ = function(e, t, r, n) {
            var o = [],
            a = [];
            return o[0] = t[0] - r[0],
            o[1] = t[1] - r[1],
            o[2] = t[2] - r[2],
            a[0] = o[0] * Math.cos(n) - o[1] * Math.sin(n),
            a[1] = o[0] * Math.sin(n) + o[1] * Math.cos(n),
            a[2] = o[2],
            e[0] = a[0] + r[0],
            e[1] = a[1] + r[1],
            e[2] = a[2] + r[2],
            e
        },
        u.forEach = function() {
            var e = u.create();
            return function(t, r, n, o, a, i) {
                var u, c;
                for (r || (r = 3), n || (n = 0), c = o ? Math.min(o * r + n, t.length) : t.length, u = n; c > u; u += r) e[0] = t[u],
                e[1] = t[u + 1],
                e[2] = t[u + 2],
                a(e, e, i),
                t[u] = e[0],
                t[u + 1] = e[1],
                t[u + 2] = e[2];
                return t
            }
        } (),
        u.str = function(e) {
            return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
        },
        "undefined" != typeof e && (e.vec3 = u);
        var c = {};
        c.create = function() {
            var e = new r(4);
            return e[0] = 0,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e
        },
        c.clone = function(e) {
            var t = new r(4);
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t
        },
        c.fromValues = function(e, t, n, o) {
            var a = new r(4);
            return a[0] = e,
            a[1] = t,
            a[2] = n,
            a[3] = o,
            a
        },
        c.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e
        },
        c.set = function(e, t, r, n, o) {
            return e[0] = t,
            e[1] = r,
            e[2] = n,
            e[3] = o,
            e
        },
        c.add = function(e, t, r) {
            return e[0] = t[0] + r[0],
            e[1] = t[1] + r[1],
            e[2] = t[2] + r[2],
            e[3] = t[3] + r[3],
            e
        },
        c.subtract = function(e, t, r) {
            return e[0] = t[0] - r[0],
            e[1] = t[1] - r[1],
            e[2] = t[2] - r[2],
            e[3] = t[3] - r[3],
            e
        },
        c.sub = c.subtract,
        c.multiply = function(e, t, r) {
            return e[0] = t[0] * r[0],
            e[1] = t[1] * r[1],
            e[2] = t[2] * r[2],
            e[3] = t[3] * r[3],
            e
        },
        c.mul = c.multiply,
        c.divide = function(e, t, r) {
            return e[0] = t[0] / r[0],
            e[1] = t[1] / r[1],
            e[2] = t[2] / r[2],
            e[3] = t[3] / r[3],
            e
        },
        c.div = c.divide,
        c.min = function(e, t, r) {
            return e[0] = Math.min(t[0], r[0]),
            e[1] = Math.min(t[1], r[1]),
            e[2] = Math.min(t[2], r[2]),
            e[3] = Math.min(t[3], r[3]),
            e
        },
        c.max = function(e, t, r) {
            return e[0] = Math.max(t[0], r[0]),
            e[1] = Math.max(t[1], r[1]),
            e[2] = Math.max(t[2], r[2]),
            e[3] = Math.max(t[3], r[3]),
            e
        },
        c.scale = function(e, t, r) {
            return e[0] = t[0] * r,
            e[1] = t[1] * r,
            e[2] = t[2] * r,
            e[3] = t[3] * r,
            e
        },
        c.scaleAndAdd = function(e, t, r, n) {
            return e[0] = t[0] + r[0] * n,
            e[1] = t[1] + r[1] * n,
            e[2] = t[2] + r[2] * n,
            e[3] = t[3] + r[3] * n,
            e
        },
        c.distance = function(e, t) {
            var r = t[0] - e[0],
            n = t[1] - e[1],
            o = t[2] - e[2],
            a = t[3] - e[3];
            return Math.sqrt(r * r + n * n + o * o + a * a)
        },
        c.dist = c.distance,
        c.squaredDistance = function(e, t) {
            var r = t[0] - e[0],
            n = t[1] - e[1],
            o = t[2] - e[2],
            a = t[3] - e[3];
            return r * r + n * n + o * o + a * a
        },
        c.sqrDist = c.squaredDistance,
        c.length = function(e) {
            var t = e[0],
            r = e[1],
            n = e[2],
            o = e[3];
            return Math.sqrt(t * t + r * r + n * n + o * o)
        },
        c.len = c.length,
        c.squaredLength = function(e) {
            var t = e[0],
            r = e[1],
            n = e[2],
            o = e[3];
            return t * t + r * r + n * n + o * o
        },
        c.sqrLen = c.squaredLength,
        c.negate = function(e, t) {
            return e[0] = -t[0],
            e[1] = -t[1],
            e[2] = -t[2],
            e[3] = -t[3],
            e
        },
        c.inverse = function(e, t) {
            return e[0] = 1 / t[0],
            e[1] = 1 / t[1],
            e[2] = 1 / t[2],
            e[3] = 1 / t[3],
            e
        },
        c.normalize = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = r * r + n * n + o * o + a * a;
            return i > 0 && (i = 1 / Math.sqrt(i), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i),
            e
        },
        c.dot = function(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
        },
        c.lerp = function(e, t, r, n) {
            var o = t[0],
            a = t[1],
            i = t[2],
            u = t[3];
            return e[0] = o + n * (r[0] - o),
            e[1] = a + n * (r[1] - a),
            e[2] = i + n * (r[2] - i),
            e[3] = u + n * (r[3] - u),
            e
        },
        c.random = function(e, t) {
            return t = t || 1,
            e[0] = n(),
            e[1] = n(),
            e[2] = n(),
            e[3] = n(),
            c.normalize(e, e),
            c.scale(e, e, t),
            e
        },
        c.transformMat4 = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3];
            return e[0] = r[0] * n + r[4] * o + r[8] * a + r[12] * i,
            e[1] = r[1] * n + r[5] * o + r[9] * a + r[13] * i,
            e[2] = r[2] * n + r[6] * o + r[10] * a + r[14] * i,
            e[3] = r[3] * n + r[7] * o + r[11] * a + r[15] * i,
            e
        },
        c.transformQuat = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = r[0],
            u = r[1],
            c = r[2],
            l = r[3],
            s = l * n + u * a - c * o,
            f = l * o + c * n - i * a,
            v = l * a + i * o - u * n,
            p = -i * n - u * o - c * a;
            return e[0] = s * l + p * -i + f * -c - v * -u,
            e[1] = f * l + p * -u + v * -i - s * -c,
            e[2] = v * l + p * -c + s * -u - f * -i,
            e
        },
        c.forEach = function() {
            var e = c.create();
            return function(t, r, n, o, a, i) {
                var u, c;
                for (r || (r = 4), n || (n = 0), c = o ? Math.min(o * r + n, t.length) : t.length, u = n; c > u; u += r) e[0] = t[u],
                e[1] = t[u + 1],
                e[2] = t[u + 2],
                e[3] = t[u + 3],
                a(e, e, i),
                t[u] = e[0],
                t[u + 1] = e[1],
                t[u + 2] = e[2],
                t[u + 3] = e[3];
                return t
            }
        } (),
        c.str = function(e) {
            return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
        },
        "undefined" != typeof e && (e.vec4 = c);
        var l = {};
        l.create = function() {
            var e = new r(4);
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 1,
            e
        },
        l.clone = function(e) {
            var t = new r(4);
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t
        },
        l.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e
        },
        l.identity = function(e) {
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 1,
            e
        },
        l.transpose = function(e, t) {
            if (e === t) {
                var r = t[1];
                e[1] = t[2],
                e[2] = r
            } else e[0] = t[0],
            e[1] = t[2],
            e[2] = t[1],
            e[3] = t[3];
            return e
        },
        l.invert = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = r * a - o * n;
            return i ? (i = 1 / i, e[0] = a * i, e[1] = -n * i, e[2] = -o * i, e[3] = r * i, e) : null
        },
        l.adjoint = function(e, t) {
            var r = t[0];
            return e[0] = t[3],
            e[1] = -t[1],
            e[2] = -t[2],
            e[3] = r,
            e
        },
        l.determinant = function(e) {
            return e[0] * e[3] - e[2] * e[1]
        },
        l.multiply = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = r[0],
            c = r[1],
            l = r[2],
            s = r[3];
            return e[0] = n * u + a * c,
            e[1] = o * u + i * c,
            e[2] = n * l + a * s,
            e[3] = o * l + i * s,
            e
        },
        l.mul = l.multiply,
        l.rotate = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = Math.sin(r),
            c = Math.cos(r);
            return e[0] = n * c + a * u,
            e[1] = o * c + i * u,
            e[2] = n * -u + a * c,
            e[3] = o * -u + i * c,
            e
        },
        l.scale = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = r[0],
            c = r[1];
            return e[0] = n * u,
            e[1] = o * u,
            e[2] = a * c,
            e[3] = i * c,
            e
        },
        l.str = function(e) {
            return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
        },
        l.frob = function(e) {
            return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2))
        },
        l.LDU = function(e, t, r, n) {
            return e[2] = n[2] / n[0],
            r[0] = n[0],
            r[1] = n[1],
            r[3] = n[3] - e[2] * r[1],
            [e, t, r]
        },
        "undefined" != typeof e && (e.mat2 = l);
        var s = {};
        s.create = function() {
            var e = new r(6);
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 1,
            e[4] = 0,
            e[5] = 0,
            e
        },
        s.clone = function(e) {
            var t = new r(6);
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t
        },
        s.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e
        },
        s.identity = function(e) {
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 1,
            e[4] = 0,
            e[5] = 0,
            e
        },
        s.invert = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = t[4],
            u = t[5],
            c = r * a - n * o;
            return c ? (c = 1 / c, e[0] = a * c, e[1] = -n * c, e[2] = -o * c, e[3] = r * c, e[4] = (o * u - a * i) * c, e[5] = (n * i - r * u) * c, e) : null
        },
        s.determinant = function(e) {
            return e[0] * e[3] - e[1] * e[2]
        },
        s.multiply = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = r[0],
            s = r[1],
            f = r[2],
            v = r[3],
            p = r[4],
            g = r[5];
            return e[0] = n * l + a * s,
            e[1] = o * l + i * s,
            e[2] = n * f + a * v,
            e[3] = o * f + i * v,
            e[4] = n * p + a * g + u,
            e[5] = o * p + i * g + c,
            e
        },
        s.mul = s.multiply,
        s.rotate = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = Math.sin(r),
            s = Math.cos(r);
            return e[0] = n * s + a * l,
            e[1] = o * s + i * l,
            e[2] = n * -l + a * s,
            e[3] = o * -l + i * s,
            e[4] = u,
            e[5] = c,
            e
        },
        s.scale = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = r[0],
            s = r[1];
            return e[0] = n * l,
            e[1] = o * l,
            e[2] = a * s,
            e[3] = i * s,
            e[4] = u,
            e[5] = c,
            e
        },
        s.translate = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = r[0],
            s = r[1];
            return e[0] = n,
            e[1] = o,
            e[2] = a,
            e[3] = i,
            e[4] = n * l + a * s + u,
            e[5] = o * l + i * s + c,
            e
        },
        s.str = function(e) {
            return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")"
        },
        s.frob = function(e) {
            return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + 1)
        },
        "undefined" != typeof e && (e.mat2d = s);
        var f = {};
        f.create = function() {
            var e = new r(9);
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 1,
            e[5] = 0,
            e[6] = 0,
            e[7] = 0,
            e[8] = 1,
            e
        },
        f.fromMat4 = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[4],
            e[4] = t[5],
            e[5] = t[6],
            e[6] = t[8],
            e[7] = t[9],
            e[8] = t[10],
            e
        },
        f.clone = function(e) {
            var t = new r(9);
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t
        },
        f.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e
        },
        f.identity = function(e) {
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 1,
            e[5] = 0,
            e[6] = 0,
            e[7] = 0,
            e[8] = 1,
            e
        },
        f.transpose = function(e, t) {
            if (e === t) {
                var r = t[1],
                n = t[2],
                o = t[5];
                e[1] = t[3],
                e[2] = t[6],
                e[3] = r,
                e[5] = t[7],
                e[6] = n,
                e[7] = o
            } else e[0] = t[0],
            e[1] = t[3],
            e[2] = t[6],
            e[3] = t[1],
            e[4] = t[4],
            e[5] = t[7],
            e[6] = t[2],
            e[7] = t[5],
            e[8] = t[8];
            return e
        },
        f.invert = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = t[4],
            u = t[5],
            c = t[6],
            l = t[7],
            s = t[8],
            f = s * i - u * l,
            v = -s * a + u * c,
            p = l * a - i * c,
            g = r * f + n * v + o * p;
            return g ? (g = 1 / g, e[0] = f * g, e[1] = ( - s * n + o * l) * g, e[2] = (u * n - o * i) * g, e[3] = v * g, e[4] = (s * r - o * c) * g, e[5] = ( - u * r + o * a) * g, e[6] = p * g, e[7] = ( - l * r + n * c) * g, e[8] = (i * r - n * a) * g, e) : null
        },
        f.adjoint = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = t[4],
            u = t[5],
            c = t[6],
            l = t[7],
            s = t[8];
            return e[0] = i * s - u * l,
            e[1] = o * l - n * s,
            e[2] = n * u - o * i,
            e[3] = u * c - a * s,
            e[4] = r * s - o * c,
            e[5] = o * a - r * u,
            e[6] = a * l - i * c,
            e[7] = n * c - r * l,
            e[8] = r * i - n * a,
            e
        },
        f.determinant = function(e) {
            var t = e[0],
            r = e[1],
            n = e[2],
            o = e[3],
            a = e[4],
            i = e[5],
            u = e[6],
            c = e[7],
            l = e[8];
            return t * (l * a - i * c) + r * ( - l * o + i * u) + n * (c * o - a * u)
        },
        f.multiply = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = t[6],
            s = t[7],
            f = t[8],
            v = r[0],
            p = r[1],
            g = r[2],
            h = r[3],
            m = r[4],
            d = r[5],
            _ = r[6],
            b = r[7],
            y = r[8];
            return e[0] = v * n + p * i + g * l,
            e[1] = v * o + p * u + g * s,
            e[2] = v * a + p * c + g * f,
            e[3] = h * n + m * i + d * l,
            e[4] = h * o + m * u + d * s,
            e[5] = h * a + m * c + d * f,
            e[6] = _ * n + b * i + y * l,
            e[7] = _ * o + b * u + y * s,
            e[8] = _ * a + b * c + y * f,
            e
        },
        f.mul = f.multiply,
        f.translate = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = t[6],
            s = t[7],
            f = t[8],
            v = r[0],
            p = r[1];
            return e[0] = n,
            e[1] = o,
            e[2] = a,
            e[3] = i,
            e[4] = u,
            e[5] = c,
            e[6] = v * n + p * i + l,
            e[7] = v * o + p * u + s,
            e[8] = v * a + p * c + f,
            e
        },
        f.rotate = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = t[6],
            s = t[7],
            f = t[8],
            v = Math.sin(r),
            p = Math.cos(r);
            return e[0] = p * n + v * i,
            e[1] = p * o + v * u,
            e[2] = p * a + v * c,
            e[3] = p * i - v * n,
            e[4] = p * u - v * o,
            e[5] = p * c - v * a,
            e[6] = l,
            e[7] = s,
            e[8] = f,
            e
        },
        f.scale = function(e, t, r) {
            var n = r[0],
            o = r[1];
            return e[0] = n * t[0],
            e[1] = n * t[1],
            e[2] = n * t[2],
            e[3] = o * t[3],
            e[4] = o * t[4],
            e[5] = o * t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e
        },
        f.fromMat2d = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = 0,
            e[3] = t[2],
            e[4] = t[3],
            e[5] = 0,
            e[6] = t[4],
            e[7] = t[5],
            e[8] = 1,
            e
        },
        f.fromQuat = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = r + r,
            u = n + n,
            c = o + o,
            l = r * i,
            s = n * i,
            f = n * u,
            v = o * i,
            p = o * u,
            g = o * c,
            h = a * i,
            m = a * u,
            d = a * c;
            return e[0] = 1 - f - g,
            e[3] = s - d,
            e[6] = v + m,
            e[1] = s + d,
            e[4] = 1 - l - g,
            e[7] = p - h,
            e[2] = v - m,
            e[5] = p + h,
            e[8] = 1 - l - f,
            e
        },
        f.normalFromMat4 = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = t[4],
            u = t[5],
            c = t[6],
            l = t[7],
            s = t[8],
            f = t[9],
            v = t[10],
            p = t[11],
            g = t[12],
            h = t[13],
            m = t[14],
            d = t[15],
            _ = r * u - n * i,
            b = r * c - o * i,
            y = r * l - a * i,
            T = n * c - o * u,
            w = n * l - a * u,
            E = o * l - a * c,
            x = s * h - f * g,
            A = s * m - v * g,
            M = s * d - p * g,
            R = f * m - v * h,
            P = f * d - p * h,
            L = v * d - p * m,
            D = _ * L - b * P + y * R + T * M - w * A + E * x;
            return D ? (D = 1 / D, e[0] = (u * L - c * P + l * R) * D, e[1] = (c * M - i * L - l * A) * D, e[2] = (i * P - u * M + l * x) * D, e[3] = (o * P - n * L - a * R) * D, e[4] = (r * L - o * M + a * A) * D, e[5] = (n * M - r * P - a * x) * D, e[6] = (h * E - m * w + d * T) * D, e[7] = (m * y - g * E - d * b) * D, e[8] = (g * w - h * y + d * _) * D, e) : null
        },
        f.str = function(e) {
            return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")"
        },
        f.frob = function(e) {
            return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + Math.pow(e[6], 2) + Math.pow(e[7], 2) + Math.pow(e[8], 2))
        },
        "undefined" != typeof e && (e.mat3 = f);
        var v = {};
        v.create = function() {
            var e = new r(16);
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 0,
            e[5] = 1,
            e[6] = 0,
            e[7] = 0,
            e[8] = 0,
            e[9] = 0,
            e[10] = 1,
            e[11] = 0,
            e[12] = 0,
            e[13] = 0,
            e[14] = 0,
            e[15] = 1,
            e
        },
        v.clone = function(e) {
            var t = new r(16);
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        },
        v.copy = function(e, t) {
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e[9] = t[9],
            e[10] = t[10],
            e[11] = t[11],
            e[12] = t[12],
            e[13] = t[13],
            e[14] = t[14],
            e[15] = t[15],
            e
        },
        v.identity = function(e) {
            return e[0] = 1,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 0,
            e[5] = 1,
            e[6] = 0,
            e[7] = 0,
            e[8] = 0,
            e[9] = 0,
            e[10] = 1,
            e[11] = 0,
            e[12] = 0,
            e[13] = 0,
            e[14] = 0,
            e[15] = 1,
            e
        },
        v.transpose = function(e, t) {
            if (e === t) {
                var r = t[1],
                n = t[2],
                o = t[3],
                a = t[6],
                i = t[7],
                u = t[11];
                e[1] = t[4],
                e[2] = t[8],
                e[3] = t[12],
                e[4] = r,
                e[6] = t[9],
                e[7] = t[13],
                e[8] = n,
                e[9] = a,
                e[11] = t[14],
                e[12] = o,
                e[13] = i,
                e[14] = u
            } else e[0] = t[0],
            e[1] = t[4],
            e[2] = t[8],
            e[3] = t[12],
            e[4] = t[1],
            e[5] = t[5],
            e[6] = t[9],
            e[7] = t[13],
            e[8] = t[2],
            e[9] = t[6],
            e[10] = t[10],
            e[11] = t[14],
            e[12] = t[3],
            e[13] = t[7],
            e[14] = t[11],
            e[15] = t[15];
            return e
        },
        v.invert = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = t[4],
            u = t[5],
            c = t[6],
            l = t[7],
            s = t[8],
            f = t[9],
            v = t[10],
            p = t[11],
            g = t[12],
            h = t[13],
            m = t[14],
            d = t[15],
            _ = r * u - n * i,
            b = r * c - o * i,
            y = r * l - a * i,
            T = n * c - o * u,
            w = n * l - a * u,
            E = o * l - a * c,
            x = s * h - f * g,
            A = s * m - v * g,
            M = s * d - p * g,
            R = f * m - v * h,
            P = f * d - p * h,
            L = v * d - p * m,
            D = _ * L - b * P + y * R + T * M - w * A + E * x;
            return D ? (D = 1 / D, e[0] = (u * L - c * P + l * R) * D, e[1] = (o * P - n * L - a * R) * D, e[2] = (h * E - m * w + d * T) * D, e[3] = (v * w - f * E - p * T) * D, e[4] = (c * M - i * L - l * A) * D, e[5] = (r * L - o * M + a * A) * D, e[6] = (m * y - g * E - d * b) * D, e[7] = (s * E - v * y + p * b) * D, e[8] = (i * P - u * M + l * x) * D, e[9] = (n * M - r * P - a * x) * D, e[10] = (g * w - h * y + d * _) * D, e[11] = (f * y - s * w - p * _) * D, e[12] = (u * A - i * R - c * x) * D, e[13] = (r * R - n * A + o * x) * D, e[14] = (h * b - g * T - m * _) * D, e[15] = (s * T - f * b + v * _) * D, e) : null
        },
        v.adjoint = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = t[4],
            u = t[5],
            c = t[6],
            l = t[7],
            s = t[8],
            f = t[9],
            v = t[10],
            p = t[11],
            g = t[12],
            h = t[13],
            m = t[14],
            d = t[15];
            return e[0] = u * (v * d - p * m) - f * (c * d - l * m) + h * (c * p - l * v),
            e[1] = -(n * (v * d - p * m) - f * (o * d - a * m) + h * (o * p - a * v)),
            e[2] = n * (c * d - l * m) - u * (o * d - a * m) + h * (o * l - a * c),
            e[3] = -(n * (c * p - l * v) - u * (o * p - a * v) + f * (o * l - a * c)),
            e[4] = -(i * (v * d - p * m) - s * (c * d - l * m) + g * (c * p - l * v)),
            e[5] = r * (v * d - p * m) - s * (o * d - a * m) + g * (o * p - a * v),
            e[6] = -(r * (c * d - l * m) - i * (o * d - a * m) + g * (o * l - a * c)),
            e[7] = r * (c * p - l * v) - i * (o * p - a * v) + s * (o * l - a * c),
            e[8] = i * (f * d - p * h) - s * (u * d - l * h) + g * (u * p - l * f),
            e[9] = -(r * (f * d - p * h) - s * (n * d - a * h) + g * (n * p - a * f)),
            e[10] = r * (u * d - l * h) - i * (n * d - a * h) + g * (n * l - a * u),
            e[11] = -(r * (u * p - l * f) - i * (n * p - a * f) + s * (n * l - a * u)),
            e[12] = -(i * (f * m - v * h) - s * (u * m - c * h) + g * (u * v - c * f)),
            e[13] = r * (f * m - v * h) - s * (n * m - o * h) + g * (n * v - o * f),
            e[14] = -(r * (u * m - c * h) - i * (n * m - o * h) + g * (n * c - o * u)),
            e[15] = r * (u * v - c * f) - i * (n * v - o * f) + s * (n * c - o * u),
            e
        },
        v.determinant = function(e) {
            var t = e[0],
            r = e[1],
            n = e[2],
            o = e[3],
            a = e[4],
            i = e[5],
            u = e[6],
            c = e[7],
            l = e[8],
            s = e[9],
            f = e[10],
            v = e[11],
            p = e[12],
            g = e[13],
            h = e[14],
            m = e[15],
            d = t * i - r * a,
            _ = t * u - n * a,
            b = t * c - o * a,
            y = r * u - n * i,
            T = r * c - o * i,
            w = n * c - o * u,
            E = l * g - s * p,
            x = l * h - f * p,
            A = l * m - v * p,
            M = s * h - f * g,
            R = s * m - v * g,
            P = f * m - v * h;
            return d * P - _ * R + b * M + y * A - T * x + w * E
        },
        v.multiply = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = t[4],
            c = t[5],
            l = t[6],
            s = t[7],
            f = t[8],
            v = t[9],
            p = t[10],
            g = t[11],
            h = t[12],
            m = t[13],
            d = t[14],
            _ = t[15],
            b = r[0],
            y = r[1],
            T = r[2],
            w = r[3];
            return e[0] = b * n + y * u + T * f + w * h,
            e[1] = b * o + y * c + T * v + w * m,
            e[2] = b * a + y * l + T * p + w * d,
            e[3] = b * i + y * s + T * g + w * _,
            b = r[4],
            y = r[5],
            T = r[6],
            w = r[7],
            e[4] = b * n + y * u + T * f + w * h,
            e[5] = b * o + y * c + T * v + w * m,
            e[6] = b * a + y * l + T * p + w * d,
            e[7] = b * i + y * s + T * g + w * _,
            b = r[8],
            y = r[9],
            T = r[10],
            w = r[11],
            e[8] = b * n + y * u + T * f + w * h,
            e[9] = b * o + y * c + T * v + w * m,
            e[10] = b * a + y * l + T * p + w * d,
            e[11] = b * i + y * s + T * g + w * _,
            b = r[12],
            y = r[13],
            T = r[14],
            w = r[15],
            e[12] = b * n + y * u + T * f + w * h,
            e[13] = b * o + y * c + T * v + w * m,
            e[14] = b * a + y * l + T * p + w * d,
            e[15] = b * i + y * s + T * g + w * _,
            e
        },
        v.mul = v.multiply,
        v.translate = function(e, t, r) {
            var n, o, a, i, u, c, l, s, f, v, p, g, h = r[0],
            m = r[1],
            d = r[2];
            return t === e ? (e[12] = t[0] * h + t[4] * m + t[8] * d + t[12], e[13] = t[1] * h + t[5] * m + t[9] * d + t[13], e[14] = t[2] * h + t[6] * m + t[10] * d + t[14], e[15] = t[3] * h + t[7] * m + t[11] * d + t[15]) : (n = t[0], o = t[1], a = t[2], i = t[3], u = t[4], c = t[5], l = t[6], s = t[7], f = t[8], v = t[9], p = t[10], g = t[11], e[0] = n, e[1] = o, e[2] = a, e[3] = i, e[4] = u, e[5] = c, e[6] = l, e[7] = s, e[8] = f, e[9] = v, e[10] = p, e[11] = g, e[12] = n * h + u * m + f * d + t[12], e[13] = o * h + c * m + v * d + t[13], e[14] = a * h + l * m + p * d + t[14], e[15] = i * h + s * m + g * d + t[15]),
            e
        },
        v.scale = function(e, t, r) {
            var n = r[0],
            o = r[1],
            a = r[2];
            return e[0] = t[0] * n,
            e[1] = t[1] * n,
            e[2] = t[2] * n,
            e[3] = t[3] * n,
            e[4] = t[4] * o,
            e[5] = t[5] * o,
            e[6] = t[6] * o,
            e[7] = t[7] * o,
            e[8] = t[8] * a,
            e[9] = t[9] * a,
            e[10] = t[10] * a,
            e[11] = t[11] * a,
            e[12] = t[12],
            e[13] = t[13],
            e[14] = t[14],
            e[15] = t[15],
            e
        },
        v.rotate = function(e, r, n, o) {
            var a, i, u, c, l, s, f, v, p, g, h, m, d, _, b, y, T, w, E, x, A, M, R, P, L = o[0],
            D = o[1],
            S = o[2],
            F = Math.sqrt(L * L + D * D + S * S);
            return Math.abs(F) < t ? null: (F = 1 / F, L *= F, D *= F, S *= F, a = Math.sin(n), i = Math.cos(n), u = 1 - i, c = r[0], l = r[1], s = r[2], f = r[3], v = r[4], p = r[5], g = r[6], h = r[7], m = r[8], d = r[9], _ = r[10], b = r[11], y = L * L * u + i, T = D * L * u + S * a, w = S * L * u - D * a, E = L * D * u - S * a, x = D * D * u + i, A = S * D * u + L * a, M = L * S * u + D * a, R = D * S * u - L * a, P = S * S * u + i, e[0] = c * y + v * T + m * w, e[1] = l * y + p * T + d * w, e[2] = s * y + g * T + _ * w, e[3] = f * y + h * T + b * w, e[4] = c * E + v * x + m * A, e[5] = l * E + p * x + d * A, e[6] = s * E + g * x + _ * A, e[7] = f * E + h * x + b * A, e[8] = c * M + v * R + m * P, e[9] = l * M + p * R + d * P, e[10] = s * M + g * R + _ * P, e[11] = f * M + h * R + b * P, r !== e && (e[12] = r[12], e[13] = r[13], e[14] = r[14], e[15] = r[15]), e)
        },
        v.rotateX = function(e, t, r) {
            var n = Math.sin(r),
            o = Math.cos(r),
            a = t[4],
            i = t[5],
            u = t[6],
            c = t[7],
            l = t[8],
            s = t[9],
            f = t[10],
            v = t[11];
            return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]),
            e[4] = a * o + l * n,
            e[5] = i * o + s * n,
            e[6] = u * o + f * n,
            e[7] = c * o + v * n,
            e[8] = l * o - a * n,
            e[9] = s * o - i * n,
            e[10] = f * o - u * n,
            e[11] = v * o - c * n,
            e
        },
        v.rotateY = function(e, t, r) {
            var n = Math.sin(r),
            o = Math.cos(r),
            a = t[0],
            i = t[1],
            u = t[2],
            c = t[3],
            l = t[8],
            s = t[9],
            f = t[10],
            v = t[11];
            return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]),
            e[0] = a * o - l * n,
            e[1] = i * o - s * n,
            e[2] = u * o - f * n,
            e[3] = c * o - v * n,
            e[8] = a * n + l * o,
            e[9] = i * n + s * o,
            e[10] = u * n + f * o,
            e[11] = c * n + v * o,
            e
        },
        v.rotateZ = function(e, t, r) {
            var n = Math.sin(r),
            o = Math.cos(r),
            a = t[0],
            i = t[1],
            u = t[2],
            c = t[3],
            l = t[4],
            s = t[5],
            f = t[6],
            v = t[7];
            return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]),
            e[0] = a * o + l * n,
            e[1] = i * o + s * n,
            e[2] = u * o + f * n,
            e[3] = c * o + v * n,
            e[4] = l * o - a * n,
            e[5] = s * o - i * n,
            e[6] = f * o - u * n,
            e[7] = v * o - c * n,
            e
        },
        v.fromRotationTranslation = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = n + n,
            c = o + o,
            l = a + a,
            s = n * u,
            f = n * c,
            v = n * l,
            p = o * c,
            g = o * l,
            h = a * l,
            m = i * u,
            d = i * c,
            _ = i * l;
            return e[0] = 1 - (p + h),
            e[1] = f + _,
            e[2] = v - d,
            e[3] = 0,
            e[4] = f - _,
            e[5] = 1 - (s + h),
            e[6] = g + m,
            e[7] = 0,
            e[8] = v + d,
            e[9] = g - m,
            e[10] = 1 - (s + p),
            e[11] = 0,
            e[12] = r[0],
            e[13] = r[1],
            e[14] = r[2],
            e[15] = 1,
            e
        },
        v.fromQuat = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = r + r,
            u = n + n,
            c = o + o,
            l = r * i,
            s = n * i,
            f = n * u,
            v = o * i,
            p = o * u,
            g = o * c,
            h = a * i,
            m = a * u,
            d = a * c;
            return e[0] = 1 - f - g,
            e[1] = s + d,
            e[2] = v - m,
            e[3] = 0,
            e[4] = s - d,
            e[5] = 1 - l - g,
            e[6] = p + h,
            e[7] = 0,
            e[8] = v + m,
            e[9] = p - h,
            e[10] = 1 - l - f,
            e[11] = 0,
            e[12] = 0,
            e[13] = 0,
            e[14] = 0,
            e[15] = 1,
            e
        },
        v.frustum = function(e, t, r, n, o, a, i) {
            var u = 1 / (r - t),
            c = 1 / (o - n),
            l = 1 / (a - i);
            return e[0] = 2 * a * u,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 0,
            e[5] = 2 * a * c,
            e[6] = 0,
            e[7] = 0,
            e[8] = (r + t) * u,
            e[9] = (o + n) * c,
            e[10] = (i + a) * l,
            e[11] = -1,
            e[12] = 0,
            e[13] = 0,
            e[14] = i * a * 2 * l,
            e[15] = 0,
            e
        },
        v.perspective = function(e, t, r, n, o) {
            var a = 1 / Math.tan(t / 2),
            i = 1 / (n - o);
            return e[0] = a / r,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 0,
            e[5] = a,
            e[6] = 0,
            e[7] = 0,
            e[8] = 0,
            e[9] = 0,
            e[10] = (o + n) * i,
            e[11] = -1,
            e[12] = 0,
            e[13] = 0,
            e[14] = 2 * o * n * i,
            e[15] = 0,
            e
        },
        v.ortho = function(e, t, r, n, o, a, i) {
            var u = 1 / (t - r),
            c = 1 / (n - o),
            l = 1 / (a - i);
            return e[0] = -2 * u,
            e[1] = 0,
            e[2] = 0,
            e[3] = 0,
            e[4] = 0,
            e[5] = -2 * c,
            e[6] = 0,
            e[7] = 0,
            e[8] = 0,
            e[9] = 0,
            e[10] = 2 * l,
            e[11] = 0,
            e[12] = (t + r) * u,
            e[13] = (o + n) * c,
            e[14] = (i + a) * l,
            e[15] = 1,
            e
        },
        v.lookAt = function(e, r, n, o) {
            var a, i, u, c, l, s, f, p, g, h, m = r[0],
            d = r[1],
            _ = r[2],
            b = o[0],
            y = o[1],
            T = o[2],
            w = n[0],
            E = n[1],
            x = n[2];
            return Math.abs(m - w) < t && Math.abs(d - E) < t && Math.abs(_ - x) < t ? v.identity(e) : (f = m - w, p = d - E, g = _ - x, h = 1 / Math.sqrt(f * f + p * p + g * g), f *= h, p *= h, g *= h, a = y * g - T * p, i = T * f - b * g, u = b * p - y * f, h = Math.sqrt(a * a + i * i + u * u), h ? (h = 1 / h, a *= h, i *= h, u *= h) : (a = 0, i = 0, u = 0), c = p * u - g * i, l = g * a - f * u, s = f * i - p * a, h = Math.sqrt(c * c + l * l + s * s), h ? (h = 1 / h, c *= h, l *= h, s *= h) : (c = 0, l = 0, s = 0), e[0] = a, e[1] = c, e[2] = f, e[3] = 0, e[4] = i, e[5] = l, e[6] = p, e[7] = 0, e[8] = u, e[9] = s, e[10] = g, e[11] = 0, e[12] = -(a * m + i * d + u * _), e[13] = -(c * m + l * d + s * _), e[14] = -(f * m + p * d + g * _), e[15] = 1, e)
        },
        v.str = function(e) {
            return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
        },
        v.frob = function(e) {
            return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + Math.pow(e[6], 2) + Math.pow(e[7], 2) + Math.pow(e[8], 2) + Math.pow(e[9], 2) + Math.pow(e[10], 2) + Math.pow(e[11], 2) + Math.pow(e[12], 2) + Math.pow(e[13], 2) + Math.pow(e[14], 2) + Math.pow(e[15], 2))
        },
        "undefined" != typeof e && (e.mat4 = v);
        var p = {};
        p.create = function() {
            var e = new r(4);
            return e[0] = 0,
            e[1] = 0,
            e[2] = 0,
            e[3] = 1,
            e
        },
        p.rotationTo = function() {
            var e = u.create(),
            t = u.fromValues(1, 0, 0),
            r = u.fromValues(0, 1, 0);
            return function(n, o, a) {
                var i = u.dot(o, a);
                return - .999999 > i ? (u.cross(e, t, o), u.length(e) < 1e-6 && u.cross(e, r, o), u.normalize(e, e), p.setAxisAngle(n, e, Math.PI), n) : i > .999999 ? (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n) : (u.cross(e, o, a), n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = 1 + i, p.normalize(n, n))
            }
        } (),
        p.setAxes = function() {
            var e = f.create();
            return function(t, r, n, o) {
                return e[0] = n[0],
                e[3] = n[1],
                e[6] = n[2],
                e[1] = o[0],
                e[4] = o[1],
                e[7] = o[2],
                e[2] = -r[0],
                e[5] = -r[1],
                e[8] = -r[2],
                p.normalize(t, p.fromMat3(t, e))
            }
        } (),
        p.clone = c.clone,
        p.fromValues = c.fromValues,
        p.copy = c.copy,
        p.set = c.set,
        p.identity = function(e) {
            return e[0] = 0,
            e[1] = 0,
            e[2] = 0,
            e[3] = 1,
            e
        },
        p.setAxisAngle = function(e, t, r) {
            r = .5 * r;
            var n = Math.sin(r);
            return e[0] = n * t[0],
            e[1] = n * t[1],
            e[2] = n * t[2],
            e[3] = Math.cos(r),
            e
        },
        p.add = c.add,
        p.multiply = function(e, t, r) {
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = r[0],
            c = r[1],
            l = r[2],
            s = r[3];
            return e[0] = n * s + i * u + o * l - a * c,
            e[1] = o * s + i * c + a * u - n * l,
            e[2] = a * s + i * l + n * c - o * u,
            e[3] = i * s - n * u - o * c - a * l,
            e
        },
        p.mul = p.multiply,
        p.scale = c.scale,
        p.rotateX = function(e, t, r) {
            r *= .5;
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = Math.sin(r),
            c = Math.cos(r);
            return e[0] = n * c + i * u,
            e[1] = o * c + a * u,
            e[2] = a * c - o * u,
            e[3] = i * c - n * u,
            e
        },
        p.rotateY = function(e, t, r) {
            r *= .5;
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = Math.sin(r),
            c = Math.cos(r);
            return e[0] = n * c - a * u,
            e[1] = o * c + i * u,
            e[2] = a * c + n * u,
            e[3] = i * c - o * u,
            e
        },
        p.rotateZ = function(e, t, r) {
            r *= .5;
            var n = t[0],
            o = t[1],
            a = t[2],
            i = t[3],
            u = Math.sin(r),
            c = Math.cos(r);
            return e[0] = n * c + o * u,
            e[1] = o * c - n * u,
            e[2] = a * c + i * u,
            e[3] = i * c - a * u,
            e
        },
        p.calculateW = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2];
            return e[0] = r,
            e[1] = n,
            e[2] = o,
            e[3] = Math.sqrt(Math.abs(1 - r * r - n * n - o * o)),
            e
        },
        p.dot = c.dot,
        p.lerp = c.lerp,
        p.slerp = function(e, t, r, n) {
            var o, a, i, u, c, l = t[0],
            s = t[1],
            f = t[2],
            v = t[3],
            p = r[0],
            g = r[1],
            h = r[2],
            m = r[3];
            return a = l * p + s * g + f * h + v * m,
            0 > a && (a = -a, p = -p, g = -g, h = -h, m = -m),
            1 - a > 1e-6 ? (o = Math.acos(a), i = Math.sin(o), u = Math.sin((1 - n) * o) / i, c = Math.sin(n * o) / i) : (u = 1 - n, c = n),
            e[0] = u * l + c * p,
            e[1] = u * s + c * g,
            e[2] = u * f + c * h,
            e[3] = u * v + c * m,
            e
        },
        p.invert = function(e, t) {
            var r = t[0],
            n = t[1],
            o = t[2],
            a = t[3],
            i = r * r + n * n + o * o + a * a,
            u = i ? 1 / i: 0;
            return e[0] = -r * u,
            e[1] = -n * u,
            e[2] = -o * u,
            e[3] = a * u,
            e
        },
        p.conjugate = function(e, t) {
            return e[0] = -t[0],
            e[1] = -t[1],
            e[2] = -t[2],
            e[3] = t[3],
            e
        },
        p.length = c.length,
        p.len = p.length,
        p.squaredLength = c.squaredLength,
        p.sqrLen = p.squaredLength,
        p.normalize = c.normalize,
        p.fromMat3 = function(e, t) {
            var r, n = t[0] + t[4] + t[8];
            if (n > 0) r = Math.sqrt(n + 1),
            e[3] = .5 * r,
            r = .5 / r,
            e[0] = (t[5] - t[7]) * r,
            e[1] = (t[6] - t[2]) * r,
            e[2] = (t[1] - t[3]) * r;
            else {
                var o = 0;
                t[4] > t[0] && (o = 1),
                t[8] > t[3 * o + o] && (o = 2);
                var a = (o + 1) % 3,
                i = (o + 2) % 3;
                r = Math.sqrt(t[3 * o + o] - t[3 * a + a] - t[3 * i + i] + 1),
                e[o] = .5 * r,
                r = .5 / r,
                e[3] = (t[3 * a + i] - t[3 * i + a]) * r,
                e[a] = (t[3 * a + o] + t[3 * o + a]) * r,
                e[i] = (t[3 * i + o] + t[3 * o + i]) * r
            }
            return e
        },
        p.str = function(e) {
            return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
        },
        "undefined" != typeof e && (e.quat = p)
    } (t.exports)
} (this),
function(e, t) {
    "use strict";
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.MersenneTwister = t()
} (this,
function() {
    "use strict";
    var e = 4294967296,
    t = 624,
    r = 397,
    n = 2147483648,
    o = 2147483647,
    a = 2567483615,
    i = function(e) {
        "undefined" == typeof e && (e = (new Date).getTime()),
        this.mt = new Array(t),
        this.mti = t + 1,
        this.seed(e)
    };
    i.prototype.seed = function(e) {
        var r;
        for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < t; this.mti++) r = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30,
        this.mt[this.mti] = (1812433253 * ((4294901760 & r) >>> 16) << 16) + 1812433253 * (65535 & r) + this.mti,
        this.mt[this.mti] >>>= 0
    },
    i.prototype.seedArray = function(e) {
        var r, n = 1,
        o = 0,
        a = t > e.length ? t: e.length;
        for (this.seed(19650218); a > 0; a--) r = this.mt[n - 1] ^ this.mt[n - 1] >>> 30,
        this.mt[n] = (this.mt[n] ^ (1664525 * ((4294901760 & r) >>> 16) << 16) + 1664525 * (65535 & r)) + e[o] + o,
        this.mt[n] >>>= 0,
        n++,
        o++,
        n >= t && (this.mt[0] = this.mt[t - 1], n = 1),
        o >= e.length && (o = 0);
        for (a = t - 1; a; a--) r = this.mt[n - 1] ^ this.mt[n - 1] >>> 30,
        this.mt[n] = (this.mt[n] ^ (1566083941 * ((4294901760 & r) >>> 16) << 16) + 1566083941 * (65535 & r)) - n,
        this.mt[n] >>>= 0,
        n++,
        n >= t && (this.mt[0] = this.mt[t - 1], n = 1);
        this.mt[0] = 2147483648
    },
    i.prototype["int"] = function() {
        var e, i, u = new Array(0, a);
        if (this.mti >= t) {
            for (this.mti === t + 1 && this.seed(5489), i = 0; t - r > i; i++) e = this.mt[i] & n | this.mt[i + 1] & o,
            this.mt[i] = this.mt[i + r] ^ e >>> 1 ^ u[1 & e];
            for (; t - 1 > i; i++) e = this.mt[i] & n | this.mt[i + 1] & o,
            this.mt[i] = this.mt[i + (r - t)] ^ e >>> 1 ^ u[1 & e];
            e = this.mt[t - 1] & n | this.mt[0] & o,
            this.mt[t - 1] = this.mt[r - 1] ^ e >>> 1 ^ u[1 & e],
            this.mti = 0
        }
        return e = this.mt[this.mti++],
        e ^= e >>> 11,
        e ^= e << 7 & 2636928640,
        e ^= e << 15 & 4022730752,
        e ^= e >>> 18,
        e >>> 0
    },
    i.prototype.int31 = function() {
        return this["int"]() >>> 1
    },
    i.prototype.real = function() {
        return this["int"]() * (1 / (e - 1))
    },
    i.prototype.realx = function() {
        return (this["int"]() + .5) * (1 / e)
    },
    i.prototype.rnd = function() {
        return this["int"]() * (1 / e)
    },
    i.prototype.rndHiRes = function() {
        var e = this["int"]() >>> 5,
        t = this["int"]() >>> 6;
        return (67108864 * e + t) * (1 / 9007199254740992)
    };
    var u = new i;
    return i.random = function() {
        return u.rnd()
    },
    i
}),
function(e) {
    function t(e, t, r) {
        this.x = e,
        this.y = t,
        this.z = r
    }
    function r(e) {
        return e * e * e * (e * (6 * e - 15) + 10)
    }
    function n(e, t, r) {
        return (1 - r) * e + r * t
    }
    var o = e.noise = {};
    t.prototype.dot2 = function(e, t) {
        return this.x * e + this.y * t
    },
    t.prototype.dot3 = function(e, t, r) {
        return this.x * e + this.y * t + this.z * r
    };
    var a = [new t(1, 1, 0), new t( - 1, 1, 0), new t(1, -1, 0), new t( - 1, -1, 0), new t(1, 0, 1), new t( - 1, 0, 1), new t(1, 0, -1), new t( - 1, 0, -1), new t(0, 1, 1), new t(0, -1, 1), new t(0, 1, -1), new t(0, -1, -1)],
    i = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180],
    u = new Array(512),
    c = new Array(512);
    o.seed = function(e) {
        e > 0 && 1 > e && (e *= 65536),
        e = Math.floor(e),
        256 > e && (e |= e << 8);
        for (var t = 0; 256 > t; t++) {
            var r;
            r = 1 & t ? i[t] ^ 255 & e: i[t] ^ e >> 8 & 255,
            u[t] = u[t + 256] = r,
            c[t] = c[t + 256] = a[r % 12]
        }
    },
    o.seed(0);
    var l = .5 * (Math.sqrt(3) - 1),
    s = (3 - Math.sqrt(3)) / 6,
    f = 1 / 3,
    v = 1 / 6;
    o.simplex2 = function(e, t) {
        var r, n, o, a, i, f = (e + t) * l,
        v = Math.floor(e + f),
        p = Math.floor(t + f),
        g = (v + p) * s,
        h = e - v + g,
        m = t - p + g;
        h > m ? (a = 1, i = 0) : (a = 0, i = 1);
        var d = h - a + s,
        _ = m - i + s,
        b = h - 1 + 2 * s,
        y = m - 1 + 2 * s;
        v &= 255,
        p &= 255;
        var T = c[v + u[p]],
        w = c[v + a + u[p + i]],
        E = c[v + 1 + u[p + 1]],
        x = .5 - h * h - m * m;
        0 > x ? r = 0 : (x *= x, r = x * x * T.dot2(h, m));
        var A = .5 - d * d - _ * _;
        0 > A ? n = 0 : (A *= A, n = A * A * w.dot2(d, _));
        var M = .5 - b * b - y * y;
        return 0 > M ? o = 0 : (M *= M, o = M * M * E.dot2(b, y)),
        70 * (r + n + o)
    },
    o.simplex3 = function(e, t, r) {
        var n, o, a, i, l, s, p, g, h, m, d = (e + t + r) * f,
        _ = Math.floor(e + d),
        b = Math.floor(t + d),
        y = Math.floor(r + d),
        T = (_ + b + y) * v,
        w = e - _ + T,
        E = t - b + T,
        x = r - y + T;
        w >= E ? E >= x ? (l = 1, s = 0, p = 0, g = 1, h = 1, m = 0) : w >= x ? (l = 1, s = 0, p = 0, g = 1, h = 0, m = 1) : (l = 0, s = 0, p = 1, g = 1, h = 0, m = 1) : x > E ? (l = 0, s = 0, p = 1, g = 0, h = 1, m = 1) : x > w ? (l = 0, s = 1, p = 0, g = 0, h = 1, m = 1) : (l = 0, s = 1, p = 0, g = 1, h = 1, m = 0);
        var A = w - l + v,
        M = E - s + v,
        R = x - p + v,
        P = w - g + 2 * v,
        L = E - h + 2 * v,
        D = x - m + 2 * v,
        S = w - 1 + 3 * v,
        F = E - 1 + 3 * v,
        k = x - 1 + 3 * v;
        _ &= 255,
        b &= 255,
        y &= 255;
        var G = c[_ + u[b + u[y]]],
        I = c[_ + l + u[b + s + u[y + p]]],
        U = c[_ + g + u[b + h + u[y + m]]],
        N = c[_ + 1 + u[b + 1 + u[y + 1]]],
        B = .6 - w * w - E * E - x * x;
        0 > B ? n = 0 : (B *= B, n = B * B * G.dot3(w, E, x));
        var W = .6 - A * A - M * M - R * R;
        0 > W ? o = 0 : (W *= W, o = W * W * I.dot3(A, M, R));
        var O = .6 - P * P - L * L - D * D;
        0 > O ? a = 0 : (O *= O, a = O * O * U.dot3(P, L, D));
        var C = .6 - S * S - F * F - k * k;
        return 0 > C ? i = 0 : (C *= C, i = C * C * N.dot3(S, F, k)),
        32 * (n + o + a + i)
    },
    o.perlin2 = function(e, t) {
        var o = Math.floor(e),
        a = Math.floor(t);
        e -= o,
        t -= a,
        o = 255 & o,
        a = 255 & a;
        var i = c[o + u[a]].dot2(e, t),
        l = c[o + u[a + 1]].dot2(e, t - 1),
        s = c[o + 1 + u[a]].dot2(e - 1, t),
        f = c[o + 1 + u[a + 1]].dot2(e - 1, t - 1),
        v = r(e);
        return n(n(i, s, v), n(l, f, v), r(t))
    },
    o.perlin3 = function(e, t, o) {
        var a = Math.floor(e),
        i = Math.floor(t),
        l = Math.floor(o);
        e -= a,
        t -= i,
        o -= l,
        a = 255 & a,
        i = 255 & i,
        l = 255 & l;
        var s = c[a + u[i + u[l]]].dot3(e, t, o),
        f = c[a + u[i + u[l + 1]]].dot3(e, t, o - 1),
        v = c[a + u[i + 1 + u[l]]].dot3(e, t - 1, o),
        p = c[a + u[i + 1 + u[l + 1]]].dot3(e, t - 1, o - 1),
        g = c[a + 1 + u[i + u[l]]].dot3(e - 1, t, o),
        h = c[a + 1 + u[i + u[l + 1]]].dot3(e - 1, t, o - 1),
        m = c[a + 1 + u[i + 1 + u[l]]].dot3(e - 1, t - 1, o),
        d = c[a + 1 + u[i + 1 + u[l + 1]]].dot3(e - 1, t - 1, o - 1),
        _ = r(e),
        b = r(t),
        y = r(o);
        return n(n(n(s, g, _), n(f, h, _), y), n(n(v, m, _), n(p, d, _), y), b)
    }
} (this);
var GTW = window.GTW || {};
GTW.resource_url = function(e) {
    return "assets/map/" + e
},
function() {
    function e(e) {
        return Math.PI * e / 180
    }
    function t(e) {
        return 180 * e / Math.PI
    }
    function r(e, t, r) {
        return (1 - r) * e + r * t
    }
    function n(e, t, r) {
        return t > e ? t: e > r ? r: e
    }
    function o(e) {
        return 3 * e * e - 2 * e * e * e
    }
    function a(e, t) {
        return (e % t + t) % t
    }
    function i(e) {
        return 0 > e ? -1 : e > 0 ? 1 : 0
    }
    function u(e, t) {
        return e[t] = !e[t]
    }
    function c(e) {
        for (var t = 5381,
        r = e.length - 1; r >= 0; --r) t = (t << 5) + t + e.charCodeAt(r);
        return t
    }
    function l(e) {
        function t(e) {
            e = e || 1;
            for (var t = ""; e--;) t += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            return t
        }
        return _.isUndefined(e) && (e = "-"),
        _.map([2, 1, 1, 1, 3],
        function(e) {
            return t(e)
        }).join(e)
    }
    function s(e, t) {
        for (var t = t || 1,
        r = [], n = 0; n < e.length; ++n) r.push(n);
        for (var o = vec3.create(), a = vec3.create(), i = 0, u = 1 / 0, c = vec3.create(), l = 0; t > l; ++l) {
            l > 0 && y.shuffle(r);
            for (var n = 0; n < r.length; ++n) {
                var s = r[n],
                f = e[s];
                if (0 !== n) {
                    if (! (vec3.dist(o, f) < i) && (vec3.sub(c, o, f), vec3.normalize(c, c), vec3.scale(c, c, i), vec3.add(c, c, o), vec3.lerp(o, f, c, .5), i = .5 * vec3.dist(f, c), i > u)) break
                } else vec3.copy(o, f),
                i = 0
            }
            i && u > i && (vec3.copy(a, o), u = i)
        }
        return {
            center: a,
            radius: u
        }
    }
    function f(e, t) {
        for (var r = 0,
        n = 0; r < e.length;) {
            var o = e.indexOf("\n", r); - 1 == o && (o = e.length);
            var a = e.substr(r, o - r);
            r = o + 1,
            t(a, n++)
        }
    }
    function v(e) {
        return _.isUndefined(e.offsetX) ? [e.layerX, e.layerY] : [e.offsetX, e.offsetY]
    }
    var p, g = Math.PI,
    h = g / 2,
    m = 2 * g,
    d = 0,
    b = Math.random,
    y = {
        cardinal: function(e) {
            return Math.floor(e * b())
        },
        integer: function(e, t) {
            return e + Math.floor((t - e) * b())
        },
        uniform: function(e, t) {
            return r(e, t, Math.random())
        },
        gauss: function(e, t) {
            var r = d;
            if (d = 0, 0 === r) {
                var n = m * b(),
                o = Math.sqrt( - 2 * Math.log(1 - b()));
                r = Math.cos(n) * o,
                d = Math.sin(n) * o
            }
            return e + r * t
        },
        choose: function(e) {
            var t = y.cardinal(e.length);
            return e[t]
        },
        uniformVec3: function(e, t) {
            return e[0] = 2 * t * (b() - .5),
            e[1] = 2 * t * (b() - .5),
            e[2] = 2 * t * (b() - .5),
            e
        },
        unitVec3: function(e) {
            return y.uniformVec3(e, 1),
            vec3.normalize(e, e),
            e
        },
        shuffle: function(e) {
            for (var t = e.length - 1; t >= 0; --t) {
                var r = y.cardinal(t + 1),
                n = e[t];
                e[t] = e[r],
                e[r] = n
            }
        },
        distribute: function(e, t, n) {
            return r(e, t, Math.pow(b(), n))
        }
    },
    T = {
        decode: function(e, t) {
            for (var r = atob(e), n = r.length, o = new ArrayBuffer(n), a = new Uint8Array(o), i = 0; n > i; ++i) a[i] = r.charCodeAt(i);
            return t ? new t(o) : o
        },
        encode: function(e) {
            for (var e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength), t = e.length, r = "", n = 0; t > n; ++n) r += String.fromCharCode(e[n]);
            return btoa(r)
        }
    };
    p = this.performance && performance.now ?
    function() {
        return.001 * performance.now()
    }: function() {
        return.001 * Date.now()
    },
    _.extend(this, {
        PI: g,
        HALF_PI: h,
        TWO_PI: m,
        deg2rad: e,
        rad2deg: t,
        lerp: r,
        clamp: n,
        smoothstep: o,
        modulo: a,
        sign: i,
        toggleProperty: u,
        hashDJB2: c,
        makeUuid: l,
        Random: y,
        miniball: s,
        Base64: T,
        timeNow: p,
        forEachLine: f,
        getMouseEventOffset: v
    }),
    this.requestAnimationFrame || (this.requestAnimationFrame = this.webkitRequestAnimationFrame || this.mozRequestAnimationFrame || this.msRequestAnimationFrame ||
    function(e) {
        setTimeout(e, 1e3 / 60)
    }),
    this.saveFileAs = function(e, t, r) {
        r = r || "application/octet-binary";
        var n = new Blob([e], {
            type: r
        }),
        o = URL.createObjectURL(n),
        a = document.createElement("a");
        a.setAttribute("href", o),
        a.setAttribute("download", t),
        a.click(),
        URL.revokeObjectURL(n)
    }
}.call(window),
vec2.load = function(e, t, r) {
    e[0] = t[r + 0],
    e[1] = t[r + 1]
},
vec2.save = function(e, t, r) {
    t[r + 0] = e[0],
    t[r + 1] = e[1]
},
vec3.load = function(e, t, r) {
    e[0] = t[r + 0],
    e[1] = t[r + 1],
    e[2] = t[r + 2]
},
vec3.save = function(e, t, r) {
    t[r + 0] = e[0],
    t[r + 1] = e[1],
    t[r + 2] = e[2]
},
vec4.load = function(e, t, r) {
    e[0] = t[r + 0],
    e[1] = t[r + 1],
    e[2] = t[r + 2],
    e[3] = t[r + 3]
},
vec4.save = function(e, t, r) {
    t[r + 0] = e[0],
    t[r + 1] = e[1],
    t[r + 2] = e[2],
    t[r + 3] = e[3]
},
vec2.perp = function(e, t) {
    var r = t[0];
    e[0] = -t[1],
    e[1] = r
},
mat4.lerp = function(e, t, r, n) {
    for (var o = 0; 16 > o; ++o) e[o] = (1 - n) * t[o] + n * r[o];
    return e
};
var webgl = function() {
    function e(e) {
        this.name = e,
        this.program = null,
        this.attribs = {},
        this.uniforms = {}
    }
    function t(e, t, r) {
        var n = gl.createShader(e);
        if (gl.shaderSource(n, t), gl.compileShader(n), gl.getShaderParameter(n, gl.COMPILE_STATUS)) return n;
        gl.getShaderInfoLog(n);
        throw console.log("Shader: " + r),
        console.log("Type: " + (e == gl.VERTEX_SHADER ? "vertex": "fragment")),
        forEachLine(t,
        function(e, t) {
            var r = ("  " + (t + 1)).slice( - 3);
            console.log(r + ": " + e)
        }),
        {
            type: "COMPILE",
            shaderType: e == gl.VERTEX_SHADER ? "vertex": "fragment",
            name: r,
            shader: n,
            source: gl.getShaderSource(n),
            log: gl.getShaderInfoLog(n)
        }
    }
    function r(e) {
        var r = "precision highp float;\n",
        n = gl.createProgram();
        if (gl.attachShader(n, t(gl.VERTEX_SHADER, e.vertexSource, e.name)), gl.attachShader(n, t(gl.FRAGMENT_SHADER, r + e.fragmentSource, e.name)), gl.linkProgram(n), gl.getProgramParameter(n, gl.LINK_STATUS)) return n;
        throw {
            type: "LINK",
            name: e.name,
            program: n,
            log: gl.getProgramInfoLog(n)
        }
    }
    function n(e) {
        function t(e) {
            var t = /^\/\/\s*(\w+(?:.(vertex|fragment))?)\s*\/\//,
            r = [];
            forEachLine(e,
            function(e) {
                var n = t.exec(e);
                if (n) {
                    var o = n[1];
                    i[o] = r = []
                } else r.push(e)
            })
        }
        i = {},
        _.each(e,
        function(e) {
            return _.isObject(e) ? void _.extend(i, e) : void $.ajax({
                url: e,
                async: !1,
                cache: !1,
                success: t
            })
        }),
        _.each(i,
        function(e, t) {
            _.isArray(e) && (i[t] = e.join("\n"))
        })
    }
    function o(e, t, r, n) {
        switch (this.width = e, this.height = t, this.framebuffer = gl.createFramebuffer(), gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer), this.texture = gl.createTexture(), gl.bindTexture(gl.TEXTURE_2D, this.texture), this.dataType = n ? gl.FLOAT: gl.UNSIGNED_BYTE, gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, e, t, 0, gl.RGBA, this.dataType, null), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0), this.depthTexture = null, this.depthRenderbuffer = null, r = r ? "TEXTURE": "NONE", r = "RENDERBUFFER") {
        case "TEXTURE":
            this.depthTexture = gl.createTexture(),
            gl.bindTexture(gl.TEXTURE_2D, this.depthTexture),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, e, t, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null),
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
            break;
        case "RENDERBUFFER":
            this.depthRenderbuffer = gl.createRenderbuffer(),
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer),
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, e, t),
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthRenderbuffer),
            gl.bindRenderbuffer(gl.RENDERBUFFER, null)
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    var a = {
        enabledMask: 0,
        maxEnabledIndex: -1,
        disableAll: function() {
            for (var e = 0; e <= this.maxEnabledIndex; ++e) {
                var t = 1 << e;
                t & this.enabledMask && gl.disableVertexAttribArray(e)
            }
            this.enabledMask = 0,
            this.maxEnabledIndex = -1
        },
        enable: function(e) {
            var t = 1 << e;
            t & this.enabledMask || (gl.enableVertexAttribArray(e), this.enabledMask |= t, this.maxEnabledIndex = Math.max(this.maxEnabledIndex, e))
        },
        disable: function(e) {
            var t = 1 << e;
            t & this.enabledMask && (gl.disableVertexAttribArray(e), this.enabledMask &= ~t)
        }
    };
    e.prototype.setProgram = function(e) {
        function t(e) {
            if (e.type == gl.SAMPLER_2D || e.type == gl.SAMPLER_CUBE) {
                var t = a;
                return a += e.size,
                t
            }
            return - 1
        }
        this.program = e;
        for (var r = gl.getProgramParameter(e, gl.ACTIVE_ATTRIBUTES), n = 0; r > n; ++n) {
            var o = gl.getActiveAttrib(e, n);
            this.attribs[o.name] = {
                index: gl.getAttribLocation(e, o.name),
                name: o.name,
                size: o.size,
                type: o.type
            }
        }
        for (var a = 0,
        i = gl.getProgramParameter(e, gl.ACTIVE_UNIFORMS), n = 0; i > n; ++n) {
            var u = gl.getActiveUniform(e, n);
            this.uniforms[u.name] = {
                location: gl.getUniformLocation(e, u.name),
                name: u.name,
                size: u.size,
                type: u.type,
                texUnit: t(u)
            }
        }
    },
    e.prototype.use = function() {
        return gl.useProgram(this.program),
        a.disableAll(),
        this
    },
    e.prototype.getUniformLocation = function(e) {
        var t = this.uniforms[e];
        return t ? t.location: null
    },
    e.prototype.getAttribIndex = function(e) {
        var t = this.attribs[e];
        return t ? t.index: -1
    },
    e.prototype.uniform1i = function(e, t) {
        var r = this.getUniformLocation(e);
        r && gl.uniform1i(r, t)
    },
    e.prototype.uniform1f = function(e, t) {
        var r = this.getUniformLocation(e);
        r && gl.uniform1f(r, t)
    },
    e.prototype.uniform2f = function(e, t, r) {
        var n = this.getUniformLocation(e);
        n && gl.uniform2f(n, t, r)
    },
    e.prototype.uniform3f = function(e, t, r, n) {
        var o = this.getUniformLocation(e);
        o && gl.uniform3f(o, t, r, n)
    },
    e.prototype.uniform4f = function(e, t, r, n, o) {
        var a = this.getUniformLocation(e);
        a && gl.uniform4f(a, t, r, n, o)
    },
    e.prototype.uniform1fv = function(e, t) {
        var r = this.getUniformLocation(e);
        r && gl.uniform1fv(r, t)
    },
    e.prototype.uniform2fv = function(e, t) {
        var r = this.getUniformLocation(e);
        r && gl.uniform2fv(r, t)
    },
    e.prototype.uniform3fv = function(e, t) {
        var r = this.getUniformLocation(e);
        r && gl.uniform3fv(r, t)
    },
    e.prototype.uniform4fv = function(e, t) {
        var r = this.getUniformLocation(e);
        r && gl.uniform4fv(r, t)
    },
    e.prototype.uniformMatrix3fv = function(e, t, r) {
        var n = this.getUniformLocation(e);
        n && (r = r || !1, gl.uniformMatrix3fv(n, r, t))
    },
    e.prototype.uniformMatrix4fv = function(e, t, r) {
        var n = this.getUniformLocation(e);
        n && (r = r || !1, gl.uniformMatrix4fv(n, r, t))
    },
    e.prototype.uniformSampler = function(e, t, r) {
        var n = this.uniforms[e];
        n && (gl.activeTexture(gl.TEXTURE0 + n.texUnit), gl.bindTexture(t, r), gl.uniform1i(n.location, n.texUnit))
    },
    e.prototype.uniformSampler2D = function(e, t) {
        this.uniformSampler(e, gl.TEXTURE_2D, t)
    },
    e.prototype.uniformSamplerCube = function(e, t) {
        this.uniformSampler(e, gl.TEXTURE_CUBE_MAP, t)
    },
    e.prototype.enableVertexAttribArray = function(e) {
        var t = this.attribs[e];
        t && a.enable(t.index)
    },
    e.prototype.disableVertexAttribArray = function(e) {
        var t = this.attribs[e];
        t && a.disable(t.index)
    },
    e.prototype.vertexAttribPointer = function(e, t, r, n, o, i) {
        var u = this.attribs[e];
        u && (a.enable(u.index), gl.vertexAttribPointer(u.index, t, r, n, o, i))
    };
    var i = {},
    u = function() {
        function t(e) {
            var t = !!i[e];
            return console.assert(t, e + " not found."),
            t
        }
        function n(n, o) {
            if (t(n) && t(n + ".vertex") && t(n + ".fragment")) {
                o = o || {};
                var a = "";
                o.defines && _.each(o.defines,
                function(e, t) {
                    a += "#define " + t + " " + e + "\n"
                });
                var u = a + (i[n] || ""),
                c = _.reject(u.split("\n"),
                function(e) {
                    return e.match(/attribute/)
                }).join("\n");
                try {
                    var l = new e(n);
                    return l.setProgram(r({
                        name: n,
                        vertexSource: u + i[n + ".vertex"],
                        fragmentSource: c + i[n + ".fragment"]
                    })),
                    l
                } catch(s) {
                    return onGLSLError(s),
                    null
                }
            }
        }
        function o(e, t) {
            var r = [];
            return t && t.defines && _.each(t.defines,
            function(e, t) {
                r.push(t + "=" + e)
            }),
            e + " " + r.join(" ")
        }
        return _.memoize(n, o)
    } ();
    return o.prototype.render = function(e) {
        var t = gl.getParameter(gl.VIEWPORT);
        gl.viewport(0, 0, this.width, this.height),
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer),
        e(),
        gl.bindFramebuffer(gl.FRAMEBUFFER, null),
        gl.viewport(t[0], t[1], t[2], t[3])
    },
    o.prototype.resize = function(e, t) {
        this.width = e,
        this.height = t,
        gl.bindTexture(gl.TEXTURE_2D, this.texture),
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, e, t, 0, gl.RGBA, this.dataType, null),
        this.depthTexture && (gl.bindTexture(gl.TEXTURE_2D, this.depthTexture), gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, e, t, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null)),
        this.depthRenderbuffer && (gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, e, t), gl.bindRenderbuffer(gl.RENDERBUFFER, null))
    },
    {
        makeBuffer: function(e, t, r) {
            r = r || gl.STATIC_DRAW;
            var n = gl.createBuffer();
            return gl.bindBuffer(e, n),
            gl.bufferData(e, t, r),
            n
        },
        makeVertexBuffer: function(e, t) {
            return this.makeBuffer(gl.ARRAY_BUFFER, e, t)
        },
        makeElementBuffer: function(e, t) {
            return this.makeBuffer(gl.ELEMENT_ARRAY_BUFFER, e, t)
        },
        bindVertexBuffer: function(e) {
            gl.bindBuffer(gl.ARRAY_BUFFER, e)
        },
        bindElementBuffer: function(e) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, e)
        },
        setupCanvas: function(e, t) {
            function r(r) {
                try {
                    return e.getContext(r, t)
                } catch(n) {
                    return null
                }
            }
            t = t || {},
            t = _.defaults(t, {
                antialias: !1,
                preserveDrawingBuffer: !0,
                extensions: [],
                shaderSources: ["shaders/all-shaders.glsl"]
            });
            var o = r("webgl") || r("experimental-webgl");
            if (o) {
                var a = this.extensions = {};
                _.each(t.extensions,
                function(e) {
                    a[e] = o.getExtension(e)
                }),
                window.gl = o,
                n(t.shaderSources)
            }
            return o
        },
        getProgram: u,
        createTexture2D: function(e) {
            var t = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, t),
            e = e || {},
            e.width = e.width || e.size || 4,
            e.height = e.height || e.width,
            e.format = e.format || gl.RGBA,
            e.type = e.type || gl.UNSIGNED_BYTE,
            e.mag = e.mag || e.filter || gl.NEAREST,
            e.min = e.min || e.mag,
            e.wrapS = e.wrapS || e.wrap || gl.CLAMP_TO_EDGE,
            e.wrapT = e.wrapT || e.wrapS,
            e.dataFormat = e.dataFormat || e.format,
            e.data = e.data || null;
            var r = 0,
            n = 0;
            if (gl.texImage2D(gl.TEXTURE_2D, r, e.format, e.width, e.height, n, e.dataFormat, e.type, e.data), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, e.min), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, e.mag), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, e.wrapS), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, e.wrapT), e.aniso) {
                var o = webgl.extensions.WEBKIT_EXT_texture_filter_anisotropic;
                o && gl.texParameteri(gl.TEXTURE_2D, o.TEXTURE_MAX_ANISOTROPY_EXT, e.aniso)
            }
            return t
        },
        loadTexture2D: function(e, t) {
            t = t || {},
            t = _.defaults(t, {
                mipmap: !1,
                flip: !1,
                callback: null,
                filter: gl.LINEAR
            });
            var r = this.createTexture2D(t),
            n = new Image;
            return n.src = e,
            n.onload = function() {
                gl.bindTexture(gl.TEXTURE_2D, r),
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, t.flip ? 1 : 0),
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, n),
                t.mipmap && (gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), gl.generateMipmap(gl.TEXTURE_2D)),
                t.callback && t.callback(r)
            },
            r
        },
        RenderTexture: o
    }
} ();
window.onGLSLError = function(e) {
    console.log("GLSL error:", e);
    var t = {};
    switch (forEachLine(e.log,
    function(e, r) {
        var n = e.match(/^ERROR: \d+:(\d+):(.*)$/);
        if (n) {
            var o = parseInt(n[1]),
            a = n[2];
            t[o] || (t[o] = []),
            t[o].push(a)
        }
    }), console.log(t), e.type) {
    case "COMPILE":
        html = '<div class="description">GLSL compile error in ' + e.shaderType.toLowerCase() + ' shader "' + e.name + '":</div>',
        forEachLine(e.source,
        function(e, r) {
            var n = t[r + 1];
            n ? (n = _.map(n,
            function(e) {
                return "<div class='description'>" + e + "</div>"
            }).join(""), html += "<span class='highlight'>" + e + "</span> " + n) : html += e + "\n"
        });
        break;
    case "LINK":
        html = '<div class="description">GLSL link error in program "' + e.name + '":<br/>\n' + e.log + "\n</div>"
    }
    $(".glsl-error").html("<code>" + html + "</code>").show()
};
var GTW = GTW || {}; !
function() {
    GTW.create_gradient_texture = function(e) {
        var t = document.createElement("canvas");
        t.width = 1024,
        t.height = 1;
        var r = t.getContext("2d"),
        n = r.createLinearGradient(0, 0, t.width, 0);
        _.each(e,
        function(e, t) {
            n.addColorStop(parseFloat(t), e)
        }),
        r.fillStyle = n,
        r.fillRect(0, 0, t.width, t.height);
        var o = webgl.createTexture2D({
            filter: gl.LINEAR
        });
        return gl.bindTexture(gl.TEXTURE_2D, o),
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t),
        o
    },
    GTW.load_resources = function(e, t) {
        function r(e, r) {
            n[e] = r,
            0 === --o && t(n)
        }
        var n = {},
        o = _.keys(e).length;
        _.each(e,
        function(e, t) {
            if (/\.(jpg|png)$/i.test(e)) {
                var n = new Image;
                n.src = e,
                n.onload = function() {
                    r(t, n)
                }
            } else $.getJSON(e,
            function(e) {
                r(t, e)
            })
        })
    }
} ();
var GTW = GTW || {}; !
function() {
    function e() {
        this.fov = 60,
        this.near = .01,
        this.far = 150,
        this.viewport = vec4.create(),
        this.proj = mat4.create(),
        this.view = mat4.create(),
        this.bill = mat3.create(),
        this.mvp = mat4.create(),
        this.mvpInv = mat4.create(),
        this.viewInv = mat4.create(),
        this.viewPos = vec3.create(),
        this.viewDir = vec3.create()
    }
    var t = vec3.fromValues(0, 1, 0),
    r = vec3.create();
    e.prototype._update_projection = function() {
        var e = this.viewport[2] / this.viewport[3];
        mat4.perspective(this.proj, deg2rad(this.fov), e, this.near, this.far)
    },
    e.prototype._update_mvp = function() {
        var e = this.bill,
        t = this.view;
        e[0] = t[0],
        e[1] = t[4],
        e[2] = t[8],
        e[3] = t[1],
        e[4] = t[5],
        e[5] = t[9],
        e[6] = t[2],
        e[7] = t[6],
        e[8] = t[10],
        mat4.multiply(this.mvp, this.proj, this.view),
        mat4.invert(this.mvpInv, this.mvp),
        mat4.invert(this.viewInv, this.view),
        vec3.transformMat4(this.viewPos, [0, 0, 0], this.viewInv),
        vec3.set(this.viewDir, -this.viewInv[8], -this.viewInv[9], -this.viewInv[10])
    },
    e.prototype.update = function(e, n) {
        this._update_projection(),
        vec3.add(r, e, n),
        mat4.lookAt(this.view, e, r, t),
        this._update_mvp()
    };
    var n = mat4.create();
    e.prototype.update_quat = function(e, t, r) {
        if (this._update_projection(), mat4.fromRotationTranslation(n, t, e), mat4.invert(n, n), r) for (var o = n,
        a = this.view,
        i = r,
        u = 1 - r,
        c = 0; 16 > c; ++c) a[c] = i * a[c] + u * o[c];
        else mat4.copy(this.view, n);
        this._update_mvp()
    },
    e.prototype.unproject = function(e, t) {
        var r = vec4.create();
        r[0] = 2 * (t[0] / this.viewport[2]) - 1,
        r[1] = 2 * (t[1] / this.viewport[3]) - 1,
        r[1] = 1 - r[1],
        r[2] = 0,
        r[3] = 1,
        vec4.transformMat4(r, r, this.mvpInv),
        e[0] = r[0] / r[3],
        e[1] = r[1] / r[3]
    },
    GTW.Camera = e
} ();
var GTW = GTW || {}; !
function() {
    function e(e) {
        return - e * Math.log(1 - MersenneTwister.random())
    }
    function t() {
        this.key = 0,
        this.count = 0,
        this.remaining = 0,
        this.end_time = 0,
        this.next_event_time = 0,
        this.coords = null,
        this.angle = 0
    }
    function r() {
        this.next_fetch_time = 0,
        this.kevents = []
    }
    var n = 6e4,
    o = 60 * n,
    a = 24 * o;
    t.prototype.next_event = function() {
        var t = Math.max(0, this.end_time - this.next_event_time),
        r = t / this.remaining,
        n = e(r);
        this.next_event_time += n,
        this.angle += Math.PI / 5
    },
    r.prototype.clear_events = function() {
        this.kevents = []
    },
    r.prototype.add_events = function(e, r) {
        for (var n = 0; n < e.length; n += 2) {
            var a = e[n + 0],
            i = e[n + 1],
            u = new t;
            u.key = a,
            u.remaining = u.count = i,
            u.next_event_time = r,
            u.end_time = r + o,
            u.next_event(),
            this.kevents.push(u)
        }
    },
    r.prototype.add_ddos_events = function(e, r) {
        function n(e) {
            return e = 65535 & e,
            e >= 32768 && (e = -(65536 - e)),
            e / 32768
        }
        function a(e, t) {
            var r = n(t >> 0),
            o = n(t >> 16);
            e[0] = 180 * r,
            e[1] = 90 * o
        }
        for (var i = o / 100,
        u = 0,
        c = vec2.create(), l = vec2.create(); u < e.length;) {
            var s = e[u++],
            f = s >> 16 & 255;
            for (console.assert(8 == f), a(c, e[u++]), a(l, e[u++]);;) {
                var v = e[u++],
                p = 65535 & v,
                g = v >> 16;
                if (console.assert(p >= 0 && 100 > p), 0 == g) break;
                var h = r + i * p,
                m = 30,
                d = 500;
                g = Math.min(g * m, d);
                var _ = new t;
                _.key = s,
                _.remaining = _.count = g,
                _.next_event_time = h,
                _.end_time = h + i,
                _.coords = vec4.fromValues(c[0], c[1], l[0], l[1]),
                _.next_event(),
                this.kevents.push(_)
            }
        }
    },
    r.prototype.fetch = function(e) {
        function t(t) {
            var i = Base64.decode(t.events, Uint32Array),
            u = Base64.decode(t.totals, Uint32Array);
            if (GTW.reset_counters(), GTW.update_counters(u), t.totals8) {
                var c = Base64.decode(t.totals8, Uint32Array);
                GTW.update_counters(c)
            }
            var l = Math.floor(e / a) * a + r * o;
            if (n.clear_events(), n.add_events(i, l), t.events8) {
                var s = Base64.decode(t.events8, Uint32Array);
                n.add_ddos_events(s, l)
            }
            if (t.counts8) {
                var f = Base64.decode(t.counts8, Uint32Array);
                n.add_events(f, l)
            }
            var v = n.poll_events(e);
            _.each(v,
            function(e) {
                var t = e.key,
                r = t >> 16 & 255,
                n = t >> 8 & 255,
                o = !0;
                if (8 == r && e.coords && (o = !1), 8 == r && 0 == n && (o = !1), o) {
                    var a = GTW.systems[r]; ++a.count,
                    ++a.target_count[n],
                    ++GTW.total_target_count[n]
                }
            })
        }
        var r = Math.floor(e / o % 24);
        this.next_fetch_time = (1 + Math.floor(e / o)) * o;
        var n = this,
        i = "assets/data/events/" + r + ".json";
        $.getJSON(i, t)
    },
    r.prototype.poll_events = function(e) {
        this.next_fetch_time < e && this.fetch(e);
        var t = [];
        return _.each(this.kevents,
        function(r) {
            for (; r.next_event_time <= e;) {
                if (t.push(r), 0 == --r.remaining) {
                    r.next_event_time = 1 / 0;
                    break
                }
                r.next_event()
            }
        }),
        t
    },
    GTW.Simulator = r
} ();
var GTW = GTW || {}; !
function() {
    function e(e) {
        function t(t) {
            return parseInt(e.substr(2 * t, 2), 16) / 255
        }
        "#" == e[0] && (e = e.substr(1));
        var r = vec3.create();
        return r[0] = t(0),
        r[1] = t(1),
        r[2] = t(2),
        r
    }
    function t(t, r, n, o, a) {
        function i(t) {
            return {
                f: e(t),
                css: "#" + t
            }
        }
        this.id = t,
        this.name = r,
        this.description = n;
        var o = o.split(" ");
        1 === o.length && o.push(o[0]),
        this.color = {
            dark: i(o[0]),
            light: i(o[1])
        },
        this.n_sides = a,
        this.enabled = !0,
        this.enabled_graph = !0,
        this.count = 0,
        this.target_count = new Int32Array(256),
        this.target_rank = new Int32Array(256),
        this.graph = new Int32Array(60),
        this.el_count_selector = ".type-icons .symbol." + r.toLowerCase() + " .count",
        this.el_popcount_selector = "#" + r.toLowerCase() + "-popcount",
        this.el_popcount = $("#" + r.toLowerCase() + "-popcount")
    }
    function r(e, t) {
        s.sort(function(t, r) {
            return e[r] - e[t]
        }),
        _.each(s,
        function(e, r) {
            t[e] = 1 + r
        })
    }
    function n() {
        GTW.systems_foreach(function(e) {
            e.count = 0;
            for (var t = 0; 256 > t; ++t) e.target_count[t] = 0
        });
        for (var e = 0; 256 > e; ++e) GTW.total_target_count[e] = 0
    }
    function o(e) {
        if (e) for (var t = 0; t < e.length; t += 2) {
            var r = e[t + 0],
            n = e[t + 1],
            o = r >> 16 & 255,
            a = r >> 8 & 255,
            i = GTW.systems[o];
            0 === a ? i.count = n: (i.target_count[a] = n, GTW.total_target_count[a] += n)
        }
    }
    function a(e, t) {
        for (var r = null,
        n = 0,
        o = 0; o < t.length; ++o) {
            var a = t[o];
            if (!a.alive) return a;
            var i = e - a.start_time;
            i > n && (n = i, r = a)
        }
        return r ? r: _.sample(t)
    }
    function i(e) {
        var t = this;
        this.programs = {
            missile: webgl.getProgram("missile"),
            impact: webgl.getProgram("impact"),
            icon: webgl.getProgram("icon"),
            cone: webgl.getProgram("cone")
        },
        this.buffers = {
            missile: null,
            icon: null,
            cone: null,
            quad: webgl.makeVertexBuffer(new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]))
        },
        this.textures = {
            impact: webgl.loadTexture2D(GTW.resource_url("textures/impact-512.jpg"), {
                mipmap: !1
            })
        },
        function() {
            for (var e = [], r = 32, n = 0; r > n; ++n) {
                var o = TWO_PI * n / (r - 1),
                a = Math.cos(o),
                i = Math.sin(o);
                e.push(a, 0, i, a, 1, i)
            }
            e = new Float32Array(e),
            t.buffers.cone = webgl.makeVertexBuffer(e),
            t.n_cone_verts = e.length / 3
        } (),
        this.init_missiles(e),
        this.init_icons()
    }
    var u = {
        use_missiles: !0,
        use_impacts: !0,
        use_cones: !0,
        use_icons: !0,
        scale: 1,
        width: .1,
        height: .005,
        ff_impacts: !1
    },
    c = _.assign(_.clone(u), {
        use_impacts: !1,
        scale: 30,
        width: 10,
        height: .1,
        ff_impacts: !0
    }),
    l = u;
    GTW.total_target_count = new Int32Array(256),
    GTW.total_target_rank = new Int32Array(256),
    GTW.top_infected = new Int32Array(10);
    for (var s = [], f = 0; 256 > f; ++f) s.push(f);
    t.prototype.compute_target_rank = function() {
        r(this.target_count, this.target_rank)
    },
    GTW.compute_total_target_rank = function() {
        r(GTW.total_target_count, GTW.total_target_rank);
        for (var e = 0; e < GTW.top_infected.length; ++e) GTW.top_infected[e] = s[e]
    },
    GTW.systems = {
        1 : new t(1, "OAS", "On-Access Scanner", "38b349", 5),
        2 : new t(2, "ODS", "On-Demand Scanner", "ed1c24", 4),
        3 : new t(3, "MAV", "Mail Anti-Virus", "f26522", 3),
        4 : new t(4, "WAV", "Web Anti-Virus", "0087f4 0000f4", 32),
        5 : new t(5, "IDS", "Intrusion Detection System", "ec008c ff00b4", 6),
        6 : new t(6, "VUL", "Vulnerability Scanner", "fbf267", 8),
        7 : new t(7, "KAS", "Kaspersky Anti-Spam", "855ff4", -16),
        8 : new t(8, "BAD", "Botnet Activity Detection", "00d1a9", 31)
    };
    var v = 8;
    GTW.systems_foreach = function(e) {
        for (var t = 1; v >= t; ++t) {
            var r = GTW.systems[t];
            e(r, t)
        }
    };
    var p = 1e3,
    g = 100,
    h = 8 * g;
    i.prototype.init_missiles = function(e) {
        function t(t) {
            this.index = t,
            this.verts = o.subarray(this.index * h, (this.index + 1) * h),
            this.source_coord = vec3.create(),
            this.target_coord = vec3.create(),
            this.source_mat = mat4.create(),
            this.target_mat = mat4.create(),
            this.start_time = 0,
            this.alive = !1,
            this.style = 1,
            this.color = GTW.systems[this.style].color[e.palette].f,
            this.has_source = !0,
            this.has_target = !0,
            this.draw_source_impact = !0
        }
        function r(e, t, r, n) {
            var o = i,
            a = u,
            l = c,
            f = s;
            n.project(f, t),
            n.projection.blend > .5 ? (vec3.normalize(l, f), vec3.set(o, 0, 1, 0), vec3.cross(o, l, o), vec3.normalize(o, o), vec3.cross(a, o, l), e[0] = o[0], e[1] = o[1], e[2] = o[2], e[4] = l[0], e[5] = l[1], e[6] = l[2], e[8] = a[0], e[9] = a[1], e[10] = a[2]) : (mat4.identity(e), mat4.rotateX(e, e, -.5 * Math.PI)),
            r && mat4.scale(e, e, [r, r, r]),
            e[12] = f[0],
            e[13] = f[1],
            e[14] = f[2]
        }
        var n = this,
        o = new Float32Array(p * h),
        a = null,
        i = vec3.create(),
        u = vec3.create(),
        c = vec3.create(),
        s = vec3.create();
        t.prototype.launch = function(e, t, c, s, f, v) {
            if (this.style = t, this.shape = n.shapes[this.style], this.color = GTW.systems[this.style].color[e.palette].f, this.has_source = !!s, this.start_time = e.time, this.alive = !0, this.has_source && vec3.copy(this.source_coord, s), vec3.copy(this.target_coord, c), this.has_source) {
                var p = vec2.distance(s, c),
                m = l.height * p,
                d = (c[0] - s[0]) / p,
                _ = (c[1] - s[1]) / p,
                b = 200,
                y = b * -_,
                T = b * d;
                v = v || 0;
                for (var w = Math.cos(v), E = Math.sin(v), x = this.index * h, A = i, M = u, R = 0; g > R; ++R) {
                    var P = R / (g - 1);
                    vec3.lerp(M, s, c, P);
                    var L = m * Math.sin(P * Math.PI) * .15;
                    M[0] += E * L * y,
                    M[1] += E * L * T,
                    M[2] += w * L,
                    e.project(A, M),
                    o[x + 0] = A[0],
                    o[x + 1] = A[1],
                    o[x + 2] = A[2],
                    o[x + 3] = -P,
                    o[x + 4] = A[0],
                    o[x + 5] = A[1],
                    o[x + 6] = A[2],
                    o[x + 7] = P,
                    x += 8
                }
                var D = 4 * this.index * h;
                webgl.bindVertexBuffer(a),
                gl.bufferSubData(gl.ARRAY_BUFFER, D, this.verts)
            }
            this.has_source ? this.source_coord[2] < .015 ? (r(this.source_mat, this.source_coord, f, e), this.draw_source_impact = !0) : this.draw_source_impact = !1 : l.ff_impacts && (this.start_time -= 1),
            r(this.target_mat, this.target_coord, f, e)
        },
        this.missiles = [];
        for (var f = 0; p > f; ++f) this.missiles.push(new t(f));
        this.buffers.missile = a = webgl.makeVertexBuffer(o)
    },
    i.prototype.init_icons = function() {
        function e(e, t) {
            n.push(Math.cos(e), Math.sin(e), t)
        }
        function t() {
            this.offset = 0,
            this.count = 0
        }
        function r(r) {
            var o = new t;
            o.offset = n.length / 3;
            var a = 0 > r;
            r = Math.abs(r);
            var i;
            i = a ? Math.PI / r: TWO_PI / r;
            for (var u = 5,
            c = 0; u > c; ++c) {
                for (var l = 0,
                s = 0; r > s; ++s) e(l, c),
                e(l + i, c),
                l += i;
                a && (e(l, c), e(0, c)),
                31 == r && (l = .8, e(l, c), e(l + Math.PI, c))
            }
            return o.count = n.length / 3 - o.offset,
            o
        }
        var n = [],
        o = [];
        t.prototype.draw = function() {
            gl.drawArrays(gl.LINES, this.offset, this.count)
        },
        GTW.systems_foreach(function(e) {
            var t = r(e.n_sides);
            o[e.id] = t
        }),
        this.shapes = o,
        n = new Float32Array(n),
        this.buffers.icon = webgl.makeVertexBuffer(n)
    },
    i.prototype.draw = function(e) {
        var t = this,
        r = {
            active: 0,
            curves: 0
        };
        if (gl.enable(gl.DEPTH_TEST), gl.depthMask(!1), l.use_missiles) {
            gl.enable(gl.BLEND),
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var n = this.programs.missile.use();
            n.uniformMatrix4fv("mvp", e.camera.mvp),
            n.uniform3fv("view_position", e.camera.viewPos),
            n.uniform1f("width", l.width),
            webgl.bindVertexBuffer(this.buffers.missile),
            n.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
            _.each(this.missiles,
            function(t) {
                if (t.alive && t.has_source) {++r.curves;
                    var o = e.time - t.start_time;
                    if (2 > o) {
                        n.uniform1f("time", .5 * o),
                        n.uniform3fv("color", t.color);
                        var a = 2 * g,
                        i = a * t.index;
                        gl.drawArrays(gl.TRIANGLE_STRIP, i, a)
                    }
                }
            })
        }
        if (gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE), l.use_impacts && e.high_quality) {
            var n = this.programs.impact.use();
            n.uniformMatrix4fv("mvp", e.camera.mvp),
            n.uniformSampler2D("t_color", this.textures.impact),
            webgl.bindVertexBuffer(this.buffers.quad),
            n.vertexAttribPointer("position", 2, gl.FLOAT, !1, 0, 0),
            _.each(this.missiles,
            function(t) {
                if (t.alive) {++r.active;
                    var o = e.time - t.start_time;
                    if (o > 4) return void(t.alive = !1);
                    n.uniform3fv("color", t.color),
                    t.has_source && t.draw_source_impact && 1 > o && (n.uniformMatrix4fv("mat", t.source_mat), n.uniform1f("time", o), gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)),
                    t.has_target && o >= 1 && (n.uniformMatrix4fv("mat", t.target_mat), n.uniform1f("time", (o - 1) / 3), gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4))
                }
            })
        }
        if (l.use_cones && e.high_quality) {
            var n = this.programs.cone.use();
            n.uniformMatrix4fv("mvp", e.camera.mvp),
            webgl.bindVertexBuffer(this.buffers.cone),
            n.vertexAttribPointer("position", 3, gl.FLOAT, !1, 0, 0),
            _.each(this.missiles,
            function(r) {
                if (r.alive) {
                    var o = e.time - r.start_time;
                    r.has_target && o >= 1 && 2 > o && (n.uniform3fv("color", r.color), n.uniformMatrix4fv("mat", r.target_mat), n.uniform1f("time", o - 1), gl.drawArrays(gl.TRIANGLE_STRIP, 0, t.n_cone_verts))
                }
            })
        }
        if (l.use_icons) {
            var n = this.programs.icon.use();
            n.uniformMatrix4fv("mvp", e.camera.mvp),
            n.uniform1f("scale", .05),
            webgl.bindVertexBuffer(this.buffers.icon),
            n.vertexAttribPointer("vertex", 3, gl.FLOAT, !1, 0, 0),
            gl.lineWidth(2),
            _.each(this.missiles,
            function(t) {
                if (t.alive) {
                    var r = e.time - t.start_time;
                    r >= 1 && 2 > r && (n.uniformMatrix4fv("mat", t.target_mat), n.uniform3fv("color", t.color), n.uniform1f("time", r - 1), t.shape.draw())
                }
            }),
            gl.lineWidth(1)
        }
        gl.depthMask(!0)
    },
    i.prototype.launch = function(e, t, r, n, o) {
        var i = a(e.time, this.missiles);
        return i.launch(e, t, r, n, l.scale, o),
        i
    },
    i.prototype.set_mode = function(e) {
        switch (e) {
        case "world":
            l = u;
            break;
        case "scape":
            l = c
        }
        this.clear()
    },
    i.prototype.clear = function() {
        _.each(this.missiles,
        function(e) {
            e.alive = !1
        })
    },
    GTW.MissileSystem = i,
    GTW.reset_counters = n,
    GTW.update_counters = o
} ();
var GTW = GTW || {}; !
function() {
    var e = 1,
    t = 10;
    GTW.project_mercator = function(r, n) {
        var o = n[0],
        a = n[1],
        i = Math.PI * a / 180,
        u = 90 / Math.PI * Math.log(Math.tan(.25 * Math.PI + .5 * i));
        r[0] = -o / 180,
        r[1] = clamp(u / 90, -1, 1),
        r[2] = -e * n[2],
        vec3.scale(r, r, t)
    },
    GTW.project_ecef = function(r, n) {
        var o = deg2rad(n[0]),
        a = deg2rad(n[1]),
        i = e * n[2],
        u = Math.cos(a),
        c = Math.sin(a),
        l = 1,
        s = 1;
        r[0] = -(l + i) * u * Math.cos(o),
        r[2] = (l + i) * u * Math.sin(o),
        r[1] = (s + i) * c,
        vec3.scale(r, r, t)
    }
} ();
var GTW = GTW || {};
GTW.get_country_name = function(e) {
    return window.lang ? lang.getText("MAP_COUNTRY_" + e.iso3) : e.name.en
},
function() {
    function e(e) {
        for (var t = 1; t < arguments.length; ++t) e.push.apply(e, arguments[t])
    }
    var t = [1440, 720],
    r = .014,
    n = 10 * r;
    GTW.Stars = function() {
        function e() {
            function e() {
                for (var e = vec3.create(), r = new Float32Array(t << 2), n = 0; n < r.length; n += 4) Random.unitVec3(e),
                vec3.scale(e, e, 50),
                r[n + 0] = e[0],
                r[n + 1] = e[1],
                r[n + 2] = e[2],
                r[n + 3] = lerp(.1, 2.5, Math.pow(Math.random(), 10));
                return webgl.makeVertexBuffer(r)
            }
            var t = 1e4;
            this.count = t,
            this.buffers = {
                vert: e()
            },
            this.programs = {
                main: webgl.getProgram("stars")
            },
            this.mvp = mat4.create()
        }
        return e.prototype.draw = function(e) {
            gl.disable(gl.DEPTH_TEST),
            gl.enable(gl.BLEND),
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var t = this.programs.main.use(),
            r = this.mvp;
            mat4.copy(r, e.camera.view),
            r[12] = 0,
            r[13] = 0,
            r[14] = 0,
            mat4.multiply(r, e.camera.proj, r),
            t.uniformMatrix4fv("mvp", r),
            t.uniform4f("color", 1, 1, 1, .5),
            webgl.bindVertexBuffer(this.buffers.vert),
            t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
            gl.drawArrays(gl.POINTS, 0, this.count)
        },
        e
    } (),
    GTW.Corona = function() {
        function e() {
            function e() {
                for (var e = [], r = 128, n = 0; r + 1 > n; ++n) {
                    var o = TWO_PI * n / r,
                    a = n / (r + 1),
                    i = Math.cos(o),
                    u = Math.sin(o);
                    e.push(i, u, a, 0, i, u, a, 1)
                }
                return t = e.length / 4,
                webgl.makeVertexBuffer(new Float32Array(e))
            }
            var t = 0;
            this.buffers = {
                vert: e()
            },
            this.vertex_count = t,
            this.programs = {
                main: webgl.getProgram("corona")
            },
            this.textures = {
                smoke: webgl.loadTexture2D(GTW.resource_url("textures/smoke.jpg"), {
                    mipmap: !0,
                    wrapS: gl.REPEAT,
                    wrapT: gl.CLAMP_TO_EDGE
                })
            }
        }
        return e.prototype.draw = function(e, t) {
            var r = this.programs.main.use();
            r.uniformMatrix4fv("mvp", e.camera.mvp),
            r.uniformMatrix3fv("bill", e.camera.bill),
            r.uniformSampler2D("t_smoke", this.textures.smoke),
            r.uniform1f("time", e.time),
            r.uniform1f("zoff", t || 0),
            gl.disable(gl.CULL_FACE),
            gl.enable(gl.BLEND),
            "dark" === e.palette ? (gl.blendFunc(gl.SRC_ALPHA, gl.ONE), r.uniform3f("color0", .07, .25, .16), r.uniform3f("color1", 0, 0, 0)) : (gl.blendFunc(gl.DST_COLOR, gl.ZERO), r.uniform3f("color0", .07, .25, .16), r.uniform3f("color1", 1, 1, 1)),
            webgl.bindVertexBuffer(this.buffers.vert),
            r.vertexAttribPointer("vertex", 4, gl.FLOAT, !1, 0, 0),
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertex_count),
            gl.disable(gl.BLEND)
        },
        e
    } (),
    GTW.World = function() {
        function o() {
            this.buffers = {
                map: {
                    vert: null,
                    face: null,
                    line: null
                },
                grid: {
                    vert: null,
                    elem: null
                }
            },
            this.border = {
                buffer: gl.createBuffer(),
                count: 0
            },
            this.build_grid(),
            this.programs = {
                main: webgl.getProgram("map_main"),
                grid: webgl.getProgram("map_grid"),
                line: webgl.getProgram("map_line"),
                pick: webgl.getProgram("map_pick")
            },
            this.textures = {
                blur: webgl.loadTexture2D(GTW.resource_url("textures/map_blur.jpg")),
                pattern: webgl.loadTexture2D(GTW.resource_url("textures/pattern.png"), {
                    mipmap: !0,
                    wrap: gl.REPEAT,
                    aniso: 4
                })
            },
            this.countries = [];
            var e = this;
            this.key_to_country = {};
            var t = !1,
            n = t ? GTW.resource_url("data/map-ru.json") : GTW.resource_url("data/map.json"),
            o = location.host.match(/cybermap.kaspersky.com/) ? "/geoip": GTW.resource_url("data/geoip.json");
            this.extruded_country_index = -1,
            this.bordered_country_index = -1,
            GTW.load_resources({
                map: n,
                geoip: o
            },
            function(t) {
                e.countries = t.map.countries,
                e.geoip = function() {
                    if (!t.geoip) return null;
                    var n = t.geoip.country,
                    o = t.geoip.coord,
                    a = _.find(e.countries,
                    function(e) {
                        return e.iso2 == n
                    });
                    return a ? {
                        country: a,
                        country_index: e.countries.indexOf(a),
                        coord: vec3.fromValues(o[1], o[0], r)
                    }: null
                } (),
                e.geoip && (e.extruded_country_index = e.geoip.country_index),
                _.each(e.countries,
                function(t) {
                    t.tone = Math.random();
                    for (var n = Base64.decode(t.cities, Int16Array), o = t.cities = new Float32Array(n.length), a = 0; a < o.length; a += 3) o[a + 0] = n[a + 0] / 32768,
                    o[a + 1] = 180 * n[a + 1] / 32768,
                    o[a + 2] = 90 * n[a + 2] / 32768;
                    e.key_to_country[t.key] = t;
                    var i = e.geoip ? e.geoip.country: null;
                    t.borders = Base64.decode(t.borders, Uint16Array),
                    t.center = vec3.fromValues(t.center[0], t.center[1], t == i ? r: 0)
                }),
                e.build_geometry(t.map),
                e.emit("loaded")
            })
        }
        return make_event_emitter(o.prototype),
        o.prototype.build_grid = function() {
            function t(e, t) {
                return 181 * e + t
            }
            var n = [],
            o = [],
            a = vec3.create();
            a[2] = -r;
            for (var i = vec3.create(), u = vec3.create(), c = vec2.create(), l = -180; 180 >= l; l += 1) for (var s = -90; 90 >= s; s += 1) vec2.set(a, l, s),
            vec2.set(c, (l + 180) / 360, 1 - (s + 90) / 180),
            GTW.project_mercator(i, a),
            vec3.set(u, 0, 0, -1),
            e(n, i, u),
            GTW.project_ecef(i, a),
            vec3.normalize(u, i),
            e(n, i, u),
            e(n, c);
            for (var f = 0; 360 > f; ++f) for (var v = 0; 180 > v; ++v) o.push(t(f, v), t(f + 1, v), t(f + 1, v + 1), t(f + 1, v + 1), t(f, v + 1), t(f, v));
            this.buffers.grid.vert = webgl.makeVertexBuffer(new Float32Array(n)),
            this.buffers.grid.elem = webgl.makeElementBuffer(new Uint16Array(o)),
            this.grid_vert_count = n.length / 5,
            this.grid_elem_count = o.length,
            this.grid_vert_stride_bytes = 56
        },
        o.prototype.build_geometry = function(e) {
            function t(e, t) {
                a[0] = 180 * o.verts[2 * e + 0] / 32768,
                a[1] = 90 * o.verts[2 * e + 1] / 32768,
                a[2] = t,
                u[0] = .5 + a[0] / 360,
                u[1] = .5 - a[1] / 180;
                var r = n.length / 14;
                return GTW.project_mercator(i, a),
                n.push(i[0], i[1], i[2]),
                n.push(0, 0, 0),
                GTW.project_ecef(i, a),
                n.push(i[0], i[1], i[2]),
                n.push(0, 0, 0),
                n.push(u[0], u[1]),
                r
            }
            var n = [],
            o = e.geom,
            a = vec3.create(),
            i = vec3.create(),
            u = vec2.create();
            o.faces = Base64.decode(o.faces, Uint16Array),
            o.lines = Base64.decode(o.lines, Uint16Array),
            o.coast = Base64.decode(o.coast, Uint16Array),
            o.verts = Base64.decode(o.verts, Int16Array);
            for (var c = o.verts.length,
            l = 0; c > l; ++l) t(l, 0);
            var s = Array.apply([], o.faces);
            s.length = o.faces.length,
            s.constructor = Array,
            this.coast_start = s.length;
            for (var l = 0; l < o.coast.length; l += 2) {
                var f = o.coast[l + 0],
                v = o.coast[l + 1],
                p = t(f, -r),
                g = t(v, -r),
                f = t(f, 0),
                v = t(v, 0);
                s.push(f, v, p),
                s.push(v, g, p)
            }
            if (this.geoip) for (var h = this.geoip.country.borders,
            m = 65535,
            l = 0; l < h.length; ++l) {
                var d = h[l];
                if (65535 != d) {
                    if (65535 != m) {
                        var p = t(m, 0),
                        g = t(d, 0),
                        f = t(m, 1.02 * r),
                        v = t(d, 1.02 * r);
                        s.push(f, v, p),
                        s.push(v, g, p)
                    }
                    m = d
                } else m = 65535
            }
            this.coast_count = s.length - this.coast_start;
            for (var _ = vec3.create(), b = vec3.create(), y = 14, l = 0; l < s.length; l += 3) for (var f = s[l + 0], v = s[l + 1], T = s[l + 2], w = 0; 2 > w; ++w) {
                for (var E = 6 * w,
                x = 0; 3 > x; ++x) _[x] = n[y * v + E + x] - n[y * f + E + x],
                b[x] = n[y * T + E + x] - n[y * f + E + x];
                vec3.cross(i, _, b),
                vec3.normalize(i, i);
                for (var x = 0; 3 > x; ++x) n[y * f + E + 3 + x] += i[x],
                n[y * v + E + 3 + x] += i[x],
                n[y * T + E + 3 + x] += i[x]
            }
            vec3.forEach(n, y, 3, 0,
            function(e) {
                vec3.normalize(e, e)
            }),
            vec3.forEach(n, y, 9, 0,
            function(e) {
                vec3.normalize(e, e)
            }),
            this.buffers.map.vert = webgl.makeVertexBuffer(new Float32Array(n)),
            this.buffers.map.face = webgl.makeElementBuffer(new Uint16Array(s)),
            this.buffers.map.line = webgl.makeElementBuffer(new Uint16Array(o.lines)),
            this.face_count = o.faces.length,
            this.line_count = o.lines.length,
            this.map_vert_stride_bytes = 56
        },
        o.prototype.draw = function(e) {
            if (this.buffers.map.vert) {
                gl.disable(gl.BLEND),
                gl.enable(gl.CULL_FACE),
                gl.cullFace(gl.BACK),
                gl.enable(gl.DEPTH_TEST);
                var r = !0,
                o = !0,
                a = !0,
                i = !0,
                u = !0,
                c = smoothstep(e.projection.blend),
                l = .25 > c,
                s = this;
                if (r) {
                    var f = this.programs.grid.use();
                    f.uniformMatrix4fv("mvp", e.camera.mvp),
                    f.uniformSampler2D("t_blur", this.textures.blur),
                    f.uniformSampler2D("t_pattern", this.textures.pattern),
                    f.uniform2fv("pattern_scale", t),
                    f.uniform1f("blend", c),
                    "dark" === e.palette ? (f.uniform3f("color0", .07, .09, .07), f.uniform3f("color1", .36, .41, .36)) : (f.uniform3f("color0", .93, .95, .93), f.uniform3f("color1", .42, .48, .42));
                    var v = this.grid_vert_stride_bytes;
                    webgl.bindVertexBuffer(this.buffers.grid.vert),
                    f.vertexAttribPointer("position", 3, gl.FLOAT, !1, v, 0),
                    f.vertexAttribPointer("position2", 3, gl.FLOAT, !1, v, 24),
                    f.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, v, 48),
                    f.uniform4f("color", 1, 1, 1, 1),
                    webgl.bindElementBuffer(this.buffers.grid.elem),
                    f.uniform1f("offset_x", 0),
                    gl.drawElements(gl.TRIANGLES, this.grid_elem_count, gl.UNSIGNED_SHORT, 0),
                    l && (f.uniform1f("offset_x", -20), gl.drawElements(gl.TRIANGLES, this.grid_elem_count, gl.UNSIGNED_SHORT, 0), f.uniform1f("offset_x", 20), gl.drawElements(gl.TRIANGLES, this.grid_elem_count, gl.UNSIGNED_SHORT, 0))
                }
                if (o) {
                    var f = this.programs.main.use();
                    f.uniformMatrix4fv("mvp", e.camera.mvp),
                    f.uniformSampler2D("t_blur", this.textures.blur),
                    f.uniform1f("blend", c),
                    f.uniform3fv("view_pos", e.camera.viewPos),
                    f.uniform3fv("light_pos", e.light.position);
                    var v = this.map_vert_stride_bytes;
                    if (webgl.bindVertexBuffer(this.buffers.map.vert), f.vertexAttribPointer("position", 3, gl.FLOAT, !1, v, 0), f.vertexAttribPointer("normal", 3, gl.FLOAT, !1, v, 12), f.vertexAttribPointer("position2", 3, gl.FLOAT, !1, v, 24), f.vertexAttribPointer("normal2", 3, gl.FLOAT, !1, v, 36), f.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, v, 48), f.uniform1f("alpha", 1), "dark" === e.palette ? (f.uniform3f("color0", .1, .12, .11), f.uniform3f("color1", .2, .23, .21)) : (f.uniform3f("color0", .41, .61, .48), f.uniform3f("color1", .51, .69, .53)), gl.disable(gl.BLEND), gl.enable(gl.CULL_FACE), gl.cullFace(gl.BACK), gl.enable(gl.DEPTH_TEST), webgl.bindElementBuffer(this.buffers.map.face), _.each(this.countries,
                    function(e, t) {
                        f.uniform1f("height", t == s.extruded_country_index ? n: 0),
                        f.uniform1f("tone", e.tone),
                        f.uniform1f("offset_x", 0),
                        gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1),
                        l && (f.uniform1f("offset_x", -20), gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1), f.uniform1f("offset_x", 20), gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1))
                    }), gl.depthFunc(gl.LESS), i && (gl.disable(gl.CULL_FACE), f.uniform1f("tone", .5), f.uniform1f("offset_x", 0), gl.drawElements(gl.TRIANGLES, this.coast_count, gl.UNSIGNED_SHORT, this.coast_start << 1), l && (f.uniform1f("offset_x", -20), gl.drawElements(gl.TRIANGLES, this.coast_count, gl.UNSIGNED_SHORT, this.coast_start << 1), f.uniform1f("offset_x", 20), gl.drawElements(gl.TRIANGLES, this.coast_count, gl.UNSIGNED_SHORT, this.coast_start << 1))), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE), gl.disable(gl.DEPTH_TEST), gl.enable(gl.CULL_FACE), e.pick_index >= 0) {
                        var p = this.countries[e.pick_index];
                        f.uniform1f("tone", 1),
                        f.uniform1f("alpha", .5),
                        f.uniform1f("offset_x", 0),
                        f.uniform1f("height", e.pick_index == s.extruded_country_index ? n: 0),
                        gl.drawElements(gl.TRIANGLES, p.face_count, gl.UNSIGNED_SHORT, p.face_offset << 1)
                    }
                    gl.disable(gl.CULL_FACE)
                }
                if (a) {
                    gl.enable(gl.DEPTH_TEST),
                    gl.depthMask(!1);
                    var f = this.programs.line.use();
                    f.uniformMatrix4fv("mvp", e.camera.mvp),
                    f.vertexAttribPointer("position", 3, gl.FLOAT, !1, v, 0),
                    f.vertexAttribPointer("normal", 3, gl.FLOAT, !1, v, 12),
                    f.vertexAttribPointer("position2", 3, gl.FLOAT, !1, v, 24),
                    f.vertexAttribPointer("normal2", 3, gl.FLOAT, !1, v, 36),
                    f.uniform1f("blend", c),
                    f.uniform4f("color", 1, 1, 1, .125),
                    f.uniform1f("height", 0),
                    webgl.bindElementBuffer(this.buffers.map.line),
                    gl.drawElements(gl.LINES, this.line_count, gl.UNSIGNED_SHORT, 0),
                    gl.depthMask(!0)
                }
                if (u && (e.pick_index !== this.bordered_country_index && this.set_border(e.pick_index), this.border.count)) {
                    var f = this.programs.line.use();
                    f.uniformMatrix4fv("mvp", e.camera.mvp),
                    f.vertexAttribPointer("position", 3, gl.FLOAT, !1, v, 0),
                    f.vertexAttribPointer("normal", 3, gl.FLOAT, !1, v, 12),
                    f.vertexAttribPointer("position2", 3, gl.FLOAT, !1, v, 24),
                    f.vertexAttribPointer("normal2", 3, gl.FLOAT, !1, v, 36),
                    f.uniform1f("blend", c),
                    f.uniform1f("height", this.bordered_country_index == this.extruded_country_index ? n: 0),
                    f.uniform4f("color", 1, 1, 1, .5),
                    webgl.bindElementBuffer(this.border.buffer),
                    gl.lineWidth(2),
                    gl.drawElements(gl.LINES, this.border.count, gl.UNSIGNED_SHORT, 0),
                    gl.lineWidth(1)
                }
                gl.disable(gl.DEPTH_TEST),
                gl.disable(gl.CULL_FACE)
            }
        },
        o.prototype.pick = function() {
            function e(e, a, i) {
                var u = e.camera.viewport,
                c = t,
                l = r,
                s = r;
                mat4.identity(c),
                mat4.translate(c, c, [(u[2] - 2 * (a - u[0])) / l, -(u[3] - 2 * (i - u[1])) / s, 0]),
                mat4.scale(c, c, [u[2] / l, u[3] / s, 1]),
                mat4.multiply(c, c, e.camera.mvp);
                var f = o();
                gl.viewport(0, 0, r, r),
                gl.bindFramebuffer(gl.FRAMEBUFFER, f),
                gl.clearColor(0, 0, 1, 0),
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT),
                gl.disable(gl.BLEND),
                gl.enable(gl.CULL_FACE),
                gl.cullFace(gl.BACK),
                gl.enable(gl.DEPTH_TEST);
                var v = this.programs.pick.use();
                v.uniformMatrix4fv("mvp", c),
                webgl.bindVertexBuffer(this.buffers.map.vert);
                var p = this.map_vert_stride_bytes,
                g = e.projection.blend < .5 ? 0 : 24;
                v.vertexAttribPointer("position", 3, gl.FLOAT, !1, p, g),
                webgl.bindElementBuffer(this.buffers.map.face),
                _.each(this.countries,
                function(e, t) {
                    v.uniform1f("color", t / 255),
                    gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1)
                }),
                gl.disable(gl.CULL_FACE),
                gl.disable(gl.DEPTH_TEST),
                gl.readPixels(0, 0, r, r, gl.RGBA, gl.UNSIGNED_BYTE, n),
                gl.bindFramebuffer(gl.FRAMEBUFFER, null),
                gl.viewport(u[0], u[1], u[2], u[3]);
                for (var h = -1,
                m = 0,
                d = {},
                b = 0; b < n.length; b += 4) if (n[b + 3]) {
                    var y = n[b + 1] << 8 | n[b + 0],
                    T = d[y] || 0;
                    d[y] = ++T,
                    T > m && (h = y, m = T)
                }
                return h
            }
            var t = mat4.create(),
            r = 4,
            n = new Uint8Array(r * r << 2),
            o = function() {
                function e() {
                    t = gl.createFramebuffer(),
                    gl.bindFramebuffer(gl.FRAMEBUFFER, t);
                    var e = webgl.createTexture2D({
                        size: r
                    });
                    gl.bindTexture(gl.TEXTURE_2D, e),
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, e, 0);
                    var n = gl.createRenderbuffer();
                    gl.bindRenderbuffer(gl.RENDERBUFFER, n),
                    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, r, r),
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, n),
                    gl.bindRenderbuffer(gl.RENDERBUFFER, null),
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
                }
                var t = null;
                return function() {
                    return t || e(),
                    t
                }
            } ();
            return e
        } (),
        o.prototype.set_border = function(e) {
            if (0 > e) return this.border.count = 0,
            void(this.bordered_country_index = -1);
            for (var t = this.countries[e], r = [], n = t.borders, o = -1, a = 0; a < n.length; ++a) {
                var i = n[a];
                65535 != i ? (o >= 0 && r.push(o, i), o = i) : o = -1
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.border.buffer),
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(r), gl.STATIC_DRAW),
            this.border.count = r.length,
            this.bordered_country_index = e
        },
        o
    } ()
} ();
var GTW = GTW || {}; !
function() {
    GTW.Labels = function() {
        function e() {
            this.buffers = {
                vert: null
            },
            this.programs = {
                label: webgl.getProgram("label")
            },
            this.texture = webgl.createTexture2D({
                size: t,
                mipmap: !0,
                min: gl.LINEAR_MIPMAP_LINEAR,
                aniso: 4,
                format: gl.LUMINANCE
            }),
            gl.generateMipmap(gl.TEXTURE_2D),
            this.country_count = 0,
            this.labels = [],
            this.geoip_iso2 = null;
            var e = this;
            this.load_label_data(function() {
                e.render_labels("en"),
                e.project_labels("ecef")
            })
        }
        var t = 2048;
        e.prototype.load_label_data = function(e) {
            var t = this;
            $.getJSON(GTW.resource_url("data/labels.json"),
            function(r) {
                function n() {
                    var e = window.lang;
                    _.each(r.countries,
                    function(t) {
                        var r = "MAP_COUNTRY_" + t.iso3.toUpperCase();
                        t.name = e.getText(r)
                    }),
                    _.each(r.cities,
                    function(t) {
                        var r = "MAP_CITY_" + t.code.toUpperCase();
                        t.name = e.getText(r)
                    })
                }
                function o() {
                    this.coord = vec3.create(),
                    this.coord[2] = 1e-4,
                    this.pos = vec3.create(),
                    this.mat = mat4.create(),
                    this.box = vec4.create(),
                    this.name = "",
                    this.font_size = 0
                }
                function a(e, r, n) {
                    _.each(e,
                    function(e) {
                        if (r) {
                            if (n && e.font_size < 5) return;
                            if (!n && e.font_size > 5) return
                        }
                        var a = new o;
                        vec2.copy(a.coord, e.coord),
                        a.coord[2] *= 2,
                        a.name = e.name,
                        a.font_size = e.font_size,
                        r ? a.name = a.name.toUpperCase() : a.font_size = 3,
                        e.iso2 && (a.iso2 = e.iso2),
                        t.labels.push(a)
                    })
                }
               
                a(r.countries, !0, !0),
                t.country_count = t.labels.length,
                a(r.cities, !1, !1),
                a(r.countries, !0, !1),
                t.city_count = t.labels.length - t.country_count;
                var i = 30 * t.labels.length;
                t.buffers.vert = webgl.makeVertexBuffer(new Float32Array(i)),
                e()
				
            })
        },
        e.prototype.render_labels = function(e) {
            var r = document.createElement("canvas");
            r.width = r.height = t;
            var n = r.getContext("2d");
            n.fillStyle = "#000",
            n.fillRect(0, 0, r.width, r.height),
            n.font = "30px Ubuntu Mono",
            n.fillStyle = "white",
            n.textBaseline = "top";
            var o = [0, 0],
            a = 35;
            _.each(this.labels,
            function(e) {
                var i = e.name,
                u = n.measureText(i).width;
                o[0] + u >= r.width && (o[0] = 0, o[1] += a),
                n.fillText(i, o[0], o[1] - 0),
                vec4.set(e.box, o[0], o[1], o[0] + u, o[1] + a),
                vec4.scale(e.box, e.box, 1 / t),
                o[0] += u
            }),
            gl.bindTexture(gl.TEXTURE_2D, this.texture),
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, r),
            gl.generateMipmap(gl.TEXTURE_2D)
        },
        e.prototype.project_labels = function(e) {
            function t(t, r, i, u) {
                mat4.identity(t),
                "ecef" == e && (
				vec3.normalize(n, r),
				vec3.set(o, 0, 1, 0), 
				vec3.cross(o, n, o),
				vec3.normalize(o, o),
				vec3.cross(a, o, n),
				t[0] = o[0],
				t[1] = o[1], 
				t[2] = o[2],
				t[4] = n[0],
				t[5] = n[1],
				t[6] = n[2],
				t[8] = a[0],
				t[9] = a[1], 
				t[10] = a[2],
				mat4.rotateX(t, t, HALF_PI)),
                mat4.scale(t, t, [i, u, 1]),
                t[12] = r[0],
                t[13] = r[1],
                t[14] = r[2]
            }
            if (this.labels.length) {
                var r = "ecef" == e ? GTW.project_ecef: GTW.project_mercator,
                n = vec3.create(),
                o = vec3.create(),
                a = vec3.create(),
                i = [],
                u = vec3.create(),
                c = [ - 1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1],
                l = this;
                _.each(this.labels,
                function(e) {
                    e.iso2 == l.geoip_iso2 ? e.coord[2] = .015 : e.coord[2] = .001,
                    r(e.pos, e.coord);
                    var n = 1 * e.font_size;
                    t(e.mat, e.pos, n * (e.box[2] - e.box[0]), n * (e.box[3] - e.box[1]));
                    for (var o = 0; o < c.length; o += 2) u[0] = c[o + 0],
                    u[1] = c[o + 1],
                    u[2] = 0,
                    vec3.transformMat4(u, u, e.mat),
                    i.push(u[0], u[1], u[2]),
                    u[0] = .5 * (1 + c[o + 0]),
                    u[1] = .5 * (1 + c[o + 1]),
                    u[0] = lerp(e.box[2], e.box[0], u[0]),
                    u[1] = lerp(e.box[3], e.box[1], u[1]),
                    i.push(u[0], u[1])
                }),
                webgl.bindVertexBuffer(this.buffers.vert),
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(i))
            }
        };
        var r = vec3.create();
        return e.prototype.draw = function(e) {
            if (0 != this.labels.length) {
                gl.enable(gl.DEPTH_TEST),
                gl.enable(gl.BLEND),
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE),
                gl.depthMask(!1),
                e.project(r, e.geocam.coord);
                var t = 3,
                n = 10,
                o = lerp(t, n, e.projection.blend),
                a = this.programs.label.use();
                a.uniformMatrix4fv("mvp", e.camera.mvp),
                a.uniform4f("circle_of_interest", r[0], r[1], r[2], o),
                a.uniformSampler2D("t_color", this.texture),
                webgl.bindVertexBuffer(this.buffers.vert),
                a.vertexAttribPointer("position", 3, gl.FLOAT, !1, 20, 0),
                a.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, 20, 12),
                a.uniform1i("inside", 0),
                gl.drawArrays(gl.TRIANGLES, 0, 6 * this.country_count),
                a.uniform1i("inside", 1),
                gl.drawArrays(gl.TRIANGLES, 6 * this.country_count, 6 * this.city_count),
                gl.depthMask(!0),
                gl.disable(gl.BLEND)
				
            }
        },
        e
    } ()
} ();
var GTW = window.GTW || {};
GTW.init_scape = function(e, t) {
    function r(e, t) {
        e += I[0],
        t += I[1];
        for (var r = 16,
        n = 0,
        o = .5; r--;) n += o * noise.perlin2(e, t),
        o *= .5,
        e *= 2,
        t *= 2;
        return n
    }
    function n(e) {
        return.5 + .5 * noise.perlin2(B * e + I[0], I[1])
    }
    function o(t, r, n, o) {
        W(t, r, n, o),
        e.project(t, t)
    }
    function a() {
        I[0] = 100 * Math.random(),
        I[1] = 100 * Math.random(),
        U = lerp(1.5, 5.5, Math.random()),
        N = lerp(2, 3, Math.random()),
        B = lerp(1, 7, Math.random());
        for (var e = 0,
        t = 0; d > t; ++t) for (var r = 0; b > r; ++r) {
            var n = r / (b - 1),
            a = t / (d - 1);
            o(D, n, a),
            y[e + 0] = D[0],
            y[e + 1] = D[1],
            y[e + 2] = D[2],
            e += 4
        }
        webgl.bindVertexBuffer(Y.verts),
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, y)
    }
    function i() {
        vec3.lerp(ie, ie, ue, .05),
        vec3.lerp(ne, ne, oe, .05),
        vec3.lerp(ue, ue, ae, .05),
        vec3.lerp(oe, oe, re, .05);
        var t = Q.scape.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp),
        t.uniform4fv("color", ne),
        t.uniform3fv("fog_color", ie),
        t.uniformSampler2D("pattern", K.pattern),
        webgl.bindVertexBuffer(Y.verts),
        t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
        webgl.bindVertexBuffer(Y.texcoords),
        t.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, 0, 0),
        webgl.bindElementBuffer(Y.quads),
        gl.disable(gl.BLEND),
        gl.enable(gl.DEPTH_TEST),
        gl.enable(gl.POLYGON_OFFSET_FILL),
        gl.polygonOffset(1, 1),
        gl.drawElements(gl.TRIANGLE_STRIP, H, gl.UNSIGNED_SHORT, 0),
        gl.disable(gl.POLYGON_OFFSET_FILL),
        gl.enable(gl.BLEND),
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        var t = Q.scape_lines.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp),
        t.uniform4f("color", 140 / 255, 160 / 255, 138 / 255, .5),
        webgl.bindVertexBuffer(Y.verts),
        t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
        webgl.bindElementBuffer(Y.lines),
        gl.drawElements(gl.LINES, $, gl.UNSIGNED_SHORT, 0)
    }
    function u(e) {
        return - e * Math.log(1 - MersenneTwister.random())
    }
    function c() {
        fe = 0,
        a(),
        ve = u(pe),
        he = !0
    }
    function l() {
        var e = [];
        return GTW.systems_foreach(function(t, r) {
            t.enabled && e.push(r)
        }),
        _.sample(e)
    }
    function s() {
        var r = fe / se;
        r *= .8,
        fe += 1 / 60;
        var a = n(r);
        if (o(Z, r, a, 0), o(J, r + .01, a, 0), vec3.sub(le, J, Z), vec3.normalize(le, le), vec3.normalize(S, Z), o(Z, r, a), vec3.scaleAndAdd(Z, Z, S, .5), he ? (vec3.copy(ce, Z), g.move_to(ce, le, S), vec3.copy(p.pos, g.pos), vec3.copy(p.rot, g.rot), he = !1) : (vec3.lerp(ce, ce, Z, .1), g.move_to(ce, null, S), p.follow(g.pos, g.rot, .1, .05)), p.roll(.01 * noise.perlin2(e.time, .934)), fe > ve) {
            ve = fe + u(pe);
            var i = l();
            if (Math.random() < .3) {
                var c = Z,
                s = null,
                f = Math.random(),
                v = r + lerp(.01, .2, f),
                h = n(v) + Random.gauss(0, .1);
                W(c, v, h);
                var m = t.launch(e, i, c, s);
                vec3.scaleAndAdd(ue, ue, m.color, .5 * f),
                vec3.scaleAndAdd(oe, oe, m.color, .5 * (1 - f)),
                .1 > f && (e.flash(m.color), ge = 1)
            } else {
                var s = Z,
                c = J,
                v = Random.uniform(r + .2, 1),
                h = n(v) + Random.gauss(0, .1),
                d = Random.uniform(0, 1),
                _ = Random.uniform(0, 1);
                W(c, v, h),
                W(s, d, _),
                t.launch(e, i, c, s, 30)
            }
        }
    }
    function f() {
        if (vec3.copy(Z, p.pos), e.camera.update_quat(Z, p.rot), ge > .001) {
            var t = 5 * e.time,
            n = 3 * Math.sin(Math.PI * ge);
            e.camera.mvp[12] += .2 * n * r(t, .3123123),
            e.camera.mvp[13] += 1.5 * n * (r(t, .9123123) - .125),
            mat4.invert(e.camera.mvpInv, e.camera.mvp),
            ge *= .85
        }
    }
    var v = function() {
        function e() {
            this.pos = vec3.create(),
            this.rot = quat.create(),
            this.tan = vec3.create(),
            this.forward = vec3.fromValues(0, 0, -1),
            this.up = vec3.fromValues(0, 1, 0)
        }
        var t = vec3.create(),
        r = vec3.create(),
        n = vec3.create(),
        o = vec3.create(),
        a = quat.create(),
        i = quat.create(),
        u = vec3.create(),
        c = vec3.create();
        return e.prototype.move_to = function(e, l, s) {
            if (vec3.copy(t, e), vec3.copy(r, this.pos), vec3.copy(o, this.tan), vec3.sub(n, t, r), vec3.normalize(n, n), quat.copy(i, this.rot), s) {
                vec3.transformQuat(u, this.up, this.rot),
                vec3.copy(c, s);
                var f = vec3.dot(u, c);.999999 > f && (vec3.cross(a, u, c), a[3] = 1 + f, quat.normalize(a, a), quat.multiply(a, a, i), quat.dot(i, a) < 0 && quat.scale(a, a, -1)),
                quat.copy(this.rot, a),
                quat.copy(i, a)
            }
            if (l) vec3.normalize(this.tan, l),
            quat.rotationTo(this.rot, this.forward, this.tan);
            else {
                var f = vec3.dot(o, n);.999999 > f && (vec3.cross(a, o, n), a[3] = 1 + f, quat.normalize(a, a), quat.multiply(a, a, i), quat.dot(i, a) < 0 && quat.scale(a, a, -1)),
                vec3.copy(this.tan, n),
                quat.copy(this.rot, a)
            }
            vec3.copy(this.pos, t)
        },
        e.prototype.follow = function(e, t, r, n) {
            vec3.lerp(this.pos, this.pos, e, r || .05),
            vec4.lerp(this.rot, this.rot, t, n || .02),
            quat.normalize(this.rot, this.rot)
        },
        e.prototype.roll = function(e) {
            var t = this.rot;
            quat.rotateZ(t, t, e)
        },
        e
    } (),
    p = new v,
    g = new v,
    h = [ - 180, 0, 0],
    m = [180, 0, 0],
    d = 128,
    b = 512,
    y = [],
    T = [],
    w = [],
    E = [],
    x = vec3.fromValues(h[0], h[1], 0),
    A = vec3.fromValues(m[0], m[1], 0),
    M = vec3.create(),
    R = vec3.create();
    vec3.sub(M, A, x),
    vec2.normalize(M, M),
    vec2.perp(R, M);
    var P = 360,
    L = .2 * P;
    vec2.scale(M, M, P),
    vec2.scale(R, R, L);
    for (var D = vec4.create(), S = vec3.create(), F = 3, k = Math.pow, G = Math.abs, I = vec2.create(), U = 2.5, N = 3, B = 2, W = function() {
        var e = vec3.create();
        return function(t, o, a, i) {
            "undefined" == typeof i && (i = 1),
            vec3.set(e, 0, 0, 0),
            vec3.scaleAndAdd(e, A, M, o),
            vec3.scaleAndAdd(e, e, R, 2 * (a - .5));
            var u = n(o),
            c = G(a - u),
            l = .05 + .95 * smoothstep(clamp(U * c, 0, 1)),
            s = i * (r(8 * F * o, F * a) + 1);
            l *= k(s, N),
            l -= .075,
            0 > l ? l = 0 : l *= 2;
            var f = .25 * (1 + noise.perlin2(8 * o, 1 * a)) + .05 * r(8 * o, a);
            l += f,
            e[2] = .5 * l,
            vec3.copy(t, e)
        }
    } (), O = 0; d > O; ++O) for (var C = 0; b > C; ++C) {
        var j = C / (b - 1),
        q = O / (d - 1);
        o(D, j, q),
        y.push(D[0], D[1], D[2], 0),
        T.push(C, O);
        var V = O * b + C,
        X = V + 1,
        z = V + b;
        b - 1 > C && E.push(V, X),
        d - 1 > O && E.push(V, z),
        d - 1 > O && (O && !C && w.push(V), w.push(V, z), d - 2 > O && C == b - 1 && w.push(z))
    }
    y = new Float32Array(y);
    y.length / 4;
    w = new Uint16Array(w);
    var H = w.length;
    E = new Uint16Array(E);
    var $ = E.length;
    T = new Float32Array(T);
    var Y = {
        verts: webgl.makeVertexBuffer(y),
        quads: webgl.makeElementBuffer(w),
        lines: webgl.makeElementBuffer(E),
        texcoords: webgl.makeVertexBuffer(T)
    },
    K = {
        pattern: webgl.loadTexture2D(GTW.resource_url("textures/pattern2.png"), {
            mipmap: !0,
            wrap: gl.REPEAT,
            aniso: 4
        })
    },
    Q = {
        scape: webgl.getProgram("scape"),
        scape_lines: webgl.getProgram("scape_lines")
    },
    Z = vec3.create();
    vec3.copy(Z, A);
    var J = vec3.clone(Z);
    vec3.scaleAndAdd(J, Z, M, 1),
    e.project(Z, Z),
    e.project(J, J);
    var ee = (vec3.create(), vec3.create());
    vec3.sub(ee, J, Z);
    var te = vec3.create();
    vec3.add(te, Z, J),
    vec3.normalize(te, te);
    var re = function() {
        var e = vec4.fromValues(.1, .12, .11, 1),
        t = vec4.fromValues(.2, .23, .21, 1),
        r = .1,
        n = vec4.create();
        return vec4.lerp(n, e, t, r),
        n
    } (),
    ne = vec4.clone(re),
    oe = vec4.clone(re),
    ae = vec3.fromValues(.01, .05, .02),
    ie = vec3.clone(ae),
    ue = vec3.clone(ae),
    Z = vec3.create(),
    J = vec3.create(),
    ce = vec3.create(),
    le = vec3.create(),
    S = vec3.create(),
    se = 10,
    fe = se + 1,
    ve = 0,
    pe = .3,
    ge = 0,
    he = !0;
    return {
        reset: c,
        draw: i,
        update: s,
        update_camera: f,
        shake: function() {
            ge = 1
        }
    }
};
var GTW = window.GTW || {};
GTW.init_demo = function(e, t) {
    function r(e) {
        var t = 16;
        return _.times(t, e.create)
    }
    function n(t, r, n, o) {
        function a(e) {
            gl.enable(gl.DEPTH_TEST),
            gl.depthMask(!1),
            gl.lineWidth(5),
            gl.enable(gl.BLEND),
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var t = k.rings.use();
            t.uniformMatrix4fv("mvp", e.camera.mvp),
            t.uniform3fv("color", n),
            webgl.bindVertexBuffer(F.ring_verts),
            t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, D),
            gl.lineWidth(1),
            gl.enable(gl.BLEND),
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var t = k.missile.use();
            t.uniformMatrix4fv("mvp", e.camera.mvp),
            t.uniform3fv("color", n);
            var r = clamp(e.demo_time / 5, 0, 2);
            t.uniform1f("time", r),
            webgl.bindVertexBuffer(F.tube_verts),
            t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, S),
            gl.depthMask(!0),
            gl.disable(gl.BLEND),
            gl.disable(gl.DEPTH_TEST);
            var o = Math.max(0, e.demo_time);
            o /= 5,
            o -= ~~o;
            var a = o * (h - 1),
            i = ~~a;
            a -= i;
            var u = 6 * i;
            vec3.set(I, 0, 0, 0),
            vec3.set(U, 0, 0, 0);
            for (var c = 0; 2 > c; ++c) {
                a = 1 - a;
                for (var l = 0; 3 > l; ++l) I[l] += a * y[u + l],
                U[l] += a * y[u + 3 + l];
                u += 6
            }
            G.look(I, U, I)
        }
        for (var t = vec3.clone(t), r = vec3.clone(r), i = vec2.distance(t, r), u = .005 * i, c = vec3.create(), l = vec3.create(), s = 0, f = c, g = l, h = 103, m = new Float32Array(4 * h * 8), d = 0; h > d; ++d) {
            var _ = d / (h - 1);
            vec3.lerp(g, t, r, _);
            var b = u * Math.sin(_ * Math.PI) * .85;
            g[2] += b,
            e.project(f, g),
            vec3.save(f, m, s + 0),
            m[s + 3] = -_,
            vec3.save(f, m, s + 4),
            m[s + 7] = _,
            s += 8
        }
        for (var y = [], T = 0, w = c, E = l, x = vec3.create(), d = 0; h > d; ++d) vec3.load(w, m, T),
        y.push(w[0], w[1], w[2]),
        h - 1 > d && (vec3.load(E, m, T + 8), vec3.sub(x, E, w)),
        y.push(x[0], x[1], x[2]),
        T += 8;
        for (var A = function() {
            function e() {
                this.P = vec3.create(),
                this.T = vec3.create(),
                this.Q = quat.create()
            }
            return e.prototype.update = function() {
                vec3.normalize(this.T, this.T),
                quat.rotationTo(this.Q, [0, 0, 1], this.T)
            },
            e.prototype.transform = function(e, t) {
                vec3.transformQuat(e, t, this.Q),
                vec3.add(e, e, this.P)
            },
            e
        } (), M = [], T = 0; T < y.length; T += 6) {
            var R = new A;
            vec3.load(R.P, y, T + 0),
            vec3.load(R.T, y, T + 3),
            R.update(),
            quat.rotateZ(R.Q, R.Q, TWO_PI * d / h),
            M.push(R)
        }
        var P = [],
        L = []; !
        function() {
            function e(e, t, n, o, a) {
                r[0] = Math.cos(n) * o,
                r[1] = Math.sin(n) * o,
                r[2] = 0,
                t.transform(r, r),
                e.push(r[0], r[1], r[2], a)
            }
            function t(e) {
                var t = e.length - 4;
                e.push(e[t + 0], e[t + 1], e[t + 2], e[t + 3])
            }
            var r = vec3.create(),
            n = (vec3.create(), 0 > o);
            o = Math.abs(o);
            for (var a = 0; a < M.length; ++a) for (var i = M[a], u = M[a + 1], c = a / (h - 1), l = lerp(.02, .07, c), s = (n ? Math.PI: TWO_PI) / o, f = 0, v = 15e-5 / l, p = 0; o >= p; ++p) {
                var g = a && !p;
                n && p == o && (f = 0),
                g && t(L),
                e(L, i, f, l - v, -c),
                g && t(L),
                e(L, i, f, l + v, c),
                u && (g && t(P), e(P, i, f, l, c), g && t(P), e(P, u, f, l, c)),
                f += s
            }
        } (),
        L = new Float32Array(L),
        P = new Float32Array(P);
        var D = L.length / 4,
        S = P.length / 4,
        F = {
            verts: webgl.makeVertexBuffer(m),
            ring_verts: webgl.makeVertexBuffer(L),
            tube_verts: webgl.makeVertexBuffer(P)
        },
        k = {
            missile: webgl.getProgram("missile_tube"),
            simple: webgl.getProgram("simple"),
            rings: webgl.getProgram("rings")
        },
        G = new v;
        p.missile = G;
        var I = vec3.create(),
        U = vec3.create();
        vec3.create();
        return {
            draw: a
        }
    }
    function o() {
        var r, n = p.player,
        o = e.camera;
        if (e.demo_time < 5) {
            g = 0,
            o.near = .01,
            o.far = 1e3,
            r = p.missile;
            var a = e.demo_time / 5;
            n.follow(r.pos, r.rot, .01 + .5 * a, a * a),
            n.roll(.1 * noise.perlin2(1 * e.demo_time, 0))
        } else if (e.demo_time < 15) 0 == g && (g = 1, e.flash(f), l.reset(), t.set_mode("scape"), e.draw_world = !1);
        else if (e.demo_time < 20) {
            1 == g && (g = 2, e.flash(f), t.set_mode("world"), e.draw_world = !0),
            o.near = .01,
            o.far = 500,
            r = p.orbit;
            var a = (e.demo_time - 15) / 5;
            return n.follow(r.pos, r.rot, 5e-5 + .5 * Math.pow(a, 3), .2),
            void o.update_quat(n.pos, n.rot, a)
        }
        o.update_quat(n.pos, n.rot)
    }
    function a(e) {
        o(),
        e.draw_world || (l.update(), l.update_camera())
    }
    function i(e) {
        e.draw_world ? s && e.demo_time < 5 && s.draw(e) : (l.draw(e), t.draw(e))
    }
    function u(e, t, r) {
        var o = GTW.systems[e.solo_system_id],
        a = o.color[e.palette].f;
        vec3.copy(f, a),
        s = n(t, r, a, o.n_sides);
        var i = p.player;
        vec3.copy(i.pos, e.camera.viewPos),
        quat.rotationTo(i.rot, [0, 0, -1], e.camera.viewDir);
        var u = [r[0], r[1], 1.6];
        e.project(p.orbit.pos, u);
        var c = vec3.clone(p.orbit.pos);
        vec3.normalize(c, c),
        vec3.negate(c, c),
        quat.rotationTo(p.orbit.rot, [0, 0, -1], c)
    }
    function c() {
        e.draw_world || (t.set_mode("world"), e.draw_world = !0)
    }
    var l = GTW.init_scape(e, t),
    s = null,
    f = vec3.create(),
    v = function() {
        function e() {
            this.pos = vec3.create(),
            this.rot = quat.create()
        }
        var t = vec3.create(),
        r = vec3.fromValues(0, 1, 0),
        n = (vec3.create(), vec3.create(), vec3.create(), vec3.fromValues(0, 0, 1), mat4.create()),
        o = mat3.create(),
        a = vec3.create();
        e.prototype.look = function(e, t, i) {
            i = i || r,
            vec3.copy(this.pos, e),
            vec3.add(a, e, t),
            mat4.lookAt(n, e, a, i),
            mat3.fromMat4(o, n),
            mat3.invert(o, o);
            var u = this.rot;
            quat.fromMat3(u, o),
            quat.normalize(u, u)
        };
        var i = vec3.create();
        return e.prototype.look_at = function(e, n, o) {
            n = n || t,
            o = o || r,
            vec3.sub(i, n, e),
            this.look(e, i, o)
        },
        e.prototype.move_forward = function() {
            vec3.set(i, 0, 0, 1),
            vec3.transformQuat(i, i, this.rot);
            var e = .1;
            vec3.scaleAndAdd(this.pos, this.pos, i, e)
        },
        e.prototype.follow = function(e, t, r, n) {
            vec3.lerp(this.pos, this.pos, e, r || .05),
            vec4.lerp(this.rot, this.rot, t, n || .02),
            quat.normalize(this.rot, this.rot)
        },
        e.prototype.roll = function(e) {
            var t = this.rot;
            quat.rotateZ(t, t, e)
        },
        e
    } (),
    p = ({
        vec3: r(vec3),
        vec4: r(vec4),
        quat: r(quat),
        mat4: r(mat4),
        mat3: r(mat3)
    },
    {
        missile: new v,
        player: new v,
        orbit: new v
    }),
    g = 0;
    return {
        draw: i,
        setup: u,
        update: a,
        exit: c
    }
};
var GTW = window.GTW || {};
GTW.init_hedgehog = function(e) {
    function t() {
        this.position = vec3.create();
        var e = 2;
        this.scale = vec2.fromValues(1 * e, .25 * e),
        this.texture = null
    }
    function r(e, r) {
        _.each(p,
        function(e) {
            e.destroy()
        }),
        p = [];
        for (var n = [], o = 0; 10 > o; ++o) {
            var a = GTW.top_infected[o],
            i = r.key_to_country[a];
            if (i) {
                var u = o + 1,
                c = i.center,
                s = new t,
                g = s.position,
                h = .5;
                vec3.set(g, c[0], c[1], h),
                e.project(g, g);
                var m = vec3.create();
                vec3.set(m, c[0], c[1], 0),
                e.project(m, m),
                n.push(g[0], g[1], g[2]),
                n.push(m[0], m[1], m[2]);
                var d = MAP.lang;
                v.fillStyle = "#fff",
                v.fillRect(0, 0, f.width, f.height),
                v.fillStyle = "#000",
                v.font = 'bold 32px "Ubuntu Mono"',
                v.fillText(GTW.get_country_name(i).toUpperCase(), 30, 60),
                v.font = 'bold 20px "Ubuntu Mono"',
                window.lang ? v.fillText(window.lang.getText("NUMBER_SYMBOL") + u + " " + window.lang.getText("MOST_ATTACKED_COUNTRY"), 30, 90) : "ru" == d ? v.fillText("№" + u + " в мире по числу атак", 30, 90) : v.fillText("#" + u + " MOST-ATTACKED COUNTRY", 30, 90);
                var b = s.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, b),
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, f),
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR),
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR),
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
                gl.generateMipmap(gl.TEXTURE_2D),
                p.push(s)
            }
        }
        l.lines && (gl.deleteBuffer(l.lines), l.lines = null),
        l.lines = webgl.makeVertexBuffer(new Float32Array(n))
    }
    function n(e) {
        var t = s.simple.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp),
        t.uniform4f("color", 1, 1, 1, .5 * g),
        webgl.bindVertexBuffer(l.lines),
        t.vertexAttribPointer("position", 3, gl.FLOAT, !1, 0, 0),
        gl.drawArrays(gl.LINES, 0, 2 * p.length)
    }
    function o(e) {
        var t = s.hedgehog.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp),
        t.uniformMatrix3fv("bill", e.camera.bill),
        t.uniform4f("color", 1, 1, 1, 1),
        webgl.bindVertexBuffer(l.verts),
        t.vertexAttribPointer("coord", 2, gl.FLOAT, !1, 0, 0),
        _.each(p,
        function(e) {
            t.uniform3fv("position", e.position),
            t.uniform2fv("scale", e.scale),
            t.uniformSampler2D("t_color", e.texture),
            t.uniform1f("fade", g),
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        })
    }
    function a(e) {
        g = m ? Math.min(1, g + h) : Math.max(0, g - h),
        0 != g && (gl.enable(gl.DEPTH_TEST), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA), o(e), n(e), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST))
    }
    function i() {
        m = !0
    }
    function u() {
        m = !1
    }
    var c = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
    l = {
        verts: webgl.makeVertexBuffer(c),
        lines: null
    },
    s = {
        simple: webgl.getProgram("simple"),
        hedgehog: webgl.getProgram("hedgehog")
    },
    f = document.createElement("canvas");
    f.width = 512,
    f.height = 128;
    var v = f.getContext("2d");
    t.prototype.destroy = function() {
        gl.deleteTexture(this.texture),
        this.texture = null
    };
    var p = [],
    g = 0,
    h = .02,
    m = !1;
    return {
        show: i,
        hide: u,
        draw: a,
        setup: r
    }
};
var GTW = window.GTW || {};
GTW.init_connectors = function() {
    function e(e) {
        gl.disable(gl.DEPTH_TEST);
        var t = u.connector.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp);
        var r = 1;
        t.uniform4f("color", r, r, r, 1),
        webgl.bindVertexBuffer(i.verts),
        t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0),
        gl.drawArrays(gl.LINES, 0, 2 * a)
    }
    function t(e, t) {
        var r = 8 * a;
        vec3.save(e, o, r + 0),
        o[r + 3] = 0,
        vec3.save(t, o, r + 4),
        o[r + 7] = 1,
        ++a,
        webgl.bindVertexBuffer(i.verts),
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, o)
    }
    function r() {
        a = 0
    }
    var n = 20,
    o = new Float32Array(8 * n),
    a = 0,
    i = {
        verts: webgl.makeVertexBuffer(o)
    },
    u = {
        connector: webgl.getProgram("connector")
    };
    return {
        draw: e,
        add_line: t,
        clear: r
    }
};
var GTW = window.GTW || {};
GTW.init_marker = function(e) {
    function t(t) {
        var r = vec3.create();
        e.project(r, t),
        mat4.identity(u),
        mat4.translate(u, u, r),
        vec3.copy(l, r),
        vec3.copy(s, r);
        var n = vec3.create(),
        o = vec3.create(),
        a = vec3.create();
        vec3.normalize(n, l),
        vec3.set(o, 0, 1, 0),
        vec3.cross(a, n, o),
        vec3.normalize(a, a),
        vec3.cross(o, a, n),
        vec3.scaleAndAdd(s, s, o, 10),
        f = 0,
        v = !1
    }
    function r(e) {
        if (!v) {
            if (f += .01, f > 1) {
                f = 1,
                v = !0;
                var t = .7;
                p || e.flash([t, t, t])
            }
            vec3.lerp(c, s, l, Math.pow(f, .75))
        }
        gl.enable(gl.DEPTH_TEST),
        gl.enable(gl.BLEND),
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        var r = i.marker.use();
        r.uniformMatrix3fv("bill", e.camera.bill),
        r.uniformMatrix4fv("mvp", e.camera.mvp),
        r.uniform3fv("pos", c),
        r.uniformSampler2D("t_sharp", a.pin_sharp),
        r.uniformSampler2D("t_fuzzy", a.pin_fuzzy);
        var n = .7;
        r.uniform4f("color", n, n, n, 1),
        r.uniform1f("scale", .1),
        r.uniform1f("fuzz", 0),
        webgl.bindVertexBuffer(o.verts),
        r.vertexAttribPointer("coord", 2, gl.FLOAT, !1, 0, 0),
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    var n = [0, 0, 1, 0, 0, 1, 1, 1],
    o = {
        verts: webgl.makeVertexBuffer(new Float32Array(n))
    },
    a = {
        pin_sharp: webgl.loadTexture2D(GTW.resource_url("textures/pin-sharp.png"), {
            mipmap: !0
        }),
        pin_fuzzy: webgl.loadTexture2D(GTW.resource_url("textures/pin-fuzzy.png"), {
            mipmap: !0
        })
    },
    i = {
        marker: webgl.getProgram("marker")
    },
    u = mat4.create(),
    c = vec3.create(),
    l = vec3.create(),
    s = vec3.create(),
    f = 0,
    v = !0,
    p = !1;
    return {
        draw: r,
        set_coord: t,
        cancel_flash: function() {
            p = !0
        }
    }
};
var GTW = window.GTW || {};
GTW.init_flash = function(e) {
    function t(e) {
        if (! (i[3] < .001)) {
            i[3] *= .97;
            var t = o.simple.use();
            t.uniformMatrix4fv("mvp", a),
            t.uniform4fv("color", i),
            webgl.bindVertexBuffer(n.verts),
            t.vertexAttribPointer("position", 2, gl.FLOAT, !1, 0, 0),
            gl.enable(gl.BLEND),
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE),
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4),
            gl.disable(gl.BLEND)
        }
    }
    var r = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
    n = {
        verts: webgl.makeVertexBuffer(r)
    },
    o = {
        simple: webgl.getProgram("simple")
    },
    a = mat4.create();
    mat4.translate(a, a, [ - 1, -1, 0, 0]),
    mat4.scale(a, a, [2, 2, 2]);
    var i = vec4.create();
    return {
        draw: t,
        flash: function(e) {
            vec3.copy(i, e),
            i[3] = 2
        }
    }
};
var GTW = window.GTW || {},
MAP = window.MAP || {};
MAP.init = function(e) {
    function t() {
        q && (clearTimeout(q), q = null, vec3.copy(z.geocam.coord_target, z.geocam.coord), _e.cancel_flash())
    }
    function r(e, t) {
        if (ye.clear(), e && t) {
            var r = e.getBoundingClientRect(),
            n = X.getBoundingClientRect(),
            o = r.left + .5 * r.width,
            a = r.top + .5 * r.height;
            o -= n.left,
            a -= n.top;
            var i = vec3.create();
            i[0] = 2 * (o / X.width - .5),
            i[1] = -2 * (a / X.height - .5);
            var u = vec3.create(),
            c = vec3.create(),
            l = {
                NO: [9.787, 61.391],
                SE: [15.179, 60.131],
                FI: [26.199, 63.0149]
            },
            s = l[t.iso2];
            s ? vec2.copy(c, s) : vec3.copy(c, t.center),
            z.project(u, c),
            ye.add_line(i, u)
        }
    }
    function n() {
        j && !Ve(j, 70) && N.hide_country_popup()
    }
    function o(e) {
        e !== j && (e ? (N.show_country_popup(GTW.get_country_name(e)), we = 0, Ee = 0) : N.hide_country_popup(), j = e, r($("#countrypop")[0], e))
    }
    function a() {
        z.geocam.coord_target[2] = I,
        z.geocam.lerp_speed = .2
    }
    function i() {
        if ("orbit" == z.camera_mode) {
            var e = Y.mat4;
            mat4.identity(e),
            mat4.rotateY(e, e, -z.orbit.rotate[1]),
            mat4.rotateX(e, e, z.orbit.rotate[0]),
            vec3.transformMat4(z.orbit.pos, z.orbit.translate, e);
            var t = Y.vec3;
            vec3.set(t, 0, 0, 1),
            vec3.transformMat4(t, t, e),
            vec3.copy(z.orbit.dir, t),
            z.camera.update(z.orbit.pos, z.orbit.dir)
        } else if ("geocam" == z.camera_mode) {
            var r = z.projection.dir > 0,
            n = z.geocam.coord,
            o = z.geocam.coord_target,
            a = z.geocam.coord_delta;
            vec3.add(o, o, a),
            o[1] = clamp(o[1], -80, 80);
            var i;
            i = r ? ee.ecef: ee.mercator,
            o[2] = clamp(o[2], i[0], i[1]),
            r ? n[0] < -180 ? (n[0] += 360, o[0] += 360) : n[0] > 180 && (n[0] -= 360, o[0] -= 360) : o[0] = clamp(o[0], -180, 180),
            vec3.lerp(n, n, o, z.geocam.lerp_speed),
            vec3.scale(a, a, .9),
            GTW.project_mercator(K, [n[0], n[1], 0]),
            GTW.project_mercator(Q, n),
            Q[1] -= 2,
            vec3.sub(Z, K, Q),
            vec3.normalize(Z, Z),
            vec3.copy(K, Q);
            var u = [0, 0, 0];
            GTW.project_ecef(u, [n[0], n[1], 0]),
            GTW.project_ecef(Q, n);
            var c = clamp(2 * (I - n[2]), 0, 1),
            c = lerp(0, 2, c);
            Q[1] -= c,
            vec3.sub(J, u, Q),
            vec3.normalize(J, J);
            var l = smoothstep(z.projection.blend);
            vec3.lerp(K, K, Q, l),
            vec3.lerp(Z, Z, J, l),
            z.camera.update(K, Z)
        }
        z.projection.blend = clamp(z.projection.blend + z.projection.dir / 120, 0, 1)
    }
    function u() {
        return
    }
    function c(e) {
        ne !== e && (ne = e, oe = e.getContext("2d"))
    }
    function l() {
        var e = ne.clientWidth;
        ae !== e && (ae = ne.width = e);
        var t = $(document).height() - (250 + $(".header").height() + $(".footer").height());
        150 > t && (t = 150),
        t > 700 && (t = 700),
        ie !== t && (ie = ne.height = t);
        var r = ae / (ce - 1);
        oe.clearRect(0, 0, ae, ie),
        oe.font = "12px Ubuntu Mono";
        var n = 10 * Math.floor(.1 * se),
        o = 20;
        n > 100 && (o = 50),
        n > 500 && (o = 100),
        n > 2e3 && (o = 500),
        n > 5e3 && (o = 2e3),
        oe.textBaseline = "middle",
        oe.textAlign = "right";
        for (var a = 0; n > a; a += o) {
            var i = (1 - a / n) * ie;
            i = Math.floor(i),
            oe.fillStyle = "#181818",
            oe.fillRect(0, i, ae, 1)
        }
        oe.lineWidth = 1.5;
        var u = 0;
        GTW.systems_foreach(function(e) {
            if (e.enabled_graph) {
                oe.strokeStyle = e.color[z.palette].css,
                oe.beginPath();
                for (var t = 0; ce > t; ++t) {
                    var o = modulo(ue - t - 1, ce),
                    a = e.graph[o];
                    u = Math.max(u, a);
                    var i = ae - t * r,
                    c = (1 - a / n) * ie;
                    0 == t ? oe.moveTo(i, c) : oe.lineTo(i, c)
                }
                oe.stroke(),
                se = clamp(lerp(se, 1.5 * u, .2), 50, 1e4)
            }
        });
        for (var c = 0; n > c; c += o) {
            var i = (1 - c / n) * ie;
            oe.fillStyle = "#fff",
            oe.fillText("" + c, ae - 10, i - 10)
        }
    }
    function s() {
        var e = ~~le;
        le += 1 / 60;
        var t = e % ce;
        t !== ue && (ue = t, ne && l(), GTW.systems_foreach(function(e) {
            e.graph[ue] = 0
        }))
    }
    function f(e, t) {
        for (var r = t.length / 3,
        n = Math.random(), o = r - 1, a = 0, i = 0; o >= a;) {
            var u = a + o >> 1,
            c = t[3 * u + 0];
            c > n ? o = u - 1 : a = u + 1
        }
        i = o;
        var l = 3 * i,
        s = t[l + 1],
        f = t[l + 2];
        f += Random.gauss(0, .01),
        s += Random.gauss(0, .01),
        e[0] = s,
        e[1] = f
    }
    function v(e, t) {
        if (0 === t) return ! 1;
        var r = he.key_to_country[t];
        return r ? (f(e, r.cities), he.geoip && r == he.geoip.country ? e[2] = .014 : e[2] = 0, !0) : !1
    }
    function p(e, t, r, n, o) {
        if (n) if (Re[0] = n[0], Re[1] = n[1], Re[2] = 0, he.geoip && t == he.geoip.country && (Re[2] += .014), r) Pe[0] = n[2],
        Pe[1] = n[3],
        Pe[2] = 0,
        he.geoip && r == he.geoip.country && (Re[2] += .014),
        o = (Math.random() - .5) * Math.PI,
        ve.launch(z, e, Re, Pe, o);
        else {
            vec3.copy(Pe, Re);
            var a = o,
            i = .5 * lerp(5, 6, Math.random());
            Pe[0] += i * Math.cos(a),
            Pe[1] += i * Math.sin(a),
            Pe[2] += lerp(.15, .2, Math.random()),
            ve.launch(z, e, Re, Pe)
        } else {
            if (!v(Re, t)) return;
            r ? (v(Pe, r), ve.launch(z, e, Re, Pe)) : ve.launch(z, e, Re, null)
        }
    }
    function g(e) {
        if (Le) return void(Le = !1);
        if (he.countries.length) {
            if (_.each(e,
            function(e) {
                var t = e.key,
                r = t >> 16 & 255,
                n = t >> 8 & 255,
                o = t >> 0 & 255,
                a = GTW.systems[r],
                i = !0;
                8 == r && e.coords && (i = !1),
                8 == r && 0 == n && (i = !1),
                i && (++a.count, ++a.graph[ue], ++a.target_count[n]),
                ++GTW.total_target_count[n],
                W && z.draw_world && a.enabled && p(r, n, o, e.coords, e.angle)
            }), j && Ee < z.time) {
                var t = j.key;
                GTW.compute_total_target_rank(),
                Ae.text(GTW.total_target_rank[t]),
                Ee = z.time + 2
            }
            if (xe < z.time) {
                GTW.compute_total_target_rank();
                for (var r = [], n = 0; 5 > n; ++n) {
                    var t = GTW.top_infected[n],
                    o = he.key_to_country[t];
                    o && r.push('<li data-key="' + t + '">' + GTW.get_country_name(o) + "</li>")
                }
                if (Me.html(r.join("")), xe = z.time + 5, be.setup(z, he), De(), Xe) {
                    var a = GTW.top_infected[0],
                    i = he.key_to_country[a];
                    i && (k(i), Xe = !1)
                }
            }
            we < z.time && (GTW.systems_foreach(function(e) {
                if ($(e.el_count_selector).text(e.count), j) {
                    var t = j.key,
                    r = e.target_count[t];
                    $(e.el_popcount_selector + " h4").text(r)
                }
            }), we = z.time + Random.uniform(.1, .5))
        }
    }
    function h(e, t) {
        Fe = z.time + t,
        ke = e
    }
    function m(e, r) {
        if ((r || e !== Se) && !$("body").hasClass("scroll")) {
            switch (e) {
            case "idle":
                N.set_demo_state(!1),
                z.geocam.lerp_speed = .2,
                B && h("spin_1", 30);
                break;
            case "spin_1":
                z.projection.dir < 0 && MAP.set_view("globe"),
                MAP.is_bad_mode || (N.set_demo_state(!0), t(), be.setup(z, he), be.show(), h("solo", 20)),
                z.geocam.lerp_speed = .015,
                a(),
                o(null);
                break;
            case "solo":
                be.hide();
                var n = [];
                GTW.systems_foreach(function(e, t) {
                    e.enabled && n.push(t)
                }),
                n.length > 0 && (z.solo_system_id = _.sample(n), D(z.solo_system_id), h("spin_2", 15));
                break;
            case "spin_2":
                D(null),
                h("demo", 5);
                break;
            case "demo":
                z.demo_time_start = z.time;
                var i = !1;
                if (function() {
                    var e = S(!0),
                    t = F();
                    if (!e || !t) return void console.log("BAD DEMO");
                    var r = vec3.create();
                    v(r, t.key),
                    de.setup(z, e.center, r),
                    vec2.copy(z.geocam.coord_target, r),
                    vec2.copy(z.geocam.coord, r),
                    setTimeout(function() {
                        o(t),
                        D(null)
                    },
                    5e3),
                    setTimeout(function() {
                        o(null)
                    },
                    15e3),
                    i = !0
                } (), !i) return void m("spin_2", 0);
                h("spin_1", 20)
            }
            Se = e
        }
    }
    function d() {
        if (z.time > Fe && m(ke), O || C) return void(z.geocam.coord_delta[0] = 6 * z.dt);
        switch (Se) {
        case "spin_1":
        case "spin_2":
        case "solo":
            var e = z.projection.dir > 0;
            if (e) {
                var t = z.dt,
                r = 6 * t,
                n = Math.min(1, .2 * z.time),
                o = lerp(10, 2, n);
                z.geocam.coord_delta[0] = o * r
            }
        }
    }
    function b() {
        o(null),
        m("idle", !0),
        de.exit(),
        be.hide(),
        t()
    }
    function y() {
        m("idle", !0),
        de.exit(),
        be.hide(),
        t()
    }
    function T() {
        z.time = 1 * (timeNow() - te),
        z.dt = 1 / 60;
        var e = Ie(),
        t = fe.poll_events(e);
        if (g(t), s(), W) {
            if (d(), i(), u(), "demo" == Se && de.update(z), z.pick_required) {
                var r = he.pick(z, Ne[0], Ne[1]);
                r !== z.pick_index && (X.style.cursor = 0 > r ? "default": "pointer", z.pick_index = r, re = r >= 0 ? he.countries[r] : null),
                z.pick_required = !1
            }
            var n = "dark" === z.palette ? 0 : .9;
            gl.clearColor(n, n, n, 1),
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT),
            z.projection.blend > .5 && (pe.draw(z), z.draw_world ? ge.draw(z) : ge.draw(z, -1)),
            z.draw_world && (he.draw(z), me.draw(z), ve.draw(z), _e.draw(z)),
            "demo" == Se && (z.demo_time = z.time - z.demo_time_start, de.draw(z)),
            be.draw(z),
            "idle" == Se && ye.draw(z),
            Te.draw(z)
        }
    }
    function w() {
        X.width = X.clientWidth,
        O || C ? X.height = X.clientHeight: platformDetection.isMobile ? X.height = parseInt($(window).innerHeight()) - (parseInt($(".header").height()) + 45) : X.height = parseInt($(window).innerHeight()) - (parseInt($(".header").height()) + parseInt($(".footer").height()));
        var e = X.width / X.height;
        1 > e ? z.camera.fov = 60 / e: z.camera.fov = 60,
        gl.viewport(0, 0, X.width, X.height),
        vec4.copy(z.camera.viewport, gl.getParameter(gl.VIEWPORT))
    }
    function E(e) {
        if (!O && !C) {
            var r = 5;
            if (! (e > r)) {
                if (z.pick_index < 0) return o(null),
                void a();
                t();
                var n = he.countries[z.pick_index];
                n === j ? (o(null), a()) : (vec3.set(z.geocam.coord_target, n.center[0], n.center[1], U), o(n)),
                D(null)
            }
        }
    }
    function x() {
        X.addEventListener("DOMMouseScroll",
        function(e) {
            return e.wheelDelta = -120 * e.detail,
            Oe.mousewheel(e)
        },
        !1),
        _.each(Oe,
        function(e, t) {
            X.addEventListener(t, e, !1)
        }),
        document.addEventListener("mouseup",
        function(e) {
            We = -1
        },
        !1)
    }
    function A() {
        function e(e, t) {
            var r = t.touches[0] || t.changedTouches[0],
            n = X.getBoundingClientRect(),
            o = r.clientX - n.left,
            a = r.clientY - n.top;
            e[0] = o,
            e[1] = a
        }
        function t(e) {
            if (2 !== e.touches.length) return 0;
            var t = X.getBoundingClientRect(),
            r = e.touches[0],
            n = e.touches[1];
            return vec2.set(a, r.clientX - t.left, r.clientY - t.top),
            vec2.set(i, n.clientX - t.left, n.clientY - t.top),
            vec2.dist(a, i)
        }
        var r = 0,
        n = "none",
        o = vec2.create(),
        a = vec2.create(),
        i = vec2.create();
        X.addEventListener("touchstart",
        function(i) {
            var u = i.touches.length;
            2 == u ? (r = t(i), n = "pinch") : 1 == u && (e(a, i), vec2.copy(o, a), z.pick_required = !0, vec2.copy(Ne, o), n = "drag"),
            i.preventDefault(),
            i.stopPropagation()
        },
        !1),
        X.addEventListener("touchend",
        function(t) {
            if ("drag" == n) {
                e(i, t);
                var r = vec2.dist(o, i);
                E(r)
            }
            return n = "none",
            !1
        },
        !1),
        X.addEventListener("touchmove",
        function(o) {
            if ("drag" == n) {
                e(i, o);
                var u = i[0] - a[0],
                c = i[1] - a[1];
                vec2.copy(a, i);
                var l = z.geocam.coord_delta;
                l[0] -= .03 * u,
                l[1] += .03 * c
            } else if ("pinch" == n) {
                var s = t(o),
                f = s / r,
                l = z.geocam.coord_delta;
                l[2] = 1 > f ? .02 / f: -.02 * f
            }
            return ! 1
        },
        !1)
    }
    function M() {
        z.projection.dir = -z.projection.dir,
        z.projection.dir > 0 && a()
    }
    function R(e, t, r) {
        e = e.toUpperCase();
        var n = _.where(GTW.systems, {
            name: e
        })[0];
        return "undefined" == typeof r ? n[t] = !n[t] : n[t] = r
    }
    function P(e) {
        if (!MAP.is_bad_mode) if (e) {
            var t = GTW.systems[e],
            r = t.name.toLowerCase(),
            n = {
                top: Math.round(.7 * $(window).height()),
                left: Math.round(.2 * $(window).width())
            },
            o = $(".type-icons .symbol." + r).offset();
            o.top = o.top - 35;
            var a = 0,
            i = Math.round(o.top - n.top),
            u = $("#systempop_line")[0];
            if (!u) return void console.log("solo_system_line: no canvas");
            var c = u.getContext("2d");
            o.left = o.left + parseInt($(".type-icons .symbol." + r).outerWidth()) / 2,
            a = o.left > n.left ? Math.round(o.left - n.left) : o.left < n.left ? Math.round(n.left - o.left) : 1,
            $("#systempop_line").attr("width", a).attr("height", i).css({
                width: a,
                height: i,
                top: n.top
            }),
            o.left > n.left ? $("#systempop_line").css({
                left: n.left
            }) : o.left < n.left ? $("#systempop_line").css({
                left: o.left
            }) : $("#systempop_line").css({
                left: n.left
            }),
            c.beginPath(),
            o.left > n.left ? (c.moveTo(.5, 0), c.lineTo(.5, Math.floor(i / 2) + .5), c.lineTo(a - .5, Math.floor(i / 2) + .5), c.lineTo(a - .5, i)) : o.left < n.left ? (c.moveTo(a - .5, 0), c.lineTo(a - .5, Math.floor(i / 2) + .5), c.lineTo(.5, Math.floor(i / 2) + .5), c.lineTo(.5, i)) : (c.moveTo(.5, 0), c.lineTo(.5, i)),
            c.lineWidth = 1,
            c.strokeStyle = "#FFFFFF",
            c.stroke(),
            $("#systempop_line").fadeIn()
        } else $("#systempop_line").fadeOut()
    }
    function L() {
        var e = !1;
        GTW.systems_foreach(function(t, r) {
            t.enabled && $("#systempop").is(":visible") && (P( + r), e = !0)
        }),
        e || P(null)
    }
    function D(e) {
        var t = function() {
            var e = [];
            return GTW.systems_foreach(function(t) {
                e.push(t.name.toLowerCase())
            }),
            e.join(" ")
        } ();
        if (e) {
            var r = GTW.systems[e],
            n = r.name.toLowerCase(),
            o = $(".subpage .subsystems_content .subsystem_block." + n + " .subsystem_block_content").html(),
            a = $("<i>").addClass("icon"),
            i = $("<div>");
            i.html(o),
            $("img", i).remove(),
            i.prepend(a),
            $("#systempop").removeClass(t).empty().html(""),
            $("#systempop").addClass(n).append(i).fadeIn()
        } else $("#systempop").fadeOut(400,
        function() {
            $("#systempop").removeClass(t).empty().html("")
        });
        P(e)
    }
    function S(e) {
        var e = _.filter(he.countries,
        function(t) {
            return Ve(t, 30) == e
        });
        return _.sample(e)
    }
    function F() {
        var e = _.sample(GTW.top_infected),
        t = he.key_to_country[e];
        return t
    }
    function k(e, t) {
        if (e && !O) {
            b();
            var r = e.center;
            z.geocam.lerp_speed = .015,
            vec3.set(z.geocam.coord_target, r[0], r[1], U),
            t = t || r,
            setTimeout(function() {
                _e.set_coord(t)
            },
            3e3),
            B && (q = setTimeout(function() {
                o(e)
            },
            5e3))
        }
    }
    function G() {
        if (N.got_country_data) {
            var e = {};
            _.each(he.countries,
            function(t) {
                e[t.key] = {
                    key: t.key,
                    name: t.name
                }
            }),
            N.got_country_data(e)
        }
    }
    var I = 1.6,
    U = 1,
    N = e.functions,
    B = "high" == e.quality,
    W = !0,
    O = !!e.widget,
    C = !!e.screensaver,
    j = null,
    q = null;
    setInterval(n, 500),
    $("#countrypop").on("click", ".popclose",
    function() {
        o(null)
    }),
    $("#topinfected").on("click", "li",
    function(e) {
        b();
        var t = this.dataset.key,
        r = he.key_to_country[t];
        r && (vec3.set(z.geocam.coord_target, r.center[0], r.center[1], U), o(r))
    });
    var V = key.noConflict(),
    X = $("#webgl-canvas")[0];
    if (window.gl = webgl.setupCanvas(X, {
        antialias: B ? !0 : !1,
        extensions: B ? ["WEBKIT_EXT_texture_filter_anisotropic"] : [],
        shaderSources: [GTW.SHADER_SOURCES || "assets/map/shaders/all-shaders.glsl", "assets/map/shaders/demo-shaders.glsl"]
    }), !window.gl) return console.warn("WebGL initialization failed."),
    $("#webgl-splash").show(),
    $("#webgl-proceed").on("click",
    function() {
        $("#webgl-splash").hide()
    }),
    MAP.lang = "en",
    void _.assign(MAP, {
        zoom_in: function() {},
        zoom_out: function() {},
        set_view: function() {},
        set_language: function(e) {
            MAP.lang = e
        },
        set_palette: function() {},
        toggle_palette: function() {},
        toggle_map: function(e) {},
        toggle_graph: function(e) {}
    });
    var z = {
        camera: new GTW.Camera,
        flash: function(e) {
            Te.flash(e)
        },
        high_quality: B,
        orbit: {
            rotate: vec3.fromValues(deg2rad(15), 0, 0),
            translate: vec3.fromValues(0, 0, -20),
            pos: vec3.create(),
            dir: vec3.create()
        },
        geocam: {
            coord: vec3.fromValues(0, 0, 5),
            coord_target: vec3.fromValues(0, 0, 2),
            coord_delta: vec3.create(),
            lerp_speed: .2
        },
        camera_mode: "geocam",
        time: timeNow(),
        demo_time_start: 0,
        demo_time: 0,
        pickRay: null,
        light: {
            position: vec3.fromValues(20, 20, -20),
            position2: vec3.fromValues(20, -25, -20)
        },
        project: function(e, t) {
            this.projection.blend < .5 ? GTW.project_mercator(e, t) : GTW.project_ecef(e, t)
        },
        projection: {
            blend: 1,
            dir: 1
        },
        pick_required: !1,
        pick_index: -1,
        palette: "dark",
        solo_system_id: 1,
        draw_world: !0
    },
    H = [ - 90, 30.0444];
    vec2.copy(z.geocam.coord, H),
    vec2.copy(z.geocam.coord_target, H),
    z.camera.near = .01,
    z.camera.far = 200,
    MAP._env = z,
    (O || C) && (z.camera.near = 1);
    var Y = {
        mat4: mat4.create(),
        vec3: vec3.create(),
        vec4: vec4.create()
    },
    K = vec3.create(),
    Q = vec3.create(),
    Z = vec3.create(),
    J = vec3.create(),
    ee = {
        mercator: [.15, 1],
        ecef: [.35, 4.5]
    },
    te = timeNow(),
    re = null,
    ne = null,
    oe = null,
    ae = 0,
    ie = 0,
    ue = 0,
    ce = 100;
    GTW.systems_foreach(function(e) {
        e.graph = new Int32Array(ce)
    });
    var le = 0,
    se = 100,
    fe = new GTW.Simulator,
    ve = new GTW.MissileSystem(z),
    pe = new GTW.Stars,
    ge = new GTW.Corona,
    he = new GTW.World,
    me = new GTW.Labels,
    de = GTW.init_demo(z, ve),
    _e = GTW.init_marker(z),
    be = GTW.init_hedgehog(),
    ye = GTW.init_connectors(),
    Te = GTW.init_flash(),
    we = 0,
    Ee = 0,
    xe = 0,
    Ae = $("#countrypop #ranking"),
    Me = $("#topinfectedlist"),
    Re = vec3.create(),
    Pe = vec3.create(),
    Le = !1,
    De = function() {
        var e = [0, 0, 0, 0, 0];
        return function() {
            if (N.stats_top5) {
                for (var t = !1,
                r = 0; 5 > r; ++r) {
                    var n = GTW.top_infected[r];
                    if (e[r] !== n) {
                        t = !0;
                        break
                    }
                }
                if (t) {
                    for (var o = [], r = 0; 5 > r; ++r) {
                        var n = GTW.top_infected[r];
                        e[r] = n;
                        var a = he.key_to_country[n];
                        a && o.push({
                            key: n,
                            name: a.name
                        })
                    }
                    N.stats_top5(o)
                }
            }
        }
    } (),
    Se = "idle",
    Fe = 0,
    ke = "idle";
    m("idle");
    var Ge = function() {
        var e = 0;
        return function() {
            return Date.now() + e
        }
    } (),
    Ie = function() {
        var e = Ge(),
        t = 1e3;
        return function() {
            var r = Ge();
            return r - e > t && (Le = !0),
            e = r,
            r
        }
    } (),
    Ue = function() {
        function e() {
            t && (requestAnimationFrame(e), T())
        }
        var t = !1;
        return {
            start: function() {
                t || (t = !0, Le = !0, e())
            },
            stop: function() {
                t = !1
            }
        }
    } ();
    window.addEventListener("resize", w, !1),
    w();
    var Ne = [0, 0],
    Be = [0, 0],
    We = -1;
    X.oncontextmenu = function() {
        return ! 1
    };
    var Oe = {
        mousedown: function(e) {
            return y(),
            Ne = Be = getMouseEventOffset(e),
            We = e.button,
            e.preventDefault(),
            !1
        },
        mouseup: function(e) {
            var t = getMouseEventOffset(e),
            r = vec2.dist(t, Be);
            return E(r),
            We = -1,
            !1
        },
        mousemove: function(e) {
            var t = getMouseEventOffset(e),
            r = t[0] - Ne[0],
            n = t[1] - Ne[1];
            if (Ne = t, "orbit" == z.camera_mode) switch (We) {
            case 0:
                z.orbit.rotate[0] += .0025 * n,
                z.orbit.rotate[1] += .0025 * r;
                break;
            case 1:
                z.orbit.translate[0] += .01 * r,
                z.orbit.translate[1] += .01 * n;
                break;
            case 2:
                var o = Math.abs(r) > Math.abs(n) ? r: -n;
                z.orbit.translate[2] += .05 * o;
                break;
            default:
                z.pick_required = !0
            } else if ("geocam" == z.camera_mode) {
                var a = z.geocam.coord_delta;
                switch (We) {
                case 0:
                    a[0] -= .03 * r,
                    a[1] += .03 * n;
                    break;
                case 2:
                    var o = Math.abs(r) > Math.abs(n) ? r: -n;
                    a[2] = -.01 * o;
                    break;
                default:
                    z.pick_required = !0
                }
            }
            return ! 1
        },
        mousewheel: function(e) {
            b(),
            e.preventDefault();
            var t = .9,
            r = e.wheelDelta / 120;
            return "orbit" == z.camera_mode ? z.orbit.translate[2] *= 0 > r ? t: 1 / t: "geocam" == z.camera_mode && (z.geocam.coord_delta[2] -= .01 * r),
            !1
        }
    };
    if (O || C);
    else {
        var Ce = "ontouchstart" in document.documentElement;
        Ce ? A() : x()
    }
    var je = {};
    _.each(je,
    function(e, t) {
        V(t, e)
    }),
    Ue.start(),
    $(".toggle").on("click",
    function(e) {
        return $(this).toggleClass("disabled"),
        "projection" == this.id ? void M() : void 0
    }),
    MAP.lang = "en";
    var qe = .025;
    _.assign(MAP, {
        zoom_in: function() {
            z.geocam.coord_delta[2] -= qe
        },
        zoom_out: function() {
            z.geocam.coord_delta[2] += qe
        },
        set_view: function(e) {
            "flat" == e ? (z.projection.dir = -1, me.project_labels("mercator"), a(), o(null), this.set_demo(!1), N.set_view_state("flat")) : "globe" == e && (z.projection.dir = 1, me.project_labels("ecef"), a(), o(null), N.set_view_state("globe"))
        },
        set_language: function(e) {
            MAP.lang !== e && (MAP.lang = e, me.render_labels(e), me.project_labels(z.projection.blend < .5 ? "mercator": "ecef"), be.setup(z, he))
        },
        set_palette: function(e) {
            e !== z.palette && (z.palette = e)
        },
        toggle_palette: function() {
            this.set_palette("dark" === z.palette ? "light": "dark")
        },
        toggle_map: function(e, t) {
            return R(e, "enabled", t)
        },
        toggle_graph: function(e, t) {
            return R(e, "enabled_graph", t)
        },
        set_demo: function(e) {
            B && (N.hide_country_popup(), e ? m("spin_1") : (m("idle"), z.draw_world = !0, ve.set_mode("world"), be.hide(), o(null)))
        },
        get_demo: function() {
            return "idle" != Se
        },
        pause: function() {
            W = !1
        },
        resume: function() {
            W = !0
        },
        attach_graph_canvas: function(e) {
            c(e)
        },
        detach_graph_canvas: function() {
            this.attach_graph_canvas(null)
        }
    });
    var Ve = function() {
        var e = vec3.create(),
        t = vec3.create(),
        r = vec3.create();
        return function(n, o) {
            if (z.projection.blend < .5) return ! 0;
            var a = Math.cos(deg2rad(o || 90));
            return vec2.copy(r, n.center),
            z.project(e, r),
            vec3.normalize(t, e),
            vec3.dot(t, z.camera.viewDir) < -a
        }
    } (),
    Xe = !1;
    he.on("loaded",
    function() {
        function e() {
            var e = he.geoip;
            k(e.country, e.coord)
        }
        if (G(), !MAP.is_bad_mode) if (he.geoip) {
            setTimeout(e, 1e3);
            var t = he.geoip;
            me.geoip_iso2 = t.country.iso2,
            me.project_labels("ecef"),
            N.got_geoip_data(t.country.key)
        } else Xe = !0,
        N.got_geoip_data( - 1)
    }),
    $(window).resize(function() {
        L()
    }),
    MAP.is_bad_mode && GTW.systems_foreach(function(e) {
        e.enabled = "BAD" == e.name,
        m("spin_1")
    })
};