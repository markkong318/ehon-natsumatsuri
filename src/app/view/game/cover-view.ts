import {gsap} from "gsap";
import * as PIXI from "pixi.js";
import rocket from "../../../framework/rocket";
import {View} from "../../../framework/view";
import {EVENT_NEXT_PAGE} from "../../env/event";
import {TextStyle} from "../../style/text-style";

export class CoverView extends View {

  private title: PIXI.Text;
  private nextBtn: PIXI.Text;

  constructor() {
    super();
  }

  public setAssets(title: string) {
    this.title = new PIXI.Text(title, new TextStyle().get());
    this.title.x = 0;
    this.title.y = this.height - this.nextBtn.height;
    this.title.alpha = 0;
    this.addChild(this.nextBtn);

    this.nextBtn = new PIXI.Text('次へ', new TextStyle().get());
    this.nextBtn.x = 0;
    this.nextBtn.y = this.height - this.nextBtn.height;
    this.nextBtn.alpha = 0;
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
