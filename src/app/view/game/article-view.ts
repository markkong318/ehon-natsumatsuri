import {View} from "../../../framework/view";
import {SentenceView} from "./sentence-view";
import {ArticleModel} from "../../model/article-model";
import {gsap} from "gsap";

export class ArticleView extends View {

  private article: ArticleModel;

  private sentenceViews: SentenceView[] = [];

  constructor(article: ArticleModel) {
    super();
    this.article = article;
  }

  public async init() {
    super.init();

    let y = 0;

    for (let i = 0; i < this.article.sentences.length; i++) {
      const view = new SentenceView(this.article.sentences[i].text, this.article.sentences[i].audio);
      await view.init();
      view.x = 0;
      view.y = y;

      y += view.height;

      this.addChild(view);
      this.sentenceViews.push(view);
    }
  }

  public play() {
    let timeline = gsap.timeline();

    for (let i = 0; i < this.article.sentences.length; i++) {
      this.sentenceViews[i].play(timeline);
    }

    // timeline.play();
  }

  public clean() {
  }
}
