import { createSelector } from 'reselect';

const selectWordSearch = state => state.wordsearch;

export const selectWordSearchModalIsDisplayed = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.showWordSearchModal
);

export const selectWordSearchModalRows = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.rows
);

export const selectWordSearchModalCols = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.cols
);

export const selectWordSearchModalDictionary = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.dictionary
);

export const selectWordSearchModalVertical = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.vertical
);

export const selectWordSearchModalHorizontal = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.horizontal
);

export const selectWordSearchModalDiagonal = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.diagonal
);

export const selectWordSearchModalMaxWords = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.maxWords
);

export const selectWordSearchModalDiacritics = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.diacritics
);

export const selectWordSearchModalActivateBackwards = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.activateBackwards
);

export const selectWordSearchModalBackwardsProbability = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.backwardsProbability
);

export const selectWordSearchModalError = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.error
);

export const selectWordSearchModalReady = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.ready
);

export const selectWordSearchModalHiddenWords = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.hiddenWords
);

export const selectWordSearchModalWordSearchObj = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.wordSearchObject
);

export const selectWordSearchModalReadyToCreate = createSelector(
  [selectWordSearch],
  wordsearch => wordsearch.readyToCreate
);