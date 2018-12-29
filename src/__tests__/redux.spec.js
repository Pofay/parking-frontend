import createStore from '../redux';

it('Should contain an empty array on initial state', () => {
  const expectedState = { parkingAreas: [] };
  const store = createStore();

  const actualState = store.getState();

  expect(actualState).toEqual(expectedState);
});

it('Should update state when loading parking areas', () => {
  const data = [
    {
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
        },
        {
          id: 62,
          name: 'D3',
          status: 0
        },
        {
          id: 63,
          name: 'D4',
          status: 0
        }
      ]
    }
  ];
  const expectedState = {
    parkingAreas: data
  };
  const store = createStore();

  store.dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: data });
  const actualState = store.getState();

  expect(actualState).toEqual(expectedState);
});

describe('Learning Tests', () => {
  it('Can filter parkingAreas based on name', () => {
    const data = [
      {
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
      },
      {
        areaName: 'Canteen',
        parkingLots: [
          {
            id: 63,
            name: 'D3',
            status: 1
          },
          {
            id: 64,
            name: 'D4',
            status: 0
          }
        ]
      }
    ];

    const expected = [
      {
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
