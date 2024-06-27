import {Controller} from "../../framework/controller";
import book from '../../assets/data/book.json';
import images from '../../assets/images/*.png';
import voices from '../../assets/voices/*.wav';
import {PageView} from "../view/game/page-view";
import bottle from "../../framework/bottle";
import {PageModel} from "../model/page-model";
import {ArticleModel} from "../model/article-model";
import {SentenceModel} from "../model/sentence-model";
import {VoiceResource} from "../storage/voice-resource";

export class ResourceController extends Controller {
  private pageView: PageView = bottle.inject(PageView);
  private voiceResource: VoiceResource = bottle.inject(VoiceResource);


  constructor() {
    super();

    console.log(book);
    console.log(images);
    console.log(voices);
  }

  async load() {
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


    ///
    // this.pageView.test2();
    const page = new PageModel();

    const article = new ArticleModel();

    for (let i = 0; i < book.pages.length; i++) {
      for (let j = 0; j < book.pages[i].sentences.length; j++) {
        const sentence = new SentenceModel();
        sentence.text = book.pages[i].sentences[j].text;

        // TODO: check existed
        sentence.voice = this.voiceResource.get(book.pages[i].sentences[j].voice);
        article.sentences.push(sentence);
      }
    }

    page.article = article;

    this.pageView.test2(article);
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
