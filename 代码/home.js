
//菜单数组
const menuArray = [
    { id: 1, url: './page1.html', name: '菜单一' },
    { id: 2, url: './page2.html', name: '菜单二' },
    { id: 3, url: './page3.html', name: '菜单三' },
    { id: 4, url: './page4.html', name: '菜单四' },
    { id: 5, url: './page5.html', name: '菜单五' },
    { id: 6, url: './page6.html', name: '菜单六' },
];
//储存切换的tab菜单
var tabmune = [];
showMenu();
//循环显示左边菜单
function showMenu() {
    let Html = "";
    menuArray.forEach(item => {
        Html += `<li class="menuLi" id="menu_${item.id}" onclick="toPage(${item.id},'${item.url}','${item.name}')">${item.name}</li>`
    });
    $("#menu").html(Html);
}
//默认加载第一个菜单
toPage(menuArray[0].id, menuArray[0].url, menuArray[0].name)
//点击菜单跳转界面
function toPage(id, url, menuname) {
    //记住路由
    var currState = {
        id: id,
        url: url,
        menuname: menuname
    };
    window.history.pushState(currState, "", url);
    //选中点击菜单
    $(".menuLi").removeClass("active")
    $("#menu_" + id).addClass("active");
    addOrRemoveTab(id, url, menuname);
}

//公共方法，用于添加和删除tabul和tabmune数组
function addOrRemoveTab(id, url, menuname) {
    // 如果数组中不存在
    if ($.inArray(id, tabmune) == -1) {
        if (tabmune.length + 1 <= 5) {
            addtab(id, url, menuname)
        } else {
            //超过五个先删除
            let rid = tabmune[4];
            $("div[id='div" + rid + "']").remove();
            tabmune.splice($.inArray(rid, tabmune), 1);
            delpage(rid);
            //再添加
            addtab(id, url, menuname)
        }
    } else {
        // 绑定选中
        var div = $("div[id='div" + id + "']");
        addcolor(div);
        showpage(id);
        return;
    };
}
//抽离的公共方法，用于添加tabul和tabmune数组
function addtab(id, url, menuname) {
    //再添加
    $("#tabul").append(`<div id='div${id}' onclick="selectTab(this,${id}, '${url}','${menuname}')">${menuname}<span id='span${id}' onclick='removeTab(this,${id})' class='close'>×</span></div>`);
    tabmune.push(id);
    var div = $("div[id='div" + id + "']");
    addcolor(div);
    addpage(id, url);
}

//选中tab
function selectTab(obj, id, url, menuname) {
    //更改对应路由     
    window.history.pushState({
        id: id,
        url: url,
        menuname: menuname
    }, "", url);
    addcolor($(obj));
    showpage(id);
}
//从tab栏中移除
function removeTab(obj, id) {
    event.stopPropagation(); //防止触发父级div的onclick事件
    //不让删除最后一个
    if (tabmune.length == 1) {
        alert("tab栏至少保留一个")
        return;
    }
    $(obj).parent().remove();
    tabmune.splice($.inArray(id, tabmune), 1);
    delpage(id);
}

// 添加选中背景色
function addcolor(div) {
    console.log(div)
    $("#tabul div").removeClass("clickColor");
    div.addClass("clickColor");
}

// 添加新iframe
function addpage(id, url) {
    $("#ifmdivs div").hide();
    $("#ifmdivs").append(`<div style="width: 100%;height: 100%;" id="ifmdiv${id}">
    <iframe style="width: 100%; height: 100%; border:1px solid #e4eaec" src="${url}"></iframe></div>`);
}

// 显示已有iframe
function showpage(id) {
    $("#ifmdivs div").hide();
    $("div[id='ifmdiv" + id + "']").show();
    //选中点击菜单
    $(".menuLi").removeClass("active")
    $("#menu_" + id).addClass("active");
}

// 删除示已有iframe
function delpage(id) {
    var div = $("div[id='ifmdiv" + id + "']");
    div.remove();
    //删除完之后显示最后一个
    var lastId = tabmune[tabmune.length - 1];
    var lastDiv = $("div[id='div" + lastId + "']")
    addcolor(lastDiv);
    showpage(lastId)
}

//监听浏览器前进后退事件
window.addEventListener("popstate", function (e) {
    addOrRemoveTab(e.state.id, e.state.url, e.state.menuname)
}, false);

//作为iframe的父级事件，用于BIMPlatform.js最下面，判断是全局刷新还是点击菜单重新加载
function father() {
    return "true";
}