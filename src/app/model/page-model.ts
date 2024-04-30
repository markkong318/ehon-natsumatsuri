import {Model} from "../../framework/model";
import {Sprite} from "pixi.js";
import {SentenceModel} from "./sentence-model";

export class PageModel extends Model {
  public sentences: SentenceModel[];
  public images: Sprite[];
}
