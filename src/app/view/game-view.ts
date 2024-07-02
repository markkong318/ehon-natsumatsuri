import * as PIXI from 'pixi.js';

import {View} from '../../framework/view';
import {Size} from '../../framework/size';
import bottle from '../../framework/bottle';
import {Background} from '../../framework/background';
import {TouchSprite} from './game/touch-sprite';
import {PageView} from "./game/page-view";

export class GameView extends View {
  private pageView: PageView;
  private touchSprite: TouchSprite;

  constructor() {
    super();
  }

  public init() {
    this.background = new Background(PIXI.Texture.WHITE, 0xf9f1e1);

    this.pageView = bottle.singleton(PageView);
    this.pageView.size = new Size(this.size.width, 800);
    this.pageView.background = new Background(PIXI.Texture.WHITE, 0x888888);
    this.pageView.y = (this.size.height - 800) / 2;
    this.pageView.init();
    this.addChild(this.pageView);

    // this.touchSprite = bottle.singleton(TouchSprite);
    // this.touchSprite.width = this.width;
    // this.touchSprite.height = this.height;
    // this.touchSprite.interactive = true;
    // this.addChild(this.touchSprite);

    // this.touchSprite.setBaseView(this.flickerView);
  }
}
