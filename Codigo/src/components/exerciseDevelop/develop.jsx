import React from 'react';
import { createStructuredSelector } from 'reselect';
import { closeDevelopModal, openDevelopModal } from '../../redux/develop/develop.actions';
import './develop.scss'

class Develop extends React.Component {
    constructor() {
      super();
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Oraciones:\n' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
      <div className="modal-develop">
          <form onSubmit={this.handleSubmit}>
            <div class = "statement">
                <label>Enunciado: </label>
            </div>
            <div class = "space">
                <textarea value={this.state.value} onChange={this.handleChange} rows = "10" cols = "100"/>
            </div>
            <div class = "statement">
                <label>Espacio de desarrollo (número de líneas): </label>
            </div>
            <div class = "space">
                <textarea value={this.state.value} onChange={this.handleChange} rows = "1" cols = "3"/>
            </div>
            <div class = "insertButton">
                <input type="submit" value="Insertar ejercicio"/>
            </div>
        </form>
        </div>
      );
    }
  }

  
  const mapDispatchToProps = (dispatch) => ({
    openDevelopModal: () => dispatch(openDevelopModal),
    closeDevelopModal: () => dispatch(closeDevelopModal)
});

  export default Develop;