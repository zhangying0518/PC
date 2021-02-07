function Sprite(option){
    this._init(option)
}
Sprite.prototype = {
    _init:function (option){
        this.x = option.x == 0 ? 0 : (option.x || 10)
        this.y = option.y == 0 ? 0 : (option.y || 10)
        this.w = option.w || 40//绘制到画布上的宽高
        this.h = option.h || 65
        this.fps = option.fps || 10
        this.originW = option.originW || 40//截取的精灵图片的宽高
        this.originH = option.originH || 65
        this._dirIndex = 0
        this._imgSrc = option.imgSrc || ''
    },
    render:function (ctx){//把图片画到画布上去
        var img = new Image()
        img.src = this._imgSrc
        var self = this
        img.onload = function (){
            var frameIndex = 0
            setInterval(function (){
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
                ctx.drawImage(
                    img,
                    frameIndex * self.originW,
                    self._dirIndex * self.originH,
                    self.originW,
                    self.originH,
                    self.x,
                    self.y,
                    self.w,
                    self.h
                )
                frameIndex ++
                frameIndex %= 4
            },1000/self.fps)
        }
    },
    changeDir:function (dir){
        this._dirIndex = dir
    }
}