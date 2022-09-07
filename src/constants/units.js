const defaultUnit = {
  name: 'ºC',
  value: 'metric',
  speed: 'm/s',
};

const units = Object.freeze([
  defaultUnit,
  {
    name: 'ºF',
    value: 'imperial',
    speed: 'mph',
  },
]);

export { units, defaultUnit };
