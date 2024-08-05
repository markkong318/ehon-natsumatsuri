import {gsap} from 'gsap';
import * as PIXI from 'pixi.js';
import bottle from '../../../framework/bottle';
import rocket from '../../../framework/rocket';
import {View} from '../../../framework/view';
import {BOTTLE_AUDIO_CONTEXT} from '../../env/bottle';
import {EVENT_NEXT_PAGE} from '../../env/event';
import {ArticleModel} from '../../model/article-model';
import {BookModel} from '../../model/book-model';
import {TextStyle} from '../../style/text-style';
import {ArticleView} from './component/article-view';

export class PageView extends View {

  private bookModel: BookModel = bottle.inject(BookModel);
  private textStyle: TextStyle = bottle.inject(TextStyle);
  private audioContext: AudioContext = bottle.inject(BOTTLE_AUDIO_CONTEXT);
  private articleView: ArticleView;
  private illustration: PIXI.Sprite;
  private nextBtn: PIXI.Text;

  constructor() {
    super();
  }

  public async init() {

  }

  public fadeInIllustration(tl: gsap.core.Timeline) {
    tl.to(this.illustration, {alpha: 1, duration: 1});
  }

  public fadeInNextBtn(tl: gsap.core.Timeline) {
    tl.to(this.nextBtn, {alpha: 1, duration: 1});
  }

  public setAssets(articleModel: ArticleModel, illustration: PIXI.Sprite) {

    if (this.illustration != null) {
      this.removeChild(this.illustration);
    }

    if (this.articleView != null) {
      this.removeChild(this.articleView);
    }

    if (this.nextBtn != null) {
      this.removeChild(this.nextBtn);
    }

    this.illustration = illustration;
    this.illustration.alpha = 0;
    this.illustration.x = (this.width - this.illustration.width) / 2;
    this.illustration.y = 230;
    this.addChild(illustration);

    this.articleView = new ArticleView(articleModel);
    this.articleView.init();
    this.articleView.x = 50;
    this.articleView.y = 50;
    this.addChild(this.articleView);

    const style = this.textStyle.getWithColor(this.bookModel.fontColor);
    this.nextBtn = new PIXI.Text('次へ', style);
    this.nextBtn.x = this.width - this.nextBtn.width - 50;
    this.nextBtn.y = this.height - this.nextBtn.height - 20;
    this.nextBtn.alpha = 0;
    this.nextBtn.interactive = true;
    this.nextBtn.on('pointerdown', () => rocket.emit(EVENT_NEXT_PAGE));
    this.addChild(this.nextBtn);
  }

  public play(tl: gsap.core.Timeline, isLast: boolean) {
    this.fadeIn(tl);
    this.fadeInIllustration(tl);
    this.articleView.play(tl);

    if (!isLast) {
      this.fadeInNextBtn(tl);
    } else {
      tl.add(function () {
        console.log('End')
      }, '+=0.75')

      tl.to(null, {
        onStart: async function (voice: AudioBuffer, audioContext: AudioContext) {
          const source = audioContext.createBufferSource();
          source.buffer = voice;
          source.connect(audioContext.destination);
          source.start(0);
        },
        onStartParams: [this.bookModel.voiceEnd, this.audioContext],
      });
    }
  }

  public fadeIn(tl: gsap.core.Timeline) {
    this.articleView.x = (this.width - this.articleView.getMaxTextWidth()) / 2;

    tl.to(this, {alpha: 1, duration: 1});
  }

  public fadeOut(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 0, duration: 1});
  }
}
