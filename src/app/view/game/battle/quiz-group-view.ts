import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../../framework/view';
import {GridLayout} from '../layout/grid-layout';

export class QuizGroupView extends View {
  private quizTexts: View[] = [];

  private firstTexts: PIXI.Text[] = [];
  private otherTexts: PIXI.Text[] = [];

  private layout: GridLayout;

  constructor() {
    super();
  }

  public initUI() {
    this.layout = new GridLayout(this, 1, 3, 5, {noResize: true});

    for (let i = 0; i < 3; i++) {
      const view = new View();
      view.alpha = 0;

      const firstText = new PIXI.Text("あ");
      firstText.x = 0;
      firstText.y = 0;
      firstText.style.fontFamily = 'jackeyfont';
      firstText.style.fontSize = '32px';
      firstText.style.fill = ['#ffffff'];
      firstText.tint = 0xff0000;

      view.addChild(firstText);

      const otherText = new PIXI.Text("あああああ");
      otherText.x = firstText.width;
      otherText.y = 0;
      otherText.style.fontFamily = 'jackeyfont';
      otherText.style.fontSize = '32px';
      otherText.style.fill = ['#ffffff']

      view.addChild(otherText);

      this.layout.put(view, 0, i);

      this.quizTexts.push(view);
      this.firstTexts.push(firstText);
      this.otherTexts.push(otherText);
    }
  }

  setQuiz(id: number, text: string) {
    this.firstTexts[id].text = text.charAt(0);
    this.otherTexts[id].text = text.substring(1);

    this.layout.update(this.quizTexts[id], 0, id);
  }

  playShow(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();

    for (let i = 0; i < ids.length; i++) {
      const text = this.quizTexts[ids[i]];
      timeline.to(text, {
        pixi: {
          duration: 0.5,
          alpha: 1,
        },
      }, '<')
    }

    return timeline;
  }

  playHide(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();

    for (let i = 0; i < ids.length; i++) {
      const text = this.quizTexts[ids[i]];
      timeline.to(text, {
        pixi: {
          duration: 0.5,
          alpha: 0,
        },
      }, '<')
    }

    return timeline;
  }
}
