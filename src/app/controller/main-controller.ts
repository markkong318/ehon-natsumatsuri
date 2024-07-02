import {Controller} from '../../framework/controller';
import {ResourceController} from "./resource-controller";
import bottle from "../../framework/bottle";
import {PageView} from "../view/game/page-view";
import {gsap} from "gsap";

export class MainController extends Controller {

  private resourceController: ResourceController = bottle.inject(ResourceController);
  private pageView: PageView = bottle.inject(PageView);

  public async main() {
    await this.resourceController.load();
    this.pageView.play(new gsap.core.Timeline());
  }
}
