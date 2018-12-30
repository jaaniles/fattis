import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './components/Firebase';

import registerServiceWorker from './registerServiceWorker';
import { init } from '@rematch/core';

import * as models from './models';

const store = init({
  models
});

export const { dispatch } = store;

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
registerServiceWorker();
