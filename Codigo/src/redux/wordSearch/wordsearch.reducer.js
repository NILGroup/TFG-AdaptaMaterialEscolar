import WordSearchActionTypes from './wordsearch.types';

const INITIAL_STATE = {
    showWordSearchModal: false
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
        default: 
            return state;
    }
};

export default wordSearchReducer;