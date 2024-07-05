import {View} from "../../../../framework/view";
import {MaskSprite} from "../../../sprite/mask-sprite";
import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {TextStyle} from "../../../style/text-style";

export class SentenceView extends View {

  private readonly text: string;
  private readonly voice: HTMLAudioElement;
  private textSprite: PIXI.Text;
  private maskSprite: PIXI.Sprite;

  constructor(text: string, voice: HTMLAudioElement) {
    super();

    this.text = text;
    this.voice = voice;
  }

  public init() {
    const style = new TextStyle().get()

    this.textSprite = new PIXI.Text(this.text, style);

    this.maskSprite = new MaskSprite().get();
    this.maskSprite.x = -MaskSprite.WIDTH;
    this.maskSprite.y = this.textSprite.y;

    this.textSprite.mask = this.maskSprite;

    this.addChild(this.maskSprite)
    this.addChild(this.textSprite);
  }

  play(timeline: gsap.core.Timeline) {
    console.log(this.textSprite.x + this.textSprite.width - MaskSprite.WIDTH + MaskSprite.GRADIENT_WIDTH);
    timeline.to(this.maskSprite, {
      x: this.textSprite.x + this.textSprite.width - MaskSprite.WIDTH + MaskSprite.GRADIENT_WIDTH,
      duration: this.voice.duration,
      onStart: async function (voice: HTMLAudioElement) {
        voice.currentTime = 0;
        await voice.play();
      },
      onStartParams: [this.voice],
    });
  }
}
