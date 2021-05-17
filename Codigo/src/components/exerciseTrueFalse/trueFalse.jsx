import React from 'react';
import './trueFalse.scss'

class TrueFalse extends React.Component{
    render(){
        return(
            <ol>
                {this.props.data.text.split(",").map((value) => 
                    <div className="tf">
                        <li>{value + 'RESPUESTA: '}</li>
                    </div>
                )}
            </ol>
        );
    }
}

export default TrueFalse;