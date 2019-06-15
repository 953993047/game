/*
遇到的问题，发现定时器越走越快
是定时器使用js定时器（setinterval）首要的问题就是要记得清除，即调用（clearInterval）方法，
由于没有使用定时器的经验，我一开始是没有清除定时器，程序每一次初始化的时候都调用一次定时
器，之前的定时器实例没有被销毁，新的定时器又开始执行，就会出现1s变0.5s，0.5s变0.25秒的情
况，从观感上来看就是定时器“越走越快”了
*/
//一定注意数组为引用类型，赋值要保存一个进行深度克隆保存一个中间数组再赋值
var content = document.getElementById('box'); //地图
var start = document.getElementsByTagName('button')[0];
start.addEventListener("click", startGame);

function startGame() {
    snake1 = new snakeGame(box);
    snake1.foodinit();
    snake1.whichdirc(); //判断按键确定方向，并记录
    snake1.bodyinit();
    snake1.move();
    start.removeEventListener('click', startGame);
}

function snakeGame(content) {
    this.snake = [ //[left,top]蛇身的位置
            [2, 2], //蛇首
            [1, 2],
            [0, 2] //蛇尾
        ],
    this.timer = null, //定时器
    this.count = 0, //记录吃的食物
    this.dirc = 'right', //方向
    this.elements = [], //,即新添加的实际蛇身div
    this.foods = [] //为方便删除食物的数组
};

snakeGame.prototype = {
    move: function() {
        var that = this;
        clearInterval(this.timer);
        this.timer = setInterval(function() { //定时器来
            that.end(); //判断是否结束游戏
            that.eaten(); //判断是否吃food，处理吃了事物后对删除并产生新食物，加长身体
            var temp = deepcopy(that.snake);
            switch (that.dirc) { //根据方向来定义蛇首位置
                case 'left':
                    that.snake[0][0]--;
                    break;
                case 'right':
                    that.snake[0][0]++;
                    break;
                case 'up':
                    that.snake[0][1]--;
                    break;
                case 'down':
                    that.snake[0][1]++;
                    break;
            }

            for (i = 1; i < that.snake.length; i++) { //蛇身跟着蛇首走，后一截身体的位置等于前一截的位置
                that.snake[i][0] = temp[i - 1][0];
                that.snake[i][1] = temp[i - 1][1];
            }
            that.remove(); //删除蛇身
            that.bodyinit(); //创造新的蛇身
        }, 100);
    },

    remove: function() {
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            if (ele != null) {
                content.removeChild(ele);
            }
        }
        elements = null;
    },

    //根据数组循环出蛇身
    bodyinit: function() {
        elements = [];
        for (var i = 0; i < this.snake.length; i++) {
            var sna = document.createElement('div');
            // sna.classList.add('snakebody');
            sna.style.width = '10px';
            sna.style.height = '10px';
            sna.style.background = '#8cd0e2';
            sna.style.position = 'absolute';
            sna.style.left = this.snake[i][0] * 10 + 'px';
            sna.style.top = this.snake[i][1] * 10 + 'px';
            content.appendChild(sna);
            elements.push(sna);
        }
    },

    //判断方向
    whichdirc: function() {
        var that = this;
        document.onkeydown = function(e) {
            if (e.keyCode == 37 && that.dirc != 'right') //左
            {
                that.dirc = 'left';
            } else if (e.keyCode == 38 && that.dirc != 'down') //上{
            {
                that.dirc = 'up';
            } else if (e.keyCode == 39 && that.dirc != 'left') //右
            {
                that.dirc = 'right';
            } else if (e.keyCode == 40 && that.dirc != 'up') //下
            {
                that.dirc = 'down';
            } else {}
        }
    },
    //产生一个随机地点的食物
    foodinit: function() {
        var a = document.createElement("div");
        a.style.width = '10px';
        a.style.height = '10px';
        a.style.background = "white";
        a.style.position = 'absolute';
        a.style.top = Math.floor(Math.random() * 50) * 10 + 'px';
        a.style.left = Math.floor(Math.random() * 50) * 10 + 'px';
        document.getElementsByTagName("div")[0].appendChild(a);
        this.foods.push(a);
    },
    //被吃了
    eaten: function() {
        if (parseInt(this.foods[0].style.top) == this.snake[0][1] * 10 && parseInt(this.foods[0].style.left) == this.snake[0][0] * 10) {
            content.removeChild(this.foods[0]); //删除食物
            this.foods.splice(0, 1);
            this.foodinit(); //创造新食物
            var endx = this.snake[this.snake.length - 1][0];
            var endy = this.snake[this.snake.length - 1][1];
            switch (this.dirc) {
                case 'left':
                    {
                        left = [endx + 1, endy];
                        this.snake.push(left);
                        break;
                    }
                case 'right':
                    {
                        right = [endx - 1, endy];
                        this.snake.push(right);
                        break;
                    }
                case 'up':
                    {
                        up = [endx, endy + 1];
                        this.snake.push(up);
                        break;
                    }
                case 'down':
                    {
                        down = [endx, endy - 1];
                        this.snake.push(down);
                        break;
                    }
            }
            this.remove();
            this.bodyinit();
            //计算分数
            this.count++;
            var a = document.getElementsByTagName('span')[0];
            a.innerHTML = '' + this.count;

        }
    },
    //停止游戏
    pause: function() {
        // if (!this.conti) { //如果暂停
        clearInterval(this.timer);
        document.onkeydown = null;
        // } else {
        //     this.move();
        // }
    },
    conti: function() {
        this.whichdirc();
        this.move();
    },
    //判断是否结束游戏1.蛇超出边框2.蛇头碰到了蛇身
    end: function() {
        for (var i = 1; i < this.snake.length; i++) {
            if (this.snake[i][0] == this.snake[0][0] && this.snake[i][1] == this.snake[0][1]) {
                this.renew();
            }
        }
        if (this.snake[0][0] >= 50 || this.snake[0][1] >= 50) {
            this.renew();
        } else if (this.snake[0][0] < 0 || this.snake[0][1] < 0) {
            this.renew();
        }
    },

    renew: function() {
        alert('game over');
        clearInterval(this.timer);
        this.timer = null;
        this.remove();
        content.removeChild(this.foods[0]);
        this.foods.splice(0, 1);
        this.snake = [ //[left,top]蛇身的位置
            [2, 0], //蛇首
            [1, 0],
            [0, 0] //蛇尾
        ];
        this.timer = null; //定时器
        this.count = 0; //记录吃的食物
        this.dirc = 'right'; //方向
        this.elements = []; //,即新添加的实际蛇身div
        this.foods = []; //为方便删除食物的数组
        start.removeEventListener('click', startGame);
        start.addEventListener('click', startGame);
    }
}
function deepcopy(obj) {
    var out = [],
        i = 0,
        len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array) {
            out[i] = deepcopy(obj[i]);
        } else out[i] = obj[i];
    }
    return out;

}