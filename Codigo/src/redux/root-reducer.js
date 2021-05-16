import { combineReducers } from 'redux';
import documentReducer from './document/document.reducer';
import editorReducer from './editor/editor.reducer';
import definitionsReducer from './definitions/definitions.reducer';
import developReducer from './develop/develop.reducer'
import trueFalseReducer from './trueFalse/trueFalse.reducer'
import pictogramReducer from './pictograms/pictograms.reducer';
import wordSearchReducer from './wordSearch/wordsearch.reducer';

export default combineReducers({
  document: documentReducer,
  pictogram: pictogramReducer,
  wordsearch: wordSearchReducer,
  definitions: definitionsReducer,
  develop: developReducer,
  trueFalse: trueFalseReducer,
  editor: editorReducer
});