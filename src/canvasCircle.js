//可配置项:
//id:canvas画布的id
//width
//height
//border
//bordercolor: 上层动态圆弧的颜色
//bgborderColor：下层圆环的颜色
//text：营养元素的名称
//num:含量多少克
//textcolor: 文字颜色
//percent: 含量百分比

function DrawCanvas(options) {
    this.id = options.id || 'canvas';
    this.width = options.width;
    this.height = options.height;
    this.border = options.border || '7';
    this.borderColor = options.borderColor || '#f7f7f0';
    this.bgborderColor = options.bgborderColor || '#6dc4e5';
    this.text = options.text || 'test';
    this.num = options.num || 0;
    this.textcolor = options.textcolor || '#9e9595';
    this.percent = options.percent || 10;
    this.font = options.font || '24px Arial';
    //config
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.rad = Math.PI * 2 / 100;
    this.circle = 0;
    console.log(this.width);
    console.log(this.height);
    console.log(this.canvas.width, this.canvas.height);
}

DrawCanvas.prototype = {
    constructor: DrawCanvas,
    init: function () {
        // console.log(this.width);
        var timer = setInterval(drawing, 18);
        var that = this;

        that.canvas.width = that.width
        that.canvas.height = that.height

        function drawing() {
            that.ctx.clearRect(0, 0, that.canvas.height, that.canvas.width);
            //drawInner
            that.drawInner();
            //drawOuter
            that.drawOuter(that.circle);
            //drawText
            that.drawActText(that.circle);
            if (that.circle < that.percent) {
                // console.log(that.circle);
                //drawing speed,int best，otherwise filltext in drawActText must INTPART.
                that.circle += 1;
            } else {
                clearInterval(timer);
            }
            // console.log('drawing once: ' + that.circle);
        }
    },
    drawOuter: function (n) {
        this.ctx.save();
        this.ctx.strokeStyle = this.bgborderColor;
        this.ctx.lineWidth = 7;
        this.ctx.beginPath();
        //context.arc(x，y，r，Start Angle，End Angle，clockwise/anticlockwise)
        this.ctx.arc(this.centerX, this.centerY, (this.height - this.border) / 2, -Math.PI / 2, -Math.PI / 2 + n * this.rad, false);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        // console.log('drawing Outter: ' + n);
    },
    drawInner: function () {
        this.ctx.save();
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = 7;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, (this.height - this.border) / 2, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        // console.log('drawing Inner');
    },
    drawActText: function (t) {
        this.ctx.save();
        this.ctx.fillStyle = "#3d3333";
        this.ctx.font = this.font;
        //drawing percent
        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.fillText(t + "%", this.centerX, this.centerY + 30);
        this.ctx.stroke();
        this.ctx.closePath();
        //drawing the name of nutrition
        this.ctx.save();
        this.ctx.fillStyle = "#000";
        this.ctx.font = this.font;
        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.text, this.centerX, this.centerY);
        this.ctx.stroke();
        this.ctx.closePath();
        //drawing content
        this.ctx.save();
        this.ctx.fillStyle = "#000";
        this.ctx.font = this.font;
        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.num + '克', this.centerX, (this.height - this.border) + 30);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.restore();
    },

}
