import htm from "htm";
import { Component, render } from "./render";
import { createCSSSelector, createHTMLElement } from "utils";

export type Props<T = unknown> = {
  [K in keyof T]: T[K];
};

export type Params<T = unknown> = {
  target: HTMLElement;
  props: Props<T>;
  name: string;
  selector: string;
  element: HTMLElement;
};

export type Template = (params: Params) => HTMLElement;

const createElement = (type: unknown, props: Props, ...children: unknown[]): Template => {
  return (params: Params): HTMLElement => {
    const { element } = params;

    if (typeof type === "string") {
      const typeElement = createHTMLElement(type);
      for (const child of children) {
        if (typeof child === "string") {
          typeElement.insertAdjacentText("beforeend", child);
          element.insertAdjacentElement("beforeend", typeElement);
        }

        if (typeof child === "function") {
          const target = typeElement;
          const options = { target, props };
          render(child as Component, options);
        }
      }
    }

    if (typeof type === "function") {
      console.log("=============");
      const factoryName = type?.name as string;
      const selector = createCSSSelector(factoryName);
      const target = createHTMLElement(selector);
      const options = { target, props };

      console.log(target);
    }

    return element;
  };
};

export const html = htm.bind<Template>(createElement);
