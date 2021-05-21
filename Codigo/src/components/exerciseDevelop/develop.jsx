import React from 'react';
import './develop.scss'

class Develop extends React.Component{
    render(){
        return(
                <div className="dev">
                    {this.props.data.text}
                    {Array.from(Array(this.props.data.numLines - 1), () =>{
                        if(this.props.data.extraspace){
                            return <div className="line extraspace-lines"></div>
                        }
                        else return <div className="line"></div>
                    })}
                </div>
        );
    }
}

export default Develop;