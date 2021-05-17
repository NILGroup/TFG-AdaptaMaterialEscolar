import { createSelector } from "reselect";

const selectDefinitions = state => state.definitions;

export const selectDefinitionsModalIsDisplayed = createSelector(
    [selectDefinitions],
    definitions => definitions.showDefinitionsModal
);

export const selectDefinitionsNumLines = createSelector(
    [selectDefinitions],
    definitions => definitions.numLines
);

export const selectDefinitionsText = createSelector(
    [selectDefinitions],
    definitions => definitions.text
);

export const selectDefinitionsExtraSpace = createSelector(
  [selectDefinitions],
  definitions => definitions.extraspace
);