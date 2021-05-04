import "./wordsearch.styles.scss";
import React from 'react';
import ReactTooltip from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentDocument } from "../../redux/document/document.selectors";
import { closeWordSearchModal, updateWordSearchRows, updateWordSearchCols, updateWordSearchDictionary, updateWordSearchDiagonal, updateWordSearchHorizontal, 
    updateWordSearchVertical, updateWordSearchMaxWords, updateWordSearchDiacritics, updateWordSearchActivateBackwards,
    updateWordSearchBackWardsProbability,
    resetWordSearch,
    createWordSearch,
    updateWordSearchError} from "../../redux/wordSearch/wordsearch.actions";
import { selectWordSearchModalRows, selectWordSearchModalCols, selectWordSearchModalDictionary, selectWordSearchModalVertical, selectWordSearchModalHorizontal, 
    selectWordSearchModalDiagonal, selectWordSearchModalMaxWords, selectWordSearchModalDiacritics, selectWordSearchModalActivateBackwards, 
    selectWordSearchModalBackwardsProbability, selectWordSearchModalError, selectWordSearchModalWordSearchContent} from "../../redux/wordSearch/wordsearch.selectors";

import WordSearch from "../wordSearch/wordSearch";
import { selectEditorClass } from "../../redux/editor/editor.selectors";
//const WordSearch = require("@blex41/word-search");

class WordSearchModal extends React.Component{
    constructor(props){
        super();
        this.onChange = this.onChange.bind(this);
        this.initialState = {
            hiddenWords: false,
            //preview: <tr><td></td></tr>, //init
            ready: false,
        };
        this.state = this.initialState;
        this.wordSearchCreated = false;
    }

    handleClick(){
        /*this.props.createWordSearch;
        if(ws.words.length < options.dictionary.length){
            this.props.updateError("No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, columnas y/o número máximo de palabras");
        }*/
        
    }
    accept = () => {
        //document.getElementById("wordsearch-preview").hidden = true;
        //this.setState(this.initialState);
        //this.props.handleClose();
        //Falta que la sopa de letras creada se escriba en el editor
        this.props.editor.execute( 'insertWordSearch', this.props.wordSearchContent);
        this.props.editor.editing.view.focus();
    }

    reset(){
        //this.setState(this.initialState);
        //this.hidden = true;
    }

    onChange(e){
        switch(e.target.name){
            case "rows":
                this.props.updateRows(e.target.value);
                break;
            case "cols":
                this.props.updateCols(e.target.value);
                break;
            case "dictionary":
                this.props.updateDictionary(e.target.value);
                break;
            case "vertical":
                this.props.updateVertical(e.target.checked);
                break;
            case "horizontal":
                this.props.updateHorizontal(e.target.checked);
                break;
            case "diagonal":
                this.props.updateDiagonal(e.target.checked);
                break;
            case "maxWords":
                this.props.updateMaxWords(e.target.value);
                break;
            case "diacritics":
                this.props.updateDiacritics(e.target.checked);
                break;
            case "activateBackwards":
                this.props.updateActivateBackwards(e.target.checked);
                break;
            case "backwardsProbability":
                this.props.updateBackwardsProbability(e.target.value);
                break;
            default:
                break;
        }
    }

    renderPreview(grid){
        let table = [];
        for(let i = 0; i < this.state.rows; ++i){
            let children = [];
            for(let j = 0; j < this.state.cols; ++j){
                var ch = "td-" + i + j;
                children.push(<td key={ch}>{grid[i][j]}</td>)
            }
            var p = "tr-" + i;
            table.push(<tr key={p}>{children}</tr>)
        }

        return table;
    }

