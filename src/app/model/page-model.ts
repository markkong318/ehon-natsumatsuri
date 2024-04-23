import {Model} from "../../framework/model";
import {Sprite} from "pixi.js";
import {SentenceModel} from "./sentence-model";

export class PageModel extends Model {
    public sentences: SentenceModel[];
    public background: Sprite;
    public foreground: Sprite;
}
