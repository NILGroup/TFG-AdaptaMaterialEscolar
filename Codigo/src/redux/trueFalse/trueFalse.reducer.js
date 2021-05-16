import TrueFalseActionTypes from "./trueFalse.types";


const INITIAL_STATE = {
    showTrueFalseModal: false
}

const trueFalseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case TrueFalseActionTypes.OPEN_TRUEFALSE_MODAL: 
           return {
                ...state,
                showTrueFalseModal: true
            };
        case TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL: 
            return {
                 ...state,
                 showTrueFalseModal: false
             };
        default: 
            return state;
    }
    
};

export default trueFalseReducer;