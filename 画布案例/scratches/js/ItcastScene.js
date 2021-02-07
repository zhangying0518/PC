function ItcastScene(option) {
    this.stage = option.stage//场景所属舞台
    this.init = option.init || ItcastScene.voidFn//执行场景的初始化
    this.pre = option.pre || ItcastScene.voidFn//执行场景的进场动画
    this.post = option.post || ItcastScene.voidFn//执行场景的出场动画
    this.layers = option.layers || [new Konva.Layer()]
    this.name = option.name || ''
    this.init()
}

ItcastScene.prototype = {
    constructor: ItcastScene,
    currentScence: null,//当前场景
    voidFn: function () {
    },
    play: function () {
        var self = this
        var doPre = function () {
            self.layers.forEach(function (val) {//把当前场景中的所有层添加到舞台
                self.stage.add(val)
            })
            ItcastScene.currentScene = self//设置当前的场景为this
            self.pre()
        }
        // 如果不是第一个场景先执行当前场景的出场动画
        // 然后执行下一场景的入场动画
        // 需要在场景的post方法中执行传进去的doPre方法
        if (ItcastScene.currentScene) {//非第一个场景
            ItcastScene.currentScene.post(doPre)//执行上一场景的出场动画
        } else {//第一个场景
            doPre()
        }
    }
}