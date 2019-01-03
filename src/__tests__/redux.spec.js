import createStore from '../redux';

it('Should contain an empty array on initial state', () => {
  const expectedState = { parkingLots: [] };
  const store = createStore();

  const actualState = store.getState();

  expect(actualState).toEqual(expectedState);
});

it('Should normalize given data into a single array of parkingLots', () => {
  const data = [
    {
      id: 1,
      areaName: 'S & T Building',
      parkingLots: [
        {
          id: 60,
          name: 'D1',
          status: 1
        },
        {
          id: 61,
          name: 'D2',
          status: 0
        }
      ]
    }
  ];
  const expectedState = {
    parkingLots: [
      { id: 60, name: 'D1', status: 1, areaName: 'S & T Building', areaId: 1 },
      { id: 61, name: 'D2', status: 0, areaName: 'S & T Building', areaId: 1 }
    ]
  };
  const store = createStore();

  store.dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: data });
  const actualState = store.getState();

  expect(actualState).toEqual(expectedState);
});

it('Should be able to update a parkingLot', () => {
  const parkingAreas = [
    {
      id: 1,
      areaName: 'S & T Building',
      parkingLots: [
        {
          id: 60,
          name: 'D1',
          status: 1
        },
        {
          id: 61,
          name: 'D2',
          status: 0
        }
      ]
    }
  ];
  const expected = {
    parkingLots: [
      {
        id: 60,
        name: 'D1',
        status: 1,
        areaId: 1,
        areaName: 'S & T Building'
      },
      {
        id: 61,
        name: 'D2',
        status: 1,
        areaId: 1,
        areaName: 'S & T Building'
      }
    ]
  };

  const data = {
    id: 61,
    name: 'D2',
    status: 1,
    area_id: 1
  };

  const store = createStore();
  store.dispatch({
    type: 'LOAD-PARKING-AREAS',
    parkingAreas
  });

  store.dispatch({ type: 'UPDATE-PARKING-LOT', parkingLot: data });
  const actual = store.getState();

  expect(actual).toEqual(expected);
});

describe.skip('Learning Tests', () => {
  it('Can filter parkingAreas based on name', () => {
    const data = [
      {
        id: 1,
        areaName: 'S & T Building',
        parkingLots: [
          { id: 60, name: 'D1', status: 1 },
          { id: 61, name: 'D2', status: 0 }
        ]
      },
      {
        id: 2,
        areaName: 'Canteen',
        parkingLots: [
          { id: 63, name: 'D3', status: 1 },
          { id: 64, name: 'D4', status: 0 }
        ]
      }
    ];

    const expected = [
      {
        id: 1,
        areaName: 'S & T Building',
        parkingLots: [
          {
            id: 60,
            name: 'D1',
            status: 1
          },
          {
            id: 61,
            name: 'D2',
            status: 0
          }
        ]
      }
    ];

    const store = createStore();

    store.dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: data });
    const { parkingAreas } = store.getState();
    const actual = parkingAreas.filter(x => x.areaName === 'S & T Building');

    expect(actual).toEqual(expected);
  });
});
