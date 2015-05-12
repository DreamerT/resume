
var vType = getQueryStringByName("TypeID");
$.getJSON("Data/photo_json.js", function (result) {
    //alert("获取到的数据：" + result.type);//获取到具体参数的值
    $.each(result, function (i, data) {
        //alert("数据测试：" + data.type);//获取内部的json
        if (vType == data.type) { //那个json
            var datas = data.rows;//具体的数据
            //alert("获取到的长度" + datas.length);
            var vTitle = "<a href='index.html#portfolio' style='float:left;color:#b6ff00;font-weight:bold;font-size:18px;'>唐厚湖个人主页</a><h1>" + data.Title + "</h1> \
            <span class=\"Counter\">（<span class=\"CounterCurrent\">1</span>/" + datas.length + "）</span><span style=\"color:red;\">可以点击右下角《查看原图》查看大图</span>";
            $(".Title").append(vTitle);//标题

            $("#PhotoMain").html("");
            $("#ThumbPic").html("");
            $.each(datas, function (i, field) {
                var vPhoto = "<p class=\"Hidden\"><span class=\"Summary FlLeft\">" + field.Content + "</span> \
                        <span class=\"SliderPicBorder FlRight\"><img src='" + field.ImgUrl + "' /></span><span class=\"Clearer\"></span><span class=\"More\"><a>" + field.ImgTitle + "</a></span><span class=\"More\"> \
                        <a href='" + field.ImgUrl + "' target=\"_blank\" style=\"color:red;\">查看原图</a> <span class=\"OptLine\">|</span><a href=\"index.html#portfolio\">更多项目</a></span></p>";
                //alert(vPhoto);
                $("#PhotoMain").append(vPhoto);//图片内容
                var vThumbPic = "<li rel='" + field.Id + "'><img src=" + field.Smallimg + " /></li>";
                $("#ThumbPic").append(vThumbPic);//缩略图
                //alert("内部的json数据" + field.ImgTitle);
            });
            ShowNext();//执行显示
            //缩略图滚动事件
            $(".jCarouselLite").jCarouselLite({
                btnNext: "#btnNext",
                btnPrev: "#btnPrev",
                scroll: 1,
                speed: 240,
                circular: false,
                visible: 6
            });
            //初始化事件
            $(".OriginalPicBorder").ready(function () {
                //ShowNext();
                //绑定缩略图点击事件
                $('#ThumbPic li').bind('click', function (e) {
                    var count = $(this).attr('rel');
                    showImage(parseInt(count) - 1);
                });
            });
        }

    });

});

var currentImage;
var currentIndex = -1;

//显示大图(参数index从0开始计数)
function showImage(index) {

    //更新当前图片页码
    $(".CounterCurrent").html(index + 1);

    //隐藏或显示向左向右鼠标手势
    var len = $('#OriginalPic img').length;
    if (index == len - 1) {
        $("#aNext").hide();
    } else {
        $("#aNext").show();
    }

    if (index == 0) {
        $("#aPrev").hide();
    } else {
        $("#aPrev").show();
    }

    //显示大图
    if (index < $('#OriginalPic img').length) {
        var indexImage = $('#OriginalPic p')[index];

        //隐藏当前的图
        if (currentImage) {
            if (currentImage != indexImage) {
                $(currentImage).css('z-index', 2);
                $(currentImage).fadeOut(0, function () {
                    $(this).css({ 'display': 'none', 'z-index': 1 })
                });
            }
        }

        //显示用户选择的图
        $(indexImage).show().css({ 'opacity': 0.4 });
        $(indexImage).animate({ opacity: 1 }, { duration: 200 });

        //更新变量
        currentImage = indexImage;
        currentIndex = index;

        //移除并添加高亮
        $('#ThumbPic img').removeClass('active');
        $($('#ThumbPic img')[index]).addClass('active');

        //设置向左向右鼠标手势区域的高度
        //var tempHeight = $($('#OriginalPic img')[index]).height();
        //$('#aPrev').height(tempHeight);
        //$('#aNext').height(tempHeight);
    }
}

//下一张
function ShowNext() {
    var len = $('#OriginalPic img').length;
    var next = currentIndex < (len - 1) ? currentIndex + 1 : 0;
    showImage(next);
}

//上一张
function ShowPrep() {
    var len = $('#OriginalPic img').length;
    var next = currentIndex == 0 ? (len - 1) : currentIndex - 1;
    showImage(next);
}

//下一张事件
$("#aNext").click(function () {
    ShowNext();
    if ($(".active").position().left >= 144 * 5) {
        $("#btnNext").click();
    }
});

//上一张事件
$("#aPrev").click(function () {
    ShowPrep();
    if ($(".active").position().left <= 144 * 5) {
        $("#btnPrev").click();
    }
});
