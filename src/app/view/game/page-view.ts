import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {SentenceModel} from "../../model/sentence-model";
import {MaskSprite} from "../../sprite/mask-sprite";
import { gsap } from 'gsap';
import {ArticleModel} from "../../model/article-model";
import {ArticleView} from "./article-view";
import {ResourceController} from "../../controller/resource-controller";
// import voice from '../../../assets/voices/test.wav';

export class PageView extends View {

  private sentences: SentenceModel[];
  private images: PIXI.Sprite[];

  constructor() {
    super();
  }

  public setSentences(sentences: SentenceModel[]) {
    this.sentences = sentences;
  }

  public initImages(images: PIXI.Sprite[]) {
    this.images = images;
  }


  public async initUI() {
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
    // gradientSprite.x = gradientSprite.x + 50;
    this.addChild(gradientSprite)
    this.addChild(text3);


    const mask = new MaskSprite().get();

    const text4 = new PIXI.Text('テストテストテスト', style);
    text4.mask = mask;
    // gradientSprite.y = gradientSprite.y + 50;
    text4.y = text4.y + 100;
    mask.y = mask.y + 100;
    // mask.x += 100;
    this.addChild(mask)
    this.addChild(text4);

    mask.x = -480;


    // @ts-ignore
    const url = new URL('../../../assets/voices/test.wav', import.meta.url);
    const audioElm = new Audio(url.href);
    audioElm.preload = "auto";
    // setTimeout(() => {
    //
    //
    //   gsap.to(mask, {
    //     x: text4.x + text4.width - 480 + 50, // Destination x value
    //     duration: Math.ceil(audioElm.duration), // Duration in seconds
    //   });
    //
    //   audioElm.play();
    // }, 3000)


    // audioElm.addEventListener('loadedmetadata', function () {
    //   console.log('play time:' + audioElm.duration);
    // });
    //
    //
    // audioElm.addEventListener('loadedmetadata', function () {
    //   console.log('play done');
    // });

    /////article test

    // const sentence = new SentenceModel()
    // sentence.text = 'テストテストテスト';
    // sentence.voice = audioElm;
    //
    // const article = new ArticleModel();
    // article.sentences = [
    //   sentence, sentence, sentence,
    // ];

    // const articleVew = new ArticleView(article);
    // await articleVew.init();
    // this.addChild(articleVew);
    //
    // articleVew.play();

    const resourceController = new ResourceController();
    await resourceController.load();
  }

  public test2(article: ArticleModel) {
    const articleVew = new ArticleView(article);
    articleVew.init();
    this.addChild(articleVew);

    articleVew.play();
  }

}
