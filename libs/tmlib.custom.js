/*
 *  tmlib.custom.js
 *  2015/03/12
 *  @auther minimo  
 *  This Program is MIT license.
 */

//tm.display.Sprite拡張
//トリミング開始位置設定
tm.display.Sprite.prototype.setFrameTrimming = function(x, y, width, height) {
    this.frameTrimX = x || 0;
    this.frameTrimY = y || 0;
    this.frameTrimW = width || this.image.width - this.frameTrimX;
    this.frameTrimH = height || this.image.height - this.frameTrimY;
    return this;
}
tm.display.Sprite.prototype.setFrameIndex = function(index, width, height) {

    //テクスチャのトリミング設定
    var sx = this.frameTrimX || 0;
    var sy = this.frameTrimY || 0;
    var sw = this.frameTrimW || (this.image.width-sx);
    var sh = this.frameTrimH || (this.image.height-sy);

    var tw  = width || this.width;
    var th  = height || this.height;
    var row = ~~(sw / tw);
    var col = ~~(sh / th);
    var maxIndex = row*col;
    index = index%maxIndex;

    var x   = index%row;
    var y   = ~~(index/row);
    this.srcRect.x = sx+x*tw;
    this.srcRect.y = sy+y*th;
    this.srcRect.width  = tw;
    this.srcRect.height = th;

    this._frameIndex = index;

    return this;
}

//tm.display.AnimationSprite拡張
tm.display.AnimationSprite.prototype.currentAnimationName = "";

tm.display.AnimationSprite.prototype.gotoAndPlay = function(name) {
    name = (name !== undefined) ? name : "default";

    this.currentAnimationName = name;
    this.paused = false;
    this.currentAnimation = this.ss.animations[name];
    this.currentFrame = 0;
    this.currentFrameIndex = 0;
    this._normalizeFrame();

    return this;
}
tm.display.AnimationSprite.prototype.gotoAndStop = function(name) {
    name = (name !== undefined) ? name : "default";

    this.currentAnimationName = name;
    this.paused = true;
    this.currentAnimation = this.ss.animations[name];
    this.currentFrame = 0;
    this.currentFrameIndex = 0;
    this._normalizeFrame();

    return this;
}
tm.display.AnimationSprite.prototype._normalizeFrame = function() {
    var anim = this.currentAnimation;
    if (anim) {
        if (this.currentFrameIndex < anim.frames.length) {
            this.currentFrame = anim.frames[this.currentFrameIndex];
        }
        else {
            // dispatch animationend
            var e = tm.event.Event("animationend");
            e.animationName = this.currentAnimationName;
            this.dispatchEvent(e);

            if (anim.next) {
                this.gotoAndPlay(anim.next);
            }
            else {
                this.currentFrameIndex = anim.frames.length - 1;
                this.currentFrame = anim.frames[this.currentFrameIndex];
                this.paused = true;
            }
        }
    }
}

//tm.asset.SpriteSheet拡張
tm.asset.SpriteSheet.prototype._calcFrames = function(frame) {
    var frames = this.frames = [];
    
    //テクスチャのトリミング設定
    var sx = frame.trimX || 0;
    var sy = frame.trimY || 0;
    var sw = frame.trimW || (this.image.width-sx);
    var sh = frame.trimH || (this.image.height-sy);

    var w = frame.width;
    var h = frame.height;
    var row = ~~(sw / w);
    var col = ~~(sh / h);
    
    if (!frame.count) frame.count = row*col;

    for (var i=0,len=frame.count; i<len; ++i) {
        var x   = i%row;
        var y   = (i/row)|0;
        var rect = {
            x:sx+x*w,
            y:sy+y*h,
            width: w,
            height: h
        };
        frames.push(rect);
    }
},

//tm.display.Label拡張
//パラメータ一括セット
tm.display.Label.setParam = function(param) {
    this.fontFamily       = param.fontFamily       || this.fontFamily;
    this.align            = param.align            || this.align;
    this.baseline         = param.baseline         || this.baseline;
    this.fontSize         = param.fontSize         || this.fontSize
    this.fontWeight       = param.fontWeight       || this.fontWeight;
    this.fillStyle        = param.fillStyle        || this.fillStyle;
    return this;
}
