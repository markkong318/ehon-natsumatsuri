import {gsap} from "gsap";
import * as PIXI from "pixi.js";
import bottle from "../../../framework/bottle";
import rocket from "../../../framework/rocket";
import {View} from "../../../framework/view";
import {EVENT_NEXT_PAGE} from "../../env/event";
import {BookModel} from "../../model/book-model";
import {TextStyle} from "../../style/text-style";

export class CoverView extends View {

  private bookModel: BookModel = bottle.inject(BookModel);
  private textStyle: TextStyle = bottle.inject(TextStyle);
  private title: PIXI.Text;
  private nextBtn: PIXI.Text;

  constructor() {
    super();
  }

  public setAssets(title: string) {

    this.title = new PIXI.Text(title, this.textStyle.getWithColor(this.bookModel.fontColor, { fontSize: 70}));
    this.title.x = (this.width - this.title.width) / 2;
    this.title.y = 180;
    this.title.alpha = 1;
    this.addChild(this.title);

    this.nextBtn = new PIXI.Text('次へ', this.textStyle.getWithColor(this.bookModel.fontColor));
    this.nextBtn.x = (this.width - this.nextBtn.width) / 2;
    this.nextBtn.y = 420;
    this.nextBtn.alpha = 1;
    this.nextBtn.interactive = true;
    this.nextBtn.on('pointerdown', () => rocket.emit(EVENT_NEXT_PAGE));
    this.addChild(this.nextBtn);
  }

  public fadeIn(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 1, duration: 1});
  }

  public fadeOut(tl: gsap.core.Timeline) {
    tl.to(this, {alpha: 0, duration: 1});
  }
}
