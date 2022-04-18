export default function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.round(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.round(Math.random() * (max - min) + min);
}