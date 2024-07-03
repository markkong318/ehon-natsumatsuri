import {Controller} from '../../framework/controller';
import {ResourceController} from "./resource-controller";
import bottle from "../../framework/bottle";
import rocket from "../../framework/rocket";
import {PageView} from "../view/game/page-view";
import {gsap} from "gsap";
import {EVENT_NEXT_PAGE} from "../env/event";
import {BookModel} from "../model/book-model";

export class MainController extends Controller {

  private resourceController: ResourceController = bottle.inject(ResourceController);
  private bookModel: BookModel = bottle.inject(BookModel);
  private pageView: PageView = bottle.inject(PageView);

  private pageIdx: number = 0;
  private tl: gsap.core.Timeline;

  public async main() {
    this.tl = new gsap.core.Timeline();

    await this.resourceController.load();

    await this.initEvent();
    await this.initBook();

    this.nextPage();

    this.pageView.play(this.tl);
  }

  private async initEvent() {
    rocket.on(EVENT_NEXT_PAGE, () => {
      this.nextPage();
    });
  }

  private async initBook() {
    this.pageIdx = -1;
  }

  private nextPage() {
    this.pageIdx++;

    if (this.pageIdx >= this.bookModel.pages.length) {
      return;
    }

    this.pageView.fadeOut(this.tl);
    this.pageView.setAssets(this.bookModel.pages[this.pageIdx].article, this.bookModel.pages[this.pageIdx].illustration)
    this.pageView.fadeIn(this.tl);

    this.pageView.play(this.tl);
  }
}
