//小蛇的自调用函数
(function () {
    var elements = [];

    //创建小蛇的构造函数，参数有宽高和方向,小蛇的行为有，移动，吃食物，还有控制方向。
    function Snaker(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ];
        //设置小蛇的默认方向向右
        this.direction = direction || "right";
    }

    //给小蛇原型添加初始化方法
    Snaker.prototype.init = function (map) {
        remove();
        //为body中的每个元素创建一个div，所以遍历body
        for (var i = 0; i < this.body.length; i++) {
            //获取数组中的元素,为横纵坐标做准备
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            //设置横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //设置背景颜色
            div.style.backgroundColor = obj.color;
            elements.push(div);
        }
    }

    //创建一个remove私有函数
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //给小蛇添加移动的原型方法,传入参数有食物对象和地图
    Snaker.prototype.move = function (food, map) {
        //其主要原理是改变小蛇身体部分的横纵坐标，即后面的身体的横纵坐标等于前面一个的横纵坐标
        //使用for循环遍历小蛇的body来改变身体部分的横纵坐标----也即把数组的头赋给第一个身体，把第一个身体赋给第二个身体，以此类推
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //身体部分位置设定好后，考虑蛇头的部分，因为蛇头是受方向控制的，所以要单独拿出来分析
        //判断蛇头的方向----改变小蛇的位置:如果向右，则横坐标加1，向左的话，横坐标减1，向上的话纵坐标减一，向下的话纵坐标加1.
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //然后设置小蛇吃到食物的情况
        //判断有没有小蛇有没有迟到食物，条件是蛇头的坐标跟食物的坐标相等
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        if (headX == food.x && headY == food.y) {
            //如果小蛇吃到了食物，则尾巴增长一节，具体实现如下
            //用一个变量来存储小蛇最后的一个小方块，然后给body添加一个元素，
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //此时食物消失，然后重新生成食物,这里可以直接调用食物的初始化函数
            food.init(map);
        }
    }

    window.Snaker = Snaker;
}());