import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Header from './components/Header';
import STBuilding from './containers/STBuilding';
import createStore from './redux';

const stub = require('./stubDataSource.json');

const store = createStore();

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: stub.data });

const App = props => (
  <Provider store={store}>
    <div className="App">
      <Header />
      <STBuilding />
    </div>
  </Provider>
);

export default App;
