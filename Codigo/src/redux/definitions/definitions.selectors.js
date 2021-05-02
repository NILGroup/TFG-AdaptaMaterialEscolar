import { createSelector } from "reselect";

const selectDefinitions = state => state.definitions;

export const selectDefinitionsModalIsDisplayed = createSelector(
    [selectDefinitions],
    definitions => definitions.showDefinitionsModal
);
