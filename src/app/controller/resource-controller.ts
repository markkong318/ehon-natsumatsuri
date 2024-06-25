import {Controller} from "../../framework/controller";
import book from '../../assets/data/book.json';
import images from '../../../static/*.png';

export class ResourceController extends Controller {


  constructor() {
    super();

    console.log(book);
    console.log(images);
  }

}
