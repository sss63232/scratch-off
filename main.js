var canvas = document.getElementById("mask");
var context = canvas.getContext("2d");
context.fillStyle = "#D1D1D1"; //設置填充色為淺灰色
context.fillRect(0, 0, 240, 65); //填充該顏色，以覆蓋下方的背景圖片

context.globalCompositeOperation = 'destination-out';

canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.touches[0];
    context.beginPath();
    context.arc(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop, 20, 0, Math.PI * 2); //在所觸摸處繪製圓形，半徑為20像素
    context.closePath(); //結束路徑繪製
    context.fillStyle = "#BDC3C7"; //隨意設置一種繪製顏色
    context.fill(); //填充該顏色
});

canvas.addEventListener('touchmove', function(event) {
    //此前代碼省略
    var imgData = context.getImageData(0, 0, 240, 65); //獲取畫布中的所有像素
    var pixelsArr = imgData.data; //得到像素的字節數據
    var loop = pixelsArr.length; //獲取該數據的長度
    var transparent = 0; //設置一個變量來記錄已經變為透明的像素點的數量
    for (var i = 0; i < loop; i += 4) { //循環遍歷每一個像素
        var alpha = pixelsArr[i + 3]; //獲取每個像素的透明度數值
        if (alpha < 10) { //當透明度小於10時，認為它已經被擦除
            transparent++; //使transparent數值加1
        }
    }
    var percentage = transparent / (loop / 4); //計算透明像素在所有像素點中所佔比例
    if (percentage > .9) { //當該比例大於90%時
        document.getElementById("status").innerHTML = "刮獎結束！"; //顯示刮獎結束字樣
    }
});