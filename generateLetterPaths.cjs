const fs = require('fs');
const hershey = require('hersheytext');
 

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!:;'-()[]{}\"&@#$/\\=+*";
const fonts = vehicle = 'cursive'; // or 'cursive', 'ems', etc.
 
const out = {};
const font = hershey.getFontData('scriptc');


chars.split('').forEach((ch) => {
  const charData = font.getChar(ch);
  if (charData) out[ch] = {d: charData.d, width: charData.width};
});
 
fs.writeFileSync('src/fonts/font2_v2.ts',
  `export const font2 = ${JSON.stringify(out, null, 2)};`
);