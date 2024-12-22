import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { CalendarApp } from './CalendarApp.jsx';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <CalendarApp />
    </Provider>
  </StrictMode>,
)
