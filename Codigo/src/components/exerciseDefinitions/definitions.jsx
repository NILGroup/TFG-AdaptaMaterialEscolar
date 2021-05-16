import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { closeDefinitionsModal, openDefinitionsModal, resetDefinitionsModal, updateDefinitionsNumLines, updateDefinitionsText } from '../../redux/definitions/definitions.actions';
import { selectDefinitionsModalIsDisplayed, selectDefinitionsNumLines, selectDefinitionsText} from "../../redux/definitions/definitions.selectors";

import './definitions.scss'

class Definitions extends React.Component {
    constructor() {
      super();
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
    }
    
     accept = () => {
      this.props.editor.execute( 'insertDefinitions', this.state.value);
      this.props.editor.editing.view.focus();
      this.props.closeDefinitionsModal();
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    /*handleSubmit(event) {
      alert('Oraciones:\n' + this.state.value);
      event.preventDefault();
    }*/

    render() {
      return (
      <div className="modal-definitions">
            <form onSubmit={this.handleSubmit}>
                <div class = "statement">
                    <label>Inserte los conceptos a definir, separados por comas: </label>
                </div>
                <div class = "space">
                    <textarea value={this.state.value} onChange={this.handleChange} rows = "10" cols = "100"/>
                </div>
                <div class = "statement">
                    <label>Número de líneas para cada definición: </label>
                </div>
                <div class = "space">
                <textarea value={this.state.value} onChange={this.handleChange} rows = "1" cols = "3"/>
                </div>
                <div class = "insertButton">
                <button onClick={this.accept}>Aceptar</button>
                </div>
            </form>
        </div>
      );
    }
  }

const mapDispatchToProps = (dispatch) => ({
  openDefinitionsModal: () => dispatch(openDefinitionsModal),
  closeDefinitionsModal: () => dispatch(closeDefinitionsModal),
  updateDefinitionsNumLines: () => dispatch(updateDefinitionsNumLines),
  updateDefinitionsText: () => dispatch(updateDefinitionsText),
  resetDefinitionsModal: () => dispatch(resetDefinitionsModal())
});

const mapStateToProps = createStructuredSelector({
  numLines: selectDefinitionsNumLines,
  text: selectDefinitionsText
});

export default connect(mapStateToProps, mapDispatchToProps)(Definitions);

