// controlnet is a.k.a. remix (img+text2img)
const fs = require('fs');

const { controlnet } = require('./vyroai/imagine.js');
const { Style, Control } = require('./vyroai/constants');

async function main() {
  try {
    const imageData = fs.readFileSync('input.png');

    const prompt = 'turn the man into a cat';
    const style = Style.IMAGINE_V4_Beta;

    const result = await controlnet(imageData, prompt, null, 9.5, Control.SCRIBBLE, style, null);

    fs.writeFileSync('remix.png', result);

    console.log('image remix complete and saved as remix.png');
  } catch (error) {
    console.error('an error occurred remixing the image:', error);
  }
}

main();