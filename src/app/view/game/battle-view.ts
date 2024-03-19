import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import bottle from '../../../framework/bottle';
import {BattleTexture} from '../../texture/battle-texture';
import {EnemyGroupView} from './battle/enemy-group-view';
import {Size} from '../../../framework/size';
import {Background} from '../../../framework/background';
import {QuizGroupView} from './battle/quiz-group-view';
import {StateView} from './battle/state-view';
import {MessageView} from './battle/message-view';

export class BattleView extends View {
  private battleTexture: BattleTexture;

  private messageView: MessageView;

  private enemyGroupView: EnemyGroupView;
  private quizGroupView: QuizGroupView;
  private stateView: StateView;

  private baseHeight = 450;
  private baseY: number = 0;

  constructor() {
    super();
  }

  public initUI() {
    // this.battleTexture = bottle.singleton(BattleTexture);
    //
    // this.baseY = (this.height - this.baseHeight) / 2;
    //
    // this.messageView = bottle.singleton(MessageView);
    // this.messageView.size = new Size(this.size.width, 0);
    // this.messageView.background = new Background(PIXI.Texture.WHITE, 0x000000);
    // this.messageView.x = 0;
    // this.messageView.y = this.baseY;
    // this.messageView.initUI();
    // this.addChild(this.messageView);
    //
    //
    // this.enemyGroupView = bottle.singleton(EnemyGroupView);
    // this.enemyGroupView.size = new Size(this.size.width, 150);
    // this.enemyGroupView.background = new Background(PIXI.Texture.WHITE, 0x000000);
    // this.enemyGroupView.x = 0;
    // this.enemyGroupView.y = this.messageView.y + this.messageView.height;
    // this.enemyGroupView.initUI();
    // this.addChild(this.enemyGroupView);
    //
    // this.quizGroupView = bottle.singleton(QuizGroupView);
    // this.quizGroupView.size = new Size(this.size.width, 150);
    // this.quizGroupView.background = new Background(PIXI.Texture.EMPTY, 0x000000);
    // this.quizGroupView.x = 0;
    // this.quizGroupView.y = this.enemyGroupView.y + this.enemyGroupView.height;
    // this.quizGroupView.initUI();
    // this.addChild(this.quizGroupView);
    //
    // this.stateView = bottle.singleton(StateView);
    // this.stateView.size = new Size(this.size.width, 50);
    // this.stateView.background = new Background(PIXI.Texture.EMPTY, 0x000000);
    // this.stateView.x = 0;
    // this.stateView.y = this.quizGroupView.y + this.quizGroupView.height;
    // this.stateView.initUI();
    // this.addChild(this.stateView);

//     const style = new PIXI.TextStyle({
//       dropShadow: true,
//       dropShadowAlpha: 0.8,
//       dropShadowAngle: 0,
//       dropShadowBlur: 10,
//       dropShadowDistance: 0,
//       fill: [
//         "#ffffff",
//         "rgba(255, 255, 255, 1)"
//       ],
//       // fill: "rgba(243, 33, 22, 0.5)",
//       fillGradientType: 1,
//       fillGradientStops: [
//         0.5
//       ],
//       lineJoin: "round",
//       miterLimit: 6,
//       padding: 10,
//       strokeThickness: 4
//     });
//     const text = new PIXI.Text('あああああ', style);
//
//     this.addChild(text);
//
//
//     // create a new gradient texture
//     let canvas = document.createElement('canvas');
//     canvas.width = text.width;
//     canvas.height = text.height;
//
//     let ctx = canvas.getContext('2d');
//
// // use the context to draw a linear gradient
//     let grd = ctx.createLinearGradient(0, 0, text.width, 0);
//     grd.addColorStop(0, 'white');
//     grd.addColorStop(1, 'black');
//
//     ctx.fillStyle = grd;
//     ctx.fillRect(0, 0, text.width, text.height);
//
//     let gradient = PIXI.Texture.from(canvas);
//
//     let gradientSprite = new PIXI.Sprite(gradient);
//
//     // text.mask = gradientSprite
//
//
//     let text2 = new PIXI.Text('Hello', {
//       fontFamily: 'Arial',
//       fontSize: 64,
//       fill: 'white',
//       dropShadow: true,
//       dropShadowColor: '#000000',
//       dropShadowBlur: 4,
//       dropShadowAngle: Math.PI / 6,
//       dropShadowDistance: 6,
//     });
//
//
//
//     text2.mask = gradientSprite;
//     this.addChild(text2)


    let text = new PIXI.Text('Hello', {
      fontFamily: 'Arial',
      fontSize: 64,
      fill: 'white',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

// create a new gradient texture
    let canvas = document.createElement('canvas');
    canvas.width = text.width;
    canvas.height = text.height;

    let ctx = canvas.getContext('2d');

// use the context to draw a linear gradient
    let grd = ctx.createLinearGradient(50, 0, text.width, 0);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, 'black');

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 50, text.height)

    ctx.fillStyle = grd;
    ctx.fillRect(50, 0, text.width, text.height);



    let gradient = PIXI.Texture.from(canvas);

    let gradientSprite = new PIXI.Sprite(gradient);

    // text.mask = gradientSprite;
    // this.addChild(text);

// create a container and add both the text and gradient sprite to it
// let container = new PIXI.Container();
// container.addChild(text);
// container.addChild(gradientSprite);
//
// // set the mask of the container to be the gradient sprite
// container.mask = gradientSprite;
//
// // add the container to the stage
// this.addChild(container);


    const style = new PIXI.TextStyle({
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowAngle: 0,
      dropShadowBlur: 10,
      dropShadowDistance: 0,
      fill: [
        "#ffffff",
      ],
      fillGradientType: 1,
      fillGradientStops: [
        0
      ],
      lineJoin: "round",
      miterLimit: 6,
      padding: 10,
      strokeThickness: 4
    });
    const text3 = new PIXI.Text('あああああ', style);
    text3.mask = gradientSprite;
    this.addChild(gradientSprite)
    this.addChild(text3);
  }
}
