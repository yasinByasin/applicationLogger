import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import App from '../../App';
import {AppLogger} from './AppLogger';

test('renders loding in loading page', () => {
  const { getByText } = render(
    <Provider store={store}>
      <AppLogger />
    </Provider>
  );

  expect(getByText(/loading/i)).toBeInTheDocument();
});
