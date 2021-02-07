var stage = new Konva.Stage({
    container: 'container',  //上面盒子的id
    width: window.innerWidth,
    height: window.innerHeight - 50
});


var scenBuilders = [builderHtml5Scene, builderC3Scene, builderDemoScene]
var sceneIndex = 0

scenBuilders[sceneIndex]().play()

// 构造h5的场景
function builderHtml5Scene() {//注释的部分是矩形的动画，被我换成了饼图
    var bgLayer = new Konva.Layer()
    var animateLayer = new Konva.Layer()
    var lightLayer = new Konva.Layer()

    // 中心点坐标
    var cenX = stage.width() / 2
    var cenY = stage.height() / 2

    var data = [
        {name: '前端', value: '.25', color: '#e0e'},
        {name: 'PHP', value: '.2', color: 'orange'},
        {name: 'UI', value: '.3', color: 'blue'},
        {name: 'C++', value: '.05', color: 'green'},
        {name: '游戏', value: '.1', color: 'purple'},
        {name: 'Java', value: '.1', color: 'red'},
    ]
    var p = new PieChart({
        x: cenX,
        y: cenY,
        r: 100,
        data: data
    })
    // var rect = new Konva.Rect({
    //     x: -200,
    //     y: -200,
    //     fill: 'red',
    //     width: 100,
    //     height: 100
    // })
    return new ItcastScene({
        name: '场景1',
        layers: [bgLayer, animateLayer, lightLayer],//最后面的层放在最上面
        stage: stage,
        init: function () {//初始化场景中的所有形状
            // animateLayer.add(rect)
            p.addToGroupOrLayer(animateLayer)
            this.layers.forEach(function (layer) {
                stage.add(layer)
            })
        },
        pre: function () {//进入动画
            // rect.to({
            //     x: 200,
            //     y: 200,
            //     duration: 1,
            //     scaleX: 3,
            //     scaleY: 2,
            //     opacity: 1
            // })
            p.playAnimate()
        },
        post: function (dopre) {//下一动画开始时把当前动画移除并且销毁
            // var self = this
            this.layers.forEach(function (item) {
                item.destroy()//销毁所有层
            })
            dopre()
            // rect.to({
            //     x: -200,
            //     y: -200,
            //     duration: 1,
            //     onFinish: function () {//执行下一动画销毁之前动画
            //         self.layers.forEach(function (item) {
            //             item.destroy()//销毁所有层
            //         })
            //         dopre()
            //     }
            // })
        }
    })
}

// 构造C3的场景
function builderC3Scene() {
    var bgLayer = new Konva.Layer()
    var animateLayer = new Konva.Layer()
    var lightLayer = new Konva.Layer()
    var rect = new Konva.Rect({
        x: 0,
        y: .3,
        opacity: 0,
        fill: 'green',
        width: stage.width(),
        height: stage.height()
    })

    // 柱状图数据
    var data = [
        {name: '前端', value: '.8', color: 'green'},
        {name: 'PHP', value: '.3', color: 'blue'},
        {name: 'Java', value: '.7', color: 'red'},
        {name: 'UI', value: '.9', color: 'orange'},
        {name: 'IOS', value: '.4', color: 'purple'},
        {name: 'Android', value: '.9', color: 'pink'},
    ]
    var h = new HistogramChart({
        x: 1 / 8 * stage.width(),
        y: 3 / 4 * stage.height(),
        w: 3 / 4 * stage.width(),
        h: 1 / 2 * stage.height(),
        data: data
    })

    return new ItcastScene({
        name: '场景1',
        layers: [bgLayer, animateLayer, lightLayer],//最后面的层放在最上面
        stage: stage,
        init: function () {//初始化场景中的所有形状
            animateLayer.add(rect)
            h.addToGroupOrLayer(animateLayer)
            this.layers.forEach(function (layer) {
                stage.add(layer)
            })
        },
        pre: function () {
            rect.to({
                x: 0,
                y: 0,
                duration: 1,
                scaleX: 2,
                scaleY: 2,
                opacity: .8,
                yoyo: true,//动画来回不停的切换,可以用来做关照，就是透明度从0-1不听的切换
            })
            h.playAnimate()
        },
        post: function (dopre) {
            this.layers.forEach(function (item) {
                item.destroy()
            })
            dopre()
        }
    })
}

// 构造Demo的场景
function builderDemoScene() {
    return ItcastScene({})
}

// 点击的效果
function addStageEvent() {//给舞台添加滑动的事件
    var isClick = true
    var btn = document.getElementById("button")
    btn.onclick = function () {
        isClick = !isClick
        if (isClick) {
            sceneIndex = sceneIndex <= 0 ? 0 : sceneIndex - 1
        } else {
            sceneIndex = sceneIndex >= scenBuilders.length - 1 ? scenBuilders.length - 1 : sceneIndex + 1
        }
        scenBuilders[sceneIndex]().play()
    }
}

addStageEvent()
