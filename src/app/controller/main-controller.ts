import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {Controller} from '../../framework/controller';
import bottle from '../../framework/bottle';
import {MessageView} from '../view/game/battle/message-view';
import {EnemyGroupView} from '../view/game/battle/enemy-group-view';
import {QuizGroupView} from '../view/game/battle/quiz-group-view';
import {BattleTexture} from '../texture/battle-texture';
import {StageModel} from '../model/stage-model';

import stage1json from '../../assets/stages/stage1.json';
import stage2json from '../../assets/stages/stage2.json';
import stage3json from '../../assets/stages/stage3.json';
import stage4json from '../../assets/stages/stage4.json';
import stage5json from '../../assets/stages/stage5.json';
import configjson from '../../assets/config.json';
import {GameModel} from '../model/game-model';
import rocket from '../../framework/rocket';
import {EVENT_SEND_KEY} from '../env/event';
import {StateView} from '../view/game/battle/state-view';

export class MainController extends Controller {
  main() {
    // this.init();
    // this.loadStage(0);
    // this.play();
  }
}
