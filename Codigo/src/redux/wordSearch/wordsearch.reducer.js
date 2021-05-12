import WordSearchActionTypes from './wordsearch.types';
import { backwardsProb, createWordSearch, diagonalDirs, horizontalDirs, verticalDirs } from './wordsearch.utils';

const INITIAL_STATE = {
    showWordSearchModal: false,
    rows: '',
    cols: '',
    dictionary: "",
    vertical: false,
    horizontal: false,
    diagonal: false,
    maxWords: 20,
    diacritics: false,
    activateBackwards: false,
    backwardsProbability: 0.0, //init to 0.3 when activateBackwards is true
    error: "",
    disabledDirections: ["N", "S", "W", "E", "NW", "NE", "SW", "SE"],
    wordSearchContent: []
}

const wordSearchReducer = (state = INITIAL_STATE, action) => {
    console.log(state);
    switch (action.type){
        case WordSearchActionTypes.OPEN_WORDSEARCH_MODAL:
            return{
                ...state,
                showWordSearchModal: true
            }
        case WordSearchActionTypes.CLOSE_WORDSEARCH_MODAL:
            return{
                ...state,
                showWordSearchModal: false
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ROWS:
            return{
                ...state,
                rows: action.payload
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_COLS:
            return{
                ...state,
                cols: action.payload
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_DICTIONARY:
            return{
                ...state,
                dictionary: action.payload
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_VERTICAL:
            return{
                ...state,
                vertical: action.payload,
                disabledDirections: verticalDirs(state.disabledDirections, action.payload)
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_HORIZONTAL:
            return{
                ...state,
                horizontal: action.payload,
                disabledDirections: horizontalDirs(state.disabledDirections, action.payload)
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_DIAGONAL:
            return{
                ...state,
                diagonal: action.payload,
                disabledDirections: diagonalDirs(state.disabledDirections, action.payload)
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_MAXWORDS:
            return{
                ...state,
                maxWords: action.payload
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_DIACRITICS:
            return{
                ...state,
                diacritics: action.payload
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ACTIVATEBACKWARDS:
            return{
                ...state,
                activateBackwards: action.payload,
                backwardsProbability: backwardsProb(state.backwardsProbability, action.payload)
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_BACKWARDSPROBABILITY:
            return{
                ...state,
                backwardsProbability: action.payload
            }
        case WordSearchActionTypes.UPDATE_WORDSEARCH_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case WordSearchActionTypes.RESET_WORDSEARCH:
            return{
                ...state,
                rows: '',
                cols: '',
                dictionary: "",
                vertical: false,
                horizontal: false,
                diagonal: false,
                maxWords: 20,
                diacritics: false,
                activateBackwards: false,
                backwardsProbability: 0.0,
                error: "",
                disabledDirections: ["N", "S", "W", "E", "NW", "NE", "SW", "SE"],
                wordSearchContent: []
            }
        case WordSearchActionTypes.CREATE_WORDSEARCH:
            return{
                ...state,
                wordSearchContent: createWordSearch(state.wordSearchContent, {rows: state.rows, cols: state.cols, dictionary: state.dictionary, disabledDirections: state.disabledDirections, 
                    maxWords: state.maxWords, backwardsProbability: state.backwardsProbability, diacritics:state.diacritics})
            }
        default: 
            console.log(state);
            return state;
    }
};

export default wordSearchReducer;