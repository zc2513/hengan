(function (designWidth, maxWidth) {   
    let tid;
    let rootItem, rootStyle;

    function restsize() {
        let width = document.documentElement.getBoundingClientRect().width;
        if (!maxWidth) maxWidth = 540;
        if (width > maxWidth) width = maxWidth;
        //与淘宝做法不同，直接采用简单的rem换算方法1rem=100px
        let rem = width * 100 / designWidth;
        //兼容UC开始
        rootStyle = "html{font-size:" + rem + 'px !important}';
        rootItem = document.getElementById('rootsize') || document.createElement("style");
        if (!document.getElementById('rootsize')) {
            document.getElementsByTagName("head")[0].appendChild(rootItem);
            rootItem.id = 'rootsize';
        }
        if (rootItem.styleSheet) {
            rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
        } else {
            try {
                rootItem.innerHTML = rootStyle
            } catch (f) {
                rootItem.innerText = rootStyle
            }
        }
        //兼容UC结束
        document.documentElement.style.fontSize = rem + "px";
    };
    restsize();

    window.addEventListener("resize", function () {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(restsize, 300);
    }, false);

    window.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(restsize, 300);
        }
    }, false);

    if (document.readyState === "complete") {
        document.body.style.fontSize = "16px";
    } else {
        document.addEventListener("DOMContentLoaded", function (e) {
            document.body.style.fontSize = "16px";
        }, false);
    }
})(320, 1024);