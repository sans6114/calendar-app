import { addHours } from 'date-fns';

import { createSlice } from '@reduxjs/toolkit';

//como se ve cada objeto de la lista de eventos:
const tempEvent = {
    _id: new Date().getTime(),
    title: 'cumpleaños del jefe',
    notes: 'Hay que comprar la torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        id: '123',
        name: 'santiago'
    },
}  
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null,
        user: {
            name: 'santiago',
        },
    },
    reducers: {
        onSetActiveEvent(state, {payload}) {
        state.activeEvent = payload
        },
        addToCalendar(state, action) {
            state.events.push(action.payload)
        },
        editToCalendar(state, action) {
            //TODO: EDIT FROM CALENDAR
            const itemToEdit = state.events.findIndex(event => event._id === action.payload._id)
            state.events[itemToEdit] = action.payload
            state.activeEvent = null
        },
        deleteOfCalendar(state) {
            if(state.activeEvent){
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null
            }
        },
    }
})

export const { addToCalendar, deleteOfCalendar, editToCalendar, onSetActiveEvent } = calendarSlice.actions;