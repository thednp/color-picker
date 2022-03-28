import ObjectKeys from 'shorter-js/src/misc/ObjectKeys';

/**
 * Helps setting CSS variables to the color-menu.
 * @param {HTMLElement} element
 * @param {Record<string,any>} props
 */
export default function setCSSProperties(element, props) {
  ObjectKeys(props).forEach((prop) => {
    element.style.setProperty(prop, props[prop]);
  });
}
