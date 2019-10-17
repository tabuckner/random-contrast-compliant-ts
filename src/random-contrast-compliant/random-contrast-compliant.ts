import { CONFIG_DEFAULTS } from '../constants/config-defaults';
import { LINEAR_CHANNEL_VALUES } from '../constants/linear-channel-values';
import { IRgbValue } from '../util/parse-color/models/rgb-value.interface';
import { parseColor } from '../util/parse-color/parse-color';
import { buildRgbString } from '../util/string-builder/string-builder';
import { randomValue } from '../util/random-value/random-value';
import { IParsedColorObjects } from 'models/parsed-color-objects.interface';

/**
 * Given a `backgroundColor`, optional `contrastRatioMinimum`, and optional `contrastRatioMaximum`
 *  returns a random `IParsedColor`.
 * @param backgroundColor A Valid CSS string for the background color.
 * @param contrastRatioMinimum A valid CSS string for the foreground color.
 * @param contrastRatioMaximum Maximum WCAG contrast ratio.
 */
export const getRandomContrastCompliant = (backgroundColor: string, contrastRatioMinimum = CONFIG_DEFAULTS.defaultContrastMinimum, contrastRatioMaximum = CONFIG_DEFAULTS.defaultContrastMaximum): IParsedColorObjects => {
  const backgroundRgbValue: IRgbValue = parseColor(backgroundColor).rgb;
  let randomRgbValue = getRandomIRgbValue()
  let randomRgbContrast = contrast(backgroundRgbValue, randomRgbValue)
  let isTooLow = randomRgbContrast < contrastRatioMinimum
  let isTooHigh = randomRgbContrast > contrastRatioMaximum
  let isInvalidContrast = isTooLow || isTooHigh;

  while (isInvalidContrast) {
    randomRgbValue = getRandomIRgbValue()
    randomRgbContrast = contrast(backgroundRgbValue, randomRgbValue)
    isTooLow = randomRgbContrast < contrastRatioMinimum
    isTooHigh = randomRgbContrast > contrastRatioMaximum
    isInvalidContrast = isTooLow || isTooHigh;
  }

  return parseColor(buildRgbString(randomRgbValue.red, randomRgbValue.green, randomRgbValue.blue));
}

/**
 * Given an `rgbValue`, returns its Luminance.
 * 
 * Read More: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param rgbValue an object matching `IRgbValue`
 */
const luminance = (rgbValue: IRgbValue): number => {
  const { red, green, blue } = rgbValue;
  if (!isValidRgbProperty(red) || !isValidRgbProperty(green) || !isValidRgbProperty(blue)) {
    throw new Error('Supplied `rgbValue`' + JSON.stringify(rgbValue) + ' parameter is invalid.')
  }

  const redLinearChannelValue = LINEAR_CHANNEL_VALUES[red + 1];
  const greenLinearChannelValue = LINEAR_CHANNEL_VALUES[green + 1];
  const blueLinearChannelValue = LINEAR_CHANNEL_VALUES[blue + 1];

  return (.2126 * redLinearChannelValue) + (.7152 * greenLinearChannelValue) + (.0722 * blueLinearChannelValue);
}

const isValidRgbProperty = (value: number): boolean => {
  return value >= 0 && value <= 255;
}

/**
 * Given a `background`, and `foreground` color, returns the relative contrast.
 * 
 * Read More: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param background a background color that matches `IRgbValue`
 * @param foreGround a foreground color that matches `IRgbValue`
 */
const contrast = (background: IRgbValue, foreground: IRgbValue) => {
  const backgroundLuminance = luminance(background) + .05
  const foregroundLuminance = luminance(foreground) + .05

  return Math.max(backgroundLuminance, foregroundLuminance) / Math.min(backgroundLuminance, foregroundLuminance);
}

const getRandomIRgbValue = (): IRgbValue => {
  return {
    red: randomValue(255),
    blue: randomValue(255),
    green: randomValue(255)
  }
}
