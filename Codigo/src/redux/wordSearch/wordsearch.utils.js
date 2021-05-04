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


export const createWordSearch = (wordsearch, options) =>{
    try{
        options ={
            ...options,
            rows: parseInt(options.rows),
            cols: parseInt(options.cols),
            dictionary: options.dictionary.split(",").map(item => item.trim()),
            maxWords: parseInt(options.maxWords)
        }
        const ws = new WordSearch(options);
        /*if(ws.words.length < options.dictionary.length){
            error = "No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, columnas y/o número máximo de palabras";
        }*/
        wordsearch = ws.grid;

        return wordsearch;
    }
    catch(errors){
        /*if(errors instanceof TypeError){
            error = "Las filas y columnas deben tener un valor positivo mayor que 0";
        }*/
        return wordsearch;
    }
}