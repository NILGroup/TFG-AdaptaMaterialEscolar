import DefinitionsDevelopActionTypes from "./definitionsDevelopModal.types";

const INITIAL_STATE = {
    showDefinitionsDevelopModal: false,
    selectedExercise: ''
}

const definitionsDevelopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DefinitionsDevelopActionTypes.OPEN_DEFINITIONS_DEVELOP_MODAL: 
           return {
                ...state,
                showDefinitionsDevelopModal: true
            };
        case DefinitionsDevelopActionTypes.CLOSE_DEFINITIONS_DEVELOP_MODAL: 
            return {
                 ...state,
                 showDefinitionsDevelopModal: false
             };
        case DefinitionsDevelopActionTypes.UPDATE_SELECTED_EXERCISE:
            return{
                ...state,
                selectedExercise: action.payload
            };
        case DefinitionsDevelopActionTypes.RESET_DEFINITIONS_DEVELOP_MODAL:
            return{
                ...state,
                selectedExercise: ''
            };
         default: 
             return state;
     }
 };
 

export default definitionsDevelopReducer;