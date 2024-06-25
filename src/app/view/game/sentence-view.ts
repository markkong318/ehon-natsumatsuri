import {View} from "../../../framework/view";
import {MaskSprite} from "../../sprite/mask-sprite";
import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {TextStyle} from "../../style/text-style";

export class SentenceView extends View {

  private readonly text: string;
  private readonly audio: string;

  private textSprite: PIXI.Text;
  private maskSprite: PIXI.Sprite;
  private audioElm: HTMLAudioElement;

  constructor(text: string, audio: string) {
    super();

    this.text = text;
    this.audio = audio;
  }

  public async init() {
    const style = new TextStyle().get()

    this.textSprite = new PIXI.Text(this.text, style);

    this.maskSprite = new MaskSprite().get();
    this.maskSprite.x = -MaskSprite.WIDTH;
    this.maskSprite.y = this.textSprite.y;

    this.textSprite.mask = this.maskSprite;

    this.addChild(this.maskSprite)
    this.addChild(this.textSprite);

    // @ts-ignore
    const url = new URL('../../../assets/voices/test.wav', import.meta.url);
    this.audioElm = new Audio(url.href);
    this.audioElm.preload = "auto";

    await this.loadAudio(this.audioElm);
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

  play(timeline: gsap.core.Timeline) {
    console.log(this.textSprite.x + this.textSprite.width - MaskSprite.WIDTH + MaskSprite.GRADIENT_WIDTH);
    timeline.to(this.maskSprite, {
      x: this.textSprite.x + this.textSprite.width - MaskSprite.WIDTH + MaskSprite.GRADIENT_WIDTH,
      duration: this.audioElm.duration,
      onStart: function (audioElm: HTMLAudioElement) {
        audioElm.play();
      },
      onStartParams: [this.audioElm],
    });
  }
}
