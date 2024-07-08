import * as PIXI from "pixi.js";

export class TextStyle {
  public get(): PIXI.TextStyle {
    return new PIXI.TextStyle({
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowAngle: 0,
      dropShadowBlur: 10,
      dropShadowDistance: 0,
      fill: [
        "#ffffff",
      ],
      fillGradientType: 1,
      fillGradientStops: [
        0
      ],
      lineJoin: 'round',
      miterLimit: 6,
      padding: 10,
      strokeThickness: 4,

      fontFamily: 'corporate-mincho',
    });
  }
}
