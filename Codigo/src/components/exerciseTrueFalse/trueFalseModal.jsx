import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { closeTrueFalseModal, updateTrueFalseText, resetTrueFalseModal, addMoreTrueFalse, deleteTrueFalse, updateAddHowToSolve, updateChooseListType } from '../../redux/trueFalse/trueFalse.actions';
import { selectTrueFalseModalAddHowToSolve, selectTrueFalseModalChooseListType, selectTrueFalseText} from "../../redux/trueFalse/trueFalse.selectors";
import './trueFalse.scss'
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
//Iconos
import {GoPlus, GoDash} from 'react-icons/go';
import { IoMdClose } from "react-icons/io";
import { FcInfo } from 'react-icons/fc';

class TrueFalseModal extends React.Component {
    constructor(props) {
      super();
      this.state ={
        disableTip: false,
        disableDrag: true
    }
    this.dragRef = React.createRef();
    this.nameInputs = [];
    this.focus = null;
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
    this.props.editor.execute( 'insertTrueFalse', {text: this.props.text, addHowToSolve: this.props.addHowToSolve, listType: this.props.listType});
    this.props.editor.editing.view.focus();
    this.props.resetTrueFalseModal();
    this.props.closeTrueFalseModal();
  }

  handleChangeText(e, i){
    this.props.updateTrueFalseText(e.target.value, i);
  }

  handleChange = (e) =>{
    switch(e.target.name){
      case "addHowToSolve":
        this.props.updateAddHowToSolve(e.target.checked);
        break;
      case "listType":
        this.props.updateListType(e.target.value);
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

  handleRemoveRow = (i) =>{
    if(this.focus.name > this.nameInputs[i].name)
      this.focus = this.nameInputs[this.focus.name.charAt(this.focus.name.length - 1)-1];
    else {
      if(this.focus.name === this.nameInputs[i].name && i === this.nameInputs.length - 1)
        this.focus = this.nameInputs[i-1];
    }
    this.props.deleteTrueFalse(i);
    this.nameInputs = [...this.nameInputs.slice(0,i), ...this.nameInputs.slice(i+1)];
  }

  componentDidUpdate(prevProps){
    this.nameInputs = this.nameInputs.filter(item => item !== null); //HACK: after removing, there is a null at last pos
    if(this.props.text.length > prevProps.text.length){
      this.focus = this.nameInputs[this.props.text.length-1];
    }
    this.focus.focus();
  }

  componentDidMount(){
    this.nameInputs[0].focus();
  }

  handleFocus = (i) =>{
    this.focus = this.nameInputs[i];
  }

  render() {
    return (
    <Draggable nodeRef={this.dragRef} bounds="body" disabled={this.state.disableDrag}>
      <div ref={this.dragRef} className="modal-truefalse">
        <div className="modal-truefalse__content">
          <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modaltruefalseTip">
            <ReactTooltip id="modaltruefalseTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>¡Puedes arrastrar esta ventana a cualquier parte si mantienes pulsada la parte superior de la misma!</ReactTooltip>
              <button onClick={this.props.closeTrueFalseModal}><IoMdClose size="1.2em"/></button>
          </div>
          <div className="modal-truefalse__content__main">
            <div className="modal-truefalse__content__main__container">
              <div className="container__info">
                <span>* Campos obligatorios</span>
              </div>
              <label><span>*</span>Inserte las frases del ejercicio (una por fila):<FcInfo data-tip data-for="dictionaryTip"/><ReactTooltip id="dictionaryTip" place="top" effect="solid">
                                        Puedes añadir más filas pulsando la tecla enter dentro de los recuadros
                                        </ReactTooltip></label>
              {this.props.text.map((el, i) =>{
                return(
                <div key={"tf-" + i} className="container__text">
                  <input ref={(input) => {this.nameInputs[i] = input;}} type="text" name={"text"+i} autoComplete="off" value={el} onChange={(e) =>{ this.handleChangeText(e, i)}} onKeyDown={this.handleKeyDown} onFocus={() => this.handleFocus(i)}/>
                  <button data-tip data-for="addTip" className="add" onClick={this.props.addMoreTrueFalse}><GoPlus color="white" size="1.3em"/><ReactTooltip id="addTip" place="top" effect="solid">Añadir más filas</ReactTooltip></button>
                  {<button data-tip data-for="deleteTip" className="delete" disabled={this.props.text.length === 1} onClick={() => {this.handleRemoveRow(i)}}><GoDash color="white" size="1.3em"/><ReactTooltip id="deleteTip" place="top" effect="solid">Quitar fila</ReactTooltip></button>}
                </div>
              )})}
              <div className="container__chooseListType">
                <label><span>*</span>Selecciona la forma en la que se muestran las frases:</label>
                <div className="container__chooseListType__type">
                  <label><input type="radio" value="ul" name="listType" checked={this.props.listType === "ul"} onChange={this.handleChange}/>Lista no ordenada</label>
                  <label><input type="radio" value="ol" name="listType" checked={this.props.listType === "ol"} onChange={this.handleChange}></input>Lista ordenada</label>
                </div>
              </div>
              <div className="container__addHowToSolve">
                <label><input id="addHowToSolve" type="checkbox" name="addHowToSolve" onChange={this.handleChange} checked={this.props.addHowToSolve}/>Añadir ejemplo de cómo resolver el ejercicio</label>
              </div>
            </div>
          </div>
          <div className="footer">
            <button className="reset" onClick={this.props.resetTrueFalseModal}>Resetear</button>
            <button className="accept" onClick={this.accept} disabled={this.props.text.filter(def => def === "").length > 0 || !this.props.listType}>Aceptar</button>
          </div>
        </div>
      </div>
    </Draggable>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeTrueFalseModal: () => dispatch(closeTrueFalseModal()),
  updateTrueFalseText: (text, index) => dispatch(updateTrueFalseText(text, index)),
  resetTrueFalseModal: () => dispatch(resetTrueFalseModal()),
  addMoreTrueFalse: () => dispatch(addMoreTrueFalse()),
  deleteTrueFalse: (index) => dispatch(deleteTrueFalse(index)),
  updateAddHowToSolve: (add) => dispatch(updateAddHowToSolve(add)),
  updateListType: (type) => dispatch(updateChooseListType(type))
});

const mapStateToProps = createStructuredSelector({
  text: selectTrueFalseText,
  addHowToSolve: selectTrueFalseModalAddHowToSolve,
  listType: selectTrueFalseModalChooseListType,
  editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalseModal);