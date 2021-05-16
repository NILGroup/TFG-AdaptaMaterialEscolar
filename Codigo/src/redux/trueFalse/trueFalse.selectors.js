import { createSelector } from "reselect";

const selectTrueFalse = state => state.trueFalse;

export const selectTrueFalseModalIsDisplayed = createSelector(
    [selectTrueFalse],
    trueFalse => trueFalse.showTrueFalseModal
);
