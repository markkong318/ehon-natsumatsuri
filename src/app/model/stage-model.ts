import {Model} from '../../framework/model';

export class StageModel extends Model {
  events: any;
  enemies: any;
  decrease: number;

  constructor(obj: any) {
    super();
    Object.assign(this, obj)
  }
}
