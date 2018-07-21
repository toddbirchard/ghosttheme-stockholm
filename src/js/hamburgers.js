!function() {
    "use strict";
    function e(e) {
        var n, t, i;
        for (i = e.length; i; i -= 1)
            n = Math.floor(Math.random() * i),
            t = e[i - 1],
            e[i - 1] = e[n],
            e[n] = t;
        return e
    }
    var n = function(e, n, t) {
        if ("[object Object]" === Object.prototype.toString.call(e))
            for (var i in e)
                Object.prototype.hasOwnProperty.call(e, i) && n.call(t, e[i], i, e);
        else
            for (var a = 0, o = e.length; o > a; a++)
                n.call(t, e[a], a, e)
    };
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, n) {
            window.setTimeout(e, 1e3 / 60)
        }
    }(),
    window.requestInterval = function(e, n) {
        function t() {
            var o = (new Date).getTime()
              , r = o - i;
            r >= n && (e.call(),
            i = (new Date).getTime()),
            a.value = window.requestAnimFrame(t)
        }
        if (!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame))
            return window.setInterval(e, n);
        var i = (new Date).getTime()
          , a = new Object;
        return a.value = window.requestAnimFrame(t),
        a
    }
    ,
    window.clearRequestInterval = function(e) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(e.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(e.value) : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(e.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(e.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(e.value) : clearInterval(e)
    }
    ,
    window.requestTimeout = function(e, n) {
        function t() {
            var o = (new Date).getTime()
              , r = o - i;
            r >= n ? e.call() : a.value = window.requestAnimFrame(t)
        }
        if (!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame))
            return window.setTimeout(e, n);
        var i = (new Date).getTime()
          , a = new Object;
        return a.value = window.requestAnimFrame(t),
        a
    }
    ;
    var t = {
        make: function() {
            var e = document.querySelectorAll(".js-hamburger");
            e.length > 0 && n(e, function(e) {
                e.addEventListener("click", t.clickHandle, !1)
            }),
            t.headerAnimate(),
            document.querySelector(".js-hint").addEventListener("click", t.hintHandle, !1)
        },
        clickHandle: function(e) {
            e.preventDefault(),
            this.classList.toggle("is-active")
        },
        hintHandle: function(e) {
            e.preventDefault(),
            this.parentNode.removeChild(this),
            document.getElementById("hint").classList.add("is-visible")
        },
        headerAnimateDelay: 200,
        headerAnimateInterval: 3250,
        headerAnimate: function() {
            function n() {
                var e = parseInt(a.getAttribute("data-class"), 10);
                a.classList.add("hamburger--" + i[e]),
                window.requestTimeout(function() {
                    a.classList.add("is-active"),
                    window.requestTimeout(function() {
                        a.classList.remove("is-active"),
                        window.requestTimeout(function() {
                            a.classList.remove("hamburger--" + i[e]);
                            var n = e + 1;
                            n === i.length && (n = 1),
                            a.setAttribute("data-class", n)
                        }, 750)
                    }, 1e3)
                }, 750)
            }
            var i = ["slider", "squeeze", "arrow", "arrowalt", "spin", "elastic", "emphatic", "collapse", "vortex", "stand", "spring", "3dx", "3dy", "boring"];
            e(i);
            var a = document.querySelector(".hamburger--header")
              , o = window.requestInterval(n, t.headerAnimateDelay);
            window.requestTimeout(function() {
                window.clearRequestInterval(o),
                o = window.requestInterval(n, t.headerAnimateInterval)
            }, t.headerAnimateDelay)
        }
    };
    t.make()
}();
