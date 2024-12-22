import '../styles/fabButton.css';

import { addHours } from 'date-fns';

import {
  useCalendarStore,
  useUiStore,
} from '../../hooks';

export const FabAddNew = () => {
const {
    openModal
} = useUiStore()
const {
    setActiveDate
} = useCalendarStore()


const onNewNote = () =>{
    setActiveDate({
         title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Santiago'
            }
    })
}

    return (
        <button onClick={openModal} className='btn btn-primary fab'>
            <i className='fas fa-plus'></i>
        </button>
    )
}
