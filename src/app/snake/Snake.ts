import * as PIXI from 'pixi.js';


export class Snake extends PIXI.Container{
  private direction:{x:number, y:number} = {x:0, y: 0};
  private tail:PIXI.Point[] = []
  constructor(private size:number) {
    super();

    this.grow();
  }

  public updateDirection = (val:Direction) => {
    switch (val) {
      case 'UP': this.direction = {x:0, y:-this.size}; break;
      case 'DOWN': this.direction = {x:0, y:this.size}; break;
      case 'LEFT': this.direction = {x:-this.size, y:0}; break;
      case 'RIGHT': this.direction = {x:this.size, y:0}; break;
    }
  }

  public onTick = () => {
    this.x += this.direction.x;
    this.y += this.direction.y;
  }

  public grow = () => {
    let newRect:PIXI.Graphics = new PIXI.Graphics().beginFill(0xFFFFFF).drawRect(0,0,this.size,this.size);
    this.addChild(newRect);
    if(this.children.length>1) {
      newRect.position.set(this.children[this.children.length-1].x, this.children[this.children.length-1].y + this.size + 5)
    }
  }


}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';