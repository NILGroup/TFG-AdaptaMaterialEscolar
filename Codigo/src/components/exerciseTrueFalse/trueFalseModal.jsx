import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { closeTrueFalseModal, openTrueFalseModal, updateTrueFalseText, resetTrueFalseModal } from '../../redux/trueFalse/trueFalse.actions';
import { selectTrueFalseText} from "../../redux/trueFalse/trueFalse.selectors";
import './trueFalse.scss'
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";

class TrueFalse extends React.Component {
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
      this.props.editor.execute( 'insertTrueFalse', this.props.text);
      this.props.editor.editing.view.focus();
      this.props.resetTrueFalseModal();
      this.props.closeTrueFalseModal();
    }
    
    handleChange(e) {
      switch(e.target.name){
        case "text":
          this.props.updateTrueFalseText(e.target.value);
          break;
        default:
          break;
      }
    }

     render() {
      return (
      <Draggable bounds="body" disabled={this.state.disableDrag}>
        <div className="modal-truefalse">
          <div className="modal-truefalse__content">
            <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modaltruefalseTip">
              <ReactTooltip id="modaltruefalseTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>Si me mantienes pulsado, ¡puedes arrastrarme a cualquier posición de la página!</ReactTooltip>
                <button onClick={this.props.closeTrueFalseModal}><GrFormClose size="1.3em"/></button>
            </div>
            <div className="modal-truefalse__content__main">
              <div className="modal-truefalse__content__main__container">
                <div className="container__text">
                  <label>Inserte los conceptos a definir separados por comas: </label>
                  <textarea id="text" name="text" value={this.props.text} onChange={this.handleChange} rows = "10" cols = "100"/>
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="reset" onClick={this.props.resetTrueFalseModal}>Resetear</button>
              <button className="accept" onClick={this.accept} disabled={!this.props.text}>Aceptar</button>
            </div>
          </div>
        </div>
      </Draggable>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    openTrueFalseModal: () => dispatch(openTrueFalseModal),
    closeTrueFalseModal: () => dispatch(closeTrueFalseModal),
    updateTrueFalseText: (text) => dispatch(updateTrueFalseText(text)),
    resetTrueFalseModal: () => dispatch(resetTrueFalseModal())
  });
  
  const mapStateToProps = createStructuredSelector({
    text: selectTrueFalseText,
    editor: selectEditorClass
  });

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalse);