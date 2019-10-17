export interface ICmykColor {
  cyan: number,
  magenta: number,
  yellow: number,
  black: number,
}

export interface IHsvColor {
  hue: number,
  saturation: number,
  value: number,
}

export interface IHslColor {
  hue: number,
  saturation: number,
  lightness: number,
}

export interface IRgbColor {
  red: number,
  green: number,
  blue: number,
}

export interface IParsedColorObjects {
  rgb: IRgbColor,
  hsl: IHslColor,
  hsv: IHsvColor,
  cmyk: ICmykColor,
  keyword: string,
  hex: string,
  rgba: IRgbaColor,
  hsla: IHslaColor,
  hsva: IHsvaColor,
  cmyka: ICmykaColor,
}

export interface ColorWithAlphaChannel {
  alpha: number;
}

export interface IRgbaColor extends ColorWithAlphaChannel, IRgbColor { }

export interface IHslaColor extends ColorWithAlphaChannel, IHslColor { }

export interface IHsvaColor extends ColorWithAlphaChannel, IHsvColor { }

export interface ICmykaColor extends ColorWithAlphaChannel, ICmykColor { }
