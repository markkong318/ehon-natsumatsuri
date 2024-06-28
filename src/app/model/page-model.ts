import {Model} from "../../framework/model";
import {Sprite} from "pixi.js";
import {ArticleModel} from "./article-model";

export class PageModel extends Model {
  public article: ArticleModel;
  public illustrate: Sprite;
}
