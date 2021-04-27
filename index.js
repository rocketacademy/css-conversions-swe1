/* ======== USER INPUT =======*/
const userInput = process.argv.slice(2).toString();
let output;

/* ======== FUNCTIONS =======*/

/**
 * coverts hex to rgb
 * @param {String} hex -> a hex string '#ffffff'
 */
const HEXtoRGB = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const [r, g, b] = [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
  return [r, g, b];
};

// converts ['rgb(255,255,255)'] into an array of numbers [255,255,255]
const strToNumArr = (str) => {
  // const convertToString = userInput.toString(); // rgb(255,255,255)
  const rgbArr = str
    .slice(str.indexOf('(') + 1, str.indexOf(')')) // 255,255,255
    .split(','); // [255,255,255]
  // convert to number
  const rgbNumArr = rgbArr.map((e) => Number(e));
  return rgbNumArr;
};

/**
 * coverts a number to a hexadecimal
 * @param {Number} num -> a hex string '#ffffff'
 */
const componentToHex = (num) => {
  let hexVal = num.toString(16);
  if (hexVal.length === 1) {
    return (hexVal += '0');
  } else {
    return hexVal;
  }
};

/**
 * coverts  rgb  to  hex
 * @param {Number,Number,Number} rgb
 */
const RGBtoHEX = (r, g, b) =>
  componentToHex(r) + componentToHex(g) + componentToHex(b);

/**
 * coverts  rgb  to  hsl
 * @param {Number,Number,Number} rgb
 */
const RGBToHSL = (r, g, b) => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};

/* ======== INIT =======*/

if (userInput.includes('rgb')) {
  // get rgb values as numbers
  const [r, g, b] = strToNumArr(userInput);
  // do rgb to hex conversion
  output = `HEX: #${RGBtoHEX(r, g, b)} \nHSL:${RGBToHSL(r, g, b)}`;
} else if (userInput.includes('#')) {
  // get rgb values as numbers
  const [r, g, b] = HEXtoRGB(userInput);
  // do hex to rgb conversion
  output = `RGB:rgb(${r},${g},${b}) \nHSL:${RGBToHSL(r, g, b)}`;
}

console.log(output);

// Test code to run in terminal
/* 
node index.js 'rgb(255,255,255)'
node index.js '#ffffff'
*/
