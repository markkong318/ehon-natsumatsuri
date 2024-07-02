import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {ArticleModel} from "../../model/article-model";
import {ArticleView} from "./component/article-view";
import {gsap} from "gsap";
import {TextStyle} from "../../style/text-style";

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

  public fadeOutIllustration(tl: gsap.core.Timeline) {
    tl.to(this.illustration, {alpha: 0, duration: 1});
  }

  public fadeInNextBtn(tl: gsap.core.Timeline) {
    tl.to(this.nextBtn, {alpha: 1, duration: 1});
  }

  public setAssets(article: ArticleModel, illustration: PIXI.Sprite) {

    if (this.illustration != null) {
      this.removeChild(this.illustration);
    }

    if (this.articleView != null) {
      this.removeChild(this.articleView);
    }

    this.illustration = illustration;
    this.illustration.alpha = 0;
    this.addChild(illustration);

    this.articleView = new ArticleView(article);
    this.articleView.init();
    this.addChild(this.articleView);

    const style = new TextStyle().get()
    this.nextBtn = new PIXI.Text('次へ', style);
    this.nextBtn.x = 0;
    this.nextBtn.y = this.height - this.nextBtn.height;
    this.nextBtn.alpha = 0;
    this.addChild(this.nextBtn);
  }

  public play(tl: gsap.core.Timeline) {
    this.fadeIn(tl);
    this.fadeInIllustration(tl);
    this.articleView.play(tl);
    this.fadeInNextBtn(tl);
  }

  public fadeIn(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 1, duration: 1});
  }

  public fadeOut(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 0, duration: 1});
  }
}
