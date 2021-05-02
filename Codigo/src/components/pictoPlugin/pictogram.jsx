import React from 'react';
import './pictogram.scss'
import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

class Pictogram extends React.Component{

    render(){
    return(<div>
        <img src={this.props.url} alt="pict" ></img>
    </div>)
    }
}

mix( Pictogram, EmitterMixin );

export default Pictogram;