import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { closeDevelopModal, resetDevelopModal, updateDevelopExtraSpace, updateDevelopNumLines, updateDevelopText } from '../../redux/develop/develop.actions';
import { selectDevelopExtraSpace, selectDevelopNumLines, selectDevelopText} from "../../redux/develop/develop.selectors";
import './develop.scss'
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";

class DevelopModal extends React.Component {
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
  this.props.editor.execute( 'insertDevelop', {text: this.props.text, numLines: this.props.numLines, extraspace: this.props.extraspace});
  this.props.editor.editing.view.focus();
  this.props.resetDevelopModal();
  this.props.closeDevelopModal();
}

handleChange(e) {
  switch(e.target.name){
    case "text":
      this.props.updateDevelopText(e.target.value);
      break;
    case "numLines":
      this.props.updateDevelopNumLines(e.target.value);
      break;
    case "extraspace":
      this.props.updateDevelopExtraSpace(e.target.checked);
      break;
    default:
      break;
  }
}
    render() {
      return (
      <Draggable bounds="body" disabled={this.state.disableDrag}>
        <div className="modal-develop">
          <div className="modal-develop__content">
            <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalDevelopTip">
              <ReactTooltip id="modalDevelopTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>Si me mantienes pulsado, ¡puedes arrastrarme a cualquier posición de la página!</ReactTooltip>
                <button onClick={this.props.closeDevelopModal}><GrFormClose size="1.3em"/></button>
            </div>
            <div className="modal-develop__content__main">
              <div className="modal-develop__content__main__container">
                <div className="container__text">
                  <label>Inserte el enunciado del ejercicio de desarrollo: </label>
                  <textarea id="text" name="text" value={this.props.text} onChange={this.handleChange} rows = "10" cols = "100"/>
                </div>
                <div className="container">
                  <label>Número de líneas para el ejercicio:<input type="number" id="numLines" name="numLines" min="1" value={this.props.numLines} onChange={this.handleChange}/></label> 
                </div>
                <div className="container__extraspace">
                  <label><input id="extraspace" type="checkbox" name="extraspace" onChange={this.handleChange} checked={this.props.extraspace}/>Añadir espacio extra entre líneas</label> 
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="reset" onClick={this.props.resetDevelopModal}>Resetear</button>
              <button className="accept" onClick={this.accept} disabled={!this.props.text || !this.props.numLines}>Aceptar</button>
            </div>
          </div>
        </div>
      </Draggable>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    closeDevelopModal: () => dispatch(closeDevelopModal()),
    updateDevelopNumLines: (numLines) => dispatch(updateDevelopNumLines(numLines)),
    updateDevelopText: (text) => dispatch(updateDevelopText(text)),
    updateDevelopExtraSpace: (extraspace) => dispatch(updateDevelopExtraSpace(extraspace)),
    resetDevelopModal: () => dispatch(resetDevelopModal())
  });
  
  const mapStateToProps = createStructuredSelector({
    numLines: selectDevelopNumLines,
    text: selectDevelopText,
    extraspace: selectDevelopExtraSpace,
    editor: selectEditorClass
  });

export default connect(mapStateToProps, mapDispatchToProps)(DevelopModal);