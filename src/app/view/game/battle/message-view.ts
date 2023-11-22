import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../../framework/view';
import bottle from '../../../../framework/bottle';
import {BattleTexture} from '../../../texture/battle-texture';

export class MessageView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private frameSprite: PIXI.Sprite;
  private messageText: PIXI.Text;

  constructor() {
    super();
  }

  public initUI() {
    this.frameSprite = new PIXI.Sprite(this.battleTexture.messageRect)
    this.frameSprite.x = (this.width - this.battleTexture.messageRect.width) / 2;
    this.frameSprite.y = 0;
    this.addChild(this.frameSprite)

    this.messageText = new PIXI.Text('');
    this.messageText.x = this.frameSprite.x + 15;
    this.messageText.y = this.frameSprite.y + 15;
    this.messageText.style.fontFamily = 'jackeyfont';
    this.messageText.style.fontSize = '24px';
    this.messageText.style.fill = ['#ffffff'];
    this.addChild(this.messageText);
  }

  playMessage(text: string, duration: number = 1.5): gsap.core.Timeline {
    return gsap.timeline()
      .to(
        {},
        {
          duration,
          onStartParams: [this.messageText, text],
          onStart: function (target: PIXI.Text, text: string) {
            target.text = text;
          },
          onCompleteParams: [this.messageText],
          onComplete: function (target: PIXI.Text) {
            target.text = '';
          }
        }
      );
  }
}
