// Hex to RBG conversion
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

// RGB to HEX
const componentToHex = (c) => {
  const hex = c.toString(16);
  console.log(hex);
  return hex.length === 1 ? `0${hex}` : hex;
};
const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

// determine what to convert
if (process.argv[2] === 'hexrgb') {
  console.log(hexToRgb(process.argv[3]));
} else if (process.argv[2] === 'rgbhex') {
  const removedRGB = process.argv[3].replace('rgb(', '');
  const numbersOnlyStr = removedRGB.replace(')', '');
  const numbersArr = numbersOnlyStr.split(',');
  for (let i = 0; i < 3; i++) {
    numbersArr[i] = Number(numbersArr[i]);
  }
  console.log(rgbToHex(numbersArr[0], numbersArr[1], numbersArr[2]));
}
