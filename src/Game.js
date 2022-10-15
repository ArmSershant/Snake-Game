import { Tools } from "./Tools.js"
import { Snake } from "./Snake.js"
import { Food } from "./Food.js"
export class Game {
  snake = new Snake()
  food = new Food()
  speed = 100
  interval = null
  score = 1
  constructor() {
    document.body.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.snake.direction = "left"
          break
        case "ArrowRight":
          this.snake.direction = "right"
          break
        case "ArrowDown":
          this.snake.direction = "down"
          break
        case "ArrowUp":
          this.snake.direction = "up"
          break
      }
    }
  }
  drawScore() {
    document.getElementById("score").innerHTML = "Score:" + this.score++
  }
  play() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      Tools.ctx.clearRect(0, 0, 1200, 600)
      this.snake.move()
      this.food.draw()
      this.eat()
      this.conflict()
    }, this.speed)
  }
  eat() {
    const { x, y } = this.snake.body[0]
    if (Math.abs(x - this.food.x) < 20) {
      if (Math.abs(y - this.food.y) < 20) {
        this.food.restart()
        if (this.speed > 20) {
          this.speed -= 5
          this.play()
        }
        this.snake.increase()
        this.drawScore()
      }
    }
  }
  conflict() {
    for (let i = 1; i < this.snake.body.length; i++) {
      if (Math.abs(this.snake.body[i].x - this.snake.body[0].x) < 12) {
        if (Math.abs(this.snake.body[i].y - this.snake.body[0].y) < 12) {
          this.over()
        }
      }
    }
  }
  over() {
    console.log("Game Over")
    clearInterval(this.interval)
    Tools.ctx.clearRect(0, 0, 1200, 600)
    Tools.ctx.globalCompositeOperation = "xor"
    Tools.ctx.font = "100px Tahoma"
    Tools.ctx.fillStyle = "red"
    Tools.ctx.fillText("GAME OVER", 320, 300)
  }
}
