/*
 * Particle.js
 * GL-Shooter2より借用
 *
*/

pb3.particles = [];

pb3.Particle = tm.createClass({
    superClass: tm.app.CanvasElement,
    alpha: 1.0,
    alphaDecayRate: 0.85,
    size: 0,
    image: null,
    init: function(size, initialAlpha, alphaDecayRate, image, r, g, b) {
        this.superInit();
        this.width = this.height = this.size = size;
        if (initialAlpha !== undefined) this.alpha = initialAlpha;
        if (alphaDecayRate !== undefined) this.alphaDecayRate = alphaDecayRate;
        this.blendMode = "lighter";
        if (!r) {r = 255;}
        if (!g) {g = 255;}
        if (!b) {b = 255;}

        if (image) {
            this.image = image
        } else {
            this.image = tm.graphics.Canvas()
                .resize(size, size)
                .setFillStyle(
                    tm.graphics.RadialGradient(size*0.5, size*0.5, 0, size*0.5, size*0.5, size*0.5)
                        .addColorStopList([
                            {offset:0, color: "rgba("+r+","+g+","+b+", 0.1)"},
                            {offset:1, color: "rgba(0, 0, 0, 0.0)"},
                        ]).toStyle()
                )
                .fillRect(0, 0, size, size)
                .element;
        }
        this.vx = 0;
        this.vy = 0;
    },
    update: function(app) {
        this.alpha *= this.alphaDecayRate;
        if (this.alpha < 0.001) {
            this.remove();
        } else if (1.0 < this.alpha) {
            this.alpha = 1.0;
        }
        this.x += this.vx;
        this.y += this.vy;
    },
    draw: function(canvas) {
        canvas.context.drawImage(this.image,
            -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height);
    },
    clone: function() {
        return Particle(this.size, this.initialAlpha, this.alphaDecayRate, this.image);
    },
});


pb3.particles.init = function() {
    for (var i = 0; i < MAX_PARTICLES; i++ ){
        var e = new pb3.Particle();
        this.push(e);
    }

    particles.numUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var b = this[i]; 
            if (b.using) n++;
        }
        return n;
    }
    particles.numNotUsing = function() {
        var n = 0;
        for (var i = 0,len = this.length; i < len; i++ ){
            var b = this[i];
            if (!b.using) n++;
        }
        return n;
    }

    particles.enter = function(name,x,y) {
        var data = effectData[name];
        if (data === undefined)return null;
        if (x === undefined) x = 160;
        if (y === undefined) x = 160;

        var e;
        for (var i = 0,len = this.length; i < len; i++) {
            e = this[i];
            if (!e.using){
                currentScene.addChild(e);
                return e;
            }
        }
        return null;
    }
};

Particle = pb3.particle;




