import * as PIXI from 'pixi.js';

import {View} from '../../framework/view';
import {Size} from '../../framework/size';
import bottle from '../../framework/bottle';
import {Background} from '../../framework/background';
import {TouchSprite} from './game/touch-sprite';
import {BattleView} from "./game/battle-view";

export class GameView extends View {
  private battleView: BattleView;
  private touchSprite: TouchSprite;

  public static FLICKER_VIEW_HEIGHT = 300;

  constructor() {
    super();
  }

  public init() {
    this.background = new Background(PIXI.Texture.WHITE, 0xf9f1e1);

    this.battleView = bottle.singleton(BattleView);
    this.battleView.size = new Size(this.size.width, this.size.height - GameView.FLICKER_VIEW_HEIGHT);
    this.battleView.background = new Background(PIXI.Texture.WHITE, 0xffffff);
    this.battleView.y = 0;
    this.battleView.initUI();
    this.addChild(this.battleView);

    // this.touchSprite = bottle.singleton(TouchSprite);
    // this.touchSprite.width = this.width;
    // this.touchSprite.height = this.height;
    // this.touchSprite.interactive = true;
    // this.addChild(this.touchSprite);

    // this.touchSprite.setBaseView(this.flickerView);
  }
}
