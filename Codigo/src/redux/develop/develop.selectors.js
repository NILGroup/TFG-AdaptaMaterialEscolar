import { createSelector } from "reselect";

const selectDevelop = state => state.develop;

export const selectDevelopModalIsDisplayed = createSelector(
    [selectDevelop],
    develop => develop.showDevelopModal
);
