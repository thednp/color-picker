/**
 * Round colour components, for all formats except HEX.
 * @param {number} v one of the colour components
 * @returns {number} the rounded number
 */
export default function roundPart(v) {
  const floor = Math.floor(v);
  return v - floor < 0.5 ? floor : Math.round(v);
}
