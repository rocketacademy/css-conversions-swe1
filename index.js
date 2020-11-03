// Global variables
// ----------------------------------------------

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

// Convert rgb to hex and returns an object

// Program logic
// ------------------------------------------------
// Store the 3rd value entered in the terminal as a string
const hexCode = process.argv[2];
/* Note: need to use '<value>' for hexcode. Eg. use '#ffffff'
instead of #ffffff. This is because the '#' sign is used to tell
the shell that what follows is just a comment, not an argument.
Also, process.argv always returns a string array.
*/

// Convert hex code to rgb and store the r,g,b as keys and values in an object
const RGBObjectConvertedFromHexCode = convertHexToRgb(hexCode);

// Get the output message to display RGB that was converted from hex code
// eslint-disable-next-line max-len
const outputForRGBConvertedFromHexCode = getOutputForRGBConvertedFromHexCode(RGBObjectConvertedFromHexCode);

// Console.log to display the output message in the terminal
console.log(outputForRGBConvertedFromHexCode);
