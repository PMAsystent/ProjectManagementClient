import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import createStore from 'redux/store';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'core/utils/SnackbarUtils';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const store = createStore();
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SnackbarProvider autoHideDuration={1500} maxSnack={2} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
          <SnackbarUtilsConfigurator />
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
