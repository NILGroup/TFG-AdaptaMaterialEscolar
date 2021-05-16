import WordSearchActionTypes from './wordsearch.types';

export const openWordSearchModal = () => ({
    type: WordSearchActionTypes.OPEN_WORDSEARCH_MODAL
});

export const closeWordSearchModal = () => ({
    type: WordSearchActionTypes.CLOSE_WORDSEARCH_MODAL
});

export const updateWordSearchRows = (rows) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_ROWS,
    payload: rows
});

export const updateWordSearchCols = (cols) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_COLS,
    payload: cols
});

export const updateWordSearchDictionary = (dictionary) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_DICTIONARY,
    payload: dictionary
});

export const updateWordSearchVertical = (vertical) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_VERTICAL,
    payload: vertical
});

export const updateWordSearchHorizontal = (horizontal) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_HORIZONTAL,
    payload: horizontal
});

export const updateWordSearchDiagonal = (diagonal) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_DIAGONAL,
    payload: diagonal
});

export const updateWordSearchMaxWords = (maxWords) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_MAXWORDS,
    payload: maxWords
});

export const updateWordSearchActivateBackwards = (activateBackwards) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_ACTIVATEBACKWARDS,
    payload: activateBackwards
});

export const updateWordSearchBackWardsProbability = (backwardsProbability) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_BACKWARDSPROBABILITY,
    payload: backwardsProbability
});

export const updateWordSearchError = (error) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_ERROR,
    payload: error
});

export const resetWordSearch = () =>({
    type: WordSearchActionTypes.RESET_WORDSEARCH
});

export const createWordSearch = () => ({
    type: WordSearchActionTypes.CREATE_WORDSEARCH
});

export const updateWordSearchReady = (ready) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_READY,
    payload: ready
});

export const updateWordSearchHiddenWords = (hiddenWords) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_HIDDENWORDS,
    payload: hiddenWords
});

export const updateWordSearchReadyToCreate = (readyToCreate) => ({
    type: WordSearchActionTypes.UPDATE_WORDSEARCH_READYTOCREATE,
    payload: readyToCreate
})