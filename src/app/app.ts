import * as PIXI from 'pixi.js';
import { MenuCtrl } from './MenuCtrl';

export class GameApp {
    private app: PIXI.Application;
    private screen:PIXI.Rectangle;
    constructor(parent: HTMLElement, width: number, height: number) {
        this.app = new PIXI.Application({width: width, height: height, backgroundColor:0x000000});
        parent.replaceChild(this.app.view, parent.lastElementChild);
        this.screen = new PIXI.Rectangle(0,0, this.app.view.width, this.app.view.height);

        new MenuCtrl(this.screen, this.app);
    }
}