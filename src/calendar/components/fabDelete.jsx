import '../styles/fabButton.css';

import Swal from 'sweetalert2';

import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {

    const {
        activeEvent,
        startDeleteEvent
    } = useCalendarStore()


    const handleClickFab = () => {
        Swal.fire({
            title: "estas segúro de eliminar este evento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "si, eliminar",
            cancelButtonText: "cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado!",
                    text: "Tu evento ah sido eliminado.",
                    icon: "success"
                });
                const { _id } = activeEvent
                startDeleteEvent(_id)
            }
        });
    }

    return (
        <button onClick={handleClickFab} className='btn btn-primary fab-delete'>
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}
