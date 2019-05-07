export class MenuCtrl {
  constructor(stage:PIXI.Rectangle, container:PIXI.Container) {

      let title:PIXI.Text = new PIXI.Text('retro  AI', {fill:0xFFFFFF, fontFamily:'Arcade', fontSize:60});
      title.position.set(stage.width/2-title.width/2, stage.height*0.15);

      let snakeText:PIXI.Text = new PIXI.Text('Snake', {fill:0xFFFFFF, fontFamily:'Arcade', fontSize:48});
      snakeText.position.set(stage.width/2-snakeText.width/2, stage.height * 0.35);

      snakeText.interactive = true;
      snakeText.buttonMode = true;
      snakeText
      .on('pointerdown', this.launchSnake)
      .on('pointerover', () => snakeText.style.fill = 0xFF0000)
      .on('pointerout', () => snakeText.style.fill = 0xFFFFFF);


      container.addChild(title, snakeText);
    }

    private launchSnake = () => {

    }
}