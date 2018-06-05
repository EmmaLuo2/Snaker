//游戏对象的自调用函数
(function () {
    var that = null;//为后面的方法里面的函数调用当前对象做准备
    //创建游戏对象的构造函数,传入一个地图参数
    function Game(map) {
        that = this;
        this.food = new Food();
        this.snake = new Snaker();
        this.map = map;
    }

    //游戏对象的初始化
    Game.prototype.init = function () {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food, this.map);
        this.keyBind();
    }
    //添加原型方法让小蛇动起来
    Game.prototype.runSnake = function (food, map) {
        var timeId = setInterval(function () {
            this.snake.move(food, map);
            this.snake.init(map);
            //判断蛇头的边界问题
            //如果蛇头的横纵坐标大于地图的最大横纵坐标或者小于0，则清除定时器
            var maxX = map.offsetWidth / this.snake.width;
            var maxY = map.offsetHeight / this.snake.height;
            //蛇头的xy值
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //判断----
            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("game over");
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("game over");
            }
            //判断如果头碰到了身子的话，游戏也结束
//                var i = this.snake.body.length - 1;
//                var body = this.snake.body;
//                for (; i > 0; i--) {
//                    if (body[i].x == headX && body[i].y == headY) {
//                        clearInterval(timeId);
//                        alert("game over");
//                        console.log(body[i].x + "====" + body[i].y+"===="+i);
//                        console.log(headX + "====" + headY);
//                    }
//                }
        }.bind(that), 150);
    }
    //最后添加为上下左右键添加按键事件了，改变蛇的方向
    Game.prototype.keyBind = function () {
        document.addEventListener("keydown", function (e) {
            //获取键值
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    }

    window.Game = Game;
}());