import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Calendar } from 'react-big-calendar';

import {
  getMessagesES,
  localizer,
} from '../../helpers';
import { NavBar } from '../components/NavBar';

const eventos = [{
  title: 'cumpleaños del jefe',
  notes: 'Hay que comprar la torta',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    id: '123',
    name: 'santiago'
  },
}]


export const CalendarPage = () => {

const eventStyleGetter = (event, start, end, isSelected) => {
console.log({
  event,
  start,
  end,
  isSelected
})

const style = {
  backgroundColor: '#347CF7',
  borderRadius: '0px',
  opacity: 0.8,
  color: 'white',
}
return {
  style
}
}

  return (
    <>
      <NavBar />

      {/* calendario */}
      <Calendar
        culture='es'
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }} //mi navbar tiene 80 pixeles
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  )
}
