import React from 'react';
import './trueFalse.scss'

class TrueFalse extends React.Component{
    render(){
        return(
            <ol>
                {this.props.data.split(",").map((value) => 
                    <div className="tf">
                        <li>{value + ' Respuesta: '}</li>
                    </div>
                )}
            </ol>
        );
    }
}

export default TrueFalse;