import React from 'react';
import MainPage from 'containers/MainPage/MainPage';
import './styles.scss';
import AppProviders from './AppProviders';

function App() {
  return (
    <AppProviders>
      <MainPage />
    </AppProviders>
  );
}

export default App;
