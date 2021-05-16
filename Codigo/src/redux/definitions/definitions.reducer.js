import DefinitionsActionTypes from "./definitions.types";


const INITIAL_STATE = {
    showDefinitionsModal: false,
    numLines: '',
    text: ''
}

const definitionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DefinitionsActionTypes.OPEN_DEFINITIONS_MODAL: 
           return {
                ...state,
                showDefinitionsModal: true
            };
        case DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL: 
            return {
                 ...state,
                 showDefinitionsModal: false
             };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_NUMLINES: 
            return {
                 ...state,
                numLines: action.payload
             };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_TEXT: 
            return {
                 ...state,
                 text: action.payload
             };     
        case DefinitionsActionTypes.RESET_DEFINITIONS_MODAL: 
            return {
                 ...state,
                numLines: '',
                text: ''
             };
        default: 
            return state;
    }
};

export default definitionsReducer;