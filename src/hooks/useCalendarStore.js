import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addToCalendar,
  deleteOfCalendar,
  editToCalendar,
  onSetActiveEvent,
} from '../store';

export const useCalendarStore = () => {
    const { events: eventos, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch();

    //poner de activa una nota:
    const setActiveDate = (calendarDate) => {
        dispatch(onSetActiveEvent(calendarDate))
    }
    //poner una nota en mi store local
    const startNewDate = async (calendarEvent) => {
        //TODO: mandar al backend
        if (calendarEvent._id) {
            console.log(false, 'editar evento')
            dispatch(editToCalendar(calendarEvent))
        } else {
            dispatch(addToCalendar({  _id: new Date().getTime(),...calendarEvent }))
        }
    }

    const startDeleteEvent = () => {
        //todo: eliminar del backend
        dispatch(deleteOfCalendar())
    }



    return {
        //propiedades
        eventos,
        activeEvent,
        //metodos
        setActiveDate,
        startNewDate,
        startDeleteEvent
    }
}