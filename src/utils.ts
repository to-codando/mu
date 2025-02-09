export const createHTMLElement = (selector: string): HTMLElement => {
  return document.createElement(selector);
};
export const createCSSSelector = (value: string) => {
  return value.replace(/([a-z0-9])?([A-Z])/g, (_, prev, curr) => {
    return (prev ? `${prev}-` : "") + curr.toLowerCase();
  });
};
