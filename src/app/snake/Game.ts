import * as PIXI from 'pixi.js';


import { Snake } from "./Snake";

export class SnakeGame {
  private border:PIXI.Graphics;
  private snake:Snake;
  private score:number = 0;
  private scoreText:PIXI.Text;
  private food:PIXI.Graphics;
  private gridCount:number;
  private gridSize:number;
  constructor(private screen:PIXI.Rectangle, private app:PIXI.Application) {


    this.border = new PIXI.Graphics().lineStyle(3, 0xFF0000);
    this.border.drawRect(0,0,screen.height * 0.75,screen.height * 0.75);
    this.border.position.set(screen.width/2-this.border.width/2, screen.height/2-this.border.height/2)
    this.app.stage.addChild(this.border);
    this.gridCount = this.border.width/20
    this.gridSize = this.border.width/this.gridCount;

    this.scoreText = new PIXI.Text('',{fill:0xFFFFFF, fontFamily:'Arcade', fontSize:30});
    this.updateScoreText();
    this.scoreText.position.set(this.screen.width/2 - this.scoreText.width/2, this.screen.height * 0.05);
    this.app.stage.addChild(this.scoreText);

    this.snake = new Snake(this.gridSize);
    this.snake.position.set(this.getRandomPosition().x, this.getRandomPosition().y);
    this.app.stage.addChild(this.snake);

    window.addEventListener("keydown", this.onKeyDown);

    this.generateFood();

    this.app.ticker.maxFPS = 30;
    this.app.ticker.add(this.onTick);


  }

  private onKeyDown = (e:KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp': this.snake.updateDirection('UP'); break;
      case 'ArrowDown': this.snake.updateDirection('DOWN'); break;
      case 'ArrowLeft': this.snake.updateDirection('LEFT'); break;
      case 'ArrowRight': this.snake.updateDirection('RIGHT'); break;
    }
  }

  private onTick = () => {
    this.snake.onTick();
    this.checkBounds();
  }

  private resetSnake = () => {
    this.score = 0;
    this.updateScoreText();
    this.snake.position.set(this.getRandomPosition().x, this.getRandomPosition().y);
  }

  private updateScoreText = () => {
    this.scoreText.text = 'SCORE: ' + this.score.toString();
  }

  private checkBounds = () => {
    if(this.snake.x < this.border.x || this.snake.x + this.snake.width > this.border.x + this.border.width || this.snake.y < this.border.y || this.snake.y + this.snake.height > this.border.y + this.border.height) {
      this.resetSnake();
    }
    if(this.snake.x === this.food.x && this.snake.y === this.food.y) {
      this.score++;
      this.updateScoreText();
      this.food.destroy();
      this.generateFood()
    }
  }

  private generateFood = () => {
    this.food = new PIXI.Graphics().beginFill(0x00FF00).drawRect(0,0,this.gridSize, this.gridSize);
    this.food.position.set(this.getRandomPosition().x, this.getRandomPosition().y);
    this.app.stage.addChild(this.food);
  }

  private getRandomPosition = ():{x:number, y:number} => {
    let pos = Math.floor(Math.random() * this.gridCount);
    return {x:this.border.x + (pos*this.gridSize), y:this.border.y + (pos*this.gridSize)}
  }
}