import { call, takeEvery } from 'redux-saga/effects';
import socketService from '../services/SocketIOService';

function* submitOccupyRequest(action) {
  yield console.log(action.payload);
  yield call(
    ({ payload }) => socketService.emit('parkingLot/occupy', payload),
    action
  );
}

function* submitUnoccupyRquest(action) {
  yield console.log(action.payload);
  yield call(
    ({ payload }) => socketService.emit('parkingLot/unoccupy', payload),
    action
  );
}

export default function* root() {
  yield takeEvery('OCCUPY-REQUEST', submitOccupyRequest);
  yield takeEvery('UNOCCUPY-REQUEST', submitUnoccupyRquest);
}