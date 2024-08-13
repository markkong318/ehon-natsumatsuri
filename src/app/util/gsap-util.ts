import {gsap} from 'gsap';
import {Sprite} from 'pixi.js';
import {AudioUtil} from './audio-util';

export namespace GsapUtil {
  export function toWait(tl: gsap.core.Timeline, duration: number) {
    tl.add(function () {
    }, `+=${duration}`);
  }

  export function toVoice(tl: gsap.core.Timeline, voice: AudioBuffer, audioContext: AudioContext) {
    tl.to(null, {
      duration: voice.duration,
      onStart: function (voice: AudioBuffer, audioContext: AudioContext) {
        AudioUtil.playAudio(voice, audioContext);
      },
      onStartParams: [voice, audioContext],
    });
  }

  export function toTextVoice(tl: gsap.core.Timeline, sprite: Sprite, x: number, duration: number, voice: AudioBuffer, audioContext: AudioContext) {
    tl.to(sprite, {
      x,
      duration,
      onStart: async function (voice: AudioBuffer, audioContext: AudioContext) {
        AudioUtil.playAudio(voice, audioContext);
      },
      onStartParams: [this.voice, this.audioContext],
    });
  }
}
