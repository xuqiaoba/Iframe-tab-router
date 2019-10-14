
//监听重新加载界面事件(点击浏览器按钮刷新，会进catch，点击菜单刷新，正常调用fj())
window.onload = function (e) {     
    try {
        window.parent.father()
    } catch (e) {
        window.history.pushState({ id: 1, url: './Home.html', menuname:  '主界面' }, "title", './Home.html');
        window.location.reload()
    }
}