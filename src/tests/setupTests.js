// React
import React from 'react';

// Redux
import { Provider } from 'react-redux';

// Testing
import '@testing-library/jest-dom/extend-expect';

// Custom
import { store } from '../redux/store';

export const withProvider = (element) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        {element}
      </Provider>
    </React.StrictMode>
  );
}