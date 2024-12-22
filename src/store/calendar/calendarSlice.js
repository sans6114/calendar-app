import { addHours } from 'date-fns';

import { createSlice } from '@reduxjs/toolkit';

//como se ve cada objeto de la lista de eventos:
const tempEvent = {
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
        addToCalendar(state, action) {
            //TODO: ADD TO CALENDAR
        },
        deleteOfCalendar(state, action) {
            //TODO: ELIMINATE TO CALENDAR
        },
        editToCalendar(state, action) {
            //TODO: EDIT FROM CALENDAR
        }
    }
})

export const { addToCalendar, deleteOfCalendar, editToCalendar } = calendarSlice.actions;