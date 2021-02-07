function HistogramChart(option) {
    this._init(option)
}

HistogramChart.prototype = {
    _init: function (option) {
        this.x = option.x || 0
        this.y = option.y || 0
        this.w = option.w || 0
        this.h = option.h || 0
        this.data = option.data || []

        var x0 = 0
        var y0 = 0

        this.group = new Konva.Group({//柱状图中所有元素的组
            x: this.x,
            y: this.y
        })
        this.rectGroup = new Konva.Group({//放矩形的组
            x: 0,
            y: 0
        })
        this.group.add(this.rectGroup)

        this.textPercentGroup = new Konva.Group({//放百分比文字的组
            x: 0,
            y: 0
        })
        this.group.add(this.textPercentGroup)

        // 初始化底线
        var bsLine = new Konva.Line({
            points: [x0, y0, x0 + this.w, y0],//从x0,y0点到x0+width,y0的点的一条直线
            strokeWidth: 1,
            stroke: 'lightgreen'
        })
        this.group.add(bsLine)
        // 初始化矩形,初始化百分比文字,初始化底部文字
        var rectWidth = this.w / this.data.length
        var height = this.h
        var self = this
        this.data.forEach(function (item, index) {
            var rect = new Konva.Rect({//矩形
                x: x0 + (1 / 4 + index) * rectWidth,
                y: y0 - item.value * height,
                width: 1 / 2 * rectWidth,
                height: item.value * height,
                fill: item.color,
                opacity: .8,
                cornerRadius: 10
            })
            self.rectGroup.add(rect)

            var text = new Konva.Text({//百分比的文字
                x: x0 + index * rectWidth,//x从柱状图的最左边开始
                y: y0 - item.value * height - 14 - 7,//y坐标就是柱状图的高度-文字的大小然后再往上走7像素
                fontSize: 14,
                text: item.value * 100 + '%',
                fill: item.color,
                width: rectWidth,
                align: 'center',
                name: "textPercent"//为了给文字加动画
            })
            self.textPercentGroup.add(text)

            var textBottom = new Konva.Text({//底部名字的文字
                x: x0 + (index + 1 / 3) * rectWidth,
                y: y0,
                fontSize: 14,
                text: item.name,
                fill: item.color,
                rotation: 30
            })
            self.group.add(textBottom)
        })
    },
    addToGroupOrLayer: function (arg) {
        arg.add(this.group)
    },
    playAnimate: function () {
        var self = this
        this.rectGroup.getChildren().each(function (item, index) {//矩形的动画
            item.y(0),
            item.height(0),
            item.to({
                duration: 1,
                y: -self.data[index].value * self.h,
                height: self.data[index].value * self.h
            })
        })
        this.textPercentGroup.getChildren().each(function (item, index) {//百分比文字的动画
            item.y(-14),
            item.to({
                duration: 1,
                y: -self.data[index].value * self.h - 21,
            })
        })
    }
}