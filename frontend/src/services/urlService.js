import { nanoid } from 'nanoid';

const STORAGE_KEY = 'shortenUrls';

const getUrls = () => {
  const urls = localStorage.getItem(STORAGE_KEY);
  return urls ? JSON.parse(urls) : [];
};

const saveUrls = (urls) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
};

export const createShortUrl = ({ originalUrl, customShortcode, validityMinutes = 30 }) => {
  const urls = getUrls();
  const shortCode = customShortcode || nanoid(7);
  if (urls.some(url => url.shortCode === shortCode)) {
    throw new Error('This shortcode is already in use.');
  }
  
  const newUrl = {
    id: nanoid(),
    originalUrl,
    shortCode,
    shortUrl: `${window.location.origin}/${shortCode}`,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + validityMinutes * 60 * 1000).toISOString(),
    clicks: 0,
    clickDetails: [],
  };

  saveUrls([...urls, newUrl]);
  return newUrl;
};

export const getOriginalUrlAndRecordClick = (shortCode) => {
  const urls = getUrls();
  const urlIndex = urls.findIndex(url => url.shortCode === shortCode);

  if (urlIndex === -1) return null;

  urls[urlIndex].clicks += 1;
  urls[urlIndex].clickDetails.push({
    timestamp: new Date().toISOString(),
    source: document.referrer || 'Direct',
    geoLocation: 'N/A (Client-Side)',
  });
  
  saveUrls(urls);
  return urls[urlIndex].originalUrl;
};