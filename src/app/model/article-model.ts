import {SentenceModel} from "./sentence-model";
import {Model} from "../../framework/model";

export class ArticleModel extends Model {
  public sentences: SentenceModel[];
}
