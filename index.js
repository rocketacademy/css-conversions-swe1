console.log('hello world');

function componentToHex(c) {
  // Converting the input string value to number and change the base value to hex
  var hex = Number(c).toString(16);
  const val = (( hex.length == 1 ) ? "0" + hex : hex);
  return val;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


// Functio to calculate HSL from RGB values
function rgbToHSL(r, g, b)
{
  const primeR = r / 255;
  const primeG = g / 255;
  const primeB = b / 255;
  const chromeMax = Math.max(primeR, primeG, primeB);
  const chromeMin = Math.min(primeR, primeG, primeB);
  const chromeDiff = chromeMax - chromeMin;

  let hue = 0, saturation = 0, lightness = 0;
  // Calculate HSL
  lightness = (chromeMax + chromeMin) / 2;
  if(chromeDiff !== 0)
  {
    // Taken from: https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
    saturation = chromeDiff / ((1- Math.abs((2 * lightness) - 1 )));
    switch(chromeMax)
    {
      case primeR: {
        var segment = (primeG - primeB) / chromeDiff;
        var shift   = 0 / 60;       // R° / (360° / hex sides)
        if (segment < 0) {          // hue > 180, full rotation
          shift = 360 / 60;         // R° / (360° / hex sides)
        }
        hue = segment + shift;
        break;
      }
      case primeG:{
        var segment = (primeB - primeR) / chromeDiff;
        var shift   = 120 / 60;     // G° / (360° / hex sides)
        hue = segment + shift;
        break;
      }
      case primeB:{
        var segment = (primeR - primeG) / chromeDiff;
        var shift   = 240 / 60;     // B° / (360° / hex sides)
        hue = segment + shift;
        break;
      }
      default:
        break;
    }
    hue = hue * 60;
  }
  saturation *= 100;
  lightness *= 100;
  return ({H: hue, S: saturation, L: lightness });
}

const hslToRGB = (h, s, l) => {

  // https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
  const chroma = ( 1- Math.abs((2 * l) - 1)) * s;
  const hue = h / 60;
  const intermediateValX = chroma * ( 1- Math.abs((hue % 2) - 1));
  let r = 0, g = 0, b = 0;
  if(0 <= hue && hue <= 1)
  {
    r = chroma;
    g = intermediateValX;
    b = 0;
  }
  else if(1 <= hue && hue <= 2) {
    r =intermediateValX;
    g = chroma;
    b = 0;
  }
  else if(2 <= hue && hue <= 3){
    r = 0;
    g = chroma;
    b = intermediateValX;
  }
  else if(3 <= hue && hue <= 4){
    r = 0;
    g = intermediateValX;
    b = chroma;
  }
  else if(4 <= hue && hue <= 5){
    r =intermediateValX;
    g = 0;
    b = chroma;
  }
  else if(5 <= hue && hue <= 6){
    r =chroma;
    g = 0;
    b = intermediateValX;
  }
  else{}

  const match = l - (chroma / 2);
  r = ( r + match) * 255;
  g = ( g + match) * 255;
  b = ( b + match) * 255;
  return ({R:r, G:g, B:b});
}

const hslToRGBCombined = (inputVal) => {
  const hslVal = getHSLValuesFromInput( inputVal);
    console.log(hslVal);
    // Verify the values
    if((0 > hslVal.h || 360 < hslVal.h)
    || (0 > hslVal.s || 1 < hslVal.s)
    || (0 > hslVal.l || 1 < hslVal.l))
    {
      console.log('Expected values of HSL are: hue H ∈ [0°, 360°], saturation SL ∈ [0, 1], and lightness L ∈ [0, 1]');
      return({R:0, G:0, B:0});
    }
    else
    {
      const rgb = hslToRGB(hslVal.h, hslVal.s, hslVal.l);
      console.log(`HSL to RGB: rgb(${rgb.R},${rgb.G},${rgb.B})`);
      return rgb;
    }
}

// Function to separate rgb values from the string format 'rgb(255,255,255)'.
const getRGBValues = (rgbString) => {
  // Removing "rgb(" and ")" from the string "rgb(v1, v2, v3)"
  let tempVal = rgbString.replace('rgb(', '');
  tempVal = tempVal.replace(')','');
  console.log(tempVal);
  const rgbVal = tempVal.split(',');
  return({r:rgbVal[0], g:rgbVal[1], b:rgbVal[2]});
}

const getHSLValuesFromInput = (hslString) => {
  let tempVal = hslString.replace('hsl(', '');
  tempVal = tempVal.replace(')','');
  console.log(tempVal);
  const hslVal = tempVal.split(',');
  return({h:hslVal[0], s:hslVal[1], l:hslVal[2]});
}

const doSpecifiedConversion = (conversionType, inputVal) => {

  console.log(inputVal);
  if(inputVal === undefined)
  {
    return false;
  }

  if( conversionType === 'rgbhex')
  {
    const rgbVal = getRGBValues(inputVal);
    console.log(rgbVal);
    console.log(`RGB to Hex: ${rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b)}`);
  }
  else if( conversionType === 'hexrgb')
  {
    console.log(`Hex to RGB: ${hexToRgb(inputVal)}`);
  }
  else if(conversionType === 'rgbhsl')
  {
    const rgbVal = getRGBValues(inputVal);
    console.log(rgbVal);
    const hsl = rgbToHSL(rgbVal.r, rgbVal.g, rgbVal.b)
    console.log(`RGB to HSL: ${hsl.H}, ${hsl.S}%, ${hsl.L}%`);
  }
  else if( conversionType === 'hslrgb')
  {
    hslToRGB(inputVal);
  }
  else
  {
    return false;
  }
  return true;
}

//  Get the arguments after the default process arguments
// Gets the conversion
const conversionType = process.argv[2].toLowerCase();
console.log(`argv[2]: ${conversionType}`);

// The remaining input will be the values to be converted
  let inputVal = process.argv[3];
  
if(!doSpecifiedConversion(conversionType, inputVal))
{
  console.log('No conversion type given.')
  inputVal = conversionType;
  // Identify the input format specified.
  // Is it RGB
  let pos = conversionType.indexOf("rgb(");
  if(pos === -1)
  {
    pos = conversionType.indexOf('hsl(');
    if( pos === -1)
    {
      pos = conversionType.indexOf('#');
      if( pos === -1)
      {
        console.log('Invalid input.');
      }
      else
      {
        console.log('Hex value is detected');
        const rgb = hexToRgb(inputVal);
        console.log(`Hex to RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
        console.log(`RGB to HSL: ${hsl.H}, ${hsl.S}%, ${hsl.L}%`);
      }
    }
    else
    {
      console.log('hsl value is detected.');
      const rgb = hslToRGBCombined(inputVal);
      rgbToHex(rgb.R,rgb.G,rgb.B);
    }

  }
  else
  {
    console.log('rgb value is detected.');
    doSpecifiedConversion('rgbhex', inputVal);
    doSpecifiedConversion('rgbhsl', inputVal);
  }
}