import {gsap} from "gsap";
import * as PIXI from 'pixi.js';
import rocket from "../../../framework/rocket";
import {View} from '../../../framework/view';
import {EVENT_NEXT_PAGE} from "../../env/event";
import {ArticleModel} from "../../model/article-model";
import {TextStyle} from "../../style/text-style";
import {ArticleView} from "./component/article-view";

export class PageView extends View {

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
    this.illustration.x = 35;
    this.illustration.y = 230;
    this.addChild(illustration);

    this.articleView = new ArticleView(articleModel);
    this.articleView.init();
    this.articleView.x = 50;
    this.articleView.y = 50;
    this.addChild(this.articleView);

    const style = new TextStyle().get()
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
    }
  }

  public fadeIn(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 1, duration: 1});
  }

  public fadeOut(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 0, duration: 1});
  }
}
