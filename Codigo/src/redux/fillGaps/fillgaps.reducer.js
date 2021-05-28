import FillGapsActionTypes from './fillgaps.types';
import update from 'react-addons-update';
import {createUnders, returnWord, returnIndexOfWord} from './fillgaps.utils';

const INITIAL_STATE = {
    showModal: false,
    text: '',
    addHowToSolve: false,
    mode: "edition",
    textSelection: [],
    wordsSelected: []
}

const fillGapsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FillGapsActionTypes.OPEN_FILLWORDS_MODAL: 
           return {
                ...state,
                showModal: true
            };
        case FillGapsActionTypes.CLOSE_FILLWORDS_MODAL: 
            return {
                 ...state,
                 showModal: false,
                 mode: "edition",
                 text: ''
             };
        case FillGapsActionTypes.RESET_FILLWORDS:
            return{
                ...state,
                text: '',
                addHowToSolve: false,
                mode: "edition",
                textSelection: [],
                wordsSelected: []
            };
        case FillGapsActionTypes.UPDATE_FILLWORDS_TEXT:
            return{
                ...state,
                text: action.payload
            };
        case FillGapsActionTypes.UPDATE_FILLWORDS_ADDHOWTOSOLVE:
            return{
                ...state,
                addHowToSolve: action.payload
            };
        case FillGapsActionTypes.UPDATE_FILLWORDS_MODE:
            return{
                ...state,
                mode: action.payload
            };
        case FillGapsActionTypes.UPDATE_FILLWORDS_TEXTSELECTION:
            return{
                ...state,
                textSelection: state.text.split(" ").map(item => item.trim())
            };
        case FillGapsActionTypes.UPDATE_FILLWORDS_ADDSELECTED:
            console.log(state.wordsSelected);
            return{
                ...state,
                wordsSelected: [...state.wordsSelected.slice(0, state.wordsSelected.length), {word: action.payload.word, index: action.payload.index}, ...state.wordsSelected.slice(state.wordsSelected.length + 1)],
                textSelection: update(state.textSelection, {[action.payload.index]: {$set: createUnders(action.payload.word)}})
            };
        case FillGapsActionTypes.UPDATE_FILLWORDS_DELETESELECTED:
            var index = returnIndexOfWord(state.wordsSelected, action.payload);
            return{
                ...state,
                textSelection: update(state.textSelection, {[action.payload]: {$set: returnWord(state.wordsSelected, action.payload)}}),
                wordsSelected: [...state.wordsSelected.slice(0,index), ...state.wordsSelected.slice(index + 1)]
            };
        default: 
            return state;
    }
};

export default fillGapsReducer;