
/*转换日期格式*/
function ConvertJSONDateToJSDateObject(jsondate) {
    var date = new Date(parseInt(jsondate.toString().replace("/Date(", "").replace(")/", ""), 10));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return str = year + "/" + month + "/" + day;
}

//获取QueryString的数组
function getQueryString() {
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
    if (result == null) {
        return "";
    }
    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}
//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
//根据QueryString参数索引获取值
function getQueryStringByIndex(index) {
    if (index == null) {
        return "";
    }
    var queryStringList = getQueryString();
    if (index >= queryStringList.length) {
        return "";
    }
    var result = queryStringList[index];
    var startIndex = result.indexOf("=") + 1;
    result = result.substring(startIndex);
    return result;
}
//获取cookie
function getCookie(name) {
    var cookieValue = "";
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookieValue = decodeURIComponent(document.cookie.substring(offset, end))
        }
    }
    return cookieValue;
};
//设置cookie
function setCookie(cookieName, cookieValue, DayValue) {
    var expire = "";
    var day_value = 1;
    if (DayValue != null) {
        day_value = DayValue;
    }
    expire = new Date((new Date()).getTime() + day_value * 86400000);
    expire = "; expires=" + expire.toGMTString();
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";path=/" + expire;
}
//清楚cookie
function removeCookie(cookieName) {
    var expire = "";
    expire = new Date((new Date()).getTime() - 1);
    expire = "; expires=" + expire.toGMTString();
    document.cookie = cookieName + "=" + escape("") + ";path=/" + expire;
    /*path=/*/
};

//获取当前的url,拼接，实现绝对url exc: videoUrl = urltostirng() + videoUrls;
function urltostirng() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath);   // postPath +  + "/"
}

//页面自动跳转    <span id="tiao"><b>10</b></span>秒后自动跳转到首页。<script language="javascript">countDown(10, '/Login.aspx');</script>
function countDown(secs, surl) {
    tiao.innerText = secs;
    if (--secs > 0) {
        setTimeout("countDown(" + secs + ",'" + surl + "')", 1000);
    } else { window.open(surl, '_parent'); }
}

/** 格式化输入字符串**/
//用法:var str = "hello{0}".format('world')；alert(str)返回'hello world'
function format() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (s, i) {
        return args[i];
    });
}

