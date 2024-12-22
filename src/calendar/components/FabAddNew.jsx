import '../styles/fabButton.css';

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
    setActiveDate()
}

    return (
        <button onClick={openModal} className='btn btn-primary fab'>
            <i className='fas fa-plus'></i>
        </button>
    )
}
