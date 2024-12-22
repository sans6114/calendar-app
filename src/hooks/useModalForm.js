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
import Swal from 'sweetalert2';

import { useCalendarStore } from './useCalendarStore';

//si no tengo una nota activa
const initialForm = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Santiago'
    }
};
export const useModalForm = () => {
    const {
        activeEvent
    } = useCalendarStore()
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState(initialForm);
    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...initialForm,...activeEvent });
        }
    }, [activeEvent]);

    const titleRef = useRef(null);

    const classValid = useMemo(() => {
        if (formValues.title.trim().length <= 0) {
            return 'is-invalid';
        } else {
            return 'is-valid';
        }
    }, [formValues.title, formSubmitted]);

    const onChangeValue = ({ target }) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const onDateChange = (event, changing = 'start') => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (difference <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'La fecha de fin debe ser mayor a la fecha de inicio',
                icon: 'error',
            });
            return;
        }
        if (formValues.title.trim().length <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'El titulo es obligatorio',
                icon: 'error',
            });
            return;
        }
    };

    return {
        formValues,
        titleRef,
        classValid,
        onChangeValue,
        onDateChange,
        onSubmit,
    };
}
