const hexCode = process.argv[2];
const convertHexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

console.log(convertHexToRGB(hexCode));

const inputString = process.argv[2];
const R = Number(inputString.slice(4, 7));
const G = Number(inputString.slice(8, 11));
const B = Number(inputString.slice(12, 15));

const convertRGBToHex = (r, g, b) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
console.log(convertRGBToHex(R, G, B));
