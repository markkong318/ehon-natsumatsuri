import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../../framework/view';
import {BattleTexture} from '../../../texture/battle-texture';
import bottle from '../../../../framework/bottle';

export class StateView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private frameSprite: PIXI.Sprite;
  private timeTitleText: PIXI.Text;
  private timeSprite: PIXI.Sprite;
  private lifeTitleText: PIXI.Text;
  private lifeValueText: PIXI.Text;

  public static TIME_SPRITE_WIDTH = 300;

  public initUI() {
    this.frameSprite = new PIXI.Sprite(this.battleTexture.stateRect)
    this.frameSprite.x = (this.width - this.battleTexture.messageRect.width) / 2;
    this.frameSprite.y = 0;
    this.addChild(this.frameSprite)

    this.timeTitleText = new PIXI.Text('Time:');
    this.timeTitleText.x = 30;
    this.timeTitleText.y = 20;
    this.timeTitleText.style.fontFamily = 'jackeyfont';
    this.timeTitleText.style.fontSize = '20px';
    this.timeTitleText.style.fill = ['#ffffff'];
    this.addChild(this.timeTitleText);

    this.timeSprite = new PIXI.Sprite(this.battleTexture.timeRect);
    this.timeSprite.x = 100;
    this.timeSprite.y = this.timeTitleText.y;
    this.timeSprite.width = 300;
    this.addChild(this.timeSprite);

    this.lifeTitleText = new PIXI.Text("Life:");
    this.lifeTitleText.x = this.timeTitleText.x;
    this.lifeTitleText.y = this.timeTitleText.y + 25;
    this.lifeTitleText.style.fontFamily = 'jackeyfont';
    this.lifeTitleText.style.fontSize = '20px';
    this.lifeTitleText.style.fill = ['#ffffff'];
    this.addChild(this.lifeTitleText);

    this.lifeValueText = new PIXI.Text('');
    this.lifeValueText.x = 100;
    this.lifeValueText.y = this.timeTitleText.y + 20;
    this.lifeValueText.style.fontSize = '20px';
    this.lifeValueText.style.fill = ['#ffffff']
    this.addChild(this.lifeValueText);
  }

  playTime(percent: number, duration: number = 0): gsap.core.Timeline {
    const width = Math.floor(percent / 100 * StateView.TIME_SPRITE_WIDTH);

    return gsap.timeline()
      .to(this.timeSprite, {
        pixi: {
          duration,
          width,
        },
      }, '>');
  }

  playLife(count: number): gsap.core.Timeline {
    const heart = '♥'.repeat(count);
    return gsap.timeline()
      .to(this.timeSprite, {
        duration: 1,
        onCompleteParams: [this.lifeValueText],
        onComplete: function (target: PIXI.Text) {
          target.text = heart;
        },
      });
  }
}
