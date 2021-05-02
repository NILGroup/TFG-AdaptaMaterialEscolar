import React from 'react';
import './trueFalse.scss'

class TrueFalse extends React.Component {
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
        <form onSubmit={this.handleSubmit}>
            <div class = "statement">
                <label>Inserte las oraciones del ejercicio de Verdadero o Falso, separadas por espacio: </label>
            </div>
           <div class = "space">
                <textarea value={this.state.value} onChange={this.handleChange} rows = "20" cols = "100"/>
            </div>
            <div class = "insertButton">
                <input type="submit" value="Insertar ejercicio"/>
            </div>
        </form>
      );
    }
  }

  export default TrueFalse;