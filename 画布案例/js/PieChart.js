function PieChart(option){
    this._init(option)
}
PieChart.prototype = {
    _init:function (option){
        this.x = option.x||0,
        this.y = option.y||0,
        this.r = option.r ||0,
        this.data = option.data||[]

        this.group = new Konva.Group({  //饼状图所有物件的组
            x:this.x,
            y:this.y
        })
        this.wedgeGroup = new Konva.Group({//所有扇形的组
            x:0,
            y:0
        })
        this.group.add(this.wedgeGroup)
        this.textGroup = new Konva.Group({//所有文字的组
            x:0,
            y:0
        })
        this.group.add(this.textGroup)

        // 绘制扇形和文字
        var self = this
        var tempAngel = -90//从-90度开始绘制
        this.data.forEach(function (item, index) {
            var angle = 360 * item.value
            var wedge = new Konva.Wedge({//饼图
                x: 0,
                y: 0,
                angle: angle,
                radius: self.r,
                fill: item.color,
                rotation: tempAngel,//也不知道为什么一定要写这个旋转角度
            })
            self.wedgeGroup.add(wedge)

            var rextAngle = tempAngel + 1 / 2 * angle
            var text = new Konva.Text({//圆上的文字
                x: (self.r + 20) * Math.cos(Math.PI / 180 * rextAngle),
                y: (self.r + 20) * Math.sin(Math.PI / 180 * rextAngle),
                text: item.value * 100 + '%',
                fill: item.color
            })
            if (rextAngle > 90 && rextAngle < 270) {
                text.x(text.x() - text.getWidth())//text.getWidth()获取文字的宽
            }
            self.textGroup.add(text)
            tempAngel += angle
        })
        // 绘制最外层的圆
        var cir = new Konva.Circle({
            x:0,
            y:0,
            radius:this.r+10,
            stroke:'#ccc',
            strokeWidth:2
        })
        this.group.add(cir)
        this._animateIndex = 0
    },
    playAnimate:function (){//动画
        var self = this
        if(this._animateIndex ==0){
            // 拿到所有的扇区
            this.wedgeGroup.getChildren().each(function (item,index){
                item.angle(0)//把所有扇区的角度设置为0
            })
        }
        // 展示当前索引对应的动画
        var item = this.wedgeGroup.getChildren()[this._animateIndex]
        item.to({
            angle:this.data[this._animateIndex].value*360,
            duration:2*this.data[this._animateIndex].value,
            onFinish:function (){
                self._animateIndex++
                if(self._animateIndex>=self.data.length){
                    self._animateIndex = 0
                    return
                }
                self.playAnimate()
            }
        })
    },
    addToGroupOrLayer:function (arg){
        arg.add(this.group)
    }
}