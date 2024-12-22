import { useSelector } from 'react-redux';

export const useCalendarStore = () => { 
const {events: eventos, activeEvent} = useSelector(state => state.calendar)


    return {
        //propiedades
        eventos,
        activeEvent,
        //metodos
    }
}