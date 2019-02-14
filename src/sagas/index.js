import { call, put, takeEvery } from 'redux-saga/effects';
import socketService from '../services/SocketIOService';

function* submitOccupyRequest(action) {
  yield call(
    ({ payload }) => socketService.emit('parkingLot/occupy', payload),
    action
  );
  yield put({ type: 'CLOSE-DIALOG' });
}

function* submitUnoccupyRquest(action) {
  yield call(
    ({ payload }) => socketService.emit('parkingLot/unoccupy', payload),
    action
  );
  yield put({ type: 'CLOSE-DIALOG' });
}

function* submitAddViolationRequest(action) {
  yield call(
    ({ payload }) => socketService.emit('violations/add', payload),
    action
  );
  yield put({ type: 'CLOSE-DIALOG' });
}

function* submitUpdateViolationRequest(action) {
  console.log(action.payload)
  yield call(
    ({ payload }) => socketService.emit('violations/update', payload),
    action
  );
  yield put({ type: 'CLOSE-DIALOG' });

}

function* submitDeleteViolationRequest(action) {
  yield call(
    ({ payload }) => socketService.emit('violations/delete', payload),
    action
  );
  yield put({ type: 'CLOSE-DIALOG' });
}

export default function* root() {
  yield takeEvery('OCCUPY-REQUEST', submitOccupyRequest);
  yield takeEvery('UNOCCUPY-REQUEST', submitUnoccupyRquest);
  yield takeEvery('ADD-VIOLATION-REQUEST', submitAddViolationRequest);
  yield takeEvery('DELETE-VIOLATION-REQUEST', submitDeleteViolationRequest);
  yield takeEvery('UPDATE-VIOLATION-REQUEST', submitUpdateViolationRequest);
}
