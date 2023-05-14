class Face {
    constructor(x = width / 2, y = height / 2, w = 0, h = 0, easing = 0.5, timeout = 30) {
        this.x = x;
        this.y = y;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
        this.width = w;
        this.height = h;
        this.easing = easing;
        this.color = [];
        // this.color.push([0, 0, 0, 0]);
        this.timeout = 300;
    }

    update(x, y, width, height) {
        this.x += (x - this.x) * this.easing;
        this.y += (y - this.y) * this.easing;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
        this.width += (width - this.width) * this.easing;
        this.height += (height - this.height) * this.easing;
        this.timeout = 300;
    }

    updateTimeout() {
        this.timeout--;
        return this.timeout < 0;
    }

    updateColor(color) {
        this.color.push(color);
    }

    gotEmoji(x, y) {
        let dist = Math.sqrt(Math.pow(this.centerX - x, 2) + Math.pow(this.centerY - y, 2));
        if (dist < this.width * 0.3) {
            return true;
        }
        return false;
    }

    render() {
        // push();
        // translate(-this.color.length * 10 * 0.5,-this.color.length * 10 * 0.5);
        for (let i = 0; i < this.color.length; i++) {
            fill(this.color[i][0], this.color[i][1], this.color[i][2], this.timeout * 170 / 300);
            if (i%2==0) {
                // rect(this.centerX+i*10, this.centerY, 20, this.color.length * this.height * 0.2);
                rect(5+this.centerX+i*10-this.color.length*5, this.centerY, 20, this.color.length * this.width * 0.2);
            } else {
                rect(this.centerX, 5+this.centerY+i*10-this.color.length*5, this.color.length * this.width * 0.2, 20);
            }
        }
        // pop();
        // let grad = drawingContext.createRadialGradient(this.centerX, this.centerY, 1, this.centerX, this.centerY, this.color.length * this.width * 0.2);

        // if (this.color.length > 1)
        //     for (let i = 0; i < this.color.length; i++) {
        //         grad.addColorStop(map(i, 0, this.color.length - 1, 0, 1), color(this.color[i][0], this.color[i][1], this.color[i][2], this.timeout * 170 / 300));
        //     }
        // drawingContext.fillStyle = grad;
        // rect(this.centerX, this.centerY, this.color.length * this.width * 0.2, this.color.length * this.width * 0.2);
    }
}
