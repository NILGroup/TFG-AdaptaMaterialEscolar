import React from 'react';

class FillGaps extends React.Component{
    
    constructor(){
            super();
            this.state = {searchInput: ""};
    }

    handleChange = async event => {
        const {value} = event.target;
        this.setState({searchInput: value});
    }


    render(){
        return(<div className="fillGaps">
                <label>Introduce entre corchetes {"{}"} el texto a subrayar </label>
                <input type="text" className="searchInput" onChange={this.handleChange}/>
                <button onClick={this.props.onClose}>Close</button>
        </div>
        );
    }
}

export default FillGaps;