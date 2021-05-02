const INITIAL_STATE = {
    editor: null,
    content: ""
}

const editorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
       /* case DocumentActionTypes.LOAD_FILE: 
           return {
                ...state,
                fileL: action.payload.fileL,
                fileIsLoaded: true
            };
        case DocumentActionTypes.GET_FILE: 
            return {
                 ...state
             };*/
        default: 
            return state;
    }
    
};

export default editorReducer;