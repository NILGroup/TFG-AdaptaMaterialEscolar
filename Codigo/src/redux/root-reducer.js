import { combineReducers } from 'redux';
import definitionsReducer from './definitions/definitions.reducer';
import documentReducer from './document/document.reducer';

import pictogramReducer from './pictograms/pictograms.reducer';
import wordSearchReducer from './wordSearch/wordsearch.reducer';

export default combineReducers({
  document: documentReducer,
  pictogram: pictogramReducer,
  wordsearch: wordSearchReducer,
  definitions: definitionsReducer
});