import React, { FC } from 'react';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './core/utils/SnackbarUtils';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'redux/rootReducer';

const AllTheProviders: FC<any> = ({ children, preloadedState }) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  return (
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={1500} maxSnack={2} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <SnackbarUtilsConfigurator />
        <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
      </SnackbarProvider>
    </Provider>
  );
};

const customRender = (ui: any, state?: any, options?: any) =>
  render(ui, { wrapper: ({ children }) => <AllTheProviders preloadedState={state || {}}>{children}</AllTheProviders>, ...options });

export * from '@testing-library/react';

export { customRender as render };
