// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

type RootType = {
  store: {},
  history: {}
};

import LanguageProvider from './LanguageProvider';
import { translationMessages } from '../i18n';

const electron = require('electron');
/*
const app = require('app');
const BrowserWindow = require('browser-window')

const path = require('path');



const Store = require('../utils/localStorage.js');
let mainWindow;

console.log(app);

const settingsStore = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});

app.on('ready', function() {
  let { width, height } = settingsStore.get('windowBounds');
  mainWindow = new BrowserWindow({ width, height });
  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
  });
});*/


export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
          <LanguageProvider messages={translationMessages}>
           <Routes />
          </LanguageProvider>
        </ConnectedRouter>
    </Provider>
  );
}
