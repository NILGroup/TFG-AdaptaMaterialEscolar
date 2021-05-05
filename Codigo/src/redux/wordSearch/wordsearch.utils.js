const WordSearch = require("@blex41/word-search");

export const backwardsProb = (backwardsProbability, activateBackwards) =>{
    if(activateBackwards === true){
        backwardsProbability = 0.3;
    }
    else backwardsProbability = 0.0;

    return backwardsProbability;
}

export const verticalDirs = (disabledDirections, vertical) =>{
    if(vertical === false){
        disabledDirections.push("N", "S");
    }
    else{
        disabledDirections = disabledDirections.filter((value) =>{
            return value !== "N" && value !== "S";
        });
    }

    return disabledDirections;
}

export const horizontalDirs = (disabledDirections, horizontal) =>{
    if(horizontal === false){
        disabledDirections.push("W", "E");
    }
    else{
        disabledDirections = disabledDirections.filter((value) =>{
            return value !== "W" && value !== "E";
        });
    }

    return disabledDirections;
}

export const diagonalDirs = (disabledDirections, diagonal) =>{
    if(diagonal === false){
        disabledDirections.push("NW", "NE", "SW", "SE");
    }
    else{
        disabledDirections = disabledDirections.filter((value) =>{
            return value !== "NW" && value !== "NE" && value !== "SW" && value !== "SE";
        });
    }

    return disabledDirections;
}


export const createWordSearch = (wordSearchObject, options) =>{
    try{
        options ={
            ...options,
            rows: parseInt(options.rows),
            cols: parseInt(options.cols),
            dictionary: options.dictionary.split(",").map(item => item.trim()),
            maxWords: parseInt(options.maxWords)
        }
        if(options.rows > 0 && options.cols > 0){
            const ws = new WordSearch(options);
            wordSearchObject = ws;
            
            return wordSearchObject;
        }
        else return null;
        
    }
    catch(error){
        return null;
    }
}