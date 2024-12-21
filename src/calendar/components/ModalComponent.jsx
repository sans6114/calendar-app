import '../styles/modal.css';
import 'react-datepicker/dist/react-datepicker.css';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  addHours,
  differenceInSeconds,
} from 'date-fns';
import { es } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

registerLocale('español', es)

//styles for my modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const ModalComponent = () => {

    const [openModal, setOpenModal] = useState(true)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formValues, setFormValues] = useState({
        title: 'Santiago',
        notes: 'hola new note',
        start: new Date(),
        end: addHours(new Date(), 2)
    })
    const titleRef = useRef(null)
    useEffect(() => {
        if(openModal && titleRef.current){
            titleRef.current.focus()
        }
    }, [openModal])

    const classValid = useMemo(() => {
        if (formValues.title.trim().length <= 0) {
            return 'is-invalid'
        } else {
            return 'is-valid'
        }
    }, [formValues.title, formSubmitted])


    const onChangeValue = ({ target }) => {
        const { name, value } = target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onDateChange = (event, changing = 'start') => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
        const difference = differenceInSeconds(formValues.end, formValues.start)
        if (difference <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'La fecha de fin debe ser mayor a la fecha de inicio',
                icon: 'error',
            })
            return
        }
        if (formValues.title.trim().length <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'El titulo es obligatorio',
                icon: 'error',
            })
            return
        }
        console.log('submit')
    }

    const onCloseModal = () => {
        console.log('close modal')
        setOpenModal(false)
    }

    return (
        <Modal
            isOpen={openModal}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={onSubmit} className="container">
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        minDate={new Date()}
                        onChange={event => onDateChange(event, 'start')}
                        className="form-control" placeholder="Fecha inicio"
                        dateFormat='Pp'
                        showTimeSelect
                        locale='español'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control" placeholder="Fecha inicio"
                        onChange={event => onDateChange(event, 'end')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='español'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        ref={titleRef}
                        value={formValues.title}
                        onChange={onChangeValue}
                        type="text"
                        className={`form-control ${classValid}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        value={formValues.notes}
                        onChange={onChangeValue}
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}
