import DefinitionsActionTypes from "./definitions.types";

export const openDefinitionsModal = () => ({
    type: DefinitionsActionTypes.OPEN_DEFINITIONS_MODAL,
});

export const closeDefinitionsModal = () => ({
    type: DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL,
});

export const updateDefinitionsNumLines = () => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_NUMLINES
});

export const updateDefinitionsText = () => ({
    type: DefinitionsActionTypes.UPDATE_DEFINITIONS_TEXT
});

export const resetDefinitionsModal = () => ({
    type: DefinitionsActionTypes.RESET_DEFINITIONS_MODAL
});