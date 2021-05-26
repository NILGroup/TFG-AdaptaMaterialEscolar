import DefinitionsDevelopActionTypes from "./definitionsDevelopModal.types";

export const openDefinitionsDevelopModal = () => ({
    type: DefinitionsDevelopActionTypes.OPEN_DEFINITIONS_DEVELOP_MODAL,
});

export const closeDefinitionsDevelopModal = () => ({
    type: DefinitionsDevelopActionTypes.CLOSE_DEFINITIONS_DEVELOP_MODAL,
});

export const updateSelectedExercise = (value) =>({
    type: DefinitionsDevelopActionTypes.UPDATE_SELECTED_EXERCISE,
    payload: value
});

export const resetDefinitionsDevelopModal = () =>({
    type: DefinitionsDevelopActionTypes.RESET_DEFINITIONS_DEVELOP_MODAL
});