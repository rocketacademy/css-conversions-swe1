// -------------------------------------------------------
// CSS Conversion V1 (Base: hex-code --> RGB-code)
// -------------------------------------------------------
const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return (result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null);
}

let convertedHex = hexToRgb(process.argv[2]);
console.log(convertedHex);

// -------------------------------------------------------
// CSS Conversion V2 (Comfortable: RGB-code --> hex-cde )
// -------------------------------------------------------

const componentToHex = (c) => {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbhex = (rgbStr) => {
  let re = /\d+/g; 
  let rgbCode = rgbStr.match(re);

  let r = Number(rgbCode[0]);
  let g = Number(rgbCode[1]);
  let b = Number(rgbCode[2]);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

  let rgbString = process.argv[2]
  console.log(rgbhex(rgbString));


// -------------------------------------------------------
// CSS Conversion V3 (More Comfortable: colors --> HSL )
// -------------------------------------------------------
let nameToHSL = (colorName) => {
  let element = document.createElement('div');
  element.style.color = colorName;
  document.body.appendChild(element);

  // Get color in RGB
  let cs = window.getComputedStyle(element);
  let pv = cs.getPropertyValue('color');

  document.body.removeChild(element);

  let rgb = pv.substr(4).split(')')[0].split(','),
      r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0, 
      s = 0,
      l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = ((b - r) / delta) + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h}°, ${s}%, ${l}%)`
}

console.log(nameToHSL("blue"));
// console.log(nameToHSL(process.argv[2]));