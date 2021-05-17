import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { closeDefinitionsModal, resetDefinitionsModal, updateDefinitionsExtraSpace, updateDefinitionsNumLines, updateDefinitionsText } from '../../redux/definitions/definitions.actions';
import {selectDefinitionsExtraSpace, selectDefinitionsNumLines, selectDefinitionsText} from "../../redux/definitions/definitions.selectors";
import './definitions.scss'
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";

class DefinitionsModal extends React.Component {
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
    
    accept = () => {
      this.props.editor.execute( 'insertDefinitions', {text: this.props.text, numLines: this.props.numLines, extraspace: this.props.extraspace});
      this.props.editor.editing.view.focus();
      this.props.resetDefinitionsModal();
      this.props.closeDefinitionsModal();
    }
    
    handleChange(e) {
      switch(e.target.name){
        case "text":
          this.props.updateDefinitionsText(e.target.value);
          break;
        case "numLines":
          this.props.updateDefinitionsNumLines(e.target.value);
          break;
        case "extraspace":
          this.props.updateDefinitionsExtraSpace(e.target.checked);
          break;
        default:
          break;
      }
    }

    render() {
      return (
      <Draggable bounds="body" disabled={this.state.disableDrag}>
        <div className="modal-definitions">
          <div className="modal-definitions__content">
            <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalDefinitionsTip">
              <ReactTooltip id="modalDefinitionsTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>Si me mantienes pulsado, ¡puedes arrastrarme a cualquier posición de la página!</ReactTooltip>
                <button onClick={this.props.closeDefinitionsModal}><GrFormClose size="1.3em"/></button>
            </div>
            <div className="modal-definitions__content__main">
              <div className="modal-definitions__content__main__container">
                <div className="container__text">
                  <label>Inserte los conceptos a definir, separados por comas: </label>
                  <textarea id="text" name="text" value={this.props.text} onChange={this.handleChange} rows = "10" cols = "100"/>
                </div>
                <div className="container">
                  <label>Número de líneas para cada definición:<input type="number" id="numLines" name="numLines" min="1" value={this.props.numLines} onChange={this.handleChange}/></label> 
                </div>
                <div className="container__extraspace">
                  <label><input id="extraspace" type="checkbox" name="extraspace" onChange={this.handleChange} checked={this.props.extraspace}/>Añadir espacio extra entre líneas</label> 
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="reset" onClick={this.props.resetDefinitionsModal}>Resetear</button>
              <button className="accept" onClick={this.accept} disabled={!this.props.text || !this.props.numLines}>Aceptar</button>
            </div>
          </div>
        </div>
      </Draggable>
      );
    }
  }

const mapDispatchToProps = (dispatch) => ({
  closeDefinitionsModal: () => dispatch(closeDefinitionsModal()),
  updateDefinitionsNumLines: (numLines) => dispatch(updateDefinitionsNumLines(numLines)),
  updateDefinitionsText: (text) => dispatch(updateDefinitionsText(text)),
  updateDefinitionsExtraSpace: (extraspace) => dispatch(updateDefinitionsExtraSpace(extraspace)),
  resetDefinitionsModal: () => dispatch(resetDefinitionsModal())
});

const mapStateToProps = createStructuredSelector({
  numLines: selectDefinitionsNumLines,
  text: selectDefinitionsText,
  extraspace: selectDefinitionsExtraSpace,
  editor: selectEditorClass
});

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionsModal);

