import * as PIXI from 'pixi.js';
import game from '../../assets/data/game.json';
import illustrations from '../../assets/images/*.png';
import voices from '../../assets/voices/*.wav';
import bottle from "../../framework/bottle";
import {Controller} from "../../framework/controller";
import {ArticleModel} from "../model/article-model";
import {BookModel} from "../model/book-model";
import {PageModel} from "../model/page-model";
import {SentenceModel} from "../model/sentence-model";
import {IllustrationResource} from "../storage/illustration-resource";
import {VoiceResource} from "../storage/voice-resource";
import {loadAudio} from "../util/audio";
import {PageView} from "../view/game/page-view";

export class ResourceController extends Controller {
  private pageView: PageView = bottle.inject(PageView);
  private illustrationResource: any = bottle.inject(IllustrationResource);
  private voiceResource: VoiceResource = bottle.inject(VoiceResource);

  private bookModel: BookModel;

  constructor() {
    super();
  }

  async load() {
    await this.loadVoices();
    await this.loadIllustrations();

    this.initBook();
  }

  private async loadVoices() {
    for (let key in voices) {
      if (voices.hasOwnProperty(key)) {
        console.log(key + " -> " + voices[key]);

        // @ts-ignore
        const url = new URL(voices[key], import.meta.url);
        const audioElm = new Audio(url.href);
        audioElm.preload = "auto";

        await loadAudio(audioElm);

        this.voiceResource.set(key, audioElm);
      }
    }
  }

  private async loadIllustrations() {
    for (let key in illustrations) {
      if (illustrations.hasOwnProperty(key)) {
        console.log(key + " -> " + illustrations[key]);

        // @ts-ignore
        const url = new URL(illustrations[key], import.meta.url);
        const sprite = PIXI.Sprite.from(url.href);

        this.illustrationResource.set(key, sprite);
      }
    }
  }

  private initBook() {
    this.bookModel = new BookModel();

    for (let i = 0; i < game.book.pages.length; i++) {
      const pageModel = new PageModel();
      pageModel.illustration = this.illustrationResource.get(game.book.pages[i].illustration);

      const articleModel = new ArticleModel();

      for (let j = 0; j < game.book.pages[i].article.sentences.length; j++) {
        const sentenceModel = new SentenceModel();
        sentenceModel.text = game.book.pages[i].article.sentences[j].text;
        sentenceModel.voice = this.voiceResource.get(game.book.pages[i].article.sentences[j].voice);

        articleModel.sentences.push(sentenceModel);
      }

      pageModel.article = articleModel;

      this.bookModel.pages.push(pageModel);
    }

    bottle.setObject(this.bookModel);
  }
}
