import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';

import { Calendar } from 'react-big-calendar';

import {
  CalendarEventBox,
  FabAddNew,
  ModalComponent,
  NavBar,
} from '../';
import {
  getMessagesES,
  localizer,
} from '../../helpers';
import {
  useCalendarStore,
  useUiStore,
} from '../../hooks';
import { FabDelete } from '../components/fabDelete';

export const CalendarPage = () => {
    const {
    openModal
    } = useUiStore();
    const {
    eventos,
    activeEvent,
    setActiveDate
    } = useCalendarStore()

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
    openModal()
  }
  //evento de click
  const onEventClick = (event) => {
    setActiveDate(event)
  }
  //evento cambio de vista
  const onEventChangeView = (event) => {
    localStorage.setItem('view', { event })
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
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onEventDoubleClick}
        onSelectEvent={onEventClick}
        onView={onEventChangeView}
      />
      <ModalComponent />
      <FabAddNew/>
      {activeEvent && <FabDelete/>}
    </>
  )
}
