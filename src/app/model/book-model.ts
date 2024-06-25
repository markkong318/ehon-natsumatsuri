import {PageModel} from "./page-model";
import {Model} from "../../framework/model";

export class BookModel extends Model {
    public pages: PageModel[];
}
