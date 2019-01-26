import * as types from './actionTypes';

/******** MODAL ********/
export const showModal = (type, props) => ({ type: types.SHOW_MODAL, payload: {type, props} });

export const hideModal = () => ({ type: types.HIDE_MODAL });