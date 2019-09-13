const colorHelper = {
  getHexFromEmotion: (value) => {
    const randomFactor = 25;
    const rValue = Math.max(Math.min(Math.round(255 * value + (Math.random(-0.5))*randomFactor), 255), 0);
    const gValue = Math.max(Math.min(Math.round((255 * (1 - Math.abs(value - 0.5)*2) + (Math.random()-0.5)*randomFactor )), 255), 0);
    const bValue = Math.max(Math.min(Math.round((255 * (1 - value) + (Math.random()-0.5)*randomFactor)), 255), 0);
    return rValue.toString(16).padStart(2, "0") + gValue.toString(16).padStart(2, "0") + bValue.toString(16).padStart(2, "0");
  },
  getRandomHex: (hex, range) => {
    const rValue = parseInt(hex.slice(0, 2), 16)
    const gValue = parseInt(hex.slice(2, 4), 16);
    const bValue = parseInt(hex.slice(4, 6), 16);
    const randomizedRValue = Math.min(Math.max(rValue + Math.round((Math.random() - 0.5) * range), 0), 255);
    const randomizedGValue = Math.min(Math.max(gValue + Math.round((Math.random() - 0.5) * range), 0), 255);
    const randomizedBValue = Math.min(Math.max(bValue + Math.round((Math.random() - 0.5) * range, 0)), 255);
    return randomizedRValue.toString(16).padStart(2, "0") + randomizedGValue.toString(16).padStart(2, "0") + randomizedBValue.toString(16).padStart(2, "0");
  }
}


export default colorHelper;

