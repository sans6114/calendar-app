import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';

import { addHours } from 'date-fns';
import { Calendar } from 'react-big-calendar';

import {
  CalendarEventBox,
  ModalComponent,
  NavBar,
} from '../';
import {
  getMessagesES,
  localizer,
} from '../../helpers';

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
},
]


export const CalendarPage = () => {
  const [view, setView] = useState(localStorage.getItem('view') || 'day')

  const eventStyleGetter = (event, start, end, isSelected) => {
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
  //evento de doble click
  const onEventDoubleClick = (event) => {
    console.log('click doble' + event)
  }
  //evento de click
  const onEventClick = (event) => {
    console.log('click solo' + event)

  }
  //evento cambio de vista
  const onEventChangeView = (event) => {
    localStorage.setItem('view', event)
    setView(view)
  }

  return (
    <>
      <NavBar />
      {/* calendario */}
      <Calendar
        culture='es'
        localizer={localizer}
        events={eventos}
        defaultView={view}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }} //mi navbar tiene 80 pixeles
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onEventDoubleClick}
        onSelectEvent={onEventClick}
        onView={onEventChangeView}
        />
        <ModalComponent/>
    </>
  )
}
