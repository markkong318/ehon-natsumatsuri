import {CoverModel} from "./cover-model";
import {PageModel} from "./page-model";
import {Model} from "../../framework/model";

export class BookModel extends Model {
    public cover: CoverModel;
    public pages: PageModel[] = [];
}
