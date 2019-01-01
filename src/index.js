import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';

import Firebase, { FirebaseContext } from './components/Firebase';
import registerServiceWorker from './registerServiceWorker';
import { init } from '@rematch/core';

import App from './components/App';

import * as models from './models';

const store = init({
  models,
  redux: {
    reducers: {
      firebase: firebaseReducer
    }
  },
  enhancers: [
    reactReduxFirebase(firebase, {
      userProfile: 'users'
    })
  ]
});

export const { dispatch } = store;

ReactDOM.render(
  <FirebaseContext.Provider value={Firebase}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
registerServiceWorker();
