import DefinitionsActionTypes from "./definitions.types";

export const openDefinitionsModal = () => ({
    type: DefinitionsActionTypes.OPEN_DEFINITIONS_MODAL,
});

export const closeDefinitionsModal = () => ({
    type: DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL,
});

export const updateDefinitionsNumLines = (numLines) => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_NUMLINES,
    payload: numLines
});

export const updateDefinitionsText = (text) => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_TEXT,
    payload: text
});

export const resetDefinitionsModal = () => ({
    type: DefinitionsActionTypes.RESET_DEFINITIONS_MODAL
});

export const updateDefinitionsExtraSpace = (extraspace) => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_EXTRASPACE,
    payload: extraspace
})