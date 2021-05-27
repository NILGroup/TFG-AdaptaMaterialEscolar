import { createSelector } from "reselect";

const selectDefinitionsDevelop = state => state.definitionsDevelopModal;

export const selectDefinitionsDevelopModalIsDisplayed = createSelector(
    [selectDefinitionsDevelop],
    definitionsDevelopModal => definitionsDevelopModal.showDefinitionsDevelopModal
);

export const selectDefinitionsDevelopModalSelectedExercise = createSelector(
  [selectDefinitionsDevelop],
  definitionsDevelopModal => definitionsDevelopModal.selectedExercise
);