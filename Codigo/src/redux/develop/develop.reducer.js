import DevelopActionTypes from "./develop.types";


const INITIAL_STATE = {
    showDevelopModal: false
}

const developReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DevelopActionTypes.OPEN_DEVELOP_MODAL: 
           return {
                ...state,
                showDevelopModal: true
            };
        case DevelopActionTypes.CLOSE_DEVELOP_MODAL: 
            return {
                 ...state,
                 showDevelopModal: false
             };
        default: 
            return state;
    }
    
};

export default developReducer;