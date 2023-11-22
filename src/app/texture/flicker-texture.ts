import * as PIXI from 'pixi.js';
import bottle from '../../framework/bottle';
import {Texture} from '../../framework/texture';

export class FlickerTexture extends Texture {
  private renderer: PIXI.Renderer = bottle.inject(PIXI.Renderer);

  constructor() {
    super();
  }

  get roundRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRoundedRect(0, 0, 90, 70, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR});
  }

  get roundRectShadow() {
    const g = new PIXI.Graphics();

    g.beginFill(0xAAAAAA);
    g.drawRoundedRect(0, 2, 90, 70, 10);
    g.endFill();

    g.beginFill(0xffffff);
    g.drawRoundedRect(0, 0, 90, 70, 10);
    g.endFill();



    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR});
  }

  get rect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRect(0, 0, 94, 54);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR});
  }

  get leftRoundRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRect(10, 0, 84, 54);

    g.beginFill(0xffffff);
    g.drawRoundedRect(0, 0, 94, 54, 10);

    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR});
  }
}
