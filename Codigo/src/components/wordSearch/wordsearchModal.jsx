import "./wordsearch.styles.scss";
import React from 'react';
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { FaInfoCircle } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentDocument } from "../../redux/document/document.selectors";
import { closeWordSearchModal, updateWordSearchRows, updateWordSearchCols, updateWordSearchDictionary, updateWordSearchDiagonal, updateWordSearchHorizontal, 
    updateWordSearchVertical, updateWordSearchMaxWords, updateWordSearchActivateBackwards,
    updateWordSearchBackWardsProbability, resetWordSearch, createWordSearch, updateWordSearchError, updateWordSearchReady,
    updateWordSearchHiddenWords, updateWordSearchReadyToCreate} from "../../redux/wordSearch/wordsearch.actions";
import { selectWordSearchModalRows, selectWordSearchModalCols, selectWordSearchModalDictionary, selectWordSearchModalVertical, selectWordSearchModalHorizontal, 
    selectWordSearchModalDiagonal, selectWordSearchModalMaxWords, selectWordSearchModalActivateBackwards, 
    selectWordSearchModalBackwardsProbability, selectWordSearchModalError, selectWordSearchModalReady, selectWordSearchModalHiddenWords, selectWordSearchModalWordSearchObj, selectWordSearchModalReadyToCreate} from "../../redux/wordSearch/wordsearch.selectors";

import WordSearch from "../wordSearch/wordSearch";
import { selectEditorClass } from "../../redux/editor/editor.selectors";

class WordSearchModal extends React.Component{
    constructor(props){
        super();
        this.onChange = this.onChange.bind(this);
        this.state ={
            disableTip: false,
            disableDrag: true
        }
    }

    disableTip = () =>{
        this.setState({
            disableTip: true
        });
    }

    toggleDisableDrag = () =>{
        this.setState({
            disableDrag: !this.state.disableDrag
        });
    }

    handleClick = () => {
        this.props.createWordSearch();
        if(!this.props.readyToCreate){
            this.props.updateReadyToCreate(true);
        }
    }

    generateTable = () =>{
        if(this.props.readyToCreate){
            if(this.props.wordSearchObject !== null){
                if(this.props.wordSearchObject.words.length < this.props.dictionary.split(",").map(item => item.trim()).length){
                    this.props.updateError("No todas las palabras introducidas están en la sopa de letras. Prueba a cambiar el valor de las filas, columnas y/o número máximo de palabras");
                }
                else{
                    this.props.updateError("");
                }
                this.props.updateReady(true);
                return(
                    <WordSearch data={this.props.wordSearchObject}/>
                );
            }
            else{
                this.props.updateError("Las filas y columnas deben tener un valor positivo mayor que 0");
                this.props.updateReady(false);
                this.props.updateReadyToCreate(false);
                return null;
            }
        }
    }

