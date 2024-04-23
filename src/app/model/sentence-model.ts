import {Model} from "../../framework/model";
import {Sprite} from "pixi.js";

export class SentenceModel extends Model {
    public text: string;
    public voice: HTMLAudioElement;
}
