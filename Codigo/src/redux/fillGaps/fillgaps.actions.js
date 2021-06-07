import FillGapsActionTypes from './fillgaps.types';

export const openFillGapsModal = () => ({
    type: FillGapsActionTypes.OPEN_FILLWORDS_MODAL
});

export const closeFillGapsModal = () => ({
    type: FillGapsActionTypes.CLOSE_FILLWORDS_MODAL
});

export const updateFillGapsText = (text) => ({
    type: FillGapsActionTypes.UPDATE_FILLWORDS_TEXT,
    payload: text
});

export const updateFillGapsAddHowToSolve = (add) => ({
    type: FillGapsActionTypes.UPDATE_FILLWORDS_ADDHOWTOSOLVE,
    payload: add
});

export const resetFillGaps = () => ({
    type: FillGapsActionTypes.RESET_FILLWORDS
});

export const updateFillGapsMode = (mode) => ({
    type: FillGapsActionTypes.UPDATE_FILLWORDS_MODE,
    payload: mode
});

export const updateFillGapsTextSelection = () => ({
    type: FillGapsActionTypes.UPDATE_FILLWORDS_TEXTSELECTION
});

export const updateFillGapsAddSelectedWord = (word, i) => ({
    type: FillGapsActionTypes.UPDATE_FILLWORDS_ADDSELECTED,
    payload: {word: word, index: i}
});

export const updateFillGapsDeleteSelectedWord = (i) => ({
    type: FillGapsActionTypes.UPDATE_FILLWORDS_DELETESELECTED,
    payload: i
});

export const resetFillGapsWordSelection = () =>({
    type: FillGapsActionTypes.RESET_FILLWORDS_WORDSSELECTED
});