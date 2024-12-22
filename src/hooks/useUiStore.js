import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  onCloseModal,
  onOpenModal,
} from '../store';

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector(state => state.ui);
  const dispatch = useDispatch();


  const openModal = () => {
    dispatch(onOpenModal());
  }
  const closeModal = () => {
    dispatch(onCloseModal());
  }



  return {
    //propiedades
    isDateModalOpen,
    //metodos
    closeModal,
    openModal,
  }
}