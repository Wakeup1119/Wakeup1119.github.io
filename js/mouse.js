// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}

// 魔改鼠标
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle
            ? window.getComputedStyle(el)[attr]
            : el.currentStyle[attr];
    } catch (e) {}
    return "";
};

class Cursor {
    constructor() {
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName('*');
        for (let i = 0; i < el.length; i++)
            if (getStyle(el[i], "cursor") == "pointer")
                this.pt.push(el[i].outerHTML);

        document.body.appendChild((this.scr = document.createElement("style")));
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5' fill='rgb(0,255,255)'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr.remove();
        this.cursor.classList.remove("hover");
        this.cursor.classList.remove("active");
        this.pos = {curr: null, prev: null};
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
        document.onmouseenter = e => this.cursor.classList.remove("hidden");
        document.onmouseleave = e => this.cursor.classList.add("hidden");
        document.onmousedown  = e => this.cursor.classList.add("active");
        document.onmouseup    = e => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();

if (document.addEventListener("copy", (function() {
    debounce((function() {
        new Vue({
            data: function() {
                this.$notify({
                    title: "哎嘿！复制成功🍬",
                    message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                    position: "top-left",
                    offset: 50,
                    showClose: !0,
                    type: "success",
                    duration: 5e3
                })
            }
        })
    }
    ), 300)
  }
  )),
  document.onkeydown = function(e) {
    (123 == e.keyCode || e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode) || e.ctrlKey && 85 === e.keyCode) && debounce((function() {
        new Vue({
            data: function() {
                this.$notify({
                    title: "你已被发现😜",
                    message: "小伙子，扒源记住要遵循GPL协议！",
                    position: "top-left",
                    offset: 50,
                    showClose: !0,
                    type: "warning",
                    duration: 5e3
                })
            }
        })
    }
    ), 300)
  }
  ,
  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || window && (()=>{
    let e = 50
      , t = 150
      , o = "255, 255, 255"
      , n = 1.5
      , a = .5
      , s = .7
      , r = .5;
    const l = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
    ;
    window.requestAnimationFrame = l;
    const c = document.getElementById("snow")
      , i = c.getContext("2d")
      , d = e;
    let b = -100
      , m = -100
      , u = [];
    c.width = window.innerWidth,
    c.height = window.innerHeight;
    const g = ()=>{
        i.clearRect(0, 0, c.width, c.height);
        const e = t;
        for (let t = 0; t < d; t++) {
            let n = u[t];
            const a = b
              , s = m
              , r = n.x
              , l = n.y
              , d = Math.sqrt((a - r) * (a - r) + (s - l) * (s - l));
            if (d < e) {
                const t = (a - r) / d
                  , o = (s - l) / d
                  , c = e / (d * d) / 2;
                n.velX -= c * t,
                n.velY -= c * o
            } else
                n.velX *= .98,
                n.velY < n.speed && n.speed - n.velY > .01 && (n.velY += .01 * (n.speed - n.velY)),
                n.velX += Math.cos(n.step += .05) * n.stepSize;
            i.fillStyle = "rgba(" + o + ", " + n.opacity + ")",
            n.y += n.velY,
            n.x += n.velX,
            (n.y >= c.height || n.y <= 0) && f(n),
            (n.x >= c.width || n.x <= 0) && f(n),
            i.beginPath(),
            i.arc(n.x, n.y, n.size, 0, 2 * Math.PI),
            i.fill()
        }
        l(g)
    }
      , f = e=>{
        e.x = Math.floor(Math.random() * c.width),
        e.y = 0,
        e.size = 3 * Math.random() + 2,
        e.speed = 1 * Math.random() + .5,
        e.velY = e.speed,
        e.velX = 0,
        e.opacity = .5 * Math.random() + .3
    }
    ;
    document.addEventListener("mousemove", (e=>{
        b = e.clientX,
        m = e.clientY
    }
    )),
    window.addEventListener("resize", (()=>{
        c.width = window.innerWidth,
        c.height = window.innerHeight
    }
    )),
    (()=>{
        for (let e = 0; e < d; e++) {
            const e = Math.floor(Math.random() * c.width)
              , t = Math.floor(Math.random() * c.height)
              , o = 3 * Math.random() + n
              , l = 1 * Math.random() + a
              , i = .5 * Math.random() + s;
            u.push({
                speed: l,
                velX: 0,
                velY: l,
                x: e,
                y: t,
                size: o,
                stepSize: Math.random() / 30 * r,
                step: 0,
                angle: 180,
                opacity: i
            })
        }
        g()
    }
    )()
  }
  )(),
  dark(),
  document.addEventListener("pjax:complete", (function() {
    document.getElementById("post-comment") && owoBig()
  }
  )),
  document.addEventListener("DOMContentLoaded", (function() {
    document.getElementById("post-comment") && owoBig()
  }
  )),
  document.body.clientWidth > 992) {
    function getBasicInfo() {
        var e = $(window).height()
          , t = $("body")[0].scrollHeight
          , o = $(window).scrollTop();
        return {
            ViewH: e,
            DocH: t,
            ScrollTop: o,
            Band_H: o / (t - e) * 100,
            S_V: t - e
        }
    }
    function show(e) {
        e.ScrollTop > .001 ? $(".neko").css("display", "block") : $(".neko").css("display", "none")
    }
    !function(e) {
        e.fn.nekoScroll = function(t) {
            var o = e.extend({
                top: "0",
                scroWidth: "6px",
                z_index: 9999,
                zoom: .9,
                borderRadius: "5px",
                right: "55.6px",
                nekoImg: "https://bu.dusays.com/2022/07/20/62d812db74be9.png",
                hoverMsg: "春天啦~",
                color: "var(--theme-color)",
                during: 500,
                blog_body: "body"
            }, t)
              , n = "" !== this.prop("className") ? "." + this.prop("className") : "" !== this.prop("id") ? "#" + this.prop("id") : this.prop("nodeName");
            0 == e(".neko").length && this.after('<div class="neko" id=' + o.nekoname + ' data-msg="' + o.hoverMsg + '"></div>');
            let a = getBasicInfo();
            return e(n).css({
                position: "fixed",
                width: o.scroWidth,
                top: o.top,
                height: a.Band_H * o.zoom * a.ViewH * .01 + "px",
                "z-index": o.z_index,
                "background-color": o.bgcolor,
                "border-radius": o.borderRadius,
                right: o.right,
                "background-image": "url(" + o.scImg + ")",
                "background-image": "-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)",
                "border-radius": "2em",
                "background-size": "contain"
            }),
            e("#" + o.nekoname).css({
                position: "fixed",
                top: a.Band_H * o.zoom * a.ViewH * .01 - 50 + "px",
                "z-index": 10 * o.z_index,
                right: o.right,
                "background-image": "url(" + o.nekoImg + ")"
            }),
            show(getBasicInfo()),
            e(window).scroll((function() {
                let t = getBasicInfo();
                show(t),
                e(n).css({
                    position: "fixed",
                    width: o.scroWidth,
                    top: o.top,
                    height: t.Band_H * o.zoom * t.ViewH * .01 + "px",
                    "z-index": o.z_index,
                    "background-color": o.bgcolor,
                    "border-radius": o.borderRadius,
                    right: o.right,
                    "background-image": "url(" + o.scImg + ")",
                    "background-image": "-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)",
                    "border-radius": "2em",
                    "background-size": "contain"
                }),
                e("#" + o.nekoname).css({
                    position: "fixed",
                    top: t.Band_H * o.zoom * t.ViewH * .01 - 50 + "px",
                    "z-index": 10 * o.z_index,
                    right: o.right,
                    "background-image": "url(" + o.nekoImg + ")"
                }),
                t.ScrollTop == t.S_V ? e("#" + o.nekoname).addClass("showMsg") : (e("#" + o.nekoname).removeClass("showMsg"),
                e("#" + o.nekoname).attr("data-msg", o.hoverMsg))
            }
            )),
            this.click((function(e) {
                btf.scrollToDest(0, 500)
            }
            )),
            e("#" + o.nekoname).click((function() {
                btf.scrollToDest(0, 500)
            }
            )),
            this
        }
    }(jQuery),
    $(document).ready((function() {
        $("#myscoll").nekoScroll({
            bgcolor: "rgb(0 0 0 / .5)",
            borderRadius: "2em",
            zoom: .9
        })
    }
    ))
  }
  