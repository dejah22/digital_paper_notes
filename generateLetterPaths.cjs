const fs = require('fs');
const hershey = require('hersheytext');
 
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!:;'-()[]{}\"&@#$/\\=+*";
const fonts = vehicle = 'cursive'; // or 'cursive', 'ems', etc.
 
const out = {};
const font = hershey.getFontData('cursive');
 
chars.split('').forEach((ch) => {
  const charData = font.getChar(ch);
  if (charData) out[ch] = charData.d;
});
 
fs.writeFileSync('src/letterPathsGenerated.ts',
  `export const letterPaths = ${JSON.stringify(out, null, 2)};`
);