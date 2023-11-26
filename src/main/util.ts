/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
const fs = require('fs');


export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}


export function encodeImageToBase64(imagePath:any) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Data = imageBuffer.toString('base64');
    return base64Data;
  } catch (error) {
    console.error('Error encoding image to base64:', error);
    return null;
  }
}
