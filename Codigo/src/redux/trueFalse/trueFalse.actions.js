import TrueFalseActionTypes from "./trueFalse.types";

export const openTrueFalseModal = () => ({
    type: TrueFalseActionTypes.OPEN_TRUEFALSE_MODAL,
});

export const closeTrueFalseModal = () => ({
    type: TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL,
});