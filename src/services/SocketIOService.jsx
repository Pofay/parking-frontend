// SINGLETON
let socketIOInstance;

const init = instance => {
  socketIOInstance = instance;
};

const addListener = (endpoint, cb) => {
  socketIOInstance.on(endpoint, cb);
};

const emit = (event, payload) => socketIOInstance.emit(event, payload);

export default {
  init,
  addListener,
  emit
};
