import * as PIXI from 'pixi.js';
import {SCALE_MODES} from 'pixi.js';
import bottle from '../../framework/bottle';
import {Texture} from '../../framework/texture';

import acientFighter from '../../assets/images/AncientFighterIdleSide.png';
import carcassFeeder from '../../assets/images/CarcassFeederIdleSide.png';
import graveRevenant from '../../assets/images/GraveRevenantIdleSide.png';
import royalScarab from '../../assets/images/RoyalScarabIdleSide.png';
import bloodLich from '../../assets/images/BloodLichIdleSide.png';

export class BattleTexture extends Texture {
  private renderer: PIXI.Renderer = bottle.inject(PIXI.Renderer);

  public static ANCIENT_FIGHTER = 'ancientFighter';
  public static CARCASS_FEEDER = 'carcassFeeder';
  public static GRAVE_REVENANT = 'graveRevenant';
  public static ROYAL_SCARAB = 'royalScarab';
  public static BLOOD_LICH = 'bloodLich';

  constructor() {
    super();
  }

  get messageRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.lineStyle({width: 4, color: 0xffffff})
    g.drawRoundedRect(0, 0, 450, 50, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get dummyEnemy() {
    const g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.lineStyle({width: 4, color: 0xffffff})
    g.drawRoundedRect(0, 0, 32, 32, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get timeRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRect(0, 0, 10, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get stateRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.lineStyle({width: 4, color: 0xffffff})
    g.drawRoundedRect(0, 0, 450, 75, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get ancientFighter(): [PIXI.Texture[], number] {
    const baseTexture = PIXI.BaseTexture.from(acientFighter, {scaleMode: SCALE_MODES.NEAREST});

    const textures = [];
    for (let i = 0; i < 4; i++) {
      textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(16 * i, 0, 16, 16)));
    }

    return [textures, 0.05];
  }

  get carcassFeeder(): [PIXI.Texture[], number] {
    const baseTexture = PIXI.BaseTexture.from(carcassFeeder, {scaleMode: SCALE_MODES.NEAREST});

    const textures = [];
    for (let i = 0; i < 4; i++) {
      textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(16 * i, 0, 16, 16)));
    }

    return [textures, 0.05];
  }

  get graveRevenant(): [PIXI.Texture[], number] {
    const baseTexture = PIXI.BaseTexture.from(graveRevenant, {scaleMode: SCALE_MODES.NEAREST});

    const textures = [];
    for (let i = 0; i < 4; i++) {
      textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(16 * i, 0, 16, 16)));
    }

    return [textures, 0.05];
  }

  get royalScarab(): [PIXI.Texture[], number] {
    const baseTexture = PIXI.BaseTexture.from(royalScarab, {scaleMode: SCALE_MODES.NEAREST});

    const textures = [];
    for (let i = 0; i < 4; i++) {
      textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(16 * i, 0, 16, 16)));
    }

    return [textures, 0.05];
  }

  get bloodLich(): [PIXI.Texture[], number] {
    const baseTexture = PIXI.BaseTexture.from(bloodLich, {scaleMode: SCALE_MODES.NEAREST});

    const textures = [];
    for (let i = 0; i < 10; i++) {
      textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(32 * i, 0, 32, 32)));
    }

    return [textures, 0.05];
  }
}