    accept = () => {
        this.props.editor.execute( 'insertWordSearch', {grid: this.props.wordSearchObject.grid, words: this.props.wordSearchObject.words, showWords: this.props.hiddenWords});
        this.props.editor.editing.view.focus();
        this.props.closeModal();
        this.props.resetWordSearch();
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
            case "activateBackwards":
                this.props.updateActivateBackwards(e.target.checked);
                break;
            case "backwardsProbability":
                this.props.updateBackwardsProbability(e.target.value);
                break;
            case "hiddenWords":
                this.props.updateHiddenWords(e.target.checked);
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <Draggable bounds="body" disabled={this.state.disableDrag}>
                <div className="wordsearchModal">
                    <div className="wordsearchModal__content">
                        <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalWordSearchTip">
                        <ReactTooltip id="modalWordSearchTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>Si me mantienes pulsado, ¡puedes arrastrarme a cualquier posición de la página!</ReactTooltip>
                            <button onClick={this.props.closeModal}><GrFormClose size="1.3em"/></button>
                        </div>
                        <div className="modal-main">
                            <div className="wordsearch-container">
                                <div className="container__info">
                                    <span>* Campos obligatorios</span>
                                </div>
                                <div className="container">
                                    <label><span>*</span>Filas</label> <input name="rows" type="number" min="1" onChange={this.onChange} value={this.props.rows}/>
                                    <label><span>*</span>Columnas</label> <input name="cols" type="number" min="1" onChange={this.onChange} value={this.props.cols}/>
                                    <label>Número máximo de palabras <FaInfoCircle data-tip data-for="maxWordsTip"/><ReactTooltip id="maxWordsTip" place="top" effect="solid">
                                        Número máximo de palabras que se insertarán en la sopa de letras. Por defecto es 20.
                                        </ReactTooltip></label> <input name="maxWords" type="number" min="1" value={this.props.maxWords} onChange={this.onChange}/>
                                </div>
                                
                                <div className="container">
                                    <span>*</span><textarea id="dictionary" name="dictionary" placeholder="Escribe las palabras a buscar separadas por comas (ejemplo: perro, lobo, gallina):" 
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
                                        {this.props.activateBackwards ?
                                        <div className="container__backwards__activateBackwards">
                                            <label>Probabilidad de escribir cada palabra al revés <FaInfoCircle data-tip data-for="backwardsProbTip"/><ReactTooltip id="backwardsProbTip" place="top" effect="solid">
                                            Esta probabilidad es independiente para cada palabra. Por defecto es 0,3.
                                            </ReactTooltip></label>
                                            <div>
                                                <input type="range" min="0.0" max="1.0" value={this.props.backwardsProbability} step="0.1" id="backwardsProbability" name="backwardsProbability" onChange={this.onChange}/>{this.props.backwardsProbability}
                                            </div>
                                        </div>
                                        :
                                        null
                                        }
                                </div>

                                {this.props.error !== "" ?
                                    <div id="errorMessages" className="container__error">
                                        {this.props.error}
                                    </div>
                                :
                                null}   
                                
                                {this.props.wordSearchObject !== null ?
                                <div id="wordsearch-preview" className="container__preview">
                                    <div className="preview">Vista previa</div>
                                    <div className="board">
                                        {this.generateTable()}
                                    </div>
                                </div>
                                :
                                null}
                                {this.props.ready ? 
                                    <div className="container">
                                    <label><input id="hiddenWords" type="checkbox" name="hiddenWords" onChange={this.onChange} checked={this.props.hiddenWords}/>Mostrar en el ejercicio las palabras a buscar</label>
                                    </div>
                                :
                                null}
                                
                            </div>
                        </div>
                        <div className="footer">
                            <button className="reset" onClick={this.props.resetWordSearch}>Resetear</button>
                            <button className="previewView" onClick={this.handleClick} disabled={!this.props.rows || !this.props.cols || !this.props.dictionary || (!this.props.vertical && !this.props.horizontal && !this.props.diagonal)}>Vista previa</button>
                            <button className="accept" onClick={this.accept} disabled={!this.props.ready}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </Draggable>
            
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
    updateActivateBackwards: (activateBackwards) => dispatch(updateWordSearchActivateBackwards(activateBackwards)),
    updateBackwardsProbability: (backwardsProbability) => dispatch(updateWordSearchBackWardsProbability(backwardsProbability)),
    resetWordSearch: () => dispatch(resetWordSearch()),
    createWordSearch: () => dispatch(createWordSearch()),
    updateError: (error) => dispatch(updateWordSearchError(error)),
    updateHiddenWords: (hiddenWords) => dispatch(updateWordSearchHiddenWords(hiddenWords)),
    updateReady: (ready) => dispatch(updateWordSearchReady(ready)),
    updateReadyToCreate: (readyToCreate) => dispatch(updateWordSearchReadyToCreate(readyToCreate))
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
    activateBackwards: selectWordSearchModalActivateBackwards,
    backwardsProbability: selectWordSearchModalBackwardsProbability,
    error: selectWordSearchModalError,
    wordSearchObject: selectWordSearchModalWordSearchObj,
    hiddenWords: selectWordSearchModalHiddenWords,
    ready: selectWordSearchModalReady,
    readyToCreate: selectWordSearchModalReadyToCreate,
    editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps)(WordSearchModal);