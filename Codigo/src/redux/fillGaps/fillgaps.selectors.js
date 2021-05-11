import { createSelector } from 'reselect';

const selectFillGaps = state => state.fillgaps;

export const selectFillGapsModalIsDisplayed = createSelector(
    [selectFillGaps],
    fillgaps => fillgaps.showModal
  );

