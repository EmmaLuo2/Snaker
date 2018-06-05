//食物的自调用函数
(function () {
    //定义一个空数组来装食物对象
    var elements = [];

    //创建食物的构造函数,参数有，宽，高，背景颜色以及横纵坐标,并且设置默认值
    function Food(width, height, color, x, y) {
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
        this.x = x || 0;
        this.y = y || 0;
    }

    //给食物添加原型初始化的方法
    Food.prototype.init = function (map) {
        //刚方法一被调用时就删除地图上所有的食物对象
        remove();
        //创建div元素充当食物
        var div = document.createElement("div");
        //为div添加样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //最重要的是食物定位为绝对定位
        div.style.position = "absolute";
        //产生随机的横纵坐标,其中map.offsetWidth/this.width表示的是食物是以自身宽为单位的
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        map.appendChild(div);
        elements.push(div);
        console.log(this.x + "========" + this.y);
    }

    //定义一个删除食物对象的私有函数,即只能在内部调用
    function remove() {
        for (var i = 0; i < elements.length; i++) {
            //通过子元素来找到父元素，仔通过父元素删掉这个子元素
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            //同时数组里也要移除这个元素
            elements.splice(i, 1);
        }
    }

    window.Food = Food;
}());