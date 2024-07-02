import * as PIXI from 'pixi.js';
import {Controller} from "../../framework/controller";
import game from '../../assets/data/game.json';
import illustrations from '../../assets/images/*.png';
import voices from '../../assets/voices/*.wav';
import {PageView} from "../view/game/page-view";
import bottle from "../../framework/bottle";
import {PageModel} from "../model/page-model";
import {ArticleModel} from "../model/article-model";
import {SentenceModel} from "../model/sentence-model";
import {VoiceResource} from "../storage/voice-resource";
import {BookModel} from "../model/book-model";
import {IllustrationResource} from "../storage/illustration-resource";

export class ResourceController extends Controller {
  private pageView: PageView = bottle.inject(PageView);
  private illustrationResource: any = bottle.inject(IllustrationResource);
  private voiceResource: VoiceResource = bottle.inject(VoiceResource);


  constructor() {
    super();
  }

  async load() {
    await this.loadVoices();
    await this.loadIllustrations();

    const book = new BookModel();

    console.log(game);

    for (let i = 0; i < game.book.pages.length; i++) {
      const page = new PageModel();
      page.illustration = this.illustrationResource.get(game.book.pages[i].illustration);

      const article = new ArticleModel();

      for (let j = 0; j < game.book.pages[i].article.sentences.length; j++) {
        const sentence = new SentenceModel();
        sentence.text = game.book.pages[i].article.sentences[j].text;
        sentence.voice = this.voiceResource.get(game.book.pages[i].article.sentences[j].voice);

        article.sentences.push(sentence);
      }

      page.article = article;

      book.pages.push(page);
    }

    this.pageView.setAssets(book.pages[0].article, book.pages[0].illustration)
  }

  async loadVoices() {
    for (let key in voices) {
      if (voices.hasOwnProperty(key)) {
        console.log(key + " -> " + voices[key]);

        // @ts-ignore
        const url = new URL(voices[key], import.meta.url);
        const audioElm = new Audio(url.href);
        audioElm.preload = "auto";

        await this.loadAudio(audioElm);

        this.voiceResource.set(key, audioElm);
      }
    }
  }

  async loadIllustrations() {
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

  loadAudio(audioElm: HTMLAudioElement) {
    return new Promise<void>((resolve) => {
      audioElm.oncanplaythrough = () => {
        resolve();
      };
      audioElm.onerror = () => {
        console.error('Error loading audio');
        resolve();
      };
      audioElm.preload = "auto";
      audioElm.load();
    });
  }
}
