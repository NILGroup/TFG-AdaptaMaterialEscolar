import React from 'react';
import FillGaps from '../fillGaps/fillGaps'

class FillGapsButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {opened: false}
    }

    buttonClicked = ( ) => {
        this.setState( {
            opened: !this.state.opened
        } );
    }

    closeChild = () => {
        this.setState({
          opened: false
        });
      };

    render(){
        return (!this.state.opened ? 
            (<button className="pictoButton" onClick={this.buttonClicked}>Rellenar huecos</button>) 
            : (<FillGaps onClose={this.closeChild}/>));
    }
    
}

export default FillGapsButton;