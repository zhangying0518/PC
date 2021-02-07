// 分析一下，封装一个进度条都需要什么属性，什么行为
// 属性：
// width,height,x,y,innerStyle,outerStyle,cornerRadius
// 行为：
// 修改进度条的进度changeValue(val)
// 把进度条添加到层：addToGroupOrLayer(arg)
function ProgressBar(option) {
    this._init(option)
}

ProgressBar.prototype = {
    _init(option) {
        this.x = option.x || 0
        this.y = option.y || 0
        this.w = option.w || 0
        this.h = option.h || 0
        this.fillStyle = option.fillStyle || "red"
        this.strokeStyle = option.strokeStyle || "red"

        var innerRect = new Konva.Rect({  // 绘制一个矩形
            x: this.x,
            y: this.y,
            width: 0,
            height: this.h,
            fill: this.fillStyle,//只要设置了这个就会被填充
            cornerRadius: 1 / 2 * this.h,//圆角
            id: "innerRect",
            name: "innerRect"
        })


        var outerRect = new Konva.Rect({   // 绘制一个矩形的外边框
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h,
            stroke: this.strokeStyle,//只要设置了这个就会描边
            strokeWidth: 4,
            cornerRadius: 1 / 2 * this.h//圆角
        })

        this.grop = new Konva.Group({//把画布移动到（0，0）位置
            x: 0,
            y: 0
        })
        this.grop.add(innerRect)
        this.grop.add(outerRect)

    },
    changeValue: function (val) {//传进来的进度
        if (val > 1) {
            val = val / 100
        }
        var width = this.w * val
        var innerRect = this.grop.findOne("#innerRect")//通过id获取innerRect矩形，当然也可以通过类
        // var innerRect = this.grop.findOne(".innerRect")通过类
        innerRect.to({//让innerRect从当前状态到我们这里设置的状态，也就是让innerRect的宽度改变成width的宽度，你要改变什么，下面就写什么属性
            width: width,
            duration: .99
        })
    },
    addToGroupOrLayer: function (arg) {//把绘制的东西添加到层上
        arg.add(this.grop)
    }

}