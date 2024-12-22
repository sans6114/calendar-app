import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { AppRouter } from './router';

export const CalendarApp = () => {
  const {counter} = useSelector(state => state.ui);
  console.log(counter);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
