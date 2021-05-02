import DefinitionsActionTypes from "./definitions.types";


const INITIAL_STATE = {
    showDefinitionsModal: false
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
        default: 
            return state;
    }
    
};

export default definitionsReducer;