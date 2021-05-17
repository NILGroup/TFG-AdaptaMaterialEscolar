import React from 'react';
import './develop.scss'

class Develop extends React.Component{
    render(){
        return(
            <ol>
                {this.props.data.text.split(",").map((value) => 
                    <div className="dev">
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

export default Develop;