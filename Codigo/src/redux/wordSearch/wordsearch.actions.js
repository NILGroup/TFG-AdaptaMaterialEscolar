import WordSearchActionTypes from './wordsearch.types';

export const openWordSearchModal = () => ({
    type: WordSearchActionTypes.OPEN_WORDSEARCH_MODAL
});

export const closeWordSearchModal = () => ({
    type: WordSearchActionTypes.CLOSE_WORDSEARCH_MODAL
});
