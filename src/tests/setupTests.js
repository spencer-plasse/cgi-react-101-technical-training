// React
import React from 'react';

// Redux
import { Provider } from 'react-redux';

// Testing
import '@testing-library/jest-dom/extend-expect';

// Custom
import { store } from '../redux/store';

// Returns a copy of the element parameter wrapped with a Provider for the Redux store
export const withProvider = (element) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        {element}
      </Provider>
    </React.StrictMode>
  );
}