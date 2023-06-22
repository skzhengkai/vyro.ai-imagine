const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const Style = require('./constants');

async function generateImage(prompt, aspect_ratio, style) {
  const url = 'https://api.vyro.ai/v1/imagine/web/generations';
  const headers = {
    'bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MDE5ZWIwMi0xOGFmLTQ3OGMtODg3OS03NzA4YzhlMGQxM2IiLCJpYXQiOjE2ODczODU5NTksImV4cCI6MTY4NzQ3MjM1OX0.1DM9iRSBz1Zy_gqVyvxK9Ra7--tRzmFkOu-4Uoxvs30',
    'style-id': Style[style][0] || '30'
  };

  const data = new FormData();
  data.append('prompt', prompt);
  data.append('aspect_ratio', aspect_ratio || '9:16');
  data.append('upscale', '1');

  // Handle the style parameters
  const styleData = Style[style];
  if (styleData) {
    const [styleId, asset, assetPath, suffix] = styleData;
    data.append('style_id', styleId);
    // You can append the other parameters associated with the style if needed
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
      fs.writeFileSync('./output.png', Buffer.from(response.data, 'binary'));
      console.log('Image saved as output.png');
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

async function upscale(imageData) {
  try {
    const api = 'https://inferenceengine.vyro.ai';
    const version = '1';

    const formData = new FormData();
    formData.append('model_version', version);
    formData.append('image', imageData, { filename: 'input.png' });

    const response = await axios.post(`${api}/upscale`, formData, {
      headers: formData.getHeaders(),
      responseType: 'arraybuffer',
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}

module.exports = {
  generateImage,
  upscale
};