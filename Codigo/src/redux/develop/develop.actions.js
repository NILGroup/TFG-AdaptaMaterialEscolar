import DevelopActionTypes from "./develop.types";

export const openDevelopModal = () => ({
    type: DevelopActionTypes.OPEN_DEVELOP_MODAL,
});

export const closeDevelopModal = () => ({
    type: DevelopActionTypes.CLOSE_DEVELOP_MODAL,
});