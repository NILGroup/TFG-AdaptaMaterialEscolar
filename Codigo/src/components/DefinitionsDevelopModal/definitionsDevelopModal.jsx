import "./definitionsDevelop.scss"
import React from 'react';
import { createStructuredSelector } from 'reselect';
import Draggable from 'react-draggable';
import ReactTooltip from "react-tooltip";
import { connect } from 'react-redux';
import { closeDefinitionsDevelopModal, resetDefinitionsDevelopModal, updateSelectedExercise } from '../../redux/definitionsDevelopModal/definitionsDevelopModal.actions';
import { selectDefinitionsDevelopModalSelectedExercise } from '../../redux/definitionsDevelopModal/definitionsDevelopModal.selectors';
import DefinitionsModal from "../exerciseDefinitions/definitionsModal";
import DevelopModal from "../exerciseDevelop/developModal";
import { resetDevelopModal } from "../../redux/develop/develop.actions";
import { resetDefinitionsModal } from "../../redux/definitions/definitions.actions";

import { IoMdClose } from "react-icons/io";
import { selectDefinitionsAddHowToSolve, selectDefinitionsChooseListType, selectDefinitionsExtraSpace, selectDefinitionsNumLines, selectDefinitionsText } from "../../redux/definitions/definitions.selectors";
import { selectDevelopAddHowToSolve, selectDevelopExtraSpace, selectDevelopNumLines, selectDevelopText } from "../../redux/develop/develop.selectors";
import { selectEditorClass } from "../../redux/editor/editor.selectors";

class DefinitionsDevelopModal extends React.Component{
    constructor(props) {
        super();
        this.handleChange = this.handleChange.bind(this);
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

  accept = () =>{
      if(this.props.selectedExercise === "definitions"){
        this.props.editor.execute( 'insertDefinitions', {text: this.props.textDefinitions, numLines: this.props.numLinesDefinitions, extraspace: this.props.extraspaceDefinitions, addHowToSolve: this.props.addHowToSolveDef, listType: this.props.listTypeDef});
        
        this.props.resetDefinitionsModal();
      }
      else{
        this.props.editor.execute( 'insertDevelop', {text: this.props.textDevelop, numLines: this.props.numLinesDevelop, extraspace: this.props.extraspaceDevelop, addHowToSolve: this.props.addHowToSolveDev});
        this.props.resetDevelopModal();
      }
      this.props.editor.editing.view.focus();
      this.props.resetDefinitionsDevelopModal();
      this.props.closeDefinitionsDevelopModal();
  }

  handleChange(e){
    this.props.updateSelectedExercise(e.target.value);
  }

  render(){
      return(
        <Draggable bounds="body" disabled={this.state.disableDrag}>
            <div className="modal-DefinitionsDevelop">
                <div className="modal-DefinitionsDevelop__content">
                    <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalDefinitionsTip">
                        <ReactTooltip id="modalDefinitionsTip" place="top" effect="solid" delayHide={2000} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>¡Puedes arrastrar esta ventana a cualquier parte si mantienes pulsada la parte superior de la misma!</ReactTooltip>
                        <button onClick={this.props.closeDefinitionsDevelopModal}><IoMdClose size="1.2em"/></button>
                    </div>
                    <div className="selectExercise">
                        <label>Selecciona el ejercicio:</label>
                        <div className="radios">
                            <label><input type="radio" value="definitions" name="definitions" checked={this.props.selectedExercise === "definitions"} onChange={this.handleChange}/>Definiciones/Preguntas</label>
                            <label><input type="radio" value="develop" name="develop" checked={this.props.selectedExercise === "develop"} onChange={this.handleChange}></input>Desarrollo</label>
                        </div>
                    </div>
                    {this.props.selectedExercise === "definitions" ? 
                        <DefinitionsModal/> : 
                        this.props.selectedExercise === "develop" ?
                        <DevelopModal/>
                        :
                        null
                    }
                    {this.props.selectedExercise === "definitions" ?
                        <div className="footer">
                            <button className="reset" onClick={this.props.resetDefinitionsModal}>Resetear</button>
                            <button className="accept" onClick={this.accept} disabled={this.props.textDefinitions.filter(def => def === "").length > 0 || !this.props.numLinesDefinitions || !this.props.listTypeDef}>Aceptar</button>
                        </div>
                        :
                        this.props.selectedExercise === "develop" ?
                        <div className="footer">
                            <button className="reset" onClick={this.props.resetDevelopModal}>Resetear</button>
                            <button className="accept" onClick={this.accept} disabled={!this.props.textDevelop || !this.props.numLinesDevelop}>Aceptar</button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </Draggable>
      );
  }
  
}

const mapDispatchToProps = (dispatch) =>({
    closeDefinitionsDevelopModal: () => dispatch(closeDefinitionsDevelopModal()),
    updateSelectedExercise: (value) => dispatch(updateSelectedExercise(value)),
    resetDevelopModal: () => dispatch(resetDevelopModal()),
    resetDefinitionsModal: () => dispatch(resetDefinitionsModal()),
    resetDefinitionsDevelopModal: () => dispatch(resetDefinitionsDevelopModal())

});

const mapStateToProps = createStructuredSelector({
    selectedExercise: selectDefinitionsDevelopModalSelectedExercise,
    textDefinitions: selectDefinitionsText,
    textDevelop: selectDevelopText,
    numLinesDefinitions: selectDefinitionsNumLines,
    numLinesDevelop: selectDevelopNumLines,
    extraspaceDefinitions: selectDefinitionsExtraSpace,
    extraspaceDevelop: selectDevelopExtraSpace,
    addHowToSolveDef: selectDefinitionsAddHowToSolve,
    addHowToSolveDev: selectDevelopAddHowToSolve,
    listTypeDef: selectDefinitionsChooseListType,
    editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps) (DefinitionsDevelopModal);