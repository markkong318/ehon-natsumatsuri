import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../../framework/view';
import bottle from "../../../../framework/bottle";
import {BattleTexture} from '../../../texture/battle-texture';
import {GridLayout} from '../layout/grid-layout';

export class EnemyGroupView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private enemySprites: PIXI.AnimatedSprite[] = [];

  private layout: GridLayout;

  constructor() {
    super();
  }

  public initUI() {
    this.layout = new GridLayout(this, 3, 1, 30);

    for (let i = 0; i < 3; i++) {
      const enemySprite = new PIXI.AnimatedSprite([this.battleTexture.dummyEnemy],);
      enemySprite.alpha = 0;
      this.layout.put(enemySprite, i, 0);

      this.enemySprites.push(enemySprite);
    }
  }

  setEnemy(id: number, textures: PIXI.Texture[], speed: number) {
    const width = this.enemySprites[id].width;
    const height = this.enemySprites[id].height;

    this.enemySprites[id].textures = textures;
    this.enemySprites[id].animationSpeed = speed;
    this.enemySprites[id].width = width;
    this.enemySprites[id].height = height;
    this.enemySprites[id].alpha = 0;
  }

  playHide(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();

    for (let i = 0; i < ids.length; i++) {
      const sprite = this.enemySprites[ids[i]];

      sprite.stop();

      timeline.to(sprite, {
        pixi: {
          duration: 0.5,
          alpha: 0,
        },
      }, '<')
    }

    return timeline;
  }

  playShow(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();

    for (let i = 0; i < ids.length; i++) {
      const sprite = this.enemySprites[ids[i]];

      sprite.play();

      timeline.to(sprite, {
        pixi: {
          duration: 0.5,
          alpha: 1,
        },
      }, '<')
    }

    return timeline;
  }

  playPause(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();
    for (let i = 0; i < ids.length; i++) {
      const sprite = this.enemySprites[ids[i]];
      timeline.call(() => sprite.stop());
    }

    return timeline;
  }

  playResume(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();
    for (let i = 0; i < ids.length; i++) {
      const sprite = this.enemySprites[ids[i]];
      timeline.call(() => sprite.play());
    }

    return timeline;
  }
}
