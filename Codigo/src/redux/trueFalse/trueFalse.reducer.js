import TrueFalseActionTypes from "./trueFalse.types";

const INITIAL_STATE = {
    showTrueFalseModal: false,
    text: ''
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
         case TrueFalseActionTypes.UPDATE_TRUEFALSE_TEXT: 
             return {
                  ...state,
                  text: action.payload
              };     
         case TrueFalseActionTypes.RESET_TRUEFALSE_MODAL: 
             return {
                  ...state,
                 text: ''
              };
         default: 
             return state;
     }
 };

export default trueFalseReducer;