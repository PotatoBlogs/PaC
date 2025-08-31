class Line {
    constructor(penColor, penWidth) {
        this.px = pwinMouseX
        this.py = pwinMouseY
        this.x = winMouseX-14
        this.y = winMouseY-14

        this.penColor = penColor
        this.penWidth = penWidth
    }

    show() {
        stroke(this.penColor);
        strokeWeight(this.penWidth)
        rect(this.x, this.y, this.penWidth, this.penWidth);
    }

    distance(){
        return dist(mouseX, mouseY, this.x, this.y)
    }
}