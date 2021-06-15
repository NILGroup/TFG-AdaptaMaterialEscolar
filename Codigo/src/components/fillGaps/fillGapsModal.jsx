import "./fillGaps.scss";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { selectFillGapsModalAddHowToSolve, selectFillGapsModalMode, selectFillGapsModalText, selectFillGapsModalTextSelection, selectFillGapsModalWordsSelected } from "../../redux/fillGaps/fillgaps.selectors";
import { closeFillGapsModal, resetFillGaps, updateFillGapsAddHowToSolve, updateFillGapsAddSelectedWord, updateFillGapsDeleteSelectedWord, updateFillGapsMode, resetFillGapsWordSelection, updateFillGapsText, updateFillGapsTextSelection } from "../../redux/fillGaps/fillgaps.actions";
import { IoMdClose } from "react-icons/io";
import { selectEditorClass } from "../../redux/editor/editor.selectors";

class FillGapsModal extends React.Component{
    constructor(props) {
        super();
        this.state ={
          disableTip: false,
          disableDrag: true
      }
      this.dragRef = React.createRef();
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
      
    accept = () => {
      /*this.props.editor.execute( 'insertTrueFalse', {text: this.props.text, addHowToSolve: this.props.addHowToSolve, listType: this.props.listType});
      this.props.editor.editing.view.focus();
      this.props.resetTrueFalseModal();
      this.props.closeTrueFalseModal();*/

      //coger las cosas del array wordsSelected y ensamblarlo. el espacio es &nbsp;
      this.props.editor.execute('insertFillGaps', {text: this.props.textSelection, addHowToSolve: this.props.addHowToSolve});
      this.props.editor.editing.view.focus();
      this.props.resetFillGaps();
      this.props.closeModal();
    }
  
    handleChange = (e) =>{
      switch(e.target.name){
        case "addHowToSolve":
          this.props.updateAddHowToSolve(e.target.checked);
          break;
        case "text":
          this.props.updateText(e.target.value);
          break;
        default:
          break;
      }
    }
  
    handleKeyDown = (e) =>{
      if(e.keyCode === 13){ //enter
        this.props.addMoreTrueFalse();
      }
    }
  
    componentDidUpdate(prevProps){
        if(this.props.text !== prevProps.text && this.props.text === ""){
          this.nameTextarea.focus();
        }
      }
  
    componentDidMount(){
        this.nameTextarea.focus();
    }

    handleOnClick(e, i){
      if(this.props.textSelection[i].startsWith("_")){
        this.props.updateDeleteSelectedWord(i);
      }
      else{
        this.props.updateAddSelectedWord(e.target.textContent, i);
      }
    }

    changeToEdition = () => {
      this.props.updateMode("edition");
      this.props.resetWordSelected();
    }

    changeToSelection = () =>{
      this.props.updateMode("selection");
      this.props.updateTextSelection();
    }
  
    render() {
      return (
      <Draggable nodeRef={this.dragRef} bounds="body" disabled={this.state.disableDrag}>
        <div ref={this.dragRef} className="modal-fillGaps">
          <div className="modal-fillGaps__content">
            <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalfillGapsTip">
              <ReactTooltip id="modalfillGapsTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>¡Puedes arrastrar esta ventana a cualquier parte si mantienes pulsada la parte superior de la misma!</ReactTooltip>
                <button onClick={this.props.closeModal}><IoMdClose size="1.2em"/></button>
            </div>
            <div className="modal-fillGaps__content__main">
                <div className="modal-fillGaps__content__main__container">
                    <div className="container__info">
                        <span>* Campos obligatorios</span>
                    </div>
                    {this.props.mode === "edition" ?
                    <div className="container__text">
                      <label><span>*</span>Inserte el texto del que se quiera quitar palabras:</label>
                      <textarea ref={(textarea) => {this.nameTextarea = textarea;}} id="text" name="text" value={this.props.text} onChange={this.handleChange} cols = "70"/>
                    </div>
                    :
                    <div className="container__textPreview">
                      <label><span>*</span>Haga clic en las palabras que se quiera poner un hueco:</label>
                      <div className="container__textPreview__words">
                        {this.props.textSelection.map((el, i) =>{
                          return(
                            <div key={"w-" + i} className="wordsContainer">
                              <span className="wordClickable" onClick={(e) => {this.handleOnClick(e,i)}}>{el}</span>
                              <span>&nbsp;</span>
                           </div>
                          )
                        })}
                      </div>
                    </div>
                    }
                    <div className="container__selectOrEdit">
                      {this.props.mode === "edition" ?
                      <button className="selectEdit" disabled={!this.props.text} onClick={this.changeToSelection}>Seleccionar palabras</button>
                      :
                      <button className="selectEdit" onClick={this.changeToEdition}>Editar texto</button>
                      }
                    </div>
                    <div className="container__addHowToSolve">
                        <label><input id="addHowToSolve" type="checkbox" name="addHowToSolve" onChange={this.handleChange} checked={this.props.addHowToSolve}/>Añadir ejemplo de cómo resolver el ejercicio</label>
                    </div>
                </div>
            </div>
            <div className="footer">
              <button className="reset" onClick={this.props.resetFillGaps}>Resetear</button>
              <button className="accept" onClick={this.accept} disabled={this.props.wordsSelected.length === 0}>Aceptar</button>
            </div>
          </div>
        </div>
      </Draggable>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeFillGapsModal()),
    updateText: (text) => dispatch(updateFillGapsText(text)),
    updateAddHowToSolve: (add) => dispatch(updateFillGapsAddHowToSolve(add)),
    resetFillGaps: () => dispatch(resetFillGaps()),
    updateMode: (mode) => dispatch(updateFillGapsMode(mode)),
    updateTextSelection: () => dispatch(updateFillGapsTextSelection()),
    updateAddSelectedWord: (word, i) => dispatch(updateFillGapsAddSelectedWord(word, i)),
    updateDeleteSelectedWord: (i) => dispatch(updateFillGapsDeleteSelectedWord(i)),
    resetWordSelected: () => dispatch(resetFillGapsWordSelection())
});
  
const mapStateToProps = createStructuredSelector({
    text: selectFillGapsModalText,
    addHowToSolve: selectFillGapsModalAddHowToSolve,
    mode: selectFillGapsModalMode,
    textSelection: selectFillGapsModalTextSelection,
    wordsSelected: selectFillGapsModalWordsSelected,
    editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps)(FillGapsModal);