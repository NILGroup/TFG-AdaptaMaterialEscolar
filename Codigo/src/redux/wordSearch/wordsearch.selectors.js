import { createSelector } from 'reselect';

const selectWordSearch = state => state.wordsearch;

export const selectWordSearchModalIsDisplayed = createSelector(
    [selectWordSearch],
    wordsearch => wordsearch.showWordSearchModal
  );

