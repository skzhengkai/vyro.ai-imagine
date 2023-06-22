const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const Style = require('./constants');

async function generateImage(prompt, ratio, style) {
  const selectedStyle = Style[style] || Style.V4_CREATIVE;

  const styleId = selectedStyle[0];
  const url = 'https://api.vyro.ai/v1/imagine/web/generations';

  const headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'bearer': process.env['BEARER'],
    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarygRMpGDqJx5Ok22c8',
    'prefer': 'safe',
    'premium': 'True',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'style-id': styleId.toString()
  };

  const referrer = 'https://www.imagine.art/';
  const referrerPolicy = 'strict-origin-when-cross-origin';

  const formData = new FormData();
  formData.append('model_version', '1');
  formData.append('num_images', '1');
  formData.append('cfg', '7.5');
  formData.append('steps', '30');
  formData.append('aspect_ratio', ratio);
  formData.append('prompt', prompt + (selectedStyle[3] || ''));
  formData.append('negative_prompt', '');
  formData.append('style_id', styleId.toString());

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...headers,
        ...formData.getHeaders()
      },
      referrer,
      referrerPolicy,
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    });

    return response.data;
  } catch (error) {
    console.error('Error downloading the image:', error);
    return;
  }
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
    console.error('An error occurred upscaling the image:', error);
    return null;
  }
}

async function interrogator(imageData) {
  try {
    const api = 'https://inferenceengine.vyro.ai';
    const version = '1';

    const formData = new FormData();
    formData.append('model_version', version);
    formData.append('image', imageData, { filename: 'prompt_generator_temp.png' });

    const response = await axios.post(`${api}/interrogator`, formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error('An error occurred while generating the prompt:', error);
    return null;
  }
}

module.exports = {
  generateImage,
  upscale,
  interrogator
};