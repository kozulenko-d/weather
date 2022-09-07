const quantityCitiesShown = 5;

const citiesMap = Object.freeze([
  {
    id: 2673730,
    name: 'Stockholm',
    coord: {
      'lon': '18.064899',
      'lat': '59.332581',
    },
    selected: true,
  },
  {
    id: 2711537,
    name: 'Göteborg',
    coord: {
      lat: '57.707161',
      lon: '11.96679',
    },
    selected: true,
  },{
    id: 2692969,
    name: 'Malmö',
    coord: {
      lat: '55.605869',
      lon: '13.00073',
    },
    selected: true,
  },
  {
    id: 2666199,
    name: 'Uppsala',
    coord: {
      lat: '59.858501',
      lon: '17.64543',
    },
    selected: true,
  },
  {
    id: 2694762,
    name: 'Linköping',
    coord: {
      lat: '58.410858',
      lon: '15.62157',
    },
    selected: true,
  },
{
    id: 2686657,
    name: 'Örebro',
    coord: {
      lat: '59.27412',
      lon: '15.2066',
    },
  selected: false,
  },
  {
    id: 2664454,
    name: 'Västerås',
    coord: {
      lat: '59.616169',
      lon: '16.552759',
    },
    selected: false,
  },
  {
    id: 2706767,
    name: 'Helsingborg',
    coord: {
      lat: '56.04673',
      lon: '12.69437',
    },
    selected: false,
  },
  {
    id: 2688368,
    name: 'Norrköping',
    coord: {
      lat: '58.594189',
      lon: '16.1826',
    },
    selected: false,
  },
  {
    id: 2702979,
    name: 'Jönköping',
    coord: {
      lat: '57.781448',
      lon: '14.15618',
    },
    selected: false,
  },
]);

export {
  citiesMap,
  quantityCitiesShown
};
