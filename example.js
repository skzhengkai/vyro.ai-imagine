const { generateImage } = require('./vyroai/imagine.js');

async function main(){
    await generateImage("beautiful girl", "16:9", "ANIME_V2");
}

main();