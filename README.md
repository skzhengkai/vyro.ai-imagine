# vyro.ai-imagine

### how-to-use:
1. copy the vyroai folder into your project

2. then, scroll down to `get-your-token` to obtain your vyro.ai token

3. after that, it's really really really easy to use. you can reference the function with the following:
```js
const { generateImage } = require('./vyroai/imagine.js');
```
and generate an image with 
```js
await generateImage("beautiful girl", "16:9", "ANIME_V2");
```

### get-your-token:
you'll need your **vyro.ai** token to use this. don't worry, afaik there are no limits on your token. 

to get your token,

1. navigate to https://imagine.art, and open developer tools. (`Ctrl + Shift + I` in most browsers)
2. go to the console, paste this handy dandy script, and press enter:
```js
const token = localStorage.getItem('token');
if (token) {
  const tempInput = document.createElement('input');
  tempInput.value = token;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  console.log('%cDone!', 'font-size: 50px; color: red;');
  console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px; color: red;');
  console.log(`%cDidn't work? Copy it manually: ${token}`, 'font-size: 13px; color: red;');
} else {
  console.log('%cToken not found in localStorage. Please login/signup, then try again.', 'font-size: 24px; color: red;');
}
```
3. rename `.env.example` to `.env`, and set the value to whatever was copied to your clipboard.

### todo: 
- remove the need to use bearer
- ~~make image generation return image data instead of directly downloading~~
- add interrogator (img2text)
- add variate (img2img)
- ~~add upscale (img2img)~~
- add remix (img & text 2 img)

## Credit
- vyro.ai for the api (duh)
