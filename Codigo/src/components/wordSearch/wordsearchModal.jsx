import "./wordsearch.styles.scss";
import React from 'react';
//const wordsearchGenerator = require('wordsearch-generator');
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { closeWordSearchModal } from "../../redux/wordSearch/wordsearch.actions";
import { selectCurrentDocument, selectDocumentFile } from "../../redux/document/document.selectors";

class WordSearchModal extends React.Component{
    constructor(){
        super();
        this.accept = this.accept.bind(this);
        this.preview = this.preview.bind(this);
        this.onChange = this.onChange.bind(this);
        this.initialState = {
            language: "es",
            rows: '',
            cols: '',
            words: "",
            hiddenWords: '',
            error: "",
            preview: <tr><td></td></tr> //init
        };

        this.state = this.initialState;
        this.ready = false;
    }

    accept(){
        document.getElementById("wordsearch-preview").hidden = true;
        this.setState(this.initialState);
        //Falta que la sopa de letras creada se escriba en el editor
    }

    onChange(e){
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const key = e.target.name;
        this.setState({
            ...this.state,
            [key]: value
        });
    }

    renderPreview(lines){
        let table = [];
        for(let i = 0; i < this.state.rows; ++i){
            let children = [];
            for(let j = 0; j < this.state.cols*2 - 1; ++j){
                if(lines[i][j] !== " "){
                    var ch = "td-" + i + j;
                    children.push(<td key={ch}>{lines[i][j]}</td>)
                }
            }
            var p = "tr-" + i;
            table.push(<tr key={p}>{children}</tr>);
        }

        return table;
    }

    preview(){
        const words = this.state.words.split(',');

        try{
         //   let puzzleGrid = wordsearchGenerator.createPuzzle(parseInt(this.state.cols), parseInt(this.state.rows), this.state.language, words);
          //  puzzleGrid = wordsearchGenerator.hideWords(puzzleGrid, this.state.language);
            let lines = 0 //wordsearchGenerator.printGrid(puzzleGrid);
            for(let i = 0; i < lines.length; ++i){
                console.log(lines[i]);
            }
            let res = this.renderPreview(lines);
            document.getElementById("wordsearch-preview").hidden = false;
            this.ready = true;
            this.setState({
                ...this.state,
                error: "",
                preview: res
            });
        }
        catch(error){
            if(error.includes("Grid Width") || error.includes("Grid Height") || error.includes("Unable")){
                this.setState({
                    ...this.state,
                    error: "El tamaño de las filas y/o columnas no es el adecuado para colocar todas las palabras. Prueba a aumentar dichos valores."
                });
            }
            else {
                this.setState({
                    ...this.state,
                    error: "Ha ocurrido un error inesperado. Inténtalo de nuevo (prueba a cambiar el valor de las filas y/o columnas)."
                });
            }
            document.getElementById("wordsearch-preview").hidden = true;
            this.ready = false;
        }
    }

    render(){
        return(
            <div className={"wordsearchModal display-block"}>
                <div className="modal-main">
                    <div className="div-pdf">
                        <object className='wordSearchModal-pdf-file' data={this.props.file} type="application/pdf">a</object>
                    </div>
                    <div className="wordsearch-data">
                        <div>
                            <div className="close">
                                <button onClick={this.props.closeWordsearchModal}>X</button>
                            </div>
                            <div className="accept">
                                <button onClick={this.preview} disabled={!this.state.rows || !this.state.cols || !this.state.words}>Vista previa</button>
                                <button onClick={this.accept} disabled={!this.ready}>Aceptar</button>
                            </div>
                        </div>
                        <div className="wordsearch-container">
                            <div className="container">
                                Idioma
                                    <select id="language" name="language" onChange={this.onChange} value={this.state.language}>
                                    <option value="es">Español</option>
                                    <option value="en">Inglés</option>
                                </select>
                                Filas <input name="rows" type="number" min="1" onChange={this.onChange} value={this.state.rows}/>
                                Columnas <input name="cols" type="number" min="1" onChange={this.onChange} value={this.state.cols}/>
                            </div>
                            <div className="container">
                                <textarea id="words" name="words" placeholder="Escribe las palabras a buscar (separadas por comas):" 
                                onChange={this.onChange} value={this.state.words}></textarea>
                            </div>
                            <div className="container">
                                <input id="hiddenWords" type="checkbox" name="hiddenWords" onChange={this.onChange} checked={this.state.hiddenWords}></input> Mostrar palabras a buscar
                            </div>
                            <div id="errorMessages" className="container error">
                                {this.state.error}
                            </div>
                            <div id="wordsearch-preview" className="container" hidden>
                                <div className="preview center">Vista previa</div>
                                <div className="center">
                                <table>
                                    <tbody>
                                        {this.state.preview}
                                    </tbody>
                                </table>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeWordsearchModal: () => dispatch(closeWordSearchModal())
});

const mapStateToProps = createStructuredSelector({
    file: selectCurrentDocument
});

export default connect(mapStateToProps, mapDispatchToProps)(WordSearchModal);