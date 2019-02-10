import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Header from './components/Header';
import createStore from './redux';
import ParkingApp from './containers/ParkingApp';
import rootSaga from './sagas';

// const stub = require('./stubDataSource.json');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(sagaMiddleware);

sagaMiddleware.run(rootSaga);
store.subscribe(() => console.log(store.getState()));

// store.dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: stub.data });

const App = props => (
  <Provider store={store}>
    <div className="App">
      <Header />
      <ParkingApp />
    </div>
  </Provider>
);

export default App;
