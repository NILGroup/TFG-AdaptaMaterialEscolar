import TrueFalseActionTypes from "./trueFalse.types";

export const openTrueFalseModal = () => ({
    type: TrueFalseActionTypes.OPEN_TRUEFALSE_MODAL,
});

export const closeTrueFalseModal = () => ({
    type: TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL,
});

export const updateTrueFalseText = (text) => ({
    type: TrueFalseActionTypes.UPDATE_TRUEFALSE_TEXT,
    payload: text
});

export const resetTrueFalseModal = () => ({
    type: TrueFalseActionTypes.RESET_TRUEFALSE_MODAL
});