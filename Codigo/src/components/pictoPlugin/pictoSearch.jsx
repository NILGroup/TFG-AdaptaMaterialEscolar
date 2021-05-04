import React from 'react';
import {connect} from 'react-redux';
import { selectPictogramSearchResults } from '../../redux/pictograms/pictogram.selectors';
import {searchPictograms, fetchPictograms, closePictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { createStructuredSelector } from 'reselect';
import Pictogram from './pictogram';
import "./pictoSearch.scss";
import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

class PictoSearch extends React.Component{
    

    handleChange = async event => {
        const {value} = event.target;
        this.props.fetchPictograms(value);
    }

    render(){
        console.log(this.props.pictogramResults);
        return(<div className="pictoSearch">
                <input type="text" className="searchInput" onChange={this.handleChange}/>
                <div className="pictoResults">
                {this.props.pictogramResults.length > 0 ? 
                this.props.pictogramResults.map(url => 
                    <Pictogram url={url}/>) : <span>No hay resultados</span>}
                </div>
                <button onClick={this.props.closeModal}>Close</button>
        </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    pictogramResults: selectPictogramSearchResults
});

const mapDispatchToProps = (dispatch) => ({
    searchPictograms: (searchInput) => dispatch(searchPictograms(searchInput)),
    fetchPictograms: (searchInput) => dispatch(fetchPictograms(searchInput)),
    closeModal: () => dispatch(closePictogramFinder())
});

mix( PictoSearch, EmitterMixin );
export default connect(mapStateToProps, mapDispatchToProps)(PictoSearch);