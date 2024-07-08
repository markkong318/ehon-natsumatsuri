import * as PIXI from 'pixi.js';

import {View} from '../../framework/view';
import {Size} from '../../framework/size';
import bottle from '../../framework/bottle';
import {Background} from '../../framework/background';
import {CoverView} from "./game/cover-view";
import {TouchSprite} from './game/touch-sprite';
import {PageView} from "./game/page-view";

export class GameView extends View {
  private coverView: CoverView;
  private pageView: PageView;
  private touchSprite: TouchSprite;

  constructor() {
    super();
  }

  public init() {
    this.background = new Background(PIXI.Texture.WHITE, 0xf9f1e1);

    const height = 700

    this.coverView = bottle.singleton(CoverView);
    this.coverView.size = new Size(this.size.width, height);
    this.coverView.background = new Background(PIXI.Texture.WHITE, 0x888888);
    this.coverView.y = (this.size.height - height) / 2;
    this.coverView.init();
    this.addChild(this.coverView);

    this.pageView = bottle.singleton(PageView);
    this.pageView.size = new Size(this.size.width, height);
    this.pageView.background = new Background(PIXI.Texture.WHITE, 0x888888);
    this.pageView.y = (this.size.height - height) / 2;
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
