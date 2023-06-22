const fs = require('fs');

const { generateImage } = require('../vyroai/imagine.js');

async function main() {
    try {
        const imageData = await generateImage(prompt, aspect_ratio, style);
        if (imageData) {
            fs.writeFileSync('./output.png', Buffer.from(imageData, 'binary'));
            console.log('image generated and saved as output.png');
        } else {
            console.log('failed to generate the image.');
        }
    } catch (error) {
        console.error('an error occurred generating the image:', error);
    }
}

main();