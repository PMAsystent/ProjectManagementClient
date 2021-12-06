import React from 'react';
import MainPage from 'containers/MainPage/MainPage';
import './styles.scss';
import AppProviders from './AppProviders';
import createStore from './redux/store';
import { persistStore } from 'redux-persist';

function App() {
  const store = createStore();
  let persistor = persistStore(store);

  return (
    <AppProviders store={store} persistor={persistor}>
      <MainPage />
    </AppProviders>
  );
}

export default App;
