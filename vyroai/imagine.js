const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const Style = require('./constants');

async function generateImage(prompt, aspect_ratio, style) {
  const url = 'https://api.vyro.ai/v1/imagine/web/generations';
  const headers = {
    'bearer': process.env['BEARER'],
    'style-id': Style[style][0] || '30'
  };

  const data = new FormData();
  data.append('prompt', prompt);
  data.append('aspect_ratio', aspect_ratio || '9:16');

  // handle style params
  const styleData = Style[style];
  if (styleData) {
    const [styleId, asset, assetPath, suffix] = styleData;
    data.append('style_id', styleId);
    // you can append the other parameters associated with the style if needed
    // data.append('asset', asset);
    // data.append('asset_path', assetPath);
    // data.append('suffix', suffix);
    if (suffix) {
        prompt += suffix;
    }
  }

  console.log(`prompt: ${prompt}`);

  axios.post(url, data, { headers, responseType: 'arraybuffer' })
    .then(response => {
      // do something with response.data (in this case, downloading it)
      fs.writeFileSync('./output.png', Buffer.from(response.data, 'binary'));
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

module.exports = {
  generateImage
};