import { setCSS, getCSS } from "@/util/style";

export const getRandomBrightColor = (
  min: number = 40,
  max: number = 80
): string => {
  const minLuminance = 40; // Minimum luminance for good contrast
  const maxLuminance = 70; // Maximum luminance for good contrast
  const randomColor = () => Math.floor(Math.random() * 256);
  let hexColor: string | undefined;
  let luminance: number;
  do {
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    // Calculate luminance using the relative luminance formula (perceived brightness)
    luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminance >= minLuminance && luminance <= maxLuminance) {
      // Convert the RGB values to a hexadecimal string
      hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
        .toString(16)
        .slice(1)}`;
    }
  } while (!hexColor); // Repeat until a valid color is found
  return hexColor;
};

export const hexToGrayscale = (hex: string): string => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  const grayHex = grayValue.toString(16).padStart(2, "0");
  return `#${grayHex}${grayHex}${grayHex}`;
};

// Neat idea but generated colors don't have enough contrast and look ugly
export const shuffleColors = (shouldShuffle: boolean) => {
  if (!shouldShuffle) return null;
  // @ts-ignore - This is meant to be in lottie-preview.vue, removed for lack of usage
  colorList[props.name].shuffleColors.forEach((cssVar: string) => {
    const target = cssVar.replace(/\_/gm, "-");
    const last = getCSS(target);
    setCSS(target, last.replace(/\d{1,},/, `${getRandomInt(10, 255)},`));
  });
};

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
