import {GameView} from './view/game-view';
import {Application} from '../framework/application';
import {Size} from '../framework/size';
import {Storage} from './storage/storage';
import bottle from '../framework/bottle';
import {MainController} from './controller/main-controller';
import {VoiceResource} from "./storage/voice-resource";
import {IllustrationResource} from "./storage/illustration-resource";
import {ResourceController} from "./controller/resource-controller";

export class GameApplication extends Application {
  private mainController: MainController;
  private resourceController: ResourceController;
  private gameView: GameView;
  private storage: Storage;
  private voiceResource: VoiceResource;
  private illustrateResource: IllustrationResource;

  constructor(options?) {
    super(options);
    this.initScene();
  }

  public async initScene() {
    bottle.setObject(this.renderer);

    this.voiceResource = bottle.singleton(VoiceResource);
    this.illustrateResource = bottle.singleton(IllustrationResource);
    this.storage = bottle.singleton(Storage);

    const viewWidth = 480;
    const viewHeight = this.getViewHeight(viewWidth);

    this.gameView = bottle.singleton(GameView);
    this.gameView.size = new Size(viewWidth, viewHeight);
    this.gameView.init();

    this.stage.addChild(this.gameView);

    this.resizeView();

    this.resourceController = bottle.singleton(ResourceController);
    this.mainController = bottle.singleton(MainController);

    await this.mainController.main();
  }

  public getViewHeight(viewWidth) {
    if (this.renderer.width > this.renderer.height) {
      return 900;
    } else {
      return Math.floor(viewWidth * this.renderer.height / this.renderer.width);
    }
  }

  public resizeView(): void {
    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(this.renderer.width / this.gameView.size.width, this.renderer.height / this.gameView.size.height) / this.renderer.resolution;

      this.gameView.scale.x = scale;
      this.gameView.scale.y = scale;

      this.gameView.x = (this.renderer.width - this.gameView.size.width * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
      this.gameView.y = (this.renderer.height - this.gameView.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    } else {
      const scale = this.renderer.width / this.gameView.size.width / this.renderer.resolution;

      this.gameView.scale.x = scale;
      this.gameView.scale.y = scale;

      this.gameView.x = 0;
      this.gameView.y = (this.renderer.height - this.gameView.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    }
  }
}
