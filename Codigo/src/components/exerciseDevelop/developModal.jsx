import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { updateDevelopAddHowToSolve, updateDevelopExtraSpace, updateDevelopNumLines, updateDevelopText } from '../../redux/develop/develop.actions';
import { selectDevelopAddHowToSolve, selectDevelopExtraSpace, selectDevelopNumLines, selectDevelopText} from "../../redux/develop/develop.selectors";
import './develop.scss'

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
      case "addHowToSolve":
        this.props.updateDevelopAddHowToSolve(e.target.checked);
        break;
      default:
        break;
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

  render() {
    return (
          <div className="modal-develop__content__main">
            <div className="modal-develop__content__main__container">
              <div className="container__info">
                <span>* Campos obligatorios</span>
              </div>
              <div className="container__text">
                <label><span>*</span>Inserte el enunciado del ejercicio de desarrollo:</label>
                <textarea ref={(textarea) => {this.nameTextarea = textarea;}} id="text" name="text" value={this.props.text} onChange={this.handleChange} cols = "70"/>
              </div>
              <div className="container">
                <label><span>*</span>Número de líneas para el ejercicio:<input type="number" id="numLines" name="numLines" min="1" value={this.props.numLines} onChange={this.handleChange}/></label> 
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
    updateDevelopNumLines: (numLines) => dispatch(updateDevelopNumLines(numLines)),
    updateDevelopText: (text) => dispatch(updateDevelopText(text)),
    updateDevelopExtraSpace: (extraspace) => dispatch(updateDevelopExtraSpace(extraspace)),
    updateDevelopAddHowToSolve: (add) => dispatch(updateDevelopAddHowToSolve(add))
  });
  
  const mapStateToProps = createStructuredSelector({
    numLines: selectDevelopNumLines,
    text: selectDevelopText,
    extraspace: selectDevelopExtraSpace,
    addHowToSolve: selectDevelopAddHowToSolve
  });

export default connect(mapStateToProps, mapDispatchToProps)(DevelopModal);