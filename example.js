const { generateImage } = require('./vyroai/imagine.js');

async function main() {
    // generating an image
    await generateImage("beautiful girl", "16:9", "ANIME_V2");
    
    // upscaling an image (input.png to output.png)
    const imageData = fs.readFileSync('input.png');
    const upscaledImageData = await upscale(imageData);
    fs.writeFileSync('output.png', upscaledImageData);
}

main();