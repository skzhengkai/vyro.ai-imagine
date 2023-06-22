const fs = require('fs');

const { upscale } = require('../vyroai/imagine.js');

async function main() {
    try {
        const imageData = fs.readFileSync('input.png');
        fs.writeFileSync('./output.png', Buffer.from(imageData, 'binary'));
        console.log('image upscaled and saved as output.png');
    } catch (error) {
        console.error('an error occurred upscaling the image:', error);
    }
}

main();