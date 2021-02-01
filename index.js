// Global variables
// ----------------------------------------------
// Store the color whose format is to be converted
const colorToBeConverted = process.argv[3];
/* Note: need to use '<value>' for hexcode. Eg. use '#ffffff'
instead of #ffffff. This is because the '#' sign is used to tell
the shell that what follows is just a comment, not an argument.
Also, process.argv always returns a string array.
*/
/* Note: need to use '<value' for rgb. Eg. use 'rgb(255,255,255)'. This is because
the '(' symbol is used to denote a subshell in bash.
*/

// Converion methods
const HEXRGB = 'hexrgb';
const RGBHEX = 'rgbhex';

// Store the conversion method (eg. rgbhex if we want to convert rgb to hex)
const conversionMethod = process.argv[2];

// an array where each index value is a r,g, or b value
let RGBArray;

// Output message to display the converted color format
let output;

// Helper functions
// ----------------------------------------------
// Convert hex to rgb and returns an object with r,g,b as keys.
function convertHexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// Get the output message to display RGB that was converted from hex code
function getOutputForRGBConvertedFromHexCode(object) {
  return `rgb(${object.r},${object.g},${object.b})`;
}

// Convert rgb(xxx,xxx,xxx) into an array where each index value is a r,g, or b value
// Eg [255,255,255]
function convertRGBStringToRGBArray() {
  let RGBvaluesAsString = colorToBeConverted.replace('rgb(', '');
  RGBvaluesAsString = RGBvaluesAsString.replace(')', '');
  RGBvaluesAsString = RGBvaluesAsString.replace(' ', '');
  RGBArray = RGBvaluesAsString.split(',');
}

// Convert rgb to hex code and returns hex code as a string
function convertRgbToHex(r, g, b) {
  // eslint-disable-next-line prefer-template
  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Convert the color format according to conversionMethod
function convertColorFormat() {
  // If conversionMethod is hexrgb then convert from hex to rgb
  // Else if conversionMethod is rgbhex then convert from rgb to hex
  if (conversionMethod === HEXRGB) {
    // Convert hex code to rgb and store the r,g,b as keys and values in an object
    const RGBObjectConvertedFromHexCode = convertHexToRgb(colorToBeConverted);

    // Get the output message to display RGB that was converted from hex code
    // eslint-disable-next-line max-len
    output = getOutputForRGBConvertedFromHexCode(RGBObjectConvertedFromHexCode);
  } else if (conversionMethod === RGBHEX) {
    // Convert rgb(xxx,xxx,xxx) into a RGB array where each index value is a r,g, or b value
    // Eg [255,255,255]
    convertRGBStringToRGBArray();

    // Convert the RGB array values from string to number
    const red = Number(RGBArray[0]);
    const green = Number(RGBArray[1]);
    const blue = Number(RGBArray[2]);

    // Convert rgb to hex code and get the output message to display the hex code
    output = convertRgbToHex(red, green, blue);
  }
}

// Program logic
// ------------------------------------------------
// Convert the color format according to conversionMethod and create the output message
convertColorFormat();

// Display the output message
console.log(output);
