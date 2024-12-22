import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { onSetActiveEvent } from '../store';

export const useCalendarStore = () => {
    const { events: eventos, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch();


    const setActiveDate = (id) => {
        dispatch(onSetActiveEvent(id))
    }


    return {
        //propiedades
        eventos,
        activeEvent,
        //metodos
        setActiveDate
    }
}