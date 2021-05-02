import DefinitionsActionTypes from "./definitions.types";

export const openDefinitionsModal = () => ({
    type: DefinitionsActionTypes.OPEN_DEFINITIONS_MODAL,
});

export const closeDefinitionsModal = () => ({
    type: DefinitionsActionTypes.CLOSE_DEFINITIONS_MODAL,
});