import {
  useMemo,
  useRef,
  useState,
} from 'react';

import { differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';

import { useCalendarStore } from './useCalendarStore';

export const useModalForm = () => {
    const {
        eventos
    } = useCalendarStore()
    console.log(eventos[0])
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState(eventos[0]);
    

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
        console.log(formValues);
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
