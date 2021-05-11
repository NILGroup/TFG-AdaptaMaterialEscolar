import FillGapsActionTypes from './fillgaps.types';

const INITIAL_STATE = {
    showModal: false
}

const fillGapsReducer = (state = INITIAL_STATE, action) => {
    console.log(state);
    switch (action.type){
        case FillGapsActionTypes.OPEN_FILLWORDS_MODAL: 
           return {
                ...state,
                showModal: true
            };
        case FillGapsActionTypes.CLOSE_FILLWORDS_MODAL: 
            return {
                 ...state,
                 showModal: false
             };
        default: 
            return state;
    }
};

export default fillGapsReducer;