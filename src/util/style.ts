export const setCSS = (prop: string, data: string): void => {
  document.documentElement.style.setProperty(
    `--${prop.replace(/^--/, "")}`,
    data
  );
};

export const getCSS = (prop: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--${prop.replace(/^--/, "")}`
  );
};
