import React, { FC } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './core/utils/SnackbarUtils';
import { Provider } from 'react-redux';
import createStore from 'redux/store';
import { persistStore } from 'redux-persist';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const store = createStore();
let persistor = persistStore(store);

const AppProviders: FC<any> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SnackbarProvider autoHideDuration={1500} maxSnack={2} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
          <SnackbarUtilsConfigurator />
          <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
