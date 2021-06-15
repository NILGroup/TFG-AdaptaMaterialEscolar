export const createUnders = (word) =>{
    var under = "______";
    for(let i = 0; i < word.length; ++i){
        under += "_";
    }

    return under;
}

export const returnWord = (wordsSelected, index) =>{
    return wordsSelected.find(word => word.index === index).word;
}

export const returnIndexOfWord = (wordSelected, index) =>{
    return wordSelected.findIndex(word => word.index === index);
}