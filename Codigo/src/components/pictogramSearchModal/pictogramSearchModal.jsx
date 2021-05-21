import React from 'react';
import {connect} from 'react-redux';
import { selectPictogramSearchResults } from '../../redux/pictograms/pictogram.selectors';
import {searchPictograms, fetchPictograms, closePictogramFinder} from '../../redux/pictograms/pictograms.actions';
import { createStructuredSelector } from 'reselect';
import Pictogram from '../pictogram/pictogram';
import "./pictogramSearchModal.scss";
import ReactTooltip from "react-tooltip";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";

class PictogramSearchModal extends React.Component{
    constructor(props){
        super();
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

    handleChange = async event => {
        const {value} = event.target;
        this.props.fetchPictograms(value);
    }

    render(){
        return(
            <Draggable bounds="body" disabled={this.state.disableDrag}>
                <div className="pictoSearch">
                    <div className="pictoSearch__content">
                        <div className="header" onMouseEnter={this.toggleDisableDrag} onMouseLeave={this.toggleDisableDrag} data-tip data-for="modalPictoTip">
                            <ReactTooltip className="tooltip" id="modalPictoTip" place="top" effect="solid" delayHide={1500} disable={this.state.disableTip} afterHide={() => {this.disableTip()}}>Si me mantienes pulsado, ¡puedes arrastrarme a cualquier posición de la página!</ReactTooltip>
                                <button onClick={this.props.closeModal}><GrFormClose size="1.3em"/></button>
                        </div>
                        <div className="pictoSearch__content__main">
                            <input type="text" className="searchInput" onChange={this.handleChange}/>
                            {this.props.pictogramResults.length > 0 ? <span className="infoPicto">Haz clic en un pictograma para llevarlo al editor</span> : null}
                            <div className="pictoSearch__content__main__pictoResults">
                                {this.props.pictogramResults.length > 0 ?
                                this.props.pictogramResults.map(url => 
                                    <Pictogram url={url}/>) : <span>No hay resultados</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
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

export default connect(mapStateToProps, mapDispatchToProps)(PictogramSearchModal);