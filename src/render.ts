import type { Template, Params } from "createComponent";
import { createCSSSelector, createHTMLElement } from "utils";

type RenderOptions = {
  target?: HTMLElement;
  props?: Record<string, unknown>;
};

export type Component = (params: Params) => Template;

export const render = (factory: Component, options?: RenderOptions) => {
  const props = options?.props || {};
  const target = options?.target || (document.querySelector("body") as HTMLElement);
  if (!factory.name) return;
  const name = factory.name;
  const selector = createCSSSelector(name);
  const element = createHTMLElement(selector);
  const params = { props, target, name, selector, element };
  const view = factory(params);

  if (!Array.isArray(view)) {
    view(params);
    target.insertAdjacentElement("beforeend", element);
    return;
  }

  for (const component of view) {
    console.log(component(params));
  }
};
