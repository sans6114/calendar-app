import '../styles/modal.css';
import 'react-datepicker/dist/react-datepicker.css';

import { es } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';

import {
  useModalForm,
  useUiStore,
} from '../../hooks';

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

    const {
        isDateModalOpen,
        closeModal
    } = useUiStore();
    const {
        formValues,
        titleRef,
        classValid,
        onChangeValue,
        onDateChange,
        onSubmit,
    } = useModalForm();
   

    return (
        <>
            <Modal
                isOpen={isDateModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                onAfterOpen={() => titleRef.current?.focus()}
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
        </>
    )
}
