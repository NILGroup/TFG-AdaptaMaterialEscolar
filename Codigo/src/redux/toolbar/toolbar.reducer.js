import ToolbarActionTypes from "./toolbar.types";
import PictogramsActionTypes from "../pictograms/pictograms.types";
import WordSearchActionTypes from "../wordSearch/wordsearch.types";
import DefinitionsDevelopActionTypes from "../definitionsDevelopModal/definitionsDevelopModal.types";
import TrueFalseActionTypes from "../trueFalse/trueFalse.types";

const INITIAL_STATE = {
    lastOpened: undefined
}

const toolbarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ToolbarActionTypes.UPDATE_LAST_OPENED:
           return {
                ...state,
                lastOpened: action.payload
            };
        case PictogramsActionTypes.CLOSE_PICTOGRAMS_MODAL:
            return{
                ...state,
                lastOpened: "pictogram"
            };
        case WordSearchActionTypes.CLOSE_WORDSEARCH_MODAL:
            return{
                ...state,
                lastOpened: "wordsearch"
            };
        case DefinitionsDevelopActionTypes.CLOSE_DEFINITIONS_DEVELOP_MODAL:
            return{
                ...state,
                lastOpened: "definitionsdevelop"
            };
        case TrueFalseActionTypes.CLOSE_TRUEFALSE_MODAL:
            return{
                ...state,
                lastOpened: "truefalse"
            };
         default: 
             return state;
     }
 };

export default toolbarReducer;