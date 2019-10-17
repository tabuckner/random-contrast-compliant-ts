import * as _parseColor from 'parse-color';
import { IParsedColor } from './models/parsed-color.interface';
import { IParsedColorObjects , IRgbColor, IHslColor, IHsvColor, ICmykColor, IRgbaColor, IHslaColor, IHsvaColor, ICmykaColor } from 'models/parsed-color-objects.interface';

export const parseColor = (cssString: string): IParsedColorObjects => {
  const _parsedColor: IParsedColor = _parseColor.default(cssString);
  const rgbObj = mapArrayToObject<IRgbColor>(_parsedColor.rgb, ['red', 'green', 'blue']);
  const hslObj = mapArrayToObject<IHslColor>(_parsedColor.hsl, ['hue', 'saturation', 'lightness']);
  const hsvObj = mapArrayToObject<IHsvColor>(_parsedColor.hsv, ['hue', 'saturation', 'value']);
  const cmykObj = mapArrayToObject<ICmykColor>(_parsedColor.cmyk, ['cyan', 'magenta', 'yellow', 'black']);
  const { keyword, hex } = _parsedColor;
  const rgbaObj = mapArrayToObject<IRgbaColor>(_parsedColor.rgba, ['red', 'green', 'blue', 'alpha']);
  const hslaObj = mapArrayToObject<IHslaColor>(_parsedColor.hsla, ['hue', 'saturation', 'lightness', 'alpha']);
  const hsvaObj = mapArrayToObject<IHsvaColor>(_parsedColor.hsva, ['hue', 'saturation', 'value', 'alpha']);
  const cmykaObj = mapArrayToObject<ICmykaColor>(_parsedColor.cmyka, ['cyan', 'magenta', 'yellow', 'black', 'alpha']);

  const returnObj = {
    rgb: rgbObj,
    hsl: hslObj,
    hsv: hsvObj,
    cmyk: cmykObj,
    keyword,
    hex,
    rgba: rgbaObj,
    hsla: hslaObj,
    hsva: hsvaObj,
    cmyka: cmykaObj
  };

  return returnObj;
}

const mapArrayToObject = <T>(orderedArr: any[], orderedObjectKeysArr: string[] | number[]): T => {
  const returnObj: any = {};
  for (const key of orderedObjectKeysArr) {
    returnObj[key] = undefined;
  }

  for (let i = 0; i < orderedArr.length; i++) {
    const sourceElement: any = orderedArr[i];
    const correspondingKey: any = orderedObjectKeysArr[i];
    returnObj[correspondingKey] = sourceElement;
  }

  return returnObj;
}
