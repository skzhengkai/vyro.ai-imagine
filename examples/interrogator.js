const { interrogator } = require('../vyroai/imagine.js');

async function main() {
    try {
        const imageData = fs.readFileSync('output.png');

        const description = await interrogator(imageData);

        console.log(`description: ${description}`);
    } catch (error) {
        console.error('an error occurred running the interrogator:', error);
    }
}

main();