    preview(){
        var options = {
            rows: parseInt(this.state.rows),
            cols: parseInt(this.state.cols),
            disabledDirections: [],
            maxWords: parseInt(this.state.maxWords),
            dictionary: this.state.dictionary.split(",").map(item => item.trim()),
            backwardsProbability: this.state.backwardsProbability,
            diacritics: this.state.diacritics
        }
        
        if(this.state.vertical === false){
            options.disabledDirections.push("N", "S");
        }
        if(this.state.horizontal === false){
            options.disabledDirections.push("W", "E");
        }
        if(this.state.diagonal === false){
            options.disabledDirections.push("NW", "NE", "SW", "SE");
        }

        try{
            const ws = new WordSearch(options);
            var error = "";
            if(ws.words.length < options.dictionary.length){
                error = "No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, columnas y/o número máximo de palabras";
            }
            
            let res = this.renderPreview(ws.grid);
            //this.hidden = false;
            this.setState({
                error: error,
                preview: res,
                ready: true
            });
        }
        catch(error){
            if(error instanceof TypeError){
                //console.log(error);
                this.setState({
                    error: "Las filas y columnas deben tener un valor positivo mayor que 0"
                });
            }
            //this.hidden = true;
            this.ready = false;
        }
    }

    render(){
        console.log(this.props.error);
        return(
            <div className="wordsearchModal display-block">
                <div className="wordsearchModal__content">
                    <div className="header">
                        <h4>Generador de sopa de letras</h4>
                        <button onClick={this.props.closeModal}>X</button>
                    </div>
                    <div className="modal-main">
                        <object className='pdf' data={this.props.file} type="application/pdf"/>
                        <div className="wordsearch-container">
                            <div className="container__info">
                                <span>* Campos obligatorios</span>
                            </div>
                            <div className="container">
                                <label><span>*</span>Filas</label> <input name="rows" type="number" min="1" onChange={this.onChange} value={this.props.rows}/>
                                <label><span>*</span>Columnas</label> <input name="cols" type="number" min="1" onChange={this.onChange} value={this.props.cols}/>
                            </div>
                            <div className="container">
                                <label>Número máximo de palabras <FaInfoCircle data-tip data-for="maxWordsTip"/><ReactTooltip id="maxWordsTip" place="top" effect="solid">
                                    Número máximo de palabras que se insertarán en la sopa de letras. Por defecto es 20.
                                    </ReactTooltip></label> <input name="maxWords" type="number" min="1" value={this.props.maxWords} onChange={this.onChange}/>
                            </div>
                            <div className="container">
                                <span>*</span><textarea id="dictionary" name="dictionary" placeholder="Escribe las palabras a buscar (separadas por comas):" 
                                onChange={this.onChange} value={this.props.dictionary}></textarea>
                            </div>
                            <div className="container__searchWords">
                                <label><span>*</span>Buscar palabras en:</label>
                                <div className="container__searchWordsOptions">
                                    <label><input id="vertical" type="checkbox" name="vertical" onChange={this.onChange} checked={this.props.vertical}/>Vertical</label> 
                                    <label><input id="horizontal" type="checkbox" name="horizontal" onChange={this.onChange} checked={this.props.horizontal}/>Horizontal</label> 
                                    <label><input id="diagonal" type="checkbox" name="diagonal" onChange={this.onChange} checked={this.props.diagonal}/>Diagonal</label>
                                </div>
                            </div>
                            <div className="container__backwards">
                                <label><input id="activateBackwards" type="checkbox" name="activateBackwards" onChange={this.onChange} checked={this.props.activateBackwards}/>Activar escritura al revés <FaInfoCircle data-tip data-for="activateBackwardsProbTip"/><ReactTooltip id="activateBackwardsProbTip" place="top" effect="solid">
                                    Activa la probabilidad que tiene cada palabra de escribirse al revés
                                    </ReactTooltip></label>
                                <div className={this.props.activateBackwards === false ? "container__backwards__activateBackwards_hidden" : "container__backwards__activateBackwards"}>
                                    <label>Probabilidad de escribir cada palabra al revés <FaInfoCircle data-tip data-for="backwardsProbTip"/><ReactTooltip id="backwardsProbTip" place="top" effect="solid">
                                    Esta probabilidad es independiente para cada palabra. Por defecto es 0,3.
                                    </ReactTooltip></label>
                                    <input type="range" min="0.0" max="1.0" value={this.props.backwardsProbability} step="0.1" id="backwardsProbability" name="backwardsProbability" onChange={this.onChange}/>{this.props.backwardsProbability}
                                </div> 
                            </div>
                            <div className="container">
                                <label><input id="diacritics" type="checkbox" name="diacritics" onChange={this.onChange} checked={this.props.diacritics}/>Mantener tildes <FaInfoCircle data-tip data-for="diacriticsTip"/><ReactTooltip id="diacriticsTip" place="top" effect="solid">
                                    Mantiene las tildes de las palabras dentro de la sopa de letras
                                    </ReactTooltip></label>
                            </div>
                            <div className="container">
                                <label><input id="hiddenWords" type="checkbox" name="hiddenWords" onChange={this.onChange} checked={this.state.hiddenWords}/>Mostrar palabras a buscar <FaInfoCircle data-tip data-for="hiddenWordsTip"/><ReactTooltip id="hiddenWordsTip" place="top" effect="solid">
                                    Muestra en el ejercicio las palabras que hay que buscar en la sopa de letras
                                    </ReactTooltip></label>
                            </div>
                            <div id="errorMessages" className="container__error">
                                {this.props.error}
                            </div>
                            <div id="wordsearch-preview" className={this.props.wordSearchContent.length == 0 ? "container__preview_hidden" : "container__preview"}>
                                <div className="preview">Vista previa</div>
                                <div className="table">
                                    {this.props.wordSearchContent.length > 0 ? <WordSearch data={this.props.wordSearchContent}/> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="moreSpace" onClick={this.props.resetWordSearch}>Resetear</button>
                        <button onClick={this.props.createWordSearch} disabled={!this.props.rows || !this.props.cols || !this.props.dictionary || (!this.props.vertical && !this.props.horizontal && !this.props.diagonal)}>Vista previa</button>
                        <button onClick={this.accept}>Aceptar</button>
                    </div>
                </div>
            </div>
        );
    }
}

//funciones a ejecutar (modificar redux)
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeWordSearchModal()),
    updateRows: (rows) => dispatch(updateWordSearchRows(rows)),
    updateCols: (cols) => dispatch(updateWordSearchCols(cols)),
    updateDictionary: (dictionary) => dispatch(updateWordSearchDictionary(dictionary)),
    updateVertical: (vertical) => dispatch(updateWordSearchVertical(vertical)),
    updateHorizontal: (horizontal) => dispatch(updateWordSearchHorizontal(horizontal)),
    updateDiagonal: (diagonal) => dispatch(updateWordSearchDiagonal(diagonal)),
    updateMaxWords: (maxWords) => dispatch(updateWordSearchMaxWords(maxWords)),
    updateDiacritics: (diacritics) => dispatch(updateWordSearchDiacritics(diacritics)),
    updateActivateBackwards: (activateBackwards) => dispatch(updateWordSearchActivateBackwards(activateBackwards)),
    updateBackwardsProbability: (backwardsProbability) => dispatch(updateWordSearchBackWardsProbability(backwardsProbability)),
    resetWordSearch: () => dispatch(resetWordSearch()),
    createWordSearch: () => dispatch(createWordSearch()),
    updateError: (error) => dispatch(updateWordSearchError(error))
});

//datos (lectura)
const mapStateToProps = createStructuredSelector({
    file: selectCurrentDocument,
    rows: selectWordSearchModalRows,
    cols: selectWordSearchModalCols,
    dictionary: selectWordSearchModalDictionary,
    vertical: selectWordSearchModalVertical,
    horizontal: selectWordSearchModalHorizontal,
    diagonal: selectWordSearchModalDiagonal,
    maxWords: selectWordSearchModalMaxWords,
    diacritics: selectWordSearchModalDiacritics,
    activateBackwards: selectWordSearchModalActivateBackwards,
    backwardsProbability: selectWordSearchModalBackwardsProbability,
    error: selectWordSearchModalError,
    wordSearchContent: selectWordSearchModalWordSearchContent,
    editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps)(WordSearchModal);