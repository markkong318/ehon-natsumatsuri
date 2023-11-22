import {Model} from '../../framework/model';

export class GameModel extends Model {
  public quizs: string[] = [];
  public enemyIds: string[] = [];

  public startEvent: any = {};
  public timeoutEvent: any = {};
  public killEvent: any = {};
  public failEvent: any = {};
  public successEvent: any = {};

  public time: number = 0;
  public maxTime: number = 0;
  public life: number = 0;

  public decrease: number = 0;

  public stageId: number = 0;
  public maxStageId: number = 0;

  constructor() {
    super();
  }
}
