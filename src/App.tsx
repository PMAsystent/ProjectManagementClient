import React, {Suspense} from 'react';
import MainPage from './containers/MainPage';
import "./styles.scss";

function App() {
  return (
    <>
      <Suspense fallback={<div>Test...</div>}>
        <MainPage/>
      </Suspense>
    </>
  );
}

export default App;
