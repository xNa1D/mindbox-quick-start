(() => {
  var e = {
      361: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (o, a) {
                function i(e) {
                  try {
                    u(n.next(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function s(e) {
                  try {
                    u(n.throw(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function u(e) {
                  var t;
                  e.done
                    ? o(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(i, s);
                }
                u((n = n.apply(e, t || [])).next());
              });
            },
          o =
            (this && this.__generator) ||
            function (e, t) {
              var r,
                n,
                o,
                a,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (a = { next: s(0), throw: s(1), return: s(2) }),
                "function" == typeof Symbol &&
                  (a[Symbol.iterator] = function () {
                    return this;
                  }),
                a
              );
              function s(a) {
                return function (s) {
                  return (function (a) {
                    if (r)
                      throw new TypeError("Generator is already executing.");
                    for (; i; )
                      try {
                        if (
                          ((r = 1),
                          n &&
                            (o =
                              2 & a[0]
                                ? n.return
                                : a[0]
                                ? n.throw || ((o = n.return) && o.call(n), 0)
                                : n.next) &&
                            !(o = o.call(n, a[1])).done)
                        )
                          return o;
                        switch (
                          ((n = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a;
                            break;
                          case 4:
                            return i.label++, { value: a[1], done: !1 };
                          case 5:
                            i.label++, (n = a[1]), (a = [0]);
                            continue;
                          case 7:
                            (a = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (o =
                                  (o = i.trys).length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              i.label = a[1];
                              break;
                            }
                            if (6 === a[0] && i.label < o[1]) {
                              (i.label = o[1]), (o = a);
                              break;
                            }
                            if (o && i.label < o[2]) {
                              (i.label = o[2]), i.ops.push(a);
                              break;
                            }
                            o[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        a = t.call(e, i);
                      } catch (e) {
                        (a = [6, e]), (n = 0);
                      } finally {
                        r = o = 0;
                      }
                    if (5 & a[0]) throw a[1];
                    return { value: a[0] ? a[1] : void 0, done: !0 };
                  })([a, s]);
                };
              }
            },
          a =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = a(r(669));
        t.default = function (e, t) {
          return n(void 0, void 0, void 0, function () {
            var r, n, a, s, u, c;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  e.preventDefault(),
                    (r = t.querySelector("#error")),
                    null == (n = t.querySelector("#submit")) ||
                      n.classList.add("loading"),
                    null == r || r.classList.remove("visible"),
                    (a = new FormData(t)),
                    (s = {
                      email: a.get("email") + "@mindbox.ru" || 0,
                      password: a.get("password") || "",
                    }),
                    (o.label = 1);
                case 1:
                  return (
                    o.trys.push([1, 3, , 4]),
                    [
                      4,
                      i.default.post("/api/user/auth", s, {
                        headers: { "content-type": "application/json" },
                      }),
                    ]
                  );
                case 2:
                  return (
                    (u = o.sent()),
                    (c = (c = new Date(Date.now() + 864e5)).toUTCString()),
                    (document.cookie = "token=" + u.data + "; expires=" + c),
                    window.location.replace("/scenario"),
                    [3, 4]
                  );
                case 3:
                  return (
                    o.sent(),
                    null == r || r.classList.add("visible"),
                    null == n || n.classList.remove("loading"),
                    [3, 4]
                  );
                case 4:
                  return [2];
              }
            });
          });
        };
      },
      726: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.handleScenarioChange = t.handleProjectNameInput = t.handleEmailInput = void 0),
          (t.handleEmailInput = function (e) {
            var t = e.target;
            t.value.indexOf("@") > 0 && (t.value = t.value.split("@")[0]);
          }),
          (t.handleProjectNameInput = function (e) {
            var t = e.target;
            t.value.indexOf("http://") >= 0 &&
              (t.value = t.value.replace("http://", "")),
              t.value.indexOf("https://") >= 0 &&
                (t.value = t.value.replace("https://", "")),
              t.value.indexOf(".") >= 0 && (t.value = t.value.split(".")[0]);
          }),
          (t.handleScenarioChange = function (e) {
            var t = e.target,
              r = document.querySelector("#lintToTZ"),
              n = document.querySelector("#form__input_campaign");
            switch (t.value) {
              case "ecommerce":
                r && (r.innerHTML = '<a href="">интернет магазина</a>'),
                  null == n || n.classList.add("disabled");
                break;
              case "loyaltyOnline":
                r && (r.innerHTML = '<a href="">ПЛ на сайте</a>'),
                  null == n || n.classList.remove("disabled");
                break;
              case "loyaltyOffline":
                r && (r.innerHTML = '<a href="">ПЛ в кассах</a>'),
                  null == n || n.classList.remove("disabled");
                break;
              case "mobilePush":
                r &&
                  (r.innerHTML =
                    '<a href="">Стандартная интеграция мобильного приложения</a>'),
                  null == n || n.classList.remove("disabled");
            }
          });
      },
      60: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (o, a) {
                function i(e) {
                  try {
                    u(n.next(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function s(e) {
                  try {
                    u(n.throw(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function u(e) {
                  var t;
                  e.done
                    ? o(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(i, s);
                }
                u((n = n.apply(e, t || [])).next());
              });
            },
          o =
            (this && this.__generator) ||
            function (e, t) {
              var r,
                n,
                o,
                a,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (a = { next: s(0), throw: s(1), return: s(2) }),
                "function" == typeof Symbol &&
                  (a[Symbol.iterator] = function () {
                    return this;
                  }),
                a
              );
              function s(a) {
                return function (s) {
                  return (function (a) {
                    if (r)
                      throw new TypeError("Generator is already executing.");
                    for (; i; )
                      try {
                        if (
                          ((r = 1),
                          n &&
                            (o =
                              2 & a[0]
                                ? n.return
                                : a[0]
                                ? n.throw || ((o = n.return) && o.call(n), 0)
                                : n.next) &&
                            !(o = o.call(n, a[1])).done)
                        )
                          return o;
                        switch (
                          ((n = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a;
                            break;
                          case 4:
                            return i.label++, { value: a[1], done: !1 };
                          case 5:
                            i.label++, (n = a[1]), (a = [0]);
                            continue;
                          case 7:
                            (a = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (o =
                                  (o = i.trys).length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              i.label = a[1];
                              break;
                            }
                            if (6 === a[0] && i.label < o[1]) {
                              (i.label = o[1]), (o = a);
                              break;
                            }
                            if (o && i.label < o[2]) {
                              (i.label = o[2]), i.ops.push(a);
                              break;
                            }
                            o[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        a = t.call(e, i);
                      } catch (e) {
                        (a = [6, e]), (n = 0);
                      } finally {
                        r = o = 0;
                      }
                    if (5 & a[0]) throw a[1];
                    return { value: a[0] ? a[1] : void 0, done: !0 };
                  })([a, s]);
                };
              }
            },
          a =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = a(r(669));
        t.default = function (e, t) {
          return n(void 0, void 0, void 0, function () {
            var r, n, a;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  e.preventDefault(),
                    (r = new FormData(t)),
                    (n = { email: r.get("email") + "@mindbox.ru" || 0 }),
                    (o.label = 1);
                case 1:
                  return (
                    o.trys.push([1, 3, , 4]),
                    [
                      4,
                      i.default.post("/api/user/reg", n, {
                        headers: { "content-type": "application/json" },
                      }),
                    ]
                  );
                case 2:
                  return o.sent(), window.location.replace("/"), [3, 4];
                case 3:
                  return (a = o.sent()), alert(a), [3, 4];
                case 4:
                  return [2];
              }
            });
          });
        };
      },
      80: function (e, t, r) {
        "use strict";
        var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (o, a) {
                function i(e) {
                  try {
                    u(n.next(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function s(e) {
                  try {
                    u(n.throw(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function u(e) {
                  var t;
                  e.done
                    ? o(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(i, s);
                }
                u((n = n.apply(e, t || [])).next());
              });
            },
          o =
            (this && this.__generator) ||
            function (e, t) {
              var r,
                n,
                o,
                a,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (a = { next: s(0), throw: s(1), return: s(2) }),
                "function" == typeof Symbol &&
                  (a[Symbol.iterator] = function () {
                    return this;
                  }),
                a
              );
              function s(a) {
                return function (s) {
                  return (function (a) {
                    if (r)
                      throw new TypeError("Generator is already executing.");
                    for (; i; )
                      try {
                        if (
                          ((r = 1),
                          n &&
                            (o =
                              2 & a[0]
                                ? n.return
                                : a[0]
                                ? n.throw || ((o = n.return) && o.call(n), 0)
                                : n.next) &&
                            !(o = o.call(n, a[1])).done)
                        )
                          return o;
                        switch (
                          ((n = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a;
                            break;
                          case 4:
                            return i.label++, { value: a[1], done: !1 };
                          case 5:
                            i.label++, (n = a[1]), (a = [0]);
                            continue;
                          case 7:
                            (a = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (o =
                                  (o = i.trys).length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              i.label = a[1];
                              break;
                            }
                            if (6 === a[0] && i.label < o[1]) {
                              (i.label = o[1]), (o = a);
                              break;
                            }
                            if (o && i.label < o[2]) {
                              (i.label = o[2]), i.ops.push(a);
                              break;
                            }
                            o[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        a = t.call(e, i);
                      } catch (e) {
                        (a = [6, e]), (n = 0);
                      } finally {
                        r = o = 0;
                      }
                    if (5 & a[0]) throw a[1];
                    return { value: a[0] ? a[1] : void 0, done: !0 };
                  })([a, s]);
                };
              }
            },
          a =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = a(r(669));
        t.default = function (e, t) {
          return n(void 0, void 0, void 0, function () {
            var r, n, a, s;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  e.preventDefault(),
                    (r = t.querySelector("#submit")),
                    (n = t.querySelector("#result")),
                    null == r || r.classList.add("loading"),
                    (a = new FormData(t)),
                    (s = {
                      taskName: a.get("task") || "",
                      projectName: a.get("projectName") || "",
                      campaingNumber: +(a.get("campaign") || ""),
                    }),
                    (o.label = 1);
                case 1:
                  return (
                    o.trys.push([1, 3, , 4]),
                    [
                      4,
                      i.default.post("/api/scenario/start", s, {
                        headers: { "content-type": "application/json" },
                      }),
                    ]
                  );
                case 2:
                  return (
                    o.sent(),
                    null == r || r.classList.remove("loading"),
                    null == n || n.classList.remove("form__result_hidden"),
                    [3, 4]
                  );
                case 3:
                  return (
                    o.sent(), null == r || r.classList.remove("loading"), [3, 4]
                  );
                case 4:
                  return [2];
              }
            });
          });
        };
      },
      608: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o = n(r(361)),
          a = n(r(60)),
          i = n(r(80)),
          s = r(726),
          u = document.querySelector("#auth__form") || void 0;
        null == u ||
          u.addEventListener("submit", function (e) {
            return o.default(e, u);
          });
        var c = document.querySelector("#auth__form_registration") || void 0;
        null == c ||
          c.addEventListener("submit", function (e) {
            return a.default(e, c);
          });
        var l = document.querySelector("#scenario") || void 0;
        null == l ||
          l.addEventListener("submit", function (e) {
            return i.default(e, l);
          });
        var f = document.querySelector("#email") || void 0;
        null == f ||
          f.addEventListener("blur", function (e) {
            return s.handleEmailInput(e);
          });
        var p = document.querySelector("#projectName") || void 0;
        null == p ||
          p.addEventListener("blur", function (e) {
            return s.handleProjectNameInput(e);
          });
        var d = document.querySelector("#task") || void 0;
        null == d ||
          d.addEventListener("change", function (e) {
            return s.handleScenarioChange(e);
          });
      },
      669: (e, t, r) => {
        e.exports = r(609);
      },
      448: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(26),
          a = r(372),
          i = r(327),
          s = r(97),
          u = r(109),
          c = r(985),
          l = r(61);
        e.exports = function (e) {
          return new Promise(function (t, r) {
            var f = e.data,
              p = e.headers;
            n.isFormData(f) && delete p["Content-Type"];
            var d = new XMLHttpRequest();
            if (e.auth) {
              var h = e.auth.username || "",
                m = e.auth.password
                  ? unescape(encodeURIComponent(e.auth.password))
                  : "";
              p.Authorization = "Basic " + btoa(h + ":" + m);
            }
            var v = s(e.baseURL, e.url);
            if (
              (d.open(
                e.method.toUpperCase(),
                i(v, e.params, e.paramsSerializer),
                !0
              ),
              (d.timeout = e.timeout),
              (d.onreadystatechange = function () {
                if (
                  d &&
                  4 === d.readyState &&
                  (0 !== d.status ||
                    (d.responseURL && 0 === d.responseURL.indexOf("file:")))
                ) {
                  var n =
                      "getAllResponseHeaders" in d
                        ? u(d.getAllResponseHeaders())
                        : null,
                    a = {
                      data:
                        e.responseType && "text" !== e.responseType
                          ? d.response
                          : d.responseText,
                      status: d.status,
                      statusText: d.statusText,
                      headers: n,
                      config: e,
                      request: d,
                    };
                  o(t, r, a), (d = null);
                }
              }),
              (d.onabort = function () {
                d &&
                  (r(l("Request aborted", e, "ECONNABORTED", d)), (d = null));
              }),
              (d.onerror = function () {
                r(l("Network Error", e, null, d)), (d = null);
              }),
              (d.ontimeout = function () {
                var t = "timeout of " + e.timeout + "ms exceeded";
                e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                  r(l(t, e, "ECONNABORTED", d)),
                  (d = null);
              }),
              n.isStandardBrowserEnv())
            ) {
              var y =
                (e.withCredentials || c(v)) && e.xsrfCookieName
                  ? a.read(e.xsrfCookieName)
                  : void 0;
              y && (p[e.xsrfHeaderName] = y);
            }
            if (
              ("setRequestHeader" in d &&
                n.forEach(p, function (e, t) {
                  void 0 === f && "content-type" === t.toLowerCase()
                    ? delete p[t]
                    : d.setRequestHeader(t, e);
                }),
              n.isUndefined(e.withCredentials) ||
                (d.withCredentials = !!e.withCredentials),
              e.responseType)
            )
              try {
                d.responseType = e.responseType;
              } catch (t) {
                if ("json" !== e.responseType) throw t;
              }
            "function" == typeof e.onDownloadProgress &&
              d.addEventListener("progress", e.onDownloadProgress),
              "function" == typeof e.onUploadProgress &&
                d.upload &&
                d.upload.addEventListener("progress", e.onUploadProgress),
              e.cancelToken &&
                e.cancelToken.promise.then(function (e) {
                  d && (d.abort(), r(e), (d = null));
                }),
              f || (f = null),
              d.send(f);
          });
        };
      },
      609: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(849),
          a = r(321),
          i = r(185);
        function s(e) {
          var t = new a(e),
            r = o(a.prototype.request, t);
          return n.extend(r, a.prototype, t), n.extend(r, t), r;
        }
        var u = s(r(655));
        (u.Axios = a),
          (u.create = function (e) {
            return s(i(u.defaults, e));
          }),
          (u.Cancel = r(263)),
          (u.CancelToken = r(972)),
          (u.isCancel = r(502)),
          (u.all = function (e) {
            return Promise.all(e);
          }),
          (u.spread = r(713)),
          (e.exports = u),
          (e.exports.default = u);
      },
      263: (e) => {
        "use strict";
        function t(e) {
          this.message = e;
        }
        (t.prototype.toString = function () {
          return "Cancel" + (this.message ? ": " + this.message : "");
        }),
          (t.prototype.__CANCEL__ = !0),
          (e.exports = t);
      },
      972: (e, t, r) => {
        "use strict";
        var n = r(263);
        function o(e) {
          if ("function" != typeof e)
            throw new TypeError("executor must be a function.");
          var t;
          this.promise = new Promise(function (e) {
            t = e;
          });
          var r = this;
          e(function (e) {
            r.reason || ((r.reason = new n(e)), t(r.reason));
          });
        }
        (o.prototype.throwIfRequested = function () {
          if (this.reason) throw this.reason;
        }),
          (o.source = function () {
            var e;
            return {
              token: new o(function (t) {
                e = t;
              }),
              cancel: e,
            };
          }),
          (e.exports = o);
      },
      502: (e) => {
        "use strict";
        e.exports = function (e) {
          return !(!e || !e.__CANCEL__);
        };
      },
      321: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(327),
          a = r(782),
          i = r(572),
          s = r(185);
        function u(e) {
          (this.defaults = e),
            (this.interceptors = { request: new a(), response: new a() });
        }
        (u.prototype.request = function (e) {
          "string" == typeof e
            ? ((e = arguments[1] || {}).url = arguments[0])
            : (e = e || {}),
            (e = s(this.defaults, e)).method
              ? (e.method = e.method.toLowerCase())
              : this.defaults.method
              ? (e.method = this.defaults.method.toLowerCase())
              : (e.method = "get");
          var t = [i, void 0],
            r = Promise.resolve(e);
          for (
            this.interceptors.request.forEach(function (e) {
              t.unshift(e.fulfilled, e.rejected);
            }),
              this.interceptors.response.forEach(function (e) {
                t.push(e.fulfilled, e.rejected);
              });
            t.length;

          )
            r = r.then(t.shift(), t.shift());
          return r;
        }),
          (u.prototype.getUri = function (e) {
            return (
              (e = s(this.defaults, e)),
              o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
            );
          }),
          n.forEach(["delete", "get", "head", "options"], function (e) {
            u.prototype[e] = function (t, r) {
              return this.request(
                s(r || {}, { method: e, url: t, data: (r || {}).data })
              );
            };
          }),
          n.forEach(["post", "put", "patch"], function (e) {
            u.prototype[e] = function (t, r, n) {
              return this.request(s(n || {}, { method: e, url: t, data: r }));
            };
          }),
          (e.exports = u);
      },
      782: (e, t, r) => {
        "use strict";
        var n = r(867);
        function o() {
          this.handlers = [];
        }
        (o.prototype.use = function (e, t) {
          return (
            this.handlers.push({ fulfilled: e, rejected: t }),
            this.handlers.length - 1
          );
        }),
          (o.prototype.eject = function (e) {
            this.handlers[e] && (this.handlers[e] = null);
          }),
          (o.prototype.forEach = function (e) {
            n.forEach(this.handlers, function (t) {
              null !== t && e(t);
            });
          }),
          (e.exports = o);
      },
      97: (e, t, r) => {
        "use strict";
        var n = r(793),
          o = r(303);
        e.exports = function (e, t) {
          return e && !n(t) ? o(e, t) : t;
        };
      },
      61: (e, t, r) => {
        "use strict";
        var n = r(481);
        e.exports = function (e, t, r, o, a) {
          var i = new Error(e);
          return n(i, t, r, o, a);
        };
      },
      572: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(527),
          a = r(502),
          i = r(655);
        function s(e) {
          e.cancelToken && e.cancelToken.throwIfRequested();
        }
        e.exports = function (e) {
          return (
            s(e),
            (e.headers = e.headers || {}),
            (e.data = o(e.data, e.headers, e.transformRequest)),
            (e.headers = n.merge(
              e.headers.common || {},
              e.headers[e.method] || {},
              e.headers
            )),
            n.forEach(
              ["delete", "get", "head", "post", "put", "patch", "common"],
              function (t) {
                delete e.headers[t];
              }
            ),
            (e.adapter || i.adapter)(e).then(
              function (t) {
                return (
                  s(e), (t.data = o(t.data, t.headers, e.transformResponse)), t
                );
              },
              function (t) {
                return (
                  a(t) ||
                    (s(e),
                    t &&
                      t.response &&
                      (t.response.data = o(
                        t.response.data,
                        t.response.headers,
                        e.transformResponse
                      ))),
                  Promise.reject(t)
                );
              }
            )
          );
        };
      },
      481: (e) => {
        "use strict";
        e.exports = function (e, t, r, n, o) {
          return (
            (e.config = t),
            r && (e.code = r),
            (e.request = n),
            (e.response = o),
            (e.isAxiosError = !0),
            (e.toJSON = function () {
              return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code,
              };
            }),
            e
          );
        };
      },
      185: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e, t) {
          t = t || {};
          var r = {},
            o = ["url", "method", "data"],
            a = ["headers", "auth", "proxy", "params"],
            i = [
              "baseURL",
              "transformRequest",
              "transformResponse",
              "paramsSerializer",
              "timeout",
              "timeoutMessage",
              "withCredentials",
              "adapter",
              "responseType",
              "xsrfCookieName",
              "xsrfHeaderName",
              "onUploadProgress",
              "onDownloadProgress",
              "decompress",
              "maxContentLength",
              "maxBodyLength",
              "maxRedirects",
              "transport",
              "httpAgent",
              "httpsAgent",
              "cancelToken",
              "socketPath",
              "responseEncoding",
            ],
            s = ["validateStatus"];
          function u(e, t) {
            return n.isPlainObject(e) && n.isPlainObject(t)
              ? n.merge(e, t)
              : n.isPlainObject(t)
              ? n.merge({}, t)
              : n.isArray(t)
              ? t.slice()
              : t;
          }
          function c(o) {
            n.isUndefined(t[o])
              ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o]))
              : (r[o] = u(e[o], t[o]));
          }
          n.forEach(o, function (e) {
            n.isUndefined(t[e]) || (r[e] = u(void 0, t[e]));
          }),
            n.forEach(a, c),
            n.forEach(i, function (o) {
              n.isUndefined(t[o])
                ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o]))
                : (r[o] = u(void 0, t[o]));
            }),
            n.forEach(s, function (n) {
              n in t
                ? (r[n] = u(e[n], t[n]))
                : n in e && (r[n] = u(void 0, e[n]));
            });
          var l = o.concat(a).concat(i).concat(s),
            f = Object.keys(e)
              .concat(Object.keys(t))
              .filter(function (e) {
                return -1 === l.indexOf(e);
              });
          return n.forEach(f, c), r;
        };
      },
      26: (e, t, r) => {
        "use strict";
        var n = r(61);
        e.exports = function (e, t, r) {
          var o = r.config.validateStatus;
          r.status && o && !o(r.status)
            ? t(
                n(
                  "Request failed with status code " + r.status,
                  r.config,
                  null,
                  r.request,
                  r
                )
              )
            : e(r);
        };
      },
      527: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e, t, r) {
          return (
            n.forEach(r, function (r) {
              e = r(e, t);
            }),
            e
          );
        };
      },
      655: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(16),
          a = { "Content-Type": "application/x-www-form-urlencoded" };
        function i(e, t) {
          !n.isUndefined(e) &&
            n.isUndefined(e["Content-Type"]) &&
            (e["Content-Type"] = t);
        }
        var s,
          u = {
            adapter:
              (("undefined" != typeof XMLHttpRequest ||
                ("undefined" != typeof process &&
                  "[object process]" ===
                    Object.prototype.toString.call(process))) &&
                (s = r(448)),
              s),
            transformRequest: [
              function (e, t) {
                return (
                  o(t, "Accept"),
                  o(t, "Content-Type"),
                  n.isFormData(e) ||
                  n.isArrayBuffer(e) ||
                  n.isBuffer(e) ||
                  n.isStream(e) ||
                  n.isFile(e) ||
                  n.isBlob(e)
                    ? e
                    : n.isArrayBufferView(e)
                    ? e.buffer
                    : n.isURLSearchParams(e)
                    ? (i(t, "application/x-www-form-urlencoded;charset=utf-8"),
                      e.toString())
                    : n.isObject(e)
                    ? (i(t, "application/json;charset=utf-8"),
                      JSON.stringify(e))
                    : e
                );
              },
            ],
            transformResponse: [
              function (e) {
                if ("string" == typeof e)
                  try {
                    e = JSON.parse(e);
                  } catch (e) {}
                return e;
              },
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            validateStatus: function (e) {
              return e >= 200 && e < 300;
            },
            headers: {
              common: { Accept: "application/json, text/plain, */*" },
            },
          };
        n.forEach(["delete", "get", "head"], function (e) {
          u.headers[e] = {};
        }),
          n.forEach(["post", "put", "patch"], function (e) {
            u.headers[e] = n.merge(a);
          }),
          (e.exports = u);
      },
      849: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return function () {
            for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
              r[n] = arguments[n];
            return e.apply(t, r);
          };
        };
      },
      327: (e, t, r) => {
        "use strict";
        var n = r(867);
        function o(e) {
          return encodeURIComponent(e)
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }
        e.exports = function (e, t, r) {
          if (!t) return e;
          var a;
          if (r) a = r(t);
          else if (n.isURLSearchParams(t)) a = t.toString();
          else {
            var i = [];
            n.forEach(t, function (e, t) {
              null != e &&
                (n.isArray(e) ? (t += "[]") : (e = [e]),
                n.forEach(e, function (e) {
                  n.isDate(e)
                    ? (e = e.toISOString())
                    : n.isObject(e) && (e = JSON.stringify(e)),
                    i.push(o(t) + "=" + o(e));
                }));
            }),
              (a = i.join("&"));
          }
          if (a) {
            var s = e.indexOf("#");
            -1 !== s && (e = e.slice(0, s)),
              (e += (-1 === e.indexOf("?") ? "?" : "&") + a);
          }
          return e;
        };
      },
      303: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
        };
      },
      372: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = n.isStandardBrowserEnv()
          ? {
              write: function (e, t, r, o, a, i) {
                var s = [];
                s.push(e + "=" + encodeURIComponent(t)),
                  n.isNumber(r) &&
                    s.push("expires=" + new Date(r).toGMTString()),
                  n.isString(o) && s.push("path=" + o),
                  n.isString(a) && s.push("domain=" + a),
                  !0 === i && s.push("secure"),
                  (document.cookie = s.join("; "));
              },
              read: function (e) {
                var t = document.cookie.match(
                  new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                );
                return t ? decodeURIComponent(t[3]) : null;
              },
              remove: function (e) {
                this.write(e, "", Date.now() - 864e5);
              },
            }
          : {
              write: function () {},
              read: function () {
                return null;
              },
              remove: function () {},
            };
      },
      793: (e) => {
        "use strict";
        e.exports = function (e) {
          return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
        };
      },
      985: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = n.isStandardBrowserEnv()
          ? (function () {
              var e,
                t = /(msie|trident)/i.test(navigator.userAgent),
                r = document.createElement("a");
              function o(e) {
                var n = e;
                return (
                  t && (r.setAttribute("href", n), (n = r.href)),
                  r.setAttribute("href", n),
                  {
                    href: r.href,
                    protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                    host: r.host,
                    search: r.search ? r.search.replace(/^\?/, "") : "",
                    hash: r.hash ? r.hash.replace(/^#/, "") : "",
                    hostname: r.hostname,
                    port: r.port,
                    pathname:
                      "/" === r.pathname.charAt(0)
                        ? r.pathname
                        : "/" + r.pathname,
                  }
                );
              }
              return (
                (e = o(window.location.href)),
                function (t) {
                  var r = n.isString(t) ? o(t) : t;
                  return r.protocol === e.protocol && r.host === e.host;
                }
              );
            })()
          : function () {
              return !0;
            };
      },
      16: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e, t) {
          n.forEach(e, function (r, n) {
            n !== t &&
              n.toUpperCase() === t.toUpperCase() &&
              ((e[t] = r), delete e[n]);
          });
        };
      },
      109: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = [
            "age",
            "authorization",
            "content-length",
            "content-type",
            "etag",
            "expires",
            "from",
            "host",
            "if-modified-since",
            "if-unmodified-since",
            "last-modified",
            "location",
            "max-forwards",
            "proxy-authorization",
            "referer",
            "retry-after",
            "user-agent",
          ];
        e.exports = function (e) {
          var t,
            r,
            a,
            i = {};
          return e
            ? (n.forEach(e.split("\n"), function (e) {
                if (
                  ((a = e.indexOf(":")),
                  (t = n.trim(e.substr(0, a)).toLowerCase()),
                  (r = n.trim(e.substr(a + 1))),
                  t)
                ) {
                  if (i[t] && o.indexOf(t) >= 0) return;
                  i[t] =
                    "set-cookie" === t
                      ? (i[t] ? i[t] : []).concat([r])
                      : i[t]
                      ? i[t] + ", " + r
                      : r;
                }
              }),
              i)
            : i;
        };
      },
      713: (e) => {
        "use strict";
        e.exports = function (e) {
          return function (t) {
            return e.apply(null, t);
          };
        };
      },
      867: (e, t, r) => {
        "use strict";
        var n = r(849),
          o = Object.prototype.toString;
        function a(e) {
          return "[object Array]" === o.call(e);
        }
        function i(e) {
          return void 0 === e;
        }
        function s(e) {
          return null !== e && "object" == typeof e;
        }
        function u(e) {
          if ("[object Object]" !== o.call(e)) return !1;
          var t = Object.getPrototypeOf(e);
          return null === t || t === Object.prototype;
        }
        function c(e) {
          return "[object Function]" === o.call(e);
        }
        function l(e, t) {
          if (null != e)
            if (("object" != typeof e && (e = [e]), a(e)))
              for (var r = 0, n = e.length; r < n; r++)
                t.call(null, e[r], r, e);
            else
              for (var o in e)
                Object.prototype.hasOwnProperty.call(e, o) &&
                  t.call(null, e[o], o, e);
        }
        e.exports = {
          isArray: a,
          isArrayBuffer: function (e) {
            return "[object ArrayBuffer]" === o.call(e);
          },
          isBuffer: function (e) {
            return (
              null !== e &&
              !i(e) &&
              null !== e.constructor &&
              !i(e.constructor) &&
              "function" == typeof e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            );
          },
          isFormData: function (e) {
            return "undefined" != typeof FormData && e instanceof FormData;
          },
          isArrayBufferView: function (e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(e)
              : e && e.buffer && e.buffer instanceof ArrayBuffer;
          },
          isString: function (e) {
            return "string" == typeof e;
          },
          isNumber: function (e) {
            return "number" == typeof e;
          },
          isObject: s,
          isPlainObject: u,
          isUndefined: i,
          isDate: function (e) {
            return "[object Date]" === o.call(e);
          },
          isFile: function (e) {
            return "[object File]" === o.call(e);
          },
          isBlob: function (e) {
            return "[object Blob]" === o.call(e);
          },
          isFunction: c,
          isStream: function (e) {
            return s(e) && c(e.pipe);
          },
          isURLSearchParams: function (e) {
            return (
              "undefined" != typeof URLSearchParams &&
              e instanceof URLSearchParams
            );
          },
          isStandardBrowserEnv: function () {
            return (
              ("undefined" == typeof navigator ||
                ("ReactNative" !== navigator.product &&
                  "NativeScript" !== navigator.product &&
                  "NS" !== navigator.product)) &&
              "undefined" != typeof window &&
              "undefined" != typeof document
            );
          },
          forEach: l,
          merge: function e() {
            var t = {};
            function r(r, n) {
              u(t[n]) && u(r)
                ? (t[n] = e(t[n], r))
                : u(r)
                ? (t[n] = e({}, r))
                : a(r)
                ? (t[n] = r.slice())
                : (t[n] = r);
            }
            for (var n = 0, o = arguments.length; n < o; n++)
              l(arguments[n], r);
            return t;
          },
          extend: function (e, t, r) {
            return (
              l(t, function (t, o) {
                e[o] = r && "function" == typeof t ? n(t, r) : t;
              }),
              e
            );
          },
          trim: function (e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "");
          },
          stripBOM: function (e) {
            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
          },
        };
      },
    },
    t = {};
  !(function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { exports: {} });
    return e[n].call(o.exports, o, o.exports, r), o.exports;
  })(608);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vc3JjL2NsaWVudC9zY3JpcHQvYXV0aC50cyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vc3JjL2NsaWVudC9zY3JpcHQvaW5wdXRDaGFuZ2VzLnRzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9zcmMvY2xpZW50L3NjcmlwdC9yZWdpc3RyYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL3NyYy9jbGllbnQvc2NyaXB0L3NjZW5hcmlvLnRzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9zcmMvY2xpZW50L3NjcmlwdC9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vbWluZGJveC1xdWljay1zdGFydC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0Ly4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9taW5kYm94LXF1aWNrLXN0YXJ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21pbmRib3gtcXVpY2stc3RhcnQvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImV2ZW50IiwiYXV0aEZvcm0iLCJwcmV2ZW50RGVmYXVsdCIsImVycm9yTWVzc2FnZSIsInF1ZXJ5U2VsZWN0b3IiLCJzdWJtaXRCdG4iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwicmVxdWVzdEJvZHkiLCJlbWFpbCIsImdldCIsInBhc3N3b3JkIiwicG9zdCIsImhlYWRlcnMiLCJ0b2tlbiIsImRhdGUiLCJEYXRlIiwibm93IiwidG9VVENTdHJpbmciLCJkb2N1bWVudCIsImNvb2tpZSIsImRhdGEiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlcGxhY2UiLCJoYW5kbGVFbWFpbElucHV0IiwidGFyZ2V0IiwidmFsdWUiLCJpbmRleE9mIiwic3BsaXQiLCJoYW5kbGVQcm9qZWN0TmFtZUlucHV0IiwiaGFuZGxlU2NlbmFyaW9DaGFuZ2UiLCJzcGVjaWZpY2F0aW9uTGludCIsImZvcm1JbnB1dENhbXBhaWduIiwiaW5uZXJIVE1MIiwiYWxlcnQiLCJyZXN1bHQiLCJ0YXNrTmFtZSIsInByb2plY3ROYW1lIiwiY2FtcGFpbmdOdW1iZXIiLCJ1bmRlZmluZWQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVnaXN0cmF0aW9uRm9ybSIsInNjZW5hcmlvRm9ybSIsImVtYWlsSW5wdXQiLCJ0YXNrIiwibW9kdWxlIiwiZXhwb3J0cyIsInV0aWxzIiwic2V0dGxlIiwiY29va2llcyIsImJ1aWxkVVJMIiwiYnVpbGRGdWxsUGF0aCIsInBhcnNlSGVhZGVycyIsImlzVVJMU2FtZU9yaWdpbiIsImNyZWF0ZUVycm9yIiwiY29uZmlnIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0RGF0YSIsInJlcXVlc3RIZWFkZXJzIiwiaXNGb3JtRGF0YSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsImF1dGgiLCJ1c2VybmFtZSIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiQXV0aG9yaXphdGlvbiIsImJ0b2EiLCJmdWxsUGF0aCIsImJhc2VVUkwiLCJ1cmwiLCJvcGVuIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJwYXJhbXMiLCJwYXJhbXNTZXJpYWxpemVyIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVVSTCIsInJlc3BvbnNlSGVhZGVycyIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlIiwicmVzcG9uc2VUeXBlIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsIm9uYWJvcnQiLCJvbmVycm9yIiwib250aW1lb3V0IiwidGltZW91dEVycm9yTWVzc2FnZSIsImlzU3RhbmRhcmRCcm93c2VyRW52IiwieHNyZlZhbHVlIiwid2l0aENyZWRlbnRpYWxzIiwieHNyZkNvb2tpZU5hbWUiLCJyZWFkIiwieHNyZkhlYWRlck5hbWUiLCJmb3JFYWNoIiwidmFsIiwia2V5IiwidG9Mb3dlckNhc2UiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiaXNVbmRlZmluZWQiLCJlIiwib25Eb3dubG9hZFByb2dyZXNzIiwib25VcGxvYWRQcm9ncmVzcyIsInVwbG9hZCIsImNhbmNlbFRva2VuIiwicHJvbWlzZSIsInRoZW4iLCJjYW5jZWwiLCJhYm9ydCIsInNlbmQiLCJiaW5kIiwiQXhpb3MiLCJtZXJnZUNvbmZpZyIsImNyZWF0ZUluc3RhbmNlIiwiZGVmYXVsdENvbmZpZyIsImNvbnRleHQiLCJpbnN0YW5jZSIsInByb3RvdHlwZSIsImV4dGVuZCIsImF4aW9zIiwiY3JlYXRlIiwiaW5zdGFuY2VDb25maWciLCJkZWZhdWx0cyIsIkNhbmNlbCIsIkNhbmNlbFRva2VuIiwiaXNDYW5jZWwiLCJhbGwiLCJwcm9taXNlcyIsInNwcmVhZCIsImRlZmF1bHQiLCJtZXNzYWdlIiwidGhpcyIsInRvU3RyaW5nIiwiX19DQU5DRUxfXyIsImV4ZWN1dG9yIiwiVHlwZUVycm9yIiwicmVzb2x2ZVByb21pc2UiLCJyZWFzb24iLCJ0aHJvd0lmUmVxdWVzdGVkIiwic291cmNlIiwiYyIsIkludGVyY2VwdG9yTWFuYWdlciIsImRpc3BhdGNoUmVxdWVzdCIsImludGVyY2VwdG9ycyIsImFyZ3VtZW50cyIsImNoYWluIiwiaW50ZXJjZXB0b3IiLCJ1bnNoaWZ0IiwiZnVsZmlsbGVkIiwicmVqZWN0ZWQiLCJwdXNoIiwibGVuZ3RoIiwic2hpZnQiLCJnZXRVcmkiLCJoYW5kbGVycyIsInVzZSIsImVqZWN0IiwiaWQiLCJmbiIsImgiLCJpc0Fic29sdXRlVVJMIiwiY29tYmluZVVSTHMiLCJyZXF1ZXN0ZWRVUkwiLCJlbmhhbmNlRXJyb3IiLCJjb2RlIiwiZXJyb3IiLCJFcnJvciIsInRyYW5zZm9ybURhdGEiLCJ0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIiwidHJhbnNmb3JtUmVxdWVzdCIsIm1lcmdlIiwiY29tbW9uIiwiYWRhcHRlciIsInRyYW5zZm9ybVJlc3BvbnNlIiwiaXNBeGlvc0Vycm9yIiwidG9KU09OIiwibmFtZSIsImRlc2NyaXB0aW9uIiwibnVtYmVyIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3RhY2siLCJjb25maWcxIiwiY29uZmlnMiIsInZhbHVlRnJvbUNvbmZpZzJLZXlzIiwibWVyZ2VEZWVwUHJvcGVydGllc0tleXMiLCJkZWZhdWx0VG9Db25maWcyS2V5cyIsImRpcmVjdE1lcmdlS2V5cyIsImdldE1lcmdlZFZhbHVlIiwiaXNQbGFpbk9iamVjdCIsImlzQXJyYXkiLCJzbGljZSIsIm1lcmdlRGVlcFByb3BlcnRpZXMiLCJwcm9wIiwiYXhpb3NLZXlzIiwiY29uY2F0Iiwib3RoZXJLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInZhbGlkYXRlU3RhdHVzIiwiZm5zIiwibm9ybWFsaXplSGVhZGVyTmFtZSIsIkRFRkFVTFRfQ09OVEVOVF9UWVBFIiwic2V0Q29udGVudFR5cGVJZlVuc2V0IiwicHJvY2VzcyIsImNhbGwiLCJpc0FycmF5QnVmZmVyIiwiaXNCdWZmZXIiLCJpc1N0cmVhbSIsImlzRmlsZSIsImlzQmxvYiIsImlzQXJyYXlCdWZmZXJWaWV3IiwiYnVmZmVyIiwiaXNVUkxTZWFyY2hQYXJhbXMiLCJpc09iamVjdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsIm1heENvbnRlbnRMZW5ndGgiLCJtYXhCb2R5TGVuZ3RoIiwidGhpc0FyZyIsImFyZ3MiLCJBcnJheSIsImkiLCJhcHBseSIsImVuY29kZSIsInNlcmlhbGl6ZWRQYXJhbXMiLCJwYXJ0cyIsInYiLCJpc0RhdGUiLCJ0b0lTT1N0cmluZyIsImpvaW4iLCJoYXNobWFya0luZGV4IiwicmVsYXRpdmVVUkwiLCJ3cml0ZSIsImV4cGlyZXMiLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiaXNOdW1iZXIiLCJ0b0dNVFN0cmluZyIsImlzU3RyaW5nIiwibWF0Y2giLCJSZWdFeHAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0ZXN0Iiwib3JpZ2luVVJMIiwibXNpZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInVybFBhcnNpbmdOb2RlIiwiY3JlYXRlRWxlbWVudCIsInJlc29sdmVVUkwiLCJocmVmIiwic2V0QXR0cmlidXRlIiwicHJvdG9jb2wiLCJob3N0Iiwic2VhcmNoIiwiaGFzaCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwiY2hhckF0IiwicmVxdWVzdFVSTCIsInBhcnNlZCIsIm5vcm1hbGl6ZWROYW1lIiwiaWdub3JlRHVwbGljYXRlT2YiLCJsaW5lIiwidHJpbSIsInN1YnN0ciIsImNhbGxiYWNrIiwiYXJyIiwiZ2V0UHJvdG90eXBlT2YiLCJpc0Z1bmN0aW9uIiwib2JqIiwibCIsImhhc093blByb3BlcnR5IiwiY29uc3RydWN0b3IiLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsInBpcGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJwcm9kdWN0IiwiYXNzaWduVmFsdWUiLCJhIiwiYiIsInN0ciIsInN0cmlwQk9NIiwiY29udGVudCIsImNoYXJDb2RlQXQiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJfX3dlYnBhY2tfbW9kdWxlc19fIl0sIm1hcHBpbmdzIjoiOGlEQUFBLGdCQXlDQSxVQXJDYSxTQUFPQSxFQUFjQyxHQUF5QiwwQyxrRUFDekRELEVBQU1FLGlCQUVBQyxFQUFlRixFQUFTRyxjQUFjLFVBRzVDQyxPQUZNQSxFQUFZSixFQUFTRyxjQUFjLGFBRXpDQyxFQUFXQyxVQUFVQyxJQUFJLFdBQ3pCSixXQUFjRyxVQUFVRSxPQUFPLFdBRXpCQyxFQUFXLElBQUlDLFNBQVNULEdBQ3hCVSxFQUErQixDQUNuQ0MsTUFBU0gsRUFBU0ksSUFB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S0FHTitMLEdBcUNQaEIsS0FoS0YsU0FBY2tCLEdBQ1osT0FBT0EsRUFBSTlRLFFBQVEsT0FBUSxJQUFJQSxRQUFRLE9BQVEsS0FnSy9DK1EsU0E3QkYsU0FBa0JDLEdBSWhCLE9BSDhCLFFBQTFCQSxFQUFRQyxXQUFXLEtBQ3JCRCxFQUFVQSxFQUFRbEcsTUFBTSxJQUVuQmtHLE1DblVMRSxFQUEyQixJQUcvQixTQUFTQyxFQUFvQkMsR0FFNUIsR0FBR0YsRUFBeUJFLEdBQzNCLE9BQU9GLEVBQXlCRSxHQUFVN1AsUUFHM0MsSUFBSUQsRUFBUzRQLEVBQXlCRSxHQUFZLENBR2pEN1AsUUFBUyxJQU9WLE9BSEE4UCxFQUFvQkQsR0FBVXZGLEtBQUt2SyxFQUFPQyxRQUFTRCxFQUFRQSxFQUFPQyxRQUFTNFAsR0FHcEU3UCxFQUFPQyxRQ2pCZjRQLENBQW9CLE0iLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5pbXBvcnQgeyBBdXRoUmVxdWVzdEJvZHkgfSBmcm9tIFwiLi4vLi4vaW5kZXguZFwiO1xuXG5jb25zdCBhdXRoID0gYXN5bmMgKGV2ZW50OiBFdmVudCwgYXV0aEZvcm06IEhUTUxGb3JtRWxlbWVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGF1dGhGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjZXJyb3JcIik7XG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGF1dGhGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuXG4gIHN1Ym1pdEJ0bj8uY2xhc3NMaXN0LmFkZChcImxvYWRpbmdcIik7XG4gIGVycm9yTWVzc2FnZT8uY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG5cbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoYXV0aEZvcm0pO1xuICBjb25zdCByZXF1ZXN0Qm9keTogQXV0aFJlcXVlc3RCb2R5ID0ge1xuICAgIGVtYWlsOiAoKGZvcm1EYXRhLmdldChcImVtYWlsXCIpICsgXCJAbWluZGJveC5ydVwiKSBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gICAgcGFzc3dvcmQ6IChmb3JtRGF0YS5nZXQoXCJwYXNzd29yZFwiKSBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF4aW9zLnBvc3Q8QXV0aFJlcXVlc3RCb2R5PihcbiAgICAgIFwiL2FwaS91c2VyL2F1dGhcIixcbiAgICAgIHJlcXVlc3RCb2R5LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vINGD0YHRgtCw0L3QsNC70LjQstCw0LXQvCDQutGD0LrRgyDRgSDRgtC+0LrQtdC90L7QvC4g0JTQtdC50YHRgtCy0YPQtdGCIDEg0LTQtdC90YxcbiAgICBsZXQgZGF0ZTogRGF0ZSB8IHN0cmluZyA9IG5ldyBEYXRlKERhdGUubm93KCkgKyA4NjQwMGUzKTtcbiAgICBkYXRlID0gZGF0ZS50b1VUQ1N0cmluZygpO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGB0b2tlbj0ke3Rva2VuLmRhdGF9OyBleHBpcmVzPSR7ZGF0ZX1gO1xuXG4gICAgLy8g0LXRgdC70Lgg0LLRgdC1INGF0L7RgNC+0YjQviwg0L7RgtC/0YDQsNCy0LvRj9C10Lwg0L3QsCDRgdGC0YDQsNC90LjRhtGDINGB0YbQtdC90LDRgNC40LXQslxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiL3NjZW5hcmlvXCIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGVycm9yTWVzc2FnZT8uY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgc3VibWl0QnRuPy5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXV0aDtcbiIsImV4cG9ydCBjb25zdCBoYW5kbGVFbWFpbElucHV0ID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgaWYgKHRhcmdldC52YWx1ZS5pbmRleE9mKFwiQFwiKSA+IDApIHtcbiAgICB0YXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc3BsaXQoXCJAXCIpWzBdO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlUHJvamVjdE5hbWVJbnB1dCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGlmICh0YXJnZXQudmFsdWUuaW5kZXhPZihcImh0dHA6Ly9cIikgPj0gMCkge1xuICAgIHRhcmdldC52YWx1ZSA9IHRhcmdldC52YWx1ZS5yZXBsYWNlKFwiaHR0cDovL1wiLCBcIlwiKTtcbiAgfVxuICBpZiAodGFyZ2V0LnZhbHVlLmluZGV4T2YoXCJodHRwczovL1wiKSA+PSAwKSB7XG4gICAgdGFyZ2V0LnZhbHVlID0gdGFyZ2V0LnZhbHVlLnJlcGxhY2UoXCJodHRwczovL1wiLCBcIlwiKTtcbiAgfVxuICBpZiAodGFyZ2V0LnZhbHVlLmluZGV4T2YoXCIuXCIpID49IDApIHtcbiAgICB0YXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc3BsaXQoXCIuXCIpWzBdO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlU2NlbmFyaW9DaGFuZ2UgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBzcGVjaWZpY2F0aW9uTGludCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGludFRvVFpcIik7XG4gIGNvbnN0IGZvcm1JbnB1dENhbXBhaWduID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtX19pbnB1dF9jYW1wYWlnblwiKTtcblxuICBzd2l0Y2ggKHRhcmdldC52YWx1ZSkge1xuICAgIGNhc2UgXCJlY29tbWVyY2VcIjpcbiAgICAgIGlmIChzcGVjaWZpY2F0aW9uTGludCkge1xuICAgICAgICBzcGVjaWZpY2F0aW9uTGludC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIlwiPtC40L3RgtC10YDQvdC10YIg0LzQsNCz0LDQt9C40L3QsDwvYT5gO1xuICAgICAgfVxuICAgICAgZm9ybUlucHV0Q2FtcGFpZ24/LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJsb3lhbHR5T25saW5lXCI6XG4gICAgICBpZiAoc3BlY2lmaWNhdGlvbkxpbnQpIHtcbiAgICAgICAgc3BlY2lmaWNhdGlvbkxpbnQuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCJcIj7Qn9CbINC90LAg0YHQsNC50YLQtTwvYT5gO1xuICAgICAgfVxuICAgICAgZm9ybUlucHV0Q2FtcGFpZ24/LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJsb3lhbHR5T2ZsaW5lXCI6XG4gICAgICBpZiAoc3BlY2lmaWNhdGlvbkxpbnQpIHtcbiAgICAgICAgc3BlY2lmaWNhdGlvbkxpbnQuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCJcIj7Qn9CbINCyINC60LDRgdGB0LDRhTwvYT5gO1xuICAgICAgfVxuICAgICAgZm9ybUlucHV0Q2FtcGFpZ24/LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJtb2JpbGVQdXNoXCI6XG4gICAgICBpZiAoc3BlY2lmaWNhdGlvbkxpbnQpIHtcbiAgICAgICAgc3BlY2lmaWNhdGlvbkxpbnQuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCJcIj7QodGC0LDQvdC00LDRgNGC0L3QsNGPINC40L3RgtC10LPRgNCw0YbQuNGPINC80L7QsdC40LvRjNC90L7Qs9C+INC/0YDQuNC70L7QttC10L3QuNGPPC9hPmA7XG4gICAgICB9XG4gICAgICBmb3JtSW5wdXRDYW1wYWlnbj8uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbmltcG9ydCB7IFJlZ2lzdHJhdGlvblJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vaW5kZXguZFwiO1xuXG5jb25zdCByZWdpc3RyYXRpb24gPSBhc3luYyAoZXZlbnQ6IEV2ZW50LCBhdXRoRm9ybTogSFRNTEZvcm1FbGVtZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoYXV0aEZvcm0pO1xuXG4gIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgIGVtYWlsOiAoKGZvcm1EYXRhLmdldChcImVtYWlsXCIpICsgXCJAbWluZGJveC5ydVwiKSBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF4aW9zLnBvc3Q8UmVnaXN0cmF0aW9uUmVxdWVzdD4oXG4gICAgICBcIi9hcGkvdXNlci9yZWdcIixcbiAgICAgIHJlcXVlc3RCb2R5LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7IFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiL1wiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvcik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdHJhdGlvbjtcbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuaW1wb3J0IHsgU2NlbmFyaW9SZXF1ZXN0Qm9keSwgU2NlbmFyaW9zIH0gZnJvbSBcIi4uLy4uXCI7XG5cbmNvbnN0IHNjZW5hcmlvID0gYXN5bmMgKGV2ZW50OiBFdmVudCwgYXV0aEZvcm06IEhUTUxGb3JtRWxlbWVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGF1dGhGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuICBjb25zdCByZXN1bHQgPSBhdXRoRm9ybS5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdFwiKTtcbiAgc3VibWl0QnRuPy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZ1wiKTtcblxuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShhdXRoRm9ybSk7XG5cbiAgY29uc3QgcmVxdWVzdEJvZHk6IFNjZW5hcmlvUmVxdWVzdEJvZHkgPSB7XG4gICAgdGFza05hbWU6IChmb3JtRGF0YS5nZXQoXCJ0YXNrXCIpIGFzIGtleW9mIFNjZW5hcmlvcykgfHwgXCJcIixcbiAgICBwcm9qZWN0TmFtZTogKGZvcm1EYXRhLmdldChcInByb2plY3ROYW1lXCIpIGFzIHN0cmluZykgfHwgXCJcIixcbiAgICBjYW1wYWluZ051bWJlcjogKyhmb3JtRGF0YS5nZXQoXCJjYW1wYWlnblwiKSB8fCBcIlwiKSBhcyBudW1iZXIsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBheGlvcy5wb3N0PFNjZW5hcmlvUmVxdWVzdEJvZHk+KFwiL2FwaS9zY2VuYXJpby9zdGFydFwiLCByZXF1ZXN0Qm9keSwge1xuICAgICAgaGVhZGVyczogeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIH0pO1xuXG4gICAgc3VibWl0QnRuPy5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICByZXN1bHQ/LmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JtX19yZXN1bHRfaGlkZGVuXCIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHN1Ym1pdEJ0bj8uY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjZW5hcmlvO1xuIiwiaW1wb3J0IGF1dGggZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHJlZ2lzdHJhdGlvbiBmcm9tIFwiLi9yZWdpc3RyYXRpb25cIjtcbmltcG9ydCBzY2VuYXJpbyBmcm9tIFwiLi9zY2VuYXJpb1wiO1xuaW1wb3J0IHtcbiAgaGFuZGxlRW1haWxJbnB1dCxcbiAgaGFuZGxlUHJvamVjdE5hbWVJbnB1dCxcbiAgaGFuZGxlU2NlbmFyaW9DaGFuZ2UsXG59IGZyb20gXCIuL2lucHV0Q2hhbmdlc1wiO1xuXG5jb25zdCBhdXRoRm9ybSA9XG4gIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dGhfX2Zvcm1cIikgYXMgSFRNTEZvcm1FbGVtZW50KSB8fCB1bmRlZmluZWQ7XG5cbmF1dGhGb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4gYXV0aChldmVudCwgYXV0aEZvcm0pKTtcblxuY29uc3QgcmVnaXN0cmF0aW9uRm9ybSA9XG4gIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dGhfX2Zvcm1fcmVnaXN0cmF0aW9uXCIpIGFzIEhUTUxGb3JtRWxlbWVudCkgfHxcbiAgdW5kZWZpbmVkO1xuXG5yZWdpc3RyYXRpb25Gb3JtPy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT5cbiAgcmVnaXN0cmF0aW9uKGV2ZW50LCByZWdpc3RyYXRpb25Gb3JtKVxuKTtcblxuY29uc3Qgc2NlbmFyaW9Gb3JtID1cbiAgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2NlbmFyaW9cIikgYXMgSFRNTEZvcm1FbGVtZW50KSB8fCB1bmRlZmluZWQ7XG5cbnNjZW5hcmlvRm9ybT8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+XG4gIHNjZW5hcmlvKGV2ZW50LCBzY2VuYXJpb0Zvcm0pXG4pO1xuY29uc3QgZW1haWxJbnB1dCA9XG4gIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpIGFzIEhUTUxGb3JtRWxlbWVudCkgfHwgdW5kZWZpbmVkO1xuXG5lbWFpbElucHV0Py5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoZXZlbnQpID0+IGhhbmRsZUVtYWlsSW5wdXQoZXZlbnQpKTtcblxuY29uc3QgcHJvamVjdE5hbWUgPVxuICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0TmFtZVwiKSBhcyBIVE1MRm9ybUVsZW1lbnQpIHx8IHVuZGVmaW5lZDtcblxucHJvamVjdE5hbWU/LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIChldmVudCkgPT4gaGFuZGxlUHJvamVjdE5hbWVJbnB1dChldmVudCkpO1xuXG5jb25zdCB0YXNrID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKSBhcyBIVE1MRm9ybUVsZW1lbnQpIHx8IHVuZGVmaW5lZDtcblxudGFzaz8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IGhhbmRsZVNjZW5hcmlvQ2hhbmdlKGV2ZW50KSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oNjA4KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
