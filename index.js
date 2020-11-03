//= =======HELPER FUNCTIONS============

// ---RGB TO HEX--------
function componentToHex(c) {
  const hex = Number(c).toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}
function convertRgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

// ---------HEX TO RGB------------
function convertHexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : null;
}

// ----CONVERT RGB TO HSL--------
function convertRgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b); const
    min = Math.min(r, g, b);
  let h; let s; const
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}
// -----------HSL TO RGB---------------
function converthslToRgb(x, y, z) {
  let r; let g; let b;
  const h = Number(x);
  const s = Number(y);
  const l = Number(z);

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//= =======MAIN CODE=============
// store the user's first input as a variable that
// will be later used to decide what conversions are needed
const conversionMode = process.argv[2].toString().toLowerCase();

// determine which are the relevant values needing to be converted (if user specifies more than 1)
const valuesToConvert = process.argv.splice(2);

// if the user inputs a hex value
if (conversionMode.includes('#') === true) {
  // convert hex to rgb
  valuesToConvert.forEach((element) => {
  // for each element in the array, parse it into  hexToRGB and save the return as 'output'
    const hexToRgb = convertHexToRgb(element);
    // use console to notify the user of the RGB value
    console.log(hexToRgb);

    // convert the RGB value to HSL
    const rgbToHsl = convertRgbToHsl(hexToRgb[0], hexToRgb[1], hexToRgb[2]);
    console.log(rgbToHsl);
  });
}

// if user inputs a rgb value
else if (conversionMode.includes('rgb') === true) {
  // convert RGB to hex
  valuesToConvert.forEach((element) => {
  // for each element in the array, remove 'rgb(' and ')' to get pure rgb numbers
  // store the result in a new variable
  // ( note to self: 'element' always refers back to the unmodified 'element')
    let tempValue = element.replace('rgb(', '');
    tempValue = tempValue.replace(')', '');

    // separate the rgb numbers by the commas between them, store ans in an array
    const rgbVal = tempValue.split(',');

    // parse each of the array's elements into the componentToHex function.
    // and inform user of the output via the console
    const rgbToHex = convertRgbToHex(rgbVal[0], rgbVal[1], rgbVal[2]);
    console.log(rgbToHex);

    // rgb to hsl

    const rgbToHsl = convertRgbToHsl(rgbVal[0], rgbVal[1], rgbVal[2]);
    console.log(`HSL(${rgbToHsl})`);
  });
}
// if user inputs a hsl value
if (conversionMode.includes('hsl') === true) {
  // convert hsl to RGB values
  valuesToConvert.forEach((element) => {
    // remove 'hsl(' and ')'
    let tempValue = element.replace('hsl(', '');
    tempValue = tempValue.replace(')', '');
    // split the 3 values using the commas between them
    const hslValues = tempValue.split(',');
    // output the conversion on the console
    const hslToRgb = converthslToRgb(hslValues[0], hslValues[1], hslValues[2]);
    console.log(`hsl to rgb is ${hslToRgb}`);
    console.log(`RGB(${hslToRgb})`);

    // convert hsl to hex (using the rgb value above)
    const rgbToHex = (convertRgbToHex(hslToRgb[0], hslToRgb[1], hslToRgb[2]));
    console.log(rgbToHex);
  });
}
