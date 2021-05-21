import React from 'react';
import './definitions.scss'

class Definitions extends React.Component{
    render(){
        return(
            <ol>
                {this.props.data.text.split(",").map((value) => 
                    <div className="defi">
                        <li>{value}</li>
                        {Array.from(Array(this.props.data.numLines - 1), () =>{
                            if(this.props.data.extraspace){
                                return <div className="line extraspace-lines"></div>
                            }
                            else return <div className="line"></div>
                        })}
                    </div>
                )}
            </ol>
        );
    }
}

export default Definitions;