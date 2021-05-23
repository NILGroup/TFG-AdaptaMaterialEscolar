import DefinitionsActionTypes from "./definitions.types";
import update from 'react-addons-update';

const INITIAL_STATE = {
    showDefinitionsModal: false,
    numLines: '',
    text: [""],
    extraspace: false
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
                 text: update(state.text, {[action.payload.index]: {$set: action.payload.text}})
             };  
        case DefinitionsActionTypes.RESET_DEFINITIONS_MODAL: 
            return {
                 ...state,
                numLines: '',
                text: [""],
                extraspace: false
             };
        case DefinitionsActionTypes.UPDATE_DEFINITIONS_EXTRASPACE:
            return{
                ...state,
                extraspace: action.payload
            };
        case DefinitionsActionTypes.ADD_MORE_DEFINITIONS:
            return{
                ...state,
                text: [...state.text.slice(0,state.text.length), "", ...state.text.slice(state.text.length)]
            };
        case DefinitionsActionTypes.DELETE_DEFINITION:
            return{
                ...state,
                text: [...state.text.slice(0,action.payload), ...state.text.slice(action.payload + 1)]
            }
        default: 
            return state;
    }
};

export default definitionsReducer;