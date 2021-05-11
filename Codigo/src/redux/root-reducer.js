import { combineReducers } from 'redux';
import definitionsReducer from './definitions/definitions.reducer';
import documentReducer from './document/document.reducer';
import editorReducer from './editor/editor.reducer';
import fillGapsReducer from './fillGaps/fillgaps.reducer';

import pictogramReducer from './pictograms/pictograms.reducer';
import wordSearchReducer from './wordSearch/wordsearch.reducer';

export default combineReducers({
  document: documentReducer,
  pictogram: pictogramReducer,
  wordsearch: wordSearchReducer,
  definitions: definitionsReducer,
  editor: editorReducer,
  fillgaps: fillGapsReducer
});