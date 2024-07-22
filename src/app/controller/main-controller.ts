import {gsap} from "gsap";
import bottle from "../../framework/bottle";
import {Controller} from '../../framework/controller';
import rocket from "../../framework/rocket";
import {BOTTLE_AUDIO_CONTEXT} from "../env/bottle";
import {EVENT_NEXT_PAGE} from "../env/event";
import {BookModel} from "../model/book-model";
import {CoverView} from "../view/game/cover-view";
import {PageView} from "../view/game/page-view";
import {ResourceController} from "./resource-controller";

export class MainController extends Controller {

  private resourceController: ResourceController = bottle.inject(ResourceController);
  private bookModel: BookModel = bottle.inject(BookModel);
  private coverView: CoverView = bottle.inject(CoverView);
  private pageView: PageView = bottle.inject(PageView);
  private audioContext: AudioContext = bottle.inject(BOTTLE_AUDIO_CONTEXT);

  private pageIdx: number = 0;
  private tl: gsap.core.Timeline;

  public static PAGE_NUMBER_INITIAL = -2;
  public static PAGE_NUMBER_COVER = -1;


  public async main() {
    this.tl = new gsap.core.Timeline();

    await this.resourceController.load();

    await this.initEvent();
    await this.initBook();

    this.nextPage();
  }

  private async initEvent() {
    rocket.on(EVENT_NEXT_PAGE, async () => {
      this.nextPage();
    });
  }

  private async initBook() {
    this.pageIdx = -2;
  }

  private nextPage() {
    this.pageIdx++;

    if (this.pageIdx >= this.bookModel.pages.length) {
      return;
    }

    if (this.pageIdx === -1) {
      this.coverView.setAssets(this.bookModel.cover.title);
      this.coverView.fadeIn(this.tl);
      return;
    }

    this.pageIdx === 0 ? this.coverView.fadeOut(this.tl) : this.pageView.fadeOut(this.tl);

    this.pageView.fadeOut(this.tl);
    this.pageView.setAssets(this.bookModel.pages[this.pageIdx].article, this.bookModel.pages[this.pageIdx].illustration)
    this.pageView.fadeIn(this.tl);

    this.pageView.play(this.tl, this.pageIdx === this.bookModel.pages.length - 1);
  }
}
