import ColorThief from 'colorthief';

const imageCache = new Map();

function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      return resolve(imageCache.get(src));
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; 

    img.onload = () => {
      imageCache.set(src, img); 
      resolve(img);
    };

    img.onerror = (err) => {
      console.warn(`Retrying image with cache buster: ${src}`);
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = 'anonymous';
      fallbackImg.onload = () => {
        imageCache.set(src, fallbackImg);
        resolve(fallbackImg);
      };
      fallbackImg.onerror = reject;
      fallbackImg.src = `${src}?_cb=${Date.now()}`;
    };

    img.src = src;
  });
}


function getAverageRGB(imgEl) {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
  return rgb;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const getImageAnalysis = async (src) => {
  try {
    if (!src) {
      throw new Error('No image source provided');
    }
    
    const img = await loadImage(src);
    const response = getAverageRGB(img);
    
    if (!response) {
      throw new Error('Failed to get average RGB');
    }
    
    return rgbToHex(response.r, response.g, response.b);
  } catch (error) {
    console.warn('Image analysis failed:', error);
    // Return a default color on error
    return '#1db954'; // Spotify green as fallback
  }
};

export const getImageAnalysis2 = async (src) => {
  try {
    if (!src) {
      throw new Error('No image source provided');
    }
    
    const img = await loadImage(src);
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(img);
    
    if (!dominantColor || dominantColor.length < 3) {
      throw new Error('Failed to extract color from image');
    }
    
    return rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
  } catch (error) {
    console.warn('Image analysis failed:', error);
    // Return a default color on error
    return '#1db954'; // Spotify green as fallback
  }
};
