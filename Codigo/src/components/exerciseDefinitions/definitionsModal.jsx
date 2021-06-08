import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { addMoreDefinitions, deleteDefinition, updateAddHowToSolve, updateChooseListType, updateDefinitionsExtraSpace, updateDefinitionsNumLines, updateDefinitionsText } from '../../redux/definitions/definitions.actions';
import {selectDefinitionsAddHowToSolve, selectDefinitionsChooseListType, selectDefinitionsExtraSpace, selectDefinitionsNumLines, selectDefinitionsText} from "../../redux/definitions/definitions.selectors";
import './definitions.scss'
import ReactTooltip from "react-tooltip";

//Iconos
import {GoPlus, GoDash} from 'react-icons/go';
import { FcInfo } from 'react-icons/fc';

class DefinitionsModal extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state ={
      disableTip: false,
      disableDrag: true
    }
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
    
  handleChange(e) {
    switch(e.target.name){
      case "numLines":
        this.props.updateDefinitionsNumLines(e.target.value);
        break;
      case "extraspace":
        this.props.updateDefinitionsExtraSpace(e.target.checked);
        break;
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

  handleChangeText(e, i){
    this.props.updateDefinitionsText(e.target.value, i);
  }

  handleKeyDown = (e) =>{
    if(e.keyCode === 13){ //enter
      this.props.addMoreDefinitions();
    }
  }

  handleRemoveRow = (i) =>{
    if(this.focus.name > this.nameInputs[i].name)
      this.focus = this.nameInputs[this.focus.name.charAt(this.focus.name.length - 1)-1];
    else {
      if(this.focus.name === this.nameInputs[i].name && i === this.nameInputs.length - 1)
        this.focus = this.nameInputs[i-1];
    }
    this.props.deleteDefinition(i);
    this.nameInputs = [...this.nameInputs.slice(0,i), ...this.nameInputs.slice(i+1)];
  }

  componentDidUpdate(prevProps){
    this.nameInputs = this.nameInputs.filter(item => item !== null); //HACK: after removing, there is a null at last pos
    if(this.props.text.length > prevProps.text.length){
      this.focus = this.nameInputs[this.props.text.length-1];
      this.focus.focus();
    }
    else if(this.props.text.length < prevProps.text.length){
      this.focus.focus();
    }
  }

  componentDidMount(){
    this.nameInputs[0].focus();
  }

  handleFocus = (i) =>{
    this.focus = this.nameInputs[i];
  }

  render() {
    return (
          <div className="modal-definitions__content__main">
            <div className="modal-definitions__content__main__container">
              <div className="container__info">
                <span>* Campos obligatorios</span>
              </div>
              <label><span>*</span>Inserte los conceptos a definir (uno por fila): <FcInfo size="1.2em" data-tip data-for="infoDefTip"/><ReactTooltip id="infoDefTip" place="top" effect="solid">Se puede escribir una palabra, una oración (afirmativa, interrogativa...), etc. <br/> Puedes añadir más filas pulsando la tecla enter dentro de los recuadros</ReactTooltip></label>
                {this.props.text.map((el, i) =>{
                  return(
                  <div key={"def-" + i} className="container__text">
                    <input ref={(input) => {this.nameInputs[i] = input;}} type="text" name={"text"+i} autoComplete="off" value={el} onChange={(e) =>{ this.handleChangeText(e, i)}} onKeyDown={this.handleKeyDown} onFocus={() => this.handleFocus(i)}/>
                    <button data-tip data-for="addTip" className="add" onClick={this.props.addMoreDefinitions}><GoPlus color="white" size="1.3em"/><ReactTooltip id="addTip" place="top" effect="solid">Añadir más filas</ReactTooltip></button>
                    {<button data-tip data-for="deleteTip" className="delete" disabled={this.props.text.length === 1} onClick={() => {this.handleRemoveRow(i)}}><GoDash color="white" size="1.3em"/><ReactTooltip id="deleteTip" place="top" effect="solid">Quitar fila</ReactTooltip></button>}
                  </div>
                )})}
              <div className="container">
                <label><span>*</span>Número de líneas para cada definición:<input type="number" id="numLines" name="numLines" min="1" value={this.props.numLines} onChange={this.handleChange}/></label> 
              </div>
              <div className="container__chooseListType">
                <label><span>*</span>Selecciona la forma en la que se muestran las frases:</label>
                <div className="container__chooseListType__type">
                  <label><input type="radio" value="ul" name="listType" checked={this.props.listType === "ul"} onChange={this.handleChange}/>Lista no ordenada</label>
                  <label><input type="radio" value="ol" name="listType" checked={this.props.listType === "ol"} onChange={this.handleChange}></input>Lista ordenada</label>
                </div>
              </div>
              <div className="container__extraspace">
                <label><input id="extraspace" type="checkbox" name="extraspace" onChange={this.handleChange} checked={this.props.extraspace}/>Añadir espacio extra entre líneas</label> 
              </div>
              <div className="container__addHowToSolve">
                <label><input id="addHowToSolve" type="checkbox" name="addHowToSolve" onChange={this.handleChange} checked={this.props.addHowToSolve}/>Añadir ejemplo de cómo resolver el ejercicio</label>
              </div>
            </div>
          </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateDefinitionsNumLines: (numLines) => dispatch(updateDefinitionsNumLines(numLines)),
  updateDefinitionsText: (text, index) => dispatch(updateDefinitionsText(text, index)),
  updateDefinitionsExtraSpace: (extraspace) => dispatch(updateDefinitionsExtraSpace(extraspace)),
  addMoreDefinitions: () => dispatch(addMoreDefinitions()),
  deleteDefinition: (index) => dispatch(deleteDefinition(index)),
  updateAddHowToSolve: (add) => dispatch(updateAddHowToSolve(add)),
  updateListType: (type) => dispatch(updateChooseListType(type))
});

const mapStateToProps = createStructuredSelector({
  numLines: selectDefinitionsNumLines,
  text: selectDefinitionsText,
  extraspace: selectDefinitionsExtraSpace,
  addHowToSolve: selectDefinitionsAddHowToSolve,
  listType: selectDefinitionsChooseListType
});

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionsModal);

