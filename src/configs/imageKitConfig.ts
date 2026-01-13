import ImageKit from 'imagekit';
// var ImageKit = require('imagekit');

const PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;

if (!PUBLIC_KEY || !PRIVATE_KEY || !URL_ENDPOINT) {
  throw new Error('ImageKit configuration variables are missing');
}

const imagekit = new ImageKit({
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
  urlEndpoint: URL_ENDPOINT,
});

export default imagekit;
