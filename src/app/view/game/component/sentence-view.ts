import bottle from "../../../../framework/bottle";
import {View} from "../../../../framework/view";
import {BOTTLE_AUDIO_CONTEXT} from "../../../env/bottle";
import {BookModel} from "../../../model/book-model";
import {MaskSprite} from "../../../sprite/mask-sprite";
import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {TextStyle} from "../../../style/text-style";

export class SentenceView extends View {

  private bookModel: BookModel = bottle.inject(BookModel);
  private textStyle: TextStyle = bottle.inject(TextStyle);
  private readonly text: string;
  private readonly voice: AudioBuffer;
  private audioContext: AudioContext = bottle.inject(BOTTLE_AUDIO_CONTEXT);
  private textSprite: PIXI.Text;
  private maskSprite: PIXI.Sprite;

  constructor(text: string, voice: AudioBuffer) {
    super();

    this.text = text;
    this.voice = voice;
  }

  public init() {
    const style = this.textStyle.getWithColor(this.bookModel.fontColor);

    this.textSprite = new PIXI.Text(this.text, style);

    this.maskSprite = new MaskSprite().get();
    this.maskSprite.x = -MaskSprite.WIDTH;
    this.maskSprite.y = (this.textSprite.height - this.maskSprite.height) / 2;

    this.textSprite.mask = this.maskSprite;

    this.addChild(this.maskSprite)
    this.addChild(this.textSprite);
  }

  play(tl: gsap.core.Timeline) {
    console.log(this.textSprite.x + this.textSprite.width - MaskSprite.WIDTH + MaskSprite.GRADIENT_WIDTH);
    tl.to(this.maskSprite, {
      x: this.textSprite.x + this.textSprite.width - MaskSprite.WIDTH + MaskSprite.GRADIENT_WIDTH,
      duration: this.voice.duration,
      onStart: async function (voice: AudioBuffer, audioContext: AudioContext) {
        const source = audioContext.createBufferSource();
        source.buffer = voice;
        source.connect(audioContext.destination);
        source.start(0);
      },
      onStartParams: [this.voice, this.audioContext],
    });
  }
}
