import DevelopActionTypes from "./develop.types";

const INITIAL_STATE = {
    showDefinitionsModal: false,
    space: '',
    text: '',
    extraspace: false
}

const developReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DevelopActionTypes.OPEN_DEVELOP_MODAL: 
           return {
                ...state,
                showDevelopModal: true
            };
        case DevelopActionTypes.CLOSE_DEVELOP_MODAL: 
            return {
                 ...state,
                 showDevelopModal: false
             };
        case DevelopActionTypes.UPDATE_DEVELOP_SPACE: 
             return {
                  ...state,
                 space: action.payload
              };
         case DevelopActionTypes.UPDATE_DEVELOP_TEXT: 
             return {
                  ...state,
                  text: action.payload
              };     
         case DevelopActionTypes.RESET_DEVELOP_MODAL: 
             return {
                  ...state,
                 space: '',
                 text: '',
                 extraspace: false
              };
        case DevelopActionTypes.UPDATE_DEVELOP_EXTRASPACE:
            return{
                ...state,
                extraspace: action.payload
            }
         default: 
             return state;
     }
 };
 

export default developReducer